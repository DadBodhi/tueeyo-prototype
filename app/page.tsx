import { prisma } from '@/app/lib/db'
import CreateEventForm from '@/app/ui/create-event-form'
import Link from 'next/link'

export default async function Home({ searchParams }: { searchParams: { city?: string } }) {
  const cityFilter = searchParams.city || ''

  const cities = await prisma.event.findMany({
    select: { city: true },
    distinct: ['city'],
    orderBy: { city: 'asc' }
  })

  let events
  if (cityFilter) {
    events = await prisma.event.findMany({
      where: {
        city: {
          contains: cityFilter,
          mode: 'insensitive'
        }
      },
      orderBy: { createdAt: 'desc' },
      include: {
        style: true,
        level: true,
        venue: true
      }
    })
  } else {
    events = await prisma.event.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        style: true,
        level: true,
        venue: true
      }
    })
  }

  // app/page.tsx - just the return, rest stays the same
  return (
    <main className="min-h-screen bg-rose-50">
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-rose-900">Tueeyo Events</h1>
        <svg viewBox="0 0 800 40" className="w-full mb-8" preserveAspectRatio="none">
          <path
            d="M0,20 C100,0 200,40 300,20 C400,0 500,40 600,20 C700,0 800,40 800,20"
            fill="none"
            stroke="#9f1239"
            strokeWidth="2.5"
          />
        </svg>
        <form action="/" method="GET" className="mb-6">
          <div className="flex gap-2">
            <select
              name="city"
              defaultValue={cityFilter}
              className="border border-rose-200 p-2 rounded flex-grow text-slate-700 bg-white"
            >
              <option value="">All cities</option>
              {cities.map((c) => (
               <option key={c.city} value={c.city}>{c.city}</option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-rose-800 text-white px-4 py-2 rounded hover:bg-rose-900"
            >
              Filter
            </button>
            {cityFilter && (
              <a href="/" className="bg-rose-200 text-rose-900 px-4 py-2 rounded hover:bg-rose-300">
                Clear
              </a>
            )}
          </div>
        </form>
      
        <CreateEventForm />
        {events.length === 0 ? (
          <p className="text-slate-500">No events yet.</p>
        ) : (
          <ul className="space-y-4">
            {events.map((event) => (
              <li key={event.id} className="bg-white border border-rose-200 p-4 rounded shadow-sm">
                <Link href={`/events/${event.id}`} className="block">
                  <h2 className="text-xl font-semibold text-rose-900 hover:text-rose-700">{event.title}</h2>
                  <p className="text-slate-600">{event.city}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {event.event_type && (
                      <span className="bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded">
                        {event.event_type}
                      </span>
                    )}
                    {event.style && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {event.style.name}
                      </span>
                    )}
                    {event.level && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        {event.level.name}
                      </span>
                    )}
                    {event.venue && (
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                        {event.venue.name}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}