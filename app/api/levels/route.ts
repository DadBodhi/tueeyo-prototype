import { prisma } from '@/app/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const levels = await prisma.level.findMany({
      orderBy: { 
        name: 'asc' 
      }
    })
    
    return NextResponse.json(levels)
  } catch (error) {
    console.error('Error fetching levels:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch levels',
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
        name: body.name
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