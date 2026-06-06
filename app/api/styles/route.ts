import { prisma } from '@/app/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  
  try {
    const whereClause: any = {}
    
    if (name) {
      whereClause.name = {
        contains: name,
        mode: 'insensitive'
      }
    }
    
    const styles = await prisma.style.findMany({
      where: whereClause,
      orderBy: { 
        name: 'asc' 
      }
    })
    
    return NextResponse.json(styles)
  } catch (error) {
    console.error('Error fetching styles:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch styles',
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name) {
      return NextResponse.json({ error: 'Missing required field: name' }, { status: 400 })
    }
    
    // Check if style already exists
    const existingStyle = await prisma.style.findFirst({
      where: { name: body.name }
    })
    
    if (existingStyle) {
      return NextResponse.json({ error: 'Style already exists' }, { status: 400 })
    }
    
    // Create style
    const style = await prisma.style.create({
      data: {
        name: body.name
      }
    })
    
    return NextResponse.json(style)
  } catch (error) {
    console.error('Error creating style:', error)
    return NextResponse.json({ 
      error: 'Failed to create style', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}