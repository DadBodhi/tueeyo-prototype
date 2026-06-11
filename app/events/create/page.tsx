'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Types
type Recurrence = {
  frequency: string
  day_of_week: number
  end_date: string | null
  occurrence_count: number | null
}

type ChildEvent = {
  event_type: 'class' | 'social'
  style_id?: string
  style_ids?: string[]
  level_id?: string
  teacher?: string | null
  dj?: string | null
  band?: string | null
  start_time: string
  end_time: string
  cost?: number | null
  description?: string | null
}

type Venue = {
  id: string
  name: string
  city: string
}

type Style = {
  id: string
  name: string
}

type Level = {
  id: string
  name: string
}

type EventResponse = {
  id: string
  title: string
  description: string | null
  venue_id: string
  status: 'draft' | 'published'
  start_datetime: string
  recurrence?: Recurrence | null
  children?: ChildEvent[]
}

export default function CreateEventPage() {
  const router = useRouter()
  
  // Parent form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [venue, setVenue] = useState('')
  const [venueId, setVenueId] = useState('')
  const [venueCity, setVenueCity] = useState('') // Add venue city state
  const [startDate, setStartDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [isRecurring, setIsRecurring] = useState(false)
  const [recurrence, setRecurrence] = useState<Recurrence>({
    frequency: 'weekly',
    day_of_week: 1,
    end_date: null,
    occurrence_count: null
  })
  
  // Child events state
  const [children, setChildren] = useState<ChildEvent[]>([])
  const [showClassForm, setShowClassForm] = useState(false)
  const [showSocialForm, setShowSocialForm] = useState(false)
  
  // Class form state
  const [classStyle, setClassStyle] = useState('')
  const [classStyleId, setClassStyleId] = useState('')
  const [classLevel, setClassLevel] = useState('')
  const [classLevelId, setClassLevelId] = useState('')
  const [teacher, setTeacher] = useState('')
  const [classStartTime, setClassStartTime] = useState('')
  const [classEndTime, setClassEndTime] = useState('')
  const [classCost, setClassCost] = useState('')
  const [classDescription, setClassDescription] = useState('')
  
  // Social form state
  const [socialStyles, setSocialStyles] = useState<string[]>([])
  const [socialStyleIds, setSocialStyleIds] = useState<string[]>([])
  const [dj, setDj] = useState('')
  const [band, setBand] = useState('')
  const [socialStartTime, setSocialStartTime] = useState('')
  const [socialEndTime, setSocialEndTime] = useState('')
  const [socialCost, setSocialCost] = useState('')
  const [socialDescription, setSocialDescription] = useState('')
  
  // Search and add new venue state
  const [searchTerm, setSearchTerm] = useState('')
  const [venues, setVenues] = useState<Venue[]>([])
  const [showAddVenue, setShowAddVenue] = useState(false)
  const [newVenueName, setNewVenueName] = useState('')
  const [newVenueCity, setNewVenueCity] = useState('')
  const [newVenueAddress, setNewVenueAddress] = useState('')
  const [newVenuePostcode, setNewVenuePostcode] = useState('')
  const [newVenueLat, setNewVenueLat] = useState('')
  const [newVenueLng, setNewVenueLng] = useState('')
  
  // Styles and levels for child events
  const [styles, setStyles] = useState<Style[]>([])
  const [levels, setLevels] = useState<Level[]>([])
  const [searchStylesTerm, setSearchStylesTerm] = useState('')
  const [searchLevelsTerm, setSearchLevelsTerm] = useState('')
  
  // Loading states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [parentEventId, setParentEventId] = useState<string | null>(null)

  // Fetch venues based on search term
  useEffect(() => {
    if (searchTerm.length > 0) {
      const fetchVenues = async () => {
        try {
          const response = await fetch(`/api/venues?name=${encodeURIComponent(searchTerm)}`)
          const data = await response.json()
          setVenues(data)
        } catch (error) {
          console.error('Error fetching venues:', error)
        }
      }
      
      const debounceTimer = setTimeout(() => {
        fetchVenues()
      }, 300)
      
      return () => clearTimeout(debounceTimer)
    } else {
      setVenues([])
    }
  }, [searchTerm])

  // Fetch styles based on search term
  useEffect(() => {
    if (searchStylesTerm.length > 0) {
      const fetchStyles = async () => {
        try {
          const response = await fetch(`/api/styles?name=${encodeURIComponent(searchStylesTerm)}`)
          const data = await response.json()
          setStyles(data)
        } catch (error) {
          console.error('Error fetching styles:', error)
        }
      }
      
      const debounceTimer = setTimeout(() => {
        fetchStyles()
      }, 300)
      
      return () => clearTimeout(debounceTimer)
    } else {
      setStyles([])
    }
  }, [searchStylesTerm])

  // Fetch levels
  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await fetch('/api/levels')
        const data = await response.json()
        setLevels(data)
      } catch (error) {
        console.error('Error fetching levels:', error)
      }
    }
    
    fetchLevels()
  }, [])

  // Handle venue selection
  const handleVenueSelect = (venueName: string, venueId: string, venueCity?: string) => {
    setVenue(venueName)
    setVenueId(venueId)
    setShowAddVenue(false)
    setVenueCity(venueCity || 'London')
  }

  // Create new venue
  const handleCreateVenue = async () => {
    if (!newVenueName || !newVenueCity || !newVenueAddress) {
      alert('Please fill in all required fields (name, city, and address)')
      return
    }

    try {
      const response = await fetch('/api/venues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newVenueName,
          city: newVenueCity,
          address: newVenueAddress,
          postcode: newVenuePostcode || null,
          lat: newVenueLat ? parseFloat(newVenueLat) : null,
          lng: newVenueLng ? parseFloat(newVenueLng) : null
        })
      })

      if (response.ok) {
        const createdVenue = await response.json()
        handleVenueSelect(createdVenue.name, createdVenue.id)
        setShowAddVenue(false)
        setNewVenueName('')
        setNewVenueCity('')
        setNewVenueAddress('')
        setNewVenuePostcode('')
        setNewVenueLat('')
        setNewVenueLng('')
      }
    } catch (error) {
      console.error('Error creating venue:', error)
      alert('Failed to create venue. Please try again.')
    }
  }

  // Create new style
  const handleCreateStyle = async (styleName: string) => {
    if (!styleName) return
    
    try {
      const response = await fetch('/api/styles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: styleName
        })
      })
      
      if (response.ok) {
        const createdStyle = await response.json()
        // Update the class style selection with the new style
        setClassStyleId(createdStyle.id)
        setClassStyle(styleName)
        
        // Also update styles list to include the new style
        setStyles(prev => [...prev, createdStyle])
      }
    } catch (error) {
      console.error('Error creating style:', error)
    }
  }

  // Create new level
  const handleCreateLevel = async (levelName: string) => {
    if (!levelName) return
    
    try {
      const response = await fetch('/api/levels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: levelName
        })
      })
      
      if (response.ok) {
        const createdLevel = await response.json()
        // Update the class level selection with the new level
        setClassLevelId(createdLevel.id)
        setClassLevel(levelName)
        
        // Also update levels list to include the new level
        setLevels(prev => [...prev, createdLevel])
      }
    } catch (error) {
      console.error('Error creating level:', error)
    }
  }

  // Save parent event as draft
  const saveParentEvent = async (): Promise<string | null> => {
    if (!title || !startDate || !startTime) return null
    
    try {
      const startDateTime = `${startDate}T${startTime}:00`
      
      let payload: any = {
        title,
        description,
        venue_id: venueId,
        status: 'draft',
        start_datetime: startDateTime,
        city: venueCity || 'London' // Use venue's city if available, otherwise default to London
      }
      
      // Add recurrence if enabled
      if (isRecurring) {
        const recurrenceData: any = {
          frequency: recurrence.frequency,
          day_of_week: recurrence.day_of_week
        };
        
        if (recurrence.end_date) {
          recurrenceData.end_date = recurrence.end_date;
        }
        
        if (recurrence.occurrence_count !== null && recurrence.occurrence_count !== undefined) {
          recurrenceData.occurrence_count = recurrence.occurrence_count;
        }
        
        payload.recurrence = recurrenceData;
      }
      
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          city: venueCity || 'London' // Use venue's city if available, otherwise default to London
        })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const savedEvent: EventResponse = await response.json()
      setParentEventId(savedEvent.id)
      return savedEvent.id
    } catch (error) {
      console.error('Error saving parent event:', error)
      return null
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Basic validation - check if title, date, time are provided
    if (!title || !startDate || !startTime) {
      alert('Please fill in all required fields: Event Name, Date, and Time')
      setIsSubmitting(false)
      return
    }
    
    // For venue, we need to ensure it's either selected from existing or a new venue is being created
    if (!venueId && !venue) {
      alert('Please select a venue or add a new venue')
      setIsSubmitting(false)
      return
    }
    
    try {
      // First save the parent event if it hasn't been saved yet
      let eventId = parentEventId
      if (!eventId) {
        const result = await saveParentEvent()
        eventId = result || null
        if (!eventId) {
          setIsSubmitting(false)
          return
        }
      }
      
       // If there are children, we need to update the parent with children
       if (children.length > 0) {
        const updatedPayload: any = {
          id: eventId,
          title,
          description,
          venue_id: venueId,
          status: 'published',
          start_datetime: `${startDate}T${startTime}:00`,
          city: venueCity || 'London', // Use venue's city if available, otherwise default to London
          children: children.map(child => ({
            ...child
          }))
        }
         
          // Add recurrence if enabled
          if (isRecurring) {
            const recurrenceData: any = {
              frequency: recurrence.frequency,
              day_of_week: recurrence.day_of_week
            };
            
            if (recurrence.end_date) {
              recurrenceData.end_date = recurrence.end_date;
            }
            
            if (recurrence.occurrence_count !== null && recurrence.occurrence_count !== undefined) {
              recurrenceData.occurrence_count = recurrence.occurrence_count;
            }
            
            updatedPayload.recurrence = recurrenceData;
          }
        
        const response = await fetch(`/api/events/${eventId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedPayload)
        })
        
        if (!response.ok) {
          throw new Error('Failed to update event with children')
        }
      } else {
        // Just publish the parent event
        const response = await fetch(`/api/events/${eventId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: eventId,
            title,
            description,
            venue_id: venueId,
            status: 'published',
            start_datetime: `${startDate}T${startTime}:00`
          })
        })
        
        if (!response.ok) {
          throw new Error('Failed to publish event')
        }
      }
      
      router.push('/events')
    } catch (error) {
      console.error('Error creating event:', error)
      alert('Failed to create event. Please check the console for details.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle adding a class child event
  const handleAddClass = async () => {
    if (!classStyle || !classStartTime || !classEndTime) return
    
    let eventId = parentEventId;
    
    // Save parent event first if needed
    if (!eventId) {
      try {
        const result = await saveParentEvent();
        eventId = result || null;
        if (!eventId) return;
        setParentEventId(eventId);
      } catch (error) {
        console.error('Failed to save parent event:', error);
        alert('Failed to save event. Please try again.');
        return;
      }
    }

    // Add class to children
    const newChild: ChildEvent = {
      event_type: 'class',
      style_id: classStyleId,
      level_id: classLevelId,
      teacher: teacher || null,
      start_time: classStartTime,
      end_time: classEndTime,
      cost: classCost ? Math.round(parseFloat(classCost) * 100) : null, // Convert to pence
      description: classDescription || null
    }
    
    setChildren([...children, newChild])
    setShowClassForm(false)
    
    // Reset form fields
    setClassStyle('')
    setClassStyleId('')
    setClassLevel('')
    setClassLevelId('')
    setTeacher('')
    setClassStartTime('')
    setClassEndTime('')
    setClassCost('')
    setClassDescription('')
  }

  // Handle adding a social child event
  const handleAddSocial = async () => {
    if (!socialStyles.length || !socialStartTime || !socialEndTime) return
    
    let eventId = parentEventId;
    
    // Save parent event first if needed
    if (!eventId) {
      try {
        const result = await saveParentEvent();
        eventId = result || null;
        if (!eventId) return;
        setParentEventId(eventId);
      } catch (error) {
        console.error('Failed to save parent event:', error);
        alert('Failed to save event. Please try again.');
        return;
      }
    }

    // Add social to children
    const newChild: ChildEvent = {
      event_type: 'social',
      style_ids: socialStyleIds,
      dj: dj || null,
      band: band || null,
      start_time: socialStartTime,
      end_time: socialEndTime,
      cost: socialCost ? Math.round(parseFloat(socialCost) * 100) : null, // Convert to pence
      description: socialDescription || null
    }
    
    setChildren([...children, newChild])
    setShowSocialForm(false)
    
    // Reset form fields
    setSocialStyles([])
    setSocialStyleIds([])
    setDj('')
    setBand('')
    setSocialStartTime('')
    setSocialEndTime('')
    setSocialCost('')
    setSocialDescription('')
  }

  return (
    <main className="min-h-screen bg-rose-50">
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-rose-900">New Event</h1>
        
        <svg viewBox="0 0 800 40" className="w-full mb-8" preserveAspectRatio="none">
          <path
            d="M0,20 C100,0 200,40 300,20 C400,0 500,40 600,20 C700,0 800,40 800,20"
            fill="none"
            stroke="#9f1239"
            strokeWidth="2.5"
          />
        </svg>
        
        <div className="bg-white border border-rose-200 p-6 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Name */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1 text-slate-700">Event Name</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1 text-slate-700">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full border p-2 rounded resize-none"
              />
            </div>
            
            {/* Venue */}
            <div>
              <label htmlFor="venue" className="block text-sm font-medium mb-1 text-slate-700">Venue</label>
              <div className="relative">
                <input
                  type="text"
                  id="venue"
                  value={venue}
                  onChange={(e) => {
                    setVenue(e.target.value)
                    setSearchTerm(e.target.value)
                  }}
                  placeholder="Search venues or enter new venue name..."
                  className="w-full border p-2 rounded"
                />
                {searchTerm && (
                  <div className="absolute z-10 w-full bg-white border border-slate-300 mt-1 max-h-40 overflow-y-auto">
                    {venues.length > 0 ? (
                      venues.map((v) => (
                        <div
                          key={v.id}
                          onClick={() => handleVenueSelect(v.name, v.id, v.city)}
                          className="p-2 hover:bg-rose-100 cursor-pointer"
                        >
                          {v.name} ({v.city})
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">No venues found</div>
                    )}
                    <div
                      onClick={() => setShowAddVenue(true)}
                      className="p-2 hover:bg-rose-100 cursor-pointer border-t"
                    >
                      Add new venue
                    </div>
                  </div>
                )}
              </div>
              
              {/* Button to add new venue */}
              <button
                type="button"
                onClick={() => {
                  console.log('Add new venue button clicked');
                  setShowAddVenue(true);
                }}
                className="mt-2 text-sm text-rose-700 hover:text-rose-900"
              >
                + Add new venue
              </button>
            </div>
            
            {/* Start Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium mb-1 text-slate-700">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium mb-1 text-slate-700">Start Time</label>
                <input
                  type="time"
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
            </div>
            
            {/* Recurring Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="recurring"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="recurring" className="text-slate-700">Recurring Event</label>
            </div>
            
            {/* Recurrence Options */}
            {isRecurring && (
              <div className="border border-rose-200 p-4 rounded">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="frequency" className="block text-sm font-medium mb-1 text-slate-700">Frequency</label>
                    <select
                      id="frequency"
                      value={recurrence.frequency}
                      onChange={(e) => setRecurrence({...recurrence, frequency: e.target.value})}
                      className="w-full border p-2 rounded"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="fortnightly">Fortnightly</option>
                      <option value="monthly_by_date">Monthly by Date</option>
                      <option value="monthly_by_day">Monthly by Day (e.g. First Monday)</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                  
                  {recurrence.frequency === 'weekly' && (
                    <div>
                      <label htmlFor="dayOfWeek" className="block text-sm font-medium mb-1 text-slate-700">Day of Week</label>
                      <select
                        id="dayOfWeek"
                        value={recurrence.day_of_week}
                        onChange={(e) => setRecurrence({...recurrence, day_of_week: parseInt(e.target.value)})}
                        className="w-full border p-2 rounded"
                      >
                        <option value={0}>Sunday</option>
                        <option value={1}>Monday</option>
                        <option value={2}>Tuesday</option>
                        <option value={3}>Wednesday</option>
                        <option value={4}>Thursday</option>
                        <option value={5}>Friday</option>
                        <option value={6}>Saturday</option>
                      </select>
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium mb-1 text-slate-700">End Date</label>
                    <input
                      type="date"
                      id="endDate"
                      value={recurrence.end_date}
                      onChange={(e) => setRecurrence({...recurrence, end_date: e.target.value})}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="occurrenceCount" className="block text-sm font-medium mb-1 text-slate-700">Number of Occurrences</label>
                    <input
                      type="number"
                      id="occurrenceCount"
                      value={recurrence.occurrence_count || ''}
                      onChange={(e) => setRecurrence({...recurrence, occurrence_count: e.target.value ? parseInt(e.target.value) : null})}
                      className="w-full border p-2 rounded"
                      min="1"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Add Child Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  setShowClassForm(true)
                  setShowSocialForm(false)
                }}
                className="bg-rose-800 text-white px-4 py-2 rounded hover:bg-rose-900"
              >
                +Add Class
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSocialForm(true)
                  setShowClassForm(false)
                }}
                className="bg-rose-800 text-white px-4 py-2 rounded hover:bg-rose-900"
              >
                +Add Social
              </button>
            </div>
            
            {/* Add new venue form */}
            {showAddVenue && (
              <div className="border border-slate-300 p-4 rounded mt-2">
                <h3 className="text-lg font-medium mb-2 text-slate-700">Add New Venue</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="newVenueName" className="block text-sm font-medium mb-1 text-slate-700">Venue Name *</label>
                    <input
                      type="text"
                      id="newVenueName"
                      value={newVenueName}
                      onChange={(e) => setNewVenueName(e.target.value)}
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="newVenueCity" className="block text-sm font-medium mb-1 text-slate-700">City *</label>
                    <input
                      type="text"
                      id="newVenueCity"
                      value={newVenueCity}
                      onChange={(e) => setNewVenueCity(e.target.value)}
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="newVenueAddress" className="block text-sm font-medium mb-1 text-slate-700">Address *</label>
                    <input
                      type="text"
                      id="newVenueAddress"
                      value={newVenueAddress}
                      onChange={(e) => setNewVenueAddress(e.target.value)}
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="newVenuePostcode" className="block text-sm font-medium mb-1 text-slate-700">Postcode</label>
                    <input
                      type="text"
                      id="newVenuePostcode"
                      value={newVenuePostcode}
                      onChange={(e) => setNewVenuePostcode(e.target.value)}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <div>
                    <label htmlFor="newVenueLat" className="block text-sm font-medium mb-1 text-slate-700">Latitude</label>
                    <input
                      type="number"
                      id="newVenueLat"
                      value={newVenueLat}
                      onChange={(e) => setNewVenueLat(e.target.value)}
                      className="w-full border p-2 rounded"
                      step="any"
                    />
                  </div>
                  <div>
                    <label htmlFor="newVenueLng" className="block text-sm font-medium mb-1 text-slate-700">Longitude</label>
                    <input
                      type="number"
                      id="newVenueLng"
                      value={newVenueLng}
                      onChange={(e) => setNewVenueLng(e.target.value)}
                      className="w-full border p-2 rounded"
                      step="any"
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    type="button"
                    onClick={handleCreateVenue}
                    className="bg-rose-800 text-white px-4 py-2 rounded hover:bg-rose-900"
                  >
                    Create Venue
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddVenue(false)}
                    className="bg-slate-300 text-slate-700 px-4 py-2 rounded hover:bg-slate-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            
            {/* Class Form */}
            {showClassForm && (
              <div className="border border-rose-200 p-4 rounded">
                <h3 className="text-lg font-medium mb-4 text-slate-700">Add Class</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Style */}
                  <div>
                    <label htmlFor="classStyle" className="block text-sm font-medium mb-1 text-slate-700">Style</label>
                    <input
                      type="text"
                      id="classStyle"
                      value={classStyle}
                      onChange={(e) => setClassStyle(e.target.value)}
                      placeholder="Enter style name..."
                      className="w-full border p-2 rounded"
                      required
                    />
                    {classStyle && (
                      <div className="mt-1">
                        <button 
                          type="button" 
                          onClick={() => {
                            // For now we'll just set the ID to match the name
                            const styleId = classStyle.toLowerCase().replace(/\s+/g, '_');
                            setClassStyleId(styleId);
                          }}
                          className="text-rose-700 hover:text-rose-900 text-sm"
                        >
                          Use this style
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Level */}
                  <div>
                    <label htmlFor="classLevel" className="block text-sm font-medium mb-1 text-slate-700">Level</label>
                    <input
                      type="text"
                      id="classLevel"
                      value={classLevel}
                      onChange={(e) => setClassLevel(e.target.value)}
                      placeholder="Enter level name..."
                      className="w-full border p-2 rounded"
                      required
                    />
                    {classLevel && (
                      <div className="mt-1">
                        <button 
                          type="button" 
                          onClick={() => {
                            // For now we'll just set the ID to match the name
                            const levelId = classLevel.toLowerCase().replace(/\s+/g, '_');
                            setClassLevelId(levelId);
                          }}
                          className="text-rose-700 hover:text-rose-900 text-sm"
                        >
                          Use this level
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Teacher */}
                  <div>
                    <label htmlFor="teacher" className="block text-sm font-medium mb-1 text-slate-700">Teacher</label>
                    <input
                      type="text"
                      id="teacher"
                      value={teacher}
                      onChange={(e) => setTeacher(e.target.value)}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  
                  {/* Start Time */}
                  <div>
                    <label htmlFor="classStartTime" className="block text-sm font-medium mb-1 text-slate-700">Start Time</label>
                    <input
                      type="time"
                      id="classStartTime"
                      value={classStartTime}
                      onChange={(e) => setClassStartTime(e.target.value)}
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>
                  
                  {/* End Time */}
                  <div>
                    <label htmlFor="classEndTime" className="block text-sm font-medium mb-1 text-slate-700">End Time</label>
                    <input
                      type="time"
                      id="classEndTime"
                      value={classEndTime}
                      onChange={(e) => setClassEndTime(e.target.value)}
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>
                  
                  {/* Cost */}
                  <div>
                    <label htmlFor="classCost" className="block text-sm font-medium mb-1 text-slate-700">Cost (£)</label>
                    <input
                      type="number"
                      id="classCost"
                      value={classCost}
                      onChange={(e) => setClassCost(e.target.value)}
                      className="w-full border p-2 rounded"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  
                  {/* Description */}
                  <div className="md:col-span-2">
                    <label htmlFor="classDescription" className="block text-sm font-medium mb-1 text-slate-700">Description</label>
                    <textarea
                      id="classDescription"
                      value={classDescription}
                      onChange={(e) => setClassDescription(e.target.value)}
                      rows={2}
                      className="w-full border p-2 rounded resize-none"
                    />
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <button
                    type="button"
                    onClick={handleAddClass}
                    className="bg-rose-800 text-white px-4 py-2 rounded hover:bg-rose-900"
                  >
                    Add Class
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowClassForm(false)}
                    className="bg-slate-300 text-slate-700 px-4 py-2 rounded hover:bg-slate-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            
            {/* Social Form */}
            {showSocialForm && (
              <div className="border border-rose-200 p-4 rounded">
                <h3 className="text-lg font-medium mb-4 text-slate-700">Add Social</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Styles */}
                  <div>
                    <label htmlFor="socialStyles" className="block text-sm font-medium mb-1 text-slate-700">Styles</label>
                    <input
                      type="text"
                      id="socialStyles"
                      value={socialStyles.join(', ')}
                      onChange={(e) => {
                        const styles = e.target.value.split(',').map(s => s.trim()).filter(s => s)
                        setSocialStyles(styles)
                        setSocialStyleIds(styles.map(() => '')) // Placeholder IDs
                      }}
                      placeholder="Search styles (comma separated)..."
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>
                  
                  {/* DJ */}
                  <div>
                    <label htmlFor="dj" className="block text-sm font-medium mb-1 text-slate-700">DJ</label>
                    <input
                      type="text"
                      id="dj"
                      value={dj}
                      onChange={(e) => setDj(e.target.value)}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  
                  {/* Band */}
                  <div>
                    <label htmlFor="band" className="block text-sm font-medium mb-1 text-slate-700">Band</label>
                    <input
                      type="text"
                      id="band"
                      value={band}
                      onChange={(e) => setBand(e.target.value)}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  
                  {/* Start Time */}
                  <div>
                    <label htmlFor="socialStartTime" className="block text-sm font-medium mb-1 text-slate-700">Start Time</label>
                    <input
                      type="time"
                      id="socialStartTime"
                      value={socialStartTime}
                      onChange={(e) => setSocialStartTime(e.target.value)}
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>
                  
                  {/* End Time */}
                  <div>
                    <label htmlFor="socialEndTime" className="block text-sm font-medium mb-1 text-slate-700">End Time</label>
                    <input
                      type="time"
                      id="socialEndTime"
                      value={socialEndTime}
                      onChange={(e) => setSocialEndTime(e.target.value)}
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>
                  
                  {/* Cost */}
                  <div>
                    <label htmlFor="socialCost" className="block text-sm font-medium mb-1 text-slate-700">Cost (£)</label>
                    <input
                      type="number"
                      id="socialCost"
                      value={socialCost}
                      onChange={(e) => setSocialCost(e.target.value)}
                      className="w-full border p-2 rounded"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  
                  {/* Description */}
                  <div className="md:col-span-2">
                    <label htmlFor="socialDescription" className="block text-sm font-medium mb-1 text-slate-700">Description</label>
                    <textarea
                      id="socialDescription"
                      value={socialDescription}
                      onChange={(e) => setSocialDescription(e.target.value)}
                      rows={2}
                      className="w-full border p-2 rounded resize-none"
                    />
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <button
                    type="button"
                    onClick={handleAddSocial}
                    className="bg-rose-800 text-white px-4 py-2 rounded hover:bg-rose-900"
                  >
                    Add Social
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSocialForm(false)}
                    className="bg-slate-300 text-slate-700 px-4 py-2 rounded hover:bg-slate-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            
            {/* Child Events Display */}
            {children.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4 text-slate-700">Child Events</h3>
                <div className="space-y-2">
                  {children.map((child, index) => (
                    <div key={`${child.event_type}-${index}`} className="border border-rose-200 p-3 rounded flex justify-between items-center">
                      <div>
                        <span className="font-medium">
                          {child.event_type === 'class' ? 'Class' : 'Social'}
                        </span>
                        {' - '}
                        {child.start_time} to {child.end_time}
                        {child.event_type === 'class' && (
                          <>
                            {' - '}
                            {child.style_id || 'Style'} | {child.level_id || 'Level'}
                            {child.teacher && ` | ${child.teacher}`}
                          </>
                        )}
                        {child.event_type === 'social' && (
                          <>
                            {' - '}
                            {child.dj && `DJ: ${child.dj}`}
                            {child.band && ` | Band: ${child.band}`}
                          </>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updatedChildren = [...children]
                          updatedChildren.splice(index, 1)
                          setChildren(updatedChildren)
                        }}
                        className="text-rose-700 hover:text-rose-900"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-rose-800 text-white px-4 py-2 rounded hover:bg-rose-900 disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Create Event'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}