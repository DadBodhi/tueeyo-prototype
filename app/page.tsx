import { prisma } from '@/app/lib/db'
import CreateEventForm from '@/app/ui/create-event-form'

export default async function Home() {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Tueeyo Events</h1>
      <CreateEventForm />
      {events.length === 0 ? (
        <p className="text-gray-500">No events yet.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-600">{event.city}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}