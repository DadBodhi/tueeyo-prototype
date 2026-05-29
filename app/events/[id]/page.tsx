'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchEvent() {
      try {
        // Use the correct API endpoint that matches our server route
        const response = await fetch(`/api/events?id=${params.id}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const eventData = await response.json()
        setEvent(eventData)
      } catch (error) {
        console.error('Error fetching event:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [params.id])

  if (loading) {
    return <div className="max-w-2xl mx-auto p-8">Loading...</div>
  }

  if (!event) {
    return <div className="max-w-2xl mx-auto p-8">Event not found</div>
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <button 
        onClick={() => router.back()}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back to events
      </button>
      
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-600 mb-6">Location: {event.city}</p>
      <p className="text-gray-500 text-sm">Created: {new Date(event.createdAt).toLocaleDateString()}</p>
    </main>
  )
}