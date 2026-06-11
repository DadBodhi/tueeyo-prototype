import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const name = searchParams.get('name')
  const city = searchParams.get('city')

  try {
    if (id) {
      // Get single venue by ID
      const venue = await prisma.venue.findUnique({
        where: { id },
      })
      
      if (!venue) {
        return NextResponse.json({ error: 'Venue not found' }, { status: 404 })
      }
      
      return NextResponse.json(venue)
    } else {
      // Get venues filtered by name or city
      const whereClause: any = {}
      
      if (name) {
        whereClause.name = { contains: name, mode: 'insensitive' }
      }
      
      if (city) {
        whereClause.city = city
      }
      
      const venues = await prisma.venue.findMany({
        where: whereClause,
        orderBy: { 
          name: 'asc'
        }
      })
      
      return NextResponse.json(venues)
    }
  } catch (error) {
    console.error('Error fetching venues:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.city) {
      return NextResponse.json({ error: 'Missing required fields: name, city' }, { status: 400 })
    }
    
    // Create venue with postcode, lat, lng fields
    const venue = await prisma.venue.create({
      data: {
        name: body.name,
        address: body.address || '',
        city: body.city,
        postcode: body.postcode || null,
        lat: body.lat || null,
        lng: body.lng || null
      }
    })
    
    return NextResponse.json(venue)
  } catch (error) {
    console.error('Error creating venue:', error)
    return NextResponse.json({ 
      error: 'Failed to create venue', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Check if venue exists
    const existingVenue = await prisma.venue.findUnique({
      where: { id: params.id }
    })
    
    if (!existingVenue) {
      return NextResponse.json({ error: 'Venue not found' }, { status: 404 })
    }
    
    // Update venue with postcode, lat, lng fields
    const updatedVenue = await prisma.venue.update({
      where: { id: params.id },
      data: {
        name: body.name || existingVenue.name,
        address: body.address !== undefined ? body.address : existingVenue.address,
        city: body.city || existingVenue.city,
        postcode: body.postcode !== undefined ? body.postcode : existingVenue.postcode,
        lat: body.lat !== undefined ? body.lat : existingVenue.lat,
        lng: body.lng !== undefined ? body.lng : existingVenue.lng,
        updatedAt: new Date()
      }
    })
    
    return NextResponse.json(updatedVenue)
  } catch (error) {
    console.error('Error updating venue:', error)
    return NextResponse.json({ 
      error: 'Failed to update venue', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if venue exists
    const existingVenue = await prisma.venue.findUnique({
      where: { id: params.id }
    })
    
    if (!existingVenue) {
      return NextResponse.json({ error: 'Venue not found' }, { status: 404 })
    }
    
    // Soft delete venue by setting deletedAt timestamp
    const deletedVenue = await prisma.venue.update({
      where: { id: params.id },
      data: {
        deletedAt: new Date()
      }
    })
    
    return NextResponse.json({ message: 'Venue deleted successfully', venue: deletedVenue })
  } catch (error) {
    console.error('Error deleting venue:', error)
    return NextResponse.json({ 
      error: 'Failed to delete venue', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}