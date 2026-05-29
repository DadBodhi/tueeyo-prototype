'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateEventForm() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [city, setCity] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, city })
    })
    setTitle('')
    setCity('')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-4">
      <input
        type="text"
        placeholder="Event title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Event
      </button>
    </form>
  )
}