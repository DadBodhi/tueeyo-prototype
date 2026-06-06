import { prisma } from '@/app/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const city = searchParams.get('city')
  const status = searchParams.get('status')
  
  try {
    if (id) {
      // Get single event by ID with children
      const event = await prisma.event.findUnique({
        where: { id },
        include: {
          style: true,
          level: true,
          venue: true,
          children: {
            include: {
              style: true,
              level: true,
              venue: true
            }
          },
          recurrence: true
        }
      })
      
      if (!event) {
        return NextResponse.json({ error: 'Event not found' }, { status: 404 })
      }
      
      return NextResponse.json(event)
    } else {
      // Get events with optional filters
      const whereClause: any = {}
      
      if (city) {
        whereClause.city = city
      }
      
      if (status) {
        whereClause.status = status
      }
      
      const events = await prisma.event.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        include: {
          style: true,
          level: true,
          venue: true,
          recurrence: true
        }
      })
      
      return NextResponse.json(events)
    }
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch events',
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields for parent event
    if (!body.title || !body.city) {
      return NextResponse.json({ error: 'Missing required fields: title, city' }, { status: 400 })
    }
    
    // Handle parent/child relationship
    let parentId = body.parentId;
    let isChildEvent = false;
    
    if (parentId) {
      // This is a child event, validate that parent exists
      const parentEvent = await prisma.event.findUnique({
        where: { id: parentId }
      })
      
      if (!parentEvent) {
        return NextResponse.json({ error: 'Parent event not found' }, { status: 400 })
      }
      
      isChildEvent = true;
      
      // For child events, we need to validate that required fields are present
      if (!body.event_type) {
        return NextResponse.json({ error: 'Missing required field: event_type for child event' }, { status: 400 })
      }
    } else {
      // This is a parent event, validate required fields
      if (!body.start_datetime || !body.end_datetime) {
        return NextResponse.json({ error: 'Missing required fields: start_datetime, end_datetime' }, { status: 400 })
      }
    }
    
    // Create or find related entities (style, level, venue)
    let styleIds: string[] = [];
    let levelId = body.level_id;
    let venueId = body.venue_id;
    
    // Handle styles - can be multiple
    if (body.styles && Array.isArray(body.styles)) {
      for (const styleName of body.styles) {
        const existingStyle = await prisma.style.findFirst({
          where: { name: styleName }
        });
        
        if (existingStyle) {
          styleIds.push(existingStyle.id);
        } else {
          const newStyle = await prisma.style.create({
            data: { name: styleName }
          });
          styleIds.push(newStyle.id);
        }
      }
    }
    
    // If level name is provided and no level_id, create or find the level
    if (body.level && !body.level_id) {
      const existingLevel = await prisma.level.findFirst({
        where: { name: body.level }
      });
      
      if (existingLevel) {
        levelId = existingLevel.id;
      } else {
        const newLevel = await prisma.level.create({
          data: { name: body.level }
        });
        levelId = newLevel.id;
      }
    }
    
    // If venue name is provided and no venue_id, create or find the venue
    if (body.venue && !body.venue_id) {
      const existingVenue = await prisma.venue.findFirst({
        where: { name: body.venue }
      });
      
      if (existingVenue) {
        venueId = existingVenue.id;
      } else {
        const newVenue = await prisma.venue.create({
          data: { 
            name: body.venue,
            address: '',
            city: body.city
          }
        });
        venueId = newVenue.id;
      }
    }

    // Prepare event data
    const eventData: any = {
      title: body.title,
      description: body.description || null,
      city: body.city,
      status: body.status || 'draft',
      event_type: body.event_type || null,
      start_datetime: body.start_datetime ? new Date(body.start_datetime) : null,
      end_datetime: body.end_datetime ? new Date(body.end_datetime) : null,
      duration_minutes: body.duration_minutes || null,
      cost: body.cost || null,
      level_id: levelId || null,
      venue_id: venueId || null,
      teacher: body.teacher || null,
      dj: body.dj || null,
      band: body.band || null,
      parentId: parentId || null
    }

    // Create the event
    const event = await prisma.event.create({
      data: eventData
    })

    // Handle many-to-many relationship for styles
    if (styleIds.length > 0) {
      await prisma.eventStyle.createMany({
        data: styleIds.map(styleId => ({
          event_id: event.id,
          style_id: styleId
        }))
      })
    }

    // Handle recurrence if provided
    if (body.recurrence && !isChildEvent) {
      const recurrenceData = {
        event_id: event.id,
        frequency: body.recurrence.frequency,
        day_of_week: body.recurrence.day_of_week || null,
        week_of_month: body.recurrence.week_of_month || null,
        specific_date: body.recurrence.specific_date || null,
        end_date: body.recurrence.end_date ? new Date(body.recurrence.end_date) : null,
        occurrence_count: body.recurrence.occurrence_count || null
      }
      
      await prisma.eventRecurrence.create({
        data: recurrenceData
      })
    }

    // Fetch the event with relationships included for response
    const eventWithRelations = await prisma.event.findUnique({
      where: { id: event.id },
      include: {
        style: true,
        level: true,
        venue: true,
        children: {
          include: {
            style: true,
            level: true,
            venue: true
          }
        },
        recurrence: true
      }
    });
    
    return NextResponse.json(eventWithRelations)
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json({ 
      error: 'Failed to create event', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}