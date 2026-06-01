import { prisma } from '@/app/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  if (id) {
    // Get single event by ID
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        style: true,
        level: true,
        venue: true
      }
    })
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }
    return NextResponse.json(event)
  } else {
    // Get all events
    const events = await prisma.event.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        style: true,
        level: true,
        venue: true
      }
    })
    return NextResponse.json(events)
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Received POST data:', JSON.stringify(body, null, 2)); // Debug log
    
    // Validate required fields
    if (!body.title || !body.city || !body.start_datetime || !body.end_datetime) {
      console.error('Missing required fields in body:', body);
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create or find related entities (style, level, venue)
    let styleId = body.style_id;
    let levelId = body.level_id;
    let venueId = body.venue_id;
    
    // If style name is provided and no style_id, create or find the style
    if (body.style && !body.style_id) {
      const existingStyle = await prisma.style.findFirst({
        where: { name: body.style }
      });
      
      if (existingStyle) {
        styleId = existingStyle.id;
      } else {
        const newStyle = await prisma.style.create({
          data: { name: body.style }
        });
        styleId = newStyle.id;
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

    console.log('Creating event with:', {
      title: body.title,
      city: body.city,
      event_type: body.event_type,
      start_datetime: body.start_datetime,
      end_datetime: body.end_datetime,
      duration_minutes: body.duration_minutes,
      style_id: styleId || null,
      level_id: levelId || null,
      venue_id: venueId || null
    });

    const event = await prisma.event.create({
      data: {
        title: body.title,
        city: body.city,
        event_type: body.event_type,
        start_datetime: new Date(body.start_datetime),
        end_datetime: new Date(body.end_datetime),
        duration_minutes: body.duration_minutes || null,
        style_id: styleId || null,
        level_id: levelId || null,
        venue_id: venueId || null
      }
    })
    
    // Fetch the event with relationships included for response
    const eventWithRelations = await prisma.event.findUnique({
      where: { id: event.id },
      include: {
        style: true,
        level: true,
        venue: true
      }
    });
    
    console.log('Created event successfully:', JSON.stringify(eventWithRelations, null, 2));
    
    return NextResponse.json(eventWithRelations)
  } catch (error) {
    console.error('Error creating event:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'Unknown error');
    return NextResponse.json({ 
      error: 'Failed to create event', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}