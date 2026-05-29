import { prisma } from '@/app/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  if (id) {
    // Get single event by ID
    const event = await prisma.event.findUnique({
      where: { id }
    })
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }
    return NextResponse.json(event)
  } else {
    // Get all events
    const events = await prisma.event.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(events)
  }
}

export async function POST(request: Request) {
  const body = await request.json()
  const event = await prisma.event.create({
    data: {
      title: body.title,
      city: body.city
    }
  })
  return NextResponse.json(event)
}