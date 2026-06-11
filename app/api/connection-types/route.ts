import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const name = searchParams.get('name')

  try {
    if (id) {
      // Get single connection type by ID
      const connectionType = await prisma.connectionType.findUnique({
        where: { id },
      })
      
      if (!connectionType) {
        return NextResponse.json({ error: 'Connection type not found' }, { status: 404 })
      }
      
      return NextResponse.json(connectionType)
    } else {
      // Get connection types filtered by name
      const whereClause: any = {}
      
      if (name) {
        whereClause.name = { contains: name, mode: 'insensitive' }
      }
      
      const connectionTypes = await prisma.connectionType.findMany({
        where: whereClause,
        orderBy: { 
          name: 'asc'
        }
      })
      
      return NextResponse.json(connectionTypes)
    }
  } catch (error) {
    console.error('Error fetching connection types:', error)
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
    
    // Check if connection type already exists
    const existingConnectionType = await prisma.connectionType.findFirst({
      where: { name: body.name }
    })
    
    if (existingConnectionType) {
      return NextResponse.json({ error: 'Connection type already exists' }, { status: 400 })
    }
    
    // Create connection type
    const connectionType = await prisma.connectionType.create({
      data: {
        name: body.name,
        display_label: body.display_label || body.name,
        description: body.description || null
      }
    })
    
    return NextResponse.json(connectionType)
  } catch (error) {
    console.error('Error creating connection type:', error)
    return NextResponse.json({ 
      error: 'Failed to create connection type', 
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
    
    // Check if connection type exists
    const existingConnectionType = await prisma.connectionType.findUnique({
      where: { id: params.id }
    })
    
    if (!existingConnectionType) {
      return NextResponse.json({ error: 'Connection type not found' }, { status: 404 })
    }
    
    // Update connection type
    const updatedConnectionType = await prisma.connectionType.update({
      where: { id: params.id },
      data: {
        name: body.name || existingConnectionType.name,
        display_label: body.display_label !== undefined ? body.display_label : existingConnectionType.display_label,
        description: body.description !== undefined ? body.description : existingConnectionType.description,
        updatedAt: new Date()
      }
    })
    
    return NextResponse.json(updatedConnectionType)
  } catch (error) {
    console.error('Error updating connection type:', error)
    return NextResponse.json({ 
      error: 'Failed to update connection type', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if connection type exists
    const existingConnectionType = await prisma.connectionType.findUnique({
      where: { id: params.id }
    })
    
    if (!existingConnectionType) {
      return NextResponse.json({ error: 'Connection type not found' }, { status: 404 })
    }
    
    // Soft delete connection type by setting deletedAt timestamp
    const deletedConnectionType = await prisma.connectionType.update({
      where: { id: params.id },
      data: {
        deletedAt: new Date()
      }
    })
    
    return NextResponse.json({ message: 'Connection type deleted successfully', connectionType: deletedConnectionType })
  } catch (error) {
    console.error('Error deleting connection type:', error)
    return NextResponse.json({ 
      error: 'Failed to delete connection type', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}