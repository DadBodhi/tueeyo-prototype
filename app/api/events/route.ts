import { prisma } from '@/app/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(events)
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