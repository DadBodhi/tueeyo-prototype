'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateEventForm() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [eventType, setEventType] = useState('workshop')
  const [startDate, setStartDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endDate, setEndDate] = useState('')
  const [endTime, setEndTime] = useState('')
  const [duration, setDuration] = useState('')
  const [style, setStyle] = useState('')
  const [level, setLevel] = useState('')
  const [venue, setVenue] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    // Debug log to see what dates are being sent
    console.log('Form submission - Dates:', { startDate, endDate, startTime, endTime })
    
    // Combine date and time for datetime fields
    const startDateTime = `${startDate}T${startTime}:00`
    const endDateTime = `${endDate}T${endTime}:00`
    
    console.log('Combined datetime strings:', { startDateTime, endDateTime })
    
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, 
          event_type: eventType,
          start_datetime: startDateTime,
          end_datetime: endDateTime,
          duration_minutes: duration ? parseInt(duration) : null,
          style: style || null,
          level: level || null,
          venue: venue || null
        })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      // Clear form only on success
      setTitle('')
      setCity('')
      setEventType('workshop')
      setStartDate('')
      setStartTime('')
      setEndDate('')
      setEndTime('')
      setDuration('')
      setStyle('')
      setLevel('')
      setVenue('')
      router.refresh()
    } catch (error) {
      console.error('Error creating event:', error)
      // Don't clear form on error - let user fix it
      alert('Failed to create event. Please check the console for details.')
    }
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Event Type</label>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="workshop">Workshop</option>
            <option value="class">Class</option>
            <option value="showcase">Showcase</option>
            <option value="social">Social</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
          <input
            type="number"
            placeholder="Duration in minutes"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Style</label>
          <input
            type="text"
            placeholder="Style (e.g. Jazz, Ballet)"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Level</label>
          <input
            type="text"
            placeholder="Level (e.g. Beginner, Intermediate)"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Venue</label>
          <input
            type="text"
            placeholder="Venue name"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>
      
      <button
        type="submit"
        className="bg-rose-800 text-white px-4 py-2 rounded hover:bg-rose-900"
      >
        Add Event
      </button>
    </form>
  )
}