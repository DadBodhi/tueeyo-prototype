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
    <main className="min-h-screen bg-[--warm-off-white]">
      <div className="max-w-4xl mx-auto p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-[--text-on-surface]">Tueeyo Events</h1>
          <Link 
            href="/events/create" 
            className="btn-primary"
          >
            Create Event
          </Link>
        </div>
        
        <svg viewBox="0 0 800 40" className="w-full mb-8" preserveAspectRatio="none">
          <path
            d="M0,20 C100,0 200,40 300,20 C400,0 500,40 600,20 C700,0 800,40 800,20"
            fill="none"
            stroke="[--deep-rose]"
            strokeWidth="2.5"
          />
        </svg>
        
        {/* Filter options */}
        <div className="mb-8 card">
          <h2 className="text-xl font-semibold text-[--text-on-surface] mb-4">Filter Events</h2>
          <form action="/" method="GET" className="filter-form">
            <div>
              <label className="block text-sm font-medium text-[--text-secondary] mb-1">City</label>
              <select 
                name="city" 
                defaultValue={cityFilter}
                className="form-input"
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
              <label className="block text-sm font-medium text-[--text-secondary] mb-1">Style</label>
              <select 
                name="style" 
                defaultValue={styleFilter}
                className="form-input"
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
              <label className="block text-sm font-medium text-[--text-secondary] mb-1">Level</label>
              <select 
                name="level" 
                defaultValue={levelFilter}
                className="form-input"
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
                className="btn-primary"
              >
                Apply Filters
              </button>
            </div>
          </form>
        </div>

        {events.length === 0 ? (
          <p className="text-[--text-secondary]">No events found matching your criteria.</p>
        ) : (
          <div className="space-y-6">
            {events.map((event) => (
              <div key={event.id} className="card">
                <h2 className="text-xl font-bold text-[--text-on-surface] mb-2">{event.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[--text-secondary] mb-1">Date: {new Date(event.start_datetime).toLocaleDateString()}</p>
                    <p className="text-[--text-secondary] mb-1">Time: {new Date(event.start_datetime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  </div>
                  <div>
                    <p className="text-[--text-secondary] mb-1">Venue: {event.venue?.name || 'Unknown Venue'}</p>
                    {event.styles && event.styles.length > 0 && (
                      <p className="text-[--text-secondary] mb-1">Styles: {event.styles.map(s => s.style.name).join(', ')}</p>
                    )}
                    {event.level && (
                      <p className="text-[--text-secondary] mb-1">Level: {event.level.name}</p>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <a 
                    href={`/events/${event.id}`} 
                    className="[--deep-rose] hover:underline"
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}