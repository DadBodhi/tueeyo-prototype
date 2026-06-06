import { prisma } from '@/app/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  const city = searchParams.get('city')
  
  try {
    const whereClause: any = {}
    
    if (name) {
      whereClause.name = {
        contains: name,
        mode: 'insensitive'
      }
    }
    
    if (city) {
      whereClause.city = {
        contains: city,
        mode: 'insensitive'
      }
    }
    
    const venues = await prisma.venue.findMany({
      where: whereClause,
      orderBy: { 
        name: 'asc' 
      }
    })
    
    return NextResponse.json(venues)
  } catch (error) {
    console.error('Error fetching venues:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch venues',
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.city) {
      return NextResponse.json({ error: 'Missing required fields: name, city' }, { status: 400 })
    }
    
    // Create venue
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