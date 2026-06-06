import { prisma } from '@/app/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const city = searchParams.get('city')
  const status = searchParams.get('status')
  
  if (id) {
    // Get single event by ID with children, styles, venue, recurrence
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        children: {
          include: {
            venue: true,
            styles: {
              include: {
                style: true
              }
            },
            recurrence: true
          },
          orderBy: {
            start_datetime: 'asc'
          }
        },
        venue: true,
        styles: {
          include: {
            style: true
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
    // Get events filtered by city and status, only parents (no children)
    const whereClause: any = {
      parentId: null // Only parent events
    }
    
    if (city) {
      whereClause.city = city
    }
    
    if (status) {
      whereClause.status = status
    }
    
    const events = await prisma.event.findMany({
      where: whereClause,
      orderBy: { 
        start_datetime: 'asc',
        createdAt: 'desc' 
      },
      include: {
        venue: true,
        styles: {
          include: {
            style: true
          }
        },
        recurrence: true
      }
    })
    return NextResponse.json(events)
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields for parent events
    if (!body.title || !body.city) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    // Handle creating child events (requires parentId)
    let parentId = body.parentId
    if (parentId) {
      // Verify parent exists
      const parentEvent = await prisma.event.findUnique({
        where: { id: parentId }
      })
      
      if (!parentEvent) {
        return NextResponse.json({ error: 'Parent event not found' }, { status: 400 })
      }
    }
    
    // Handle styles - convert array of style IDs to junction table entries
    let styleIds = body.styles || []
    if (Array.isArray(styleIds)) {
      // If style names are provided instead of IDs, create/find them
      for (let i = 0; i < styleIds.length; i++) {
        if (typeof styleIds[i] === 'string' && styleIds[i].length > 0) {
          const existingStyle = await prisma.style.findFirst({
            where: { name: styleIds[i] }
          })
          
          if (existingStyle) {
            styleIds[i] = existingStyle.id
          } else {
            const newStyle = await prisma.style.create({
              data: { name: styleIds[i] }
            })
            styleIds[i] = newStyle.id
          }
        }
      }
    }
    
    // Create or find venue if provided
    let venueId = body.venue_id
    if (body.venue && !body.venue_id) {
      const existingVenue = await prisma.venue.findFirst({
        where: { name: body.venue }
      })
      
      if (existingVenue) {
        venueId = existingVenue.id
      } else {
        const newVenue = await prisma.venue.create({
          data: { 
            name: body.venue,
            address: body.address || '',
            city: body.city,
            postcode: body.postcode || null,
            lat: body.lat || null,
            lng: body.lng || null
          }
        })
        venueId = newVenue.id
      }
    }
    
    // Create event
    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description || null,
        city: body.city,
        status: body.status || 'draft',
        event_type: body.event_type || null,
        start_datetime: body.start_datetime ? new Date(body.start_datetime) : null,
        end_datetime: body.end_datetime ? new Date(body.end_datetime) : null,
        cost: body.cost || null,
        teacher: body.teacher || null,
        dj: body.dj || null,
        band: body.band || null,
        venue_id: venueId || null,
        parentId: parentId || null,
        level_id: body.level_id || null
      }
    })
    
    // Handle styles junction table entries
    if (styleIds.length > 0) {
      const styleEntries = styleIds.map((styleId: string) => ({
        event_id: event.id,
        style_id: styleId
      }))
      
      await prisma.eventStyle.createMany({
        data: styleEntries
      })
    }
    
    // Handle recurrence if provided
    let recurrenceData = body.recurrence || null
    if (recurrenceData) {
      const recurrence = await prisma.eventRecurrence.create({
        data: {
          event_id: event.id,
          frequency: recurrenceData.frequency,
          day_of_week: recurrenceData.day_of_week || null,
          week_of_month: recurrenceData.week_of_month || null,
          specific_date: recurrenceData.specific_date || null,
          end_date: recurrenceData.end_date ? new Date(recurrenceData.end_date) : null,
          occurrence_count: recurrenceData.occurrence_count || null
        }
      })
      
      // Update event with recurrence ID
      await prisma.event.update({
        where: { id: event.id },
        data: { 
          recurrence: {
            connect: { id: recurrence.id }
          }
        }
      })
    }
    
    // Fetch the event with relationships included for response
    const eventWithRelations = await prisma.event.findUnique({
      where: { id: event.id },
      include: {
        venue: true,
        styles: {
          include: {
            style: true
          }
        },
        recurrence: true,
        children: {
          include: {
            venue: true,
            styles: {
              include: {
                style: true
              }
            },
            recurrence: true
          },
          orderBy: {
            start_datetime: 'asc'
          }
        }
      }
    })
    
    return NextResponse.json(eventWithRelations)
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json({ 
      error: 'Failed to create event', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}