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
        const response = await fetch(`/api/events/${params.id}`)
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

  // Helper function to format date and time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <main className="min-h-screen bg-[--warm-off-white]">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Back button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 text-[--deep-rose] hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10.813 19.055a.75.75 0 0 1 0-1.06l5.438-5.438H3a.75.75 0 0 1 0-1.5h13.25l-5.438-5.438a.75.75 0 0 1 1.06-1.06l6.75 6.75a.75.75 0 0 1 0 1.06l-6.75 6.75a.75.75 0 0 1-1.06 0z" />
          </svg>
          <span className="text-sm font-medium uppercase tracking-wider">Back to events</span>
        </button>

        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-xl shadow-sm mb-8">
          <div className="w-full aspect-[16/7] bg-[--deep-rose]"></div>
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex flex-wrap gap-2 mb-4">
              {event.event_type && (
                <span className="bg-[--deep-rose]/90 text-white px-3 py-1 rounded-full text-xs uppercase font-medium">
                  {event.event_type.charAt(0).toUpperCase() + event.event_type.slice(1)}
                </span>
              )}
              {event.level && (
                <span className="bg-white/90 text-[--deep-rose] px-3 py-1 rounded-full text-xs uppercase font-medium">
                  {event.level.name}
                </span>
              )}
            </div>
            <h1 className="font-headline-lg text-white mb-2">{event.title}</h1>
            <p className="text-white/90 font-body-md flex items-center gap-4">
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 0 0-1 1v1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1V3a1 1 0 1 0-2 0v1H7V3a1 1 0 0 0-1-1Zm0 5a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H6Zm0 4a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H6Z" clipRule="evenodd" />
                </svg>
                {formatDate(event.start_datetime)} • {formatTime(event.start_datetime)}
              </span>
              {event.venue && (
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M11.54 22.055a.75.75 0 0 1-1.08 0L6.3 19.286l-1.55 1.55a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l3.5 3.5a.75.75 0 0 1 0 1.06ZM18.25 9.75a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75Zm-3.75 2.25a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75Zm3.75-2.25a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75Zm-3.75 2.25a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75ZM3 12a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm3-4.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 7.5Zm3 9a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Zm3-4.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                  </svg>
                  {event.venue.name}{event.venue.city ? `, ${event.venue.city}` : ''}
                </span>
              )}
            </p>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-[--surface-dim]/20 mb-8">
          <h2 className="font-headline-md text-[--deep-rose] mb-4">About this Event</h2>
          {event.description ? (
            <p className="text-[--text-secondary] leading-relaxed">
              {event.description}
            </p>
          ) : (
            <p className="text-[--text-secondary] leading-relaxed">
              No description available for this event.
            </p>
          )}
        </section>

        {/* Schedule Section */}
        {event.children && event.children.length > 0 && (
          <section>
            <h2 className="font-headline-md text-[--text-on-surface] mb-6">Schedule</h2>
            <div className="flex flex-col gap-4">
              {event.children.map((child: any) => (
                <div 
                  key={child.id} 
                  className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[--deep-rose] flex items-start justify-between group hover:shadow-md transition-all"
                >
                  <div className="flex gap-6 items-start">
                    <div className="text-center min-w-[80px]">
                      <p className="font-headline-md text-[--deep-rose]">{formatTime(child.start_datetime)}</p>
                      <p className="text-xs text-[--text-secondary] uppercase">{formatDate(child.start_datetime)}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {child.event_type && (
                          <span className="text-[10px] font-bold tracking-widest uppercase bg-[--deep-rose]/10 text-[--deep-rose] px-2 py-0.5 rounded">
                            {child.event_type.charAt(0).toUpperCase() + child.event_type.slice(1)}
                          </span>
                        )}
                        <h3 className="font-headline-md !text-lg text-[--text-on-surface]">{child.title}</h3>
                      </div>
                      <p className="text-[--text-secondary]">
                        {child.event_type === 'class' && child.teacher ? `Teacher: ${child.teacher}` : 
                         (child.event_type === 'social' && (child.dj || child.band) ? 
                          `${child.dj ? `DJ: ${child.dj}` : ''}${child.band ? `Band: ${child.band}` : ''}` : 
                          '')}
                      </p>
                      {child.styles && child.styles.length > 0 && (
                        <p className="text-[--text-secondary] text-sm mt-1">
                          Styles: {child.styles.map((s: any) => s.style.name).join(', ')}
                        </p>
                      )}
                      {child.level && (
                        <p className="text-[--text-secondary] text-sm mt-1">
                          Level: {child.level.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[--surface-dim] group-hover:text-[--deep-rose] transition-colors cursor-pointer" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12.53 16.72a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0Zm-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" />
                  </svg>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}