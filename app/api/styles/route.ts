import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const name = searchParams.get('name')

  try {
    if (id) {
      // Get single style by ID
      const style = await prisma.style.findUnique({
        where: { id },
      })
      
      if (!style) {
        return NextResponse.json({ error: 'Style not found' }, { status: 404 })
      }
      
      return NextResponse.json(style)
    } else {
      // Get styles filtered by name
      const whereClause: any = {}
      
      if (name) {
        whereClause.name = { contains: name, mode: 'insensitive' }
      }
      
      const styles = await prisma.style.findMany({
        where: whereClause,
        orderBy: { 
          name: 'asc'
        }
      })
      
      return NextResponse.json(styles)
    }
  } catch (error) {
    console.error('Error fetching styles:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Check if style exists
    const existingStyle = await prisma.style.findUnique({
      where: { id: params.id }
    })
    
    if (!existingStyle) {
      return NextResponse.json({ error: 'Style not found' }, { status: 404 })
    }
    
    // Update style
    const updatedStyle = await prisma.style.update({
      where: { id: params.id },
      data: {
        name: body.name || existingStyle.name,
        updatedAt: new Date()
      }
    })
    
    return NextResponse.json(updatedStyle)
  } catch (error) {
    console.error('Error updating style:', error)
    return NextResponse.json({ 
      error: 'Failed to update style', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if style exists
    const existingStyle = await prisma.style.findUnique({
      where: { id: params.id }
    })
    
    if (!existingStyle) {
      return NextResponse.json({ error: 'Style not found' }, { status: 404 })
    }
    
    // Soft delete style by setting deletedAt timestamp
    const deletedStyle = await prisma.style.update({
      where: { id: params.id },
      data: {
        deletedAt: new Date()
      }
    })
    
    return NextResponse.json({ message: 'Style deleted successfully', style: deletedStyle })
  } catch (error) {
    console.error('Error deleting style:', error)
    return NextResponse.json({ 
      error: 'Failed to delete style', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}