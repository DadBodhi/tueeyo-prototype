import { prisma } from '@/app/lib/db'
import CreateEventForm from '@/app/ui/create-event-form'
import Link from 'next/link'

export default async function Home({ searchParams }: { searchParams: { city?: string } }) {
  const cityFilter = searchParams.city || ''
  
  let events
  if (cityFilter) {
    events = await prisma.event.findMany({
      where: {
        city: {
          contains: cityFilter,
          mode: 'insensitive'
        }
      },
      orderBy: { createdAt: 'desc' }
    })
  } else {
    events = await prisma.event.findMany({
      orderBy: { createdAt: 'desc' }
    })
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Tueeyo Events</h1>
      
      {/* Filter form - using server-side rendering */}
      <form action="/" method="GET" className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            name="city"
            placeholder="Filter by city..."
            defaultValue={cityFilter}
            className="border p-2 rounded flex-grow"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Filter
          </button>
          {cityFilter && (
            <a 
              href="/" 
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Clear
            </a>
          )}
        </div>
      </form>
      
      <CreateEventForm />
      {events.length === 0 ? (
        <p className="text-gray-500">No events yet.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="border p-4 rounded">
              <Link href={`/events/${event.id}`} className="block">
                <h2 className="text-xl font-semibold hover:text-blue-600">{event.title}</h2>
                <p className="text-gray-600">{event.city}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}