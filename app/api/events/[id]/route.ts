import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.id },
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
  } catch (error) {
    console.error('Error fetching event:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Check if event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id: params.id },
      include: {
        recurrence: true
      }
    })
    
    if (!existingEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
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
            city: body.city || '', // Need to handle city for venue since it's required in schema
            postcode: body.postcode || null,
            lat: body.lat || null,
            lng: body.lng || null
          }
        })
          venueId = newVenue.id
        }
      }
    
    // Update event
    const updatedEvent = await prisma.event.update({
      where: { id: params.id },
      data: {
        title: body.title || existingEvent.title,
        description: body.description !== undefined ? body.description : existingEvent.description,
        status: body.status || existingEvent.status,
        event_type: body.event_type || existingEvent.event_type,
        start_datetime: body.start_datetime ? new Date(body.start_datetime) : existingEvent.start_datetime,
        end_datetime: body.end_datetime ? new Date(body.end_datetime) : existingEvent.end_datetime,
        cost: body.cost !== undefined ? body.cost : existingEvent.cost,
        teacher: body.teacher !== undefined ? body.teacher : existingEvent.teacher,
        dj: body.dj !== undefined ? body.dj : existingEvent.dj,
        band: body.band !== undefined ? body.band : existingEvent.band,
        venue_id: venueId || existingEvent.venue_id,
        level_id: body.level_id || existingEvent.level_id,
        updatedAt: new Date()
      }
    })
    
    // Handle styles junction table entries - first delete old ones, then create new ones
    if (body.styles !== undefined) {
      await prisma.eventStyle.deleteMany({
        where: { event_id: params.id }
      })
      
      if (styleIds.length > 0) {
        const styleEntries = styleIds.map((styleId: string) => ({
          event_id: updatedEvent.id,
          style_id: styleId
        }))
        
        await prisma.eventStyle.createMany({
          data: styleEntries
        })
      }
    }
    
    // Handle recurrence if provided
    if (body.recurrence !== undefined) {
      if (existingEvent.recurrence?.id) {
        // Update existing recurrence
        await prisma.eventRecurrence.update({
          where: { id: existingEvent.recurrence.id },
          data: {
            frequency: body.recurrence.frequency,
            day_of_week: body.recurrence.day_of_week || null,
            week_of_month: body.recurrence.week_of_month || null,
            specific_date: body.recurrence.specific_date || null,
            end_date: body.recurrence.end_date ? new Date(body.recurrence.end_date) : null,
            occurrence_count: body.recurrence.occurrence_count || null
          }
        })
      } else if (body.recurrence) {
        // Create new recurrence
        await prisma.eventRecurrence.create({
          data: {
            event_id: updatedEvent.id,
            frequency: body.recurrence.frequency,
            day_of_week: body.recurrence.day_of_week || null,
            week_of_month: body.recurrence.week_of_month || null,
            specific_date: body.recurrence.specific_date || null,
            end_date: body.recurrence.end_date ? new Date(body.recurrence.end_date) : null,
            occurrence_count: body.recurrence.occurrence_count || null
          }
        })
      } else {
        // Recurrence was removed, delete it
        if (existingEvent.recurrence && existingEvent.recurrence.id) {
          await prisma.eventRecurrence.delete({
            where: { id: existingEvent.recurrence.id }
          })
        }
      }
    }

    // Handle children if provided - create new child events
    if (body.children !== undefined && Array.isArray(body.children)) {
      // First delete existing children to avoid duplicates
      await prisma.event.deleteMany({
        where: { parentId: updatedEvent.id }
      });
      
      // Create new children
      if (existingEvent.start_datetime) {
        for (const child of body.children) {
          const startTime = child.start_time || '00:00';
          const endTime = child.end_time || '00:00';
          
          const childPayload = {
            title: `${updatedEvent.title} - ${child.event_type}`,
            event_type: child.event_type,
            parentId: updatedEvent.id,
            start_datetime: new Date(`${existingEvent.start_datetime.toISOString().split('T')[0]}T${startTime}:00`),
            end_datetime: new Date(`${existingEvent.start_datetime.toISOString().split('T')[0]}T${endTime}:00`),
            description: child.description || null,
            venue_id: updatedEvent.venue_id, // Inherit venue from parent
            cost: child.cost,
            status: 'draft', // Default status for children
            // Don't set city explicitly - it should come from the venue relationship
          };
          
          // Add class-specific fields
          if (child.event_type === 'class') {
            (childPayload as any).level_id = child.level_id;
            (childPayload as any).teacher = child.teacher;
          }
          
          // Add social-specific fields
          if (child.event_type === 'social') {
            (childPayload as any).dj = child.dj;
            (childPayload as any).band = child.band;
          }
          
          // Handle styles for social events
          if (child.event_type === 'social' && child.style_ids) {
            // Create the child event first to get its ID
            const newChildEvent = await prisma.event.create({
              data: childPayload
            });
            
            // Then create the style associations
            const styleEntries = child.style_ids.map((styleId: string) => ({
              event_id: newChildEvent.id,
              style_id: styleId
            }));
            
            if (styleEntries.length > 0) {
              await prisma.eventStyle.createMany({
                data: styleEntries
              });
            }
          } else {
            // For class events or other types, create directly
            await prisma.event.create({
              data: childPayload
            });
          }
        }
      }
    }
    
    // Fetch the event with relationships included for response
    const eventWithRelations = await prisma.event.findUnique({
      where: { id: updatedEvent.id },
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
    console.error('Error updating event:', error)
    return NextResponse.json({ 
      error: 'Failed to update event', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Soft delete event by setting deleted_at timestamp
    const deletedEvent = await prisma.event.update({
      where: { id: params.id },
      data: {
        deletedAt: new Date()
      }
    })
    
    return NextResponse.json({ message: 'Event deleted successfully', event: deletedEvent })
  } catch (error) {
    console.error('Error deleting event:', error)
    return NextResponse.json({ 
      error: 'Failed to delete event', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
