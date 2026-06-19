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

  // app/events/[id]/page.tsx - just the return statements
  if (loading) {
    return <div className="min-h-screen bg-[--warm-off-white] max-w-4xl mx-auto p-8 text-[--text-secondary]">Loading...</div>
  }

  if (!event) {
    return <div className="min-h-screen bg-[--warm-off-white] max-w-4xl mx-auto p-8 text-[--text-secondary]">Event not found</div>
  }

  return (
    <main className="min-h-screen bg-[--warm-off-white]">
      <div className="max-w-4xl mx-auto p-6 md:p-8">
        <button 
          onClick={() => router.back()}
          className="mb-6 text-[--deep-rose] hover:underline flex items-center"
        >
          ← Back to events
        </button>
      
        <h1 className="text-3xl font-bold mb-6 text-[--text-on-surface]">{event.title}</h1>
        
        <div className="bg-white border border-rose-200 p-6 rounded-lg shadow-card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-[--text-secondary] mb-3">Location: {event.venue?.name || 'Unknown Location'}</p>
              <p className="text-[--text-secondary] mb-3">Type: {event.event_type}</p>
              {event.style && (
                <p className="text-[--text-secondary] mb-3">Style: {event.style.name}</p>
              )}
              {event.level && (
                <p className="text-[--text-secondary] mb-3">Level: {event.level.name}</p>
              )}
            </div>
            <div>
              <p className="text-[--text-secondary] mb-3">
                Date: {new Date(event.start_datetime).toLocaleDateString()}
              </p>
              <p className="text-[--text-secondary] mb-3">
                Time: {new Date(event.start_datetime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                {new Date(event.end_datetime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
              {event.duration_minutes && (
                <p className="text-[--text-secondary] mb-3">Duration: {event.duration_minutes} minutes</p>
              )}
              {event.venue && (
                <p className="text-[--text-secondary] mb-3">Venue: {event.venue.name}</p>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-[--text-secondary] text-sm">Created: {new Date(event.createdAt).toLocaleDateString()}</p>
      </div>
    </main>
  )
}