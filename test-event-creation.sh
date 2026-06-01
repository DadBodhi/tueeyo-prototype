#!/bin/bash

# Simple test script for event creation
echo "Testing event creation via API..."

# Start the dev server in background and wait a moment
npx next dev > /tmp/server.log 2>&1 &
SERVER_PID=$!
sleep 3

# Try to create an event with minimal data
echo "Creating test event..."
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Event",
    "city": "London",
    "event_type": "activity",
    "start_datetime": "2026-06-15T10:00:00Z",
    "end_datetime": "2026-06-15T12:00:00Z"
  }' \
  -v

# Kill the server
kill $SERVER_PID 2>/dev/null || true