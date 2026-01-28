#!/bin/bash

# Start script for personal website development servers and services

echo "🚀 Starting all development servers and services..."

# Start Next.js dev server
echo "Starting Next.js dev server..."
npm run dev &

# Wait a moment for the server to start
sleep 2

echo "✅ All servers and services started!"
echo "🌐 Development server should be running at http://localhost:3000"