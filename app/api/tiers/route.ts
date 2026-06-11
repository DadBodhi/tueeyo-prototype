import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const name = searchParams.get('name')

  try {
    if (id) {
      // Get single tier by ID
      const tier = await prisma.tier.findUnique({
        where: { id },
      })
      
      if (!tier) {
        return NextResponse.json({ error: 'Tier not found' }, { status: 404 })
      }
      
      return NextResponse.json(tier)
    } else {
      // Get tiers filtered by name
      const whereClause: any = {}
      
      if (name) {
        whereClause.name = { contains: name, mode: 'insensitive' }
      }
      
      const tiers = await prisma.tier.findMany({
        where: whereClause,
        orderBy: { 
          order: 'asc'
        }
      })
      
      return NextResponse.json(tiers)
    }
  } catch (error) {
    console.error('Error fetching tiers:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || body.cost === undefined) {
      return NextResponse.json({ error: 'Missing required fields: name, cost' }, { status: 400 })
    }
    
    // Check if tier already exists
    const existingTier = await prisma.tier.findFirst({
      where: { name: body.name }
    })
    
    if (existingTier) {
      return NextResponse.json({ error: 'Tier already exists' }, { status: 400 })
    }
    
    // Create tier
    const tier = await prisma.tier.create({
      data: {
        name: body.name,
        description: body.description || null,
        cost: body.cost,
        order: body.order || 0,
        features: body.features || [],
        is_active: body.is_active !== undefined ? body.is_active : true
      }
    })
    
    return NextResponse.json(tier)
  } catch (error) {
    console.error('Error creating tier:', error)
    return NextResponse.json({ 
      error: 'Failed to create tier', 
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
    
    // Check if tier exists
    const existingTier = await prisma.tier.findUnique({
      where: { id: params.id }
    })
    
    if (!existingTier) {
      return NextResponse.json({ error: 'Tier not found' }, { status: 404 })
    }
    
    // Update tier
    const updatedTier = await prisma.tier.update({
      where: { id: params.id },
      data: {
        name: body.name || existingTier.name,
        description: body.description !== undefined ? body.description : existingTier.description,
        cost: body.cost !== undefined ? body.cost : existingTier.cost,
        order: body.order !== undefined ? body.order : existingTier.order,
        features: body.features !== undefined ? body.features : existingTier.features,
        is_active: body.is_active !== undefined ? body.is_active : existingTier.is_active,
        updatedAt: new Date()
      }
    })
    
    return NextResponse.json(updatedTier)
  } catch (error) {
    console.error('Error updating tier:', error)
    return NextResponse.json({ 
      error: 'Failed to update tier', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if tier exists
    const existingTier = await prisma.tier.findUnique({
      where: { id: params.id }
    })
    
    if (!existingTier) {
      return NextResponse.json({ error: 'Tier not found' }, { status: 404 })
    }
    
    // Soft delete tier by setting deletedAt timestamp
    const deletedTier = await prisma.tier.update({
      where: { id: params.id },
      data: {
        deletedAt: new Date()
      }
    })
    
    return NextResponse.json({ message: 'Tier deleted successfully', tier: deletedTier })
  } catch (error) {
    console.error('Error deleting tier:', error)
    return NextResponse.json({ 
      error: 'Failed to delete tier', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}