'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')

  // Mock data to match the reference design
  const events = [
    {
      id: "1",
      title: "Monday Salsa Beginners",
      start_datetime: new Date("2023-10-14T19:00:00"),
      venue: {
        name: "Salsa Soul",
        city: "Leeds"
      },
      styles: [
        { style: { name: "Salsa" } },
        { style: { name: "Beginner" } }
      ],
      level: { name: "Beginner" },
      description: "Learn the basics of salsa dancing with our beginner-friendly class.",
      schedule: [
        {
          id: "1-1",
          title: "Beginners Class",
          start_time: "19:00",
          instructor: "Maria Garcia",
          level: "Beginner"
        },
        {
          id: "1-2",
          title: "Improvers Class",
          start_time: "20:00",
          instructor: "Maria Garcia",
          level: "Improver"
        },
        {
          id: "1-3",
          title: "Social Dancing",
          start_time: "21:00",
          instructor: "DJ sets all night",
          level: "All Levels"
        }
      ]
    },
    {
      id: "2",
      title: "Bachata Wednesday",
      start_datetime: new Date("2023-10-16T19:30:00"),
      venue: {
        name: "Dance Fusion",
        city: "Leeds"
      },
      styles: [
        { style: { name: "Bachata" } },
        { style: { name: "All Levels" } }
      ],
      level: { name: "All Levels" },
      description: "Learn the fundamentals of bachata dancing.",
      schedule: [
        {
          id: "2-1",
          title: "Bachata Foundations",
          start_time: "19:30",
          instructor: "Carlos Ruiz",
          level: "Beginner"
        },
        {
          id: "2-2",
          title: "Social Floor",
          start_time: "20:30",
          instructor: "Open dancing",
          level: "All Levels"
        }
      ]
    }
  ]

  // Handle view mode change
  const handleViewChange = (mode: 'list' | 'grid') => {
    setViewMode(mode)
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* Top Nav */}
      <header className="bg-surface/80 backdrop-blur-md shadow-sm fixed top-0 w-full z-50 h-20 flex items-center">
        <div className="flex justify-between items-center w-full px-margin-desktop max-w-container-max mx-auto">
          <div className="flex items-center gap-8">
            <a className="text-headline-md font-headline-md text-primary tracking-tight" href="#">Tueeyo</a>
            <nav className="hidden md:flex items-center gap-8">
              <a className="font-label-md text-label-md text-secondary hover:text-primary transition-colors" href="/">Home</a>
              <a className="font-label-md text-label-md text-primary font-bold border-b-2 border-primary pb-1" href="#">Events</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/events/create" 
              className="flex items-center gap-2 bg-white border border-outline-variant px-5 py-2 rounded-full font-label-md text-secondary hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Create Event
            </Link>
            <button className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-md hover:opacity-90 transition-opacity">Login</button>
          </div>
        </div>
      </header>

      <div className="pt-32 pb-24 px-margin-desktop max-w-container-max mx-auto">
        {/* Page Header */}
        <section className="mb-stack-lg flex flex-col md:flex-row md:items-end justify-between gap-stack-md">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Dance Events</h1>
            <p className="text-body-md text-secondary">Discover socials, workshops, and classes in your area.</p>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="bg-surface-container-lowest p-stack-md rounded-2xl shadow-sm mb-stack-lg flex flex-wrap gap-4 items-center border border-outline-variant/30">
          <div className="flex-1 min-w-[160px]">
            <label className="block text-label-sm text-secondary mb-1 ml-1">City</label>
            <select className="w-full bg-cream border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary text-body-md py-2 px-3">
              <option>All Cities</option>
              <option>Leeds</option>
              <option>Manchester</option>
              <option>London</option>
            </select>
          </div>
          <div className="flex-1 min-w-[160px]">
            <label className="block text-label-sm text-secondary mb-1 ml-1">Style</label>
            <select className="w-full bg-cream border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary text-body-md py-2 px-3">
              <option>All Styles</option>
              <option>Salsa</option>
              <option>Bachata</option>
              <option>Kizomba</option>
            </select>
          </div>
          <div className="flex-1 min-w-[160px]">
            <label className="block text-label-sm text-secondary mb-1 ml-1">Level</label>
            <select className="w-full bg-cream border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary text-body-md py-2 px-3">
              <option>All Levels</option>
              <option>Beginner</option>
              <option>Improver</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          {/* View Toggle */}
          <div className="flex items-end self-end pt-5">
            <div className="inline-flex bg-surface-container rounded-full p-1 shadow-sm">
              <button 
                onClick={() => handleViewChange('list')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-label-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-secondary hover:text-primary'}`}
              >
                <span className="material-symbols-outlined text-[18px]">view_list</span>
                List
              </button>
              <button 
                onClick={() => handleViewChange('grid')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-label-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-secondary hover:text-primary'}`}
              >
                <span className="material-symbols-outlined text-[18px]">grid_view</span>
                Grid
              </button>
            </div>
          </div>
        </section>

        {/* LIST VIEW */}
        {viewMode === 'list' ? (
          <div id="list-view" className="flex flex-col gap-6">
            {events.map((event) => (
              <article key={event.id} className="glass-card rounded-xl overflow-hidden border border-surface-container-high">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/3 p-stack-md bg-surface-container-low border-b lg:border-b-0 lg:border-r border-outline-variant">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-primary font-bold text-label-md">{event.start_datetime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-on-surface mb-2 leading-tight">{event.title}</h3>
                    <div className="flex items-center gap-2 text-secondary mb-4">
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                      <span className="text-label-md">{event.venue?.name || 'Unknown Venue'}{event.venue?.city ? `, ${event.venue.city}` : ''}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {event.styles && event.styles.length > 0 && (
                        event.styles.map((s) => (
                          <span key={s.style.name} className="text-label-sm bg-surface-container px-2 py-1 rounded">{s.style.name}</span>
                        ))
                      )}
                      {event.level && (
                        <span className="text-label-sm bg-surface-container px-2 py-1 rounded">{event.level.name}</span>
                      )}
                    </div>
                  </div>
                  <div className="lg:w-2/3 p-stack-md">
                    <h4 className="text-label-md text-secondary uppercase tracking-widest mb-4">Schedule</h4>
                    <div className="flex flex-col gap-1">
                      {event.schedule.map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-low transition-colors group">
                          <div className="flex items-center gap-6">
                            <div className="w-16 text-label-md font-bold text-primary">{session.start_time}</div>
                            <div>
                              <div className="font-label-md text-on-surface group-hover:text-primary transition-colors">{session.title}</div>
                              <div className="text-label-sm text-secondary">{session.instructor}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-label-sm px-2 py-0.5 border border-outline-variant rounded text-secondary">{session.level}</span>
                            <button className="material-symbols-outlined text-secondary hover:text-primary">arrow_forward</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          // GRID VIEW
          <div id="grid-view" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <article key={event.id} className="group bg-surface-container-lowest rounded-2xl overflow-hidden flex flex-col border border-outline-variant/20 border-l-4 border-l-primary shadow-[0_4px_20px_rgba(26,26,26,0.05)] hover:-translate-y-2 transition-all duration-300">
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <h2 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors mb-2 leading-tight">{event.title}</h2>
                    <div className="flex items-center gap-1.5 text-secondary text-label-md mb-1">
                      <span className="material-symbols-outlined text-base">location_on</span>
                      <span>{event.venue?.name || 'Unknown Venue'}{event.venue?.city ? `, ${event.venue.city}` : ''}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-secondary text-label-md">
                      <span className="material-symbols-outlined text-base">calendar_today</span>
                      <span>{event.start_datetime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} • From £8</span>
                    </div>
                  </div>
                  <div className="space-y-3 mt-auto">
                    {event.schedule.map((session) => (
                      <div key={session.id} className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-label-md text-label-md text-on-surface">{session.title}</h4>
                          <span className="font-label-sm text-label-sm text-primary font-bold">{session.start_time}</span>
                        </div>
                        <div className="flex gap-2">
                          {event.styles && event.styles.length > 0 && (
                            event.styles.map((s) => (
                              <span key={s.style.name} className="px-2 py-0.5 bg-white border border-outline-variant/50 rounded-md font-label-sm text-label-sm text-secondary">{s.style.name}</span>
                            ))
                          )}
                          {event.level && (
                            <span className="px-2 py-0.5 bg-white border border-outline-variant/50 rounded-md font-label-sm text-label-sm text-secondary">{session.level}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load More */}
        <div className="mt-stack-lg flex justify-center">
          <button className="group flex items-center gap-3 text-primary font-label-md hover:opacity-80 transition-opacity">
            Load more events
            <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">keyboard_double_arrow_down</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-secondary-container">
        <div className="w-full py-stack-lg px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-stack-md">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <span className="text-headline-md font-headline-md text-primary">Tueeyo</span>
            <p className="font-label-md text-label-md text-secondary">© 2024 Tueeyo. All rights reserved.</p>
          </div>
          <div className="flex gap-8">
            <a className="font-label-md text-label-md text-secondary hover:text-primary transition-colors" href="#">About</a>
            <a className="font-label-md text-label-md text-secondary hover:text-primary transition-colors" href="#">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </main>
  )
}