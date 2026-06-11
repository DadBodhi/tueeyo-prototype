import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const name = searchParams.get('name')

  try {
    if (id) {
      // Get single level by ID
      const level = await prisma.level.findUnique({
        where: { id },
      })
      
      if (!level) {
        return NextResponse.json({ error: 'Level not found' }, { status: 404 })
      }
      
      return NextResponse.json(level)
    } else {
      // Get levels filtered by name
      const whereClause: any = {}
      
      if (name) {
        whereClause.name = { contains: name, mode: 'insensitive' }
      }
      
      const levels = await prisma.level.findMany({
        where: whereClause,
        orderBy: { 
          name: 'asc'
        }
      })
      
      return NextResponse.json(levels)
    }
  } catch (error) {
    console.error('Error fetching levels:', error)
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
    
    // Check if level already exists
    const existingLevel = await prisma.level.findFirst({
      where: { name: body.name }
    })
    
    if (existingLevel) {
      return NextResponse.json({ error: 'Level already exists' }, { status: 400 })
    }
    
    // Create level
    const level = await prisma.level.create({
      data: {
        name: body.name,
        description: body.description || null,
        order: body.order || 0
      }
    })
    
    return NextResponse.json(level)
  } catch (error) {
    console.error('Error creating level:', error)
    return NextResponse.json({ 
      error: 'Failed to create level', 
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
    
    // Check if level exists
    const existingLevel = await prisma.level.findUnique({
      where: { id: params.id }
    })
    
    if (!existingLevel) {
      return NextResponse.json({ error: 'Level not found' }, { status: 404 })
    }
    
    // Update level
    const updatedLevel = await prisma.level.update({
      where: { id: params.id },
      data: {
        name: body.name || existingLevel.name,
        description: body.description !== undefined ? body.description : existingLevel.description,
        order: body.order !== undefined ? body.order : existingLevel.order,
        updatedAt: new Date()
      }
    })
    
    return NextResponse.json(updatedLevel)
  } catch (error) {
    console.error('Error updating level:', error)
    return NextResponse.json({ 
      error: 'Failed to update level', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if level exists
    const existingLevel = await prisma.level.findUnique({
      where: { id: params.id }
    })
    
    if (!existingLevel) {
      return NextResponse.json({ error: 'Level not found' }, { status: 404 })
    }
    
    // Soft delete level by setting deletedAt timestamp
    const deletedLevel = await prisma.level.update({
      where: { id: params.id },
      data: {
        deletedAt: new Date()
      }
    })
    
    return NextResponse.json({ message: 'Level deleted successfully', level: deletedLevel })
  } catch (error) {
    console.error('Error deleting level:', error)
    return NextResponse.json({ 
      error: 'Failed to delete level', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}