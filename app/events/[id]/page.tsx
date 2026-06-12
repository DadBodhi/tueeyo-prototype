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
    return <div className="min-h-screen bg-rose-50 max-w-2xl mx-auto p-8 text-slate-600">Loading...</div>
  }

  if (!event) {
    return <div className="min-h-screen bg-rose-50 max-w-2xl mx-auto p-8 text-slate-600">Event not found</div>
  }

  return (
    <main className="min-h-screen bg-rose-50">
      <div className="max-w-2xl mx-auto p-8">
        <button 
          onClick={() => router.back()}
          className="mb-4 text-rose-800 hover:underline"
        >
          ← Back to events
        </button>
      
        <h1 className="text-3xl font-bold mb-4 text-rose-900">{event.title}</h1>
        
        <div className="bg-white border border-rose-200 p-6 rounded shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-slate-600 mb-2">Location: {event.venue?.name || 'Unknown Location'}</p>
              <p className="text-slate-600 mb-2">Type: {event.event_type}</p>
              {event.style && (
                <p className="text-slate-600 mb-2">Style: {event.style.name}</p>
              )}
              {event.level && (
                <p className="text-slate-600 mb-2">Level: {event.level.name}</p>
              )}
            </div>
            <div>
              <p className="text-slate-600 mb-2">
                Date: {new Date(event.start_datetime).toLocaleDateString()}
              </p>
              <p className="text-slate-600 mb-2">
                Time: {new Date(event.start_datetime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                {new Date(event.end_datetime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
              {event.duration_minutes && (
                <p className="text-slate-600 mb-2">Duration: {event.duration_minutes} minutes</p>
              )}
              {event.venue && (
                <p className="text-slate-600 mb-2">Venue: {event.venue.name}</p>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-slate-400 text-sm">Created: {new Date(event.createdAt).toLocaleDateString()}</p>
      </div>
    </main>
  )
}