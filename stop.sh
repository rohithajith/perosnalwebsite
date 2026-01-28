#!/bin/bash

# Stop script for personal website development servers and services

echo "🛑 Stopping all development servers and services..."

# Stop Next.js dev server
echo "Stopping Next.js dev server..."
pkill -f "next dev" 2>/dev/null || echo "No Next.js dev server found"

# Stop Next.js production server
echo "Stopping Next.js production server..."
pkill -f "next start" 2>/dev/null || echo "No Next.js production server found"

# Stop any Node.js processes
echo "Stopping Node.js processes..."
pkill -f "node.*next" 2>/dev/null || echo "No Node.js processes found"

# Stop any npm/yarn processes
echo "Stopping npm/yarn processes..."
pkill -f "npm.*dev" 2>/dev/null || echo "No npm dev processes found"
pkill -f "yarn.*dev" 2>/dev/null || echo "No yarn dev processes found"

# Stop any processes on common dev ports
echo "Checking common development ports..."
for port in 3000 3001 8000 8080 5000; do
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "Stopping process on port $port..."
        lsof -ti:$port | xargs kill -9 2>/dev/null || echo "Could not stop process on port $port"
    fi
done

# Stop any Docker containers if running
echo "Stopping Docker containers..."
docker stop $(docker ps -q) 2>/dev/null || echo "No Docker containers to stop"

echo "✅ All servers and services stopped!"