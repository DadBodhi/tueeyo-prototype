import { prisma } from '@/app/lib/db'
import Link from 'next/link'

export default async function Home({
  searchParams
}: {
  searchParams?: {
    city?: string
    style?: string
    level?: string
  }
}) {
  // Get filter parameters from URL
  const cityFilter = searchParams?.city || ''
  const styleFilter = searchParams?.style || ''
  const levelFilter = searchParams?.level || ''

  // Build the where clause for the Prisma query
  const whereClause: any = {}
  
  if (cityFilter) {
    whereClause.venue = {
      city: cityFilter
    }
  }
  
  if (styleFilter) {
    whereClause.styles = {
      some: {
        style: {
          name: styleFilter
        }
      }
    }
  }
  
  if (levelFilter) {
    whereClause.level = {
      name: levelFilter
    }
  }

  const events = await prisma.event.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
    include: {
      styles: {
        include: {
          style: true
        }
      },
      level: true,
      venue: true
    }
  })

  // Get unique cities for filter dropdown - use groupBy to avoid null issues
  const cities = await prisma.venue.groupBy({
    by: ['city'],
    where: {
      city: {
        not: null,
        not: ''
      }
    },
    _count: {
      city: true
    }
  })
  
  // Get unique styles for filter dropdown
  const styles = await prisma.style.findMany({
    select: {
      name: true
    }
  })
  
  // Get unique levels for filter dropdown
  const levels = await prisma.level.findMany({
    select: {
      name: true
    }
  })

  return (
    <main className="min-h-screen bg-rose-50">
      <div className="max-w-2xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-rose-900">Tueeyo Events</h1>
          <Link 
            href="/events/create" 
            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Create Event
          </Link>
        </div>
        
        <svg viewBox="0 0 800 40" className="w-full mb-8" preserveAspectRatio="none">
          <path
            d="M0,20 C100,0 200,40 300,20 C400,0 500,40 600,20 C700,0 800,40 800,20"
            fill="none"
            stroke="#9f1239"
            strokeWidth="2.5"
          />
        </svg>
        
        {/* Filter options */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-rose-900 mb-3">Filter Events</h2>
          <form action="/" method="GET" className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
              <select 
                name="city" 
                defaultValue={cityFilter}
                className="w-full p-2 border border-slate-300 rounded"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city.city} value={city.city}>
                    {city.city}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Style</label>
              <select 
                name="style" 
                defaultValue={styleFilter}
                className="w-full p-2 border border-slate-300 rounded"
              >
                <option value="">All Styles</option>
                {styles.map((style) => (
                  <option key={style.name} value={style.name}>
                    {style.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Level</label>
              <select 
                name="level" 
                defaultValue={levelFilter}
                className="w-full p-2 border border-slate-300 rounded"
              >
                <option value="">All Levels</option>
                {levels.map((level) => (
                  <option key={level.name} value={level.name}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-3 flex justify-end">
              <button 
                type="submit" 
                className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </form>
        </div>

        {events.length === 0 ? (
          <p className="text-slate-500">No events found matching your criteria.</p>
        ) : (
          <ul className="space-y-4">
            {events.map((event) => (
              <li key={event.id} className="bg-white border border-rose-200 p-4 rounded shadow-sm">
                <Link href={`/events/${event.id}`} className="block">
                  <h2 className="text-xl font-semibold text-rose-900 hover:text-rose-700">{event.title}</h2>
                  <p className="text-slate-600">{event.venue?.name || 'Unknown Location'}{event.venue?.city ? `, ${event.venue.city}` : ''}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {event.event_type && (
                      <span className="bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded">
                        {event.event_type}
                      </span>
                    )}
                    {event.styles[0]?.style && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {event.styles[0]?.style.name}
                      </span>
                    )}
                    {event.level && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        {event.level.name}
                      </span>
                    )}
                    {event.venue && (
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                        {event.venue.name}{event.venue.city ? ` (${event.venue.city})` : ''}
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