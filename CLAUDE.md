# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sustainability fleet & dispatch management app for battery recycling operations. Built for UGAHacks 11. Tracks dealership battery fill levels, visualizes fleet status on maps, and plans optimized pickup routes.

## Commands

```bash
npm run dev      # Start dev server (Next.js on localhost:3000)
npm run build    # Production build
npm start        # Start production server
```

No test framework is configured.

## Tech Stack

- **Next.js 15** (App Router) with **React 18** — all page/component files use `'use client'`
- **Supabase** for authentication only (data is in-memory mock data)
- **Leaflet + react-leaflet** for maps (OpenStreetMap tiles, loaded with `dynamic(() => import(...), { ssr: false })`)
- **Pure CSS** in `app/globals.css` (no Tailwind/Bootstrap)
- Path alias: `@/*` maps to project root (e.g., `@/components/Navbar`)

## Architecture

### Data Flow

All fleet data lives in memory in `lib/mock-data.js` — a simulation loop updates dealership battery counts every 60 seconds. Components subscribe to updates via a pub/sub pattern (`subscribeToMockData()`). No database persistence for fleet data.

Key data entities:
- **14 Ford dealerships** with battery counts, fill rates, capacity
- **2 recycling centers** (pickup destinations)
- **7 zero-waste locations**

### Auth

`context/AuthContext.js` wraps Supabase auth (email/password). `components/ProtectedRoute.js` guards pages by redirecting to `/login`. Auth state provided via React Context.

### Context Providers

Three contexts wrapped in `components/Providers.js` (mounted in `app/layout.js`):
- **AuthContext** — session, login/signup/logout
- **NotificationContext** — toast system, subscribes to mock data for threshold alerts (85% warning, 90% error)
- **SidebarContext** — sidebar open/close state

### Route Planning (`lib/route-planner.js`)

`planRoutes(dealerships, recyclingCenters, opts)` — groups urgent dealerships by nearest recycling center, builds routes using nearest-neighbor approach with constraints (max stops, batteries, miles).

### Pages

- `/` — Public landing page
- `/login`, `/signup`, `/about` — Public
- `/dashboard` — KPI cards, projected volume chart, priority pickups (protected)
- `/nearby` — Fleet map with searchable dealer list + detail drawer (protected)
- `/dispatch` — Route planner with map visualization (protected)
- `/profile`, `/settings` — User management (protected)

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=<supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase-anon-key>
```

## Key Patterns

- Maps are client-side only — always use Next.js `dynamic()` with `{ ssr: false }` for map components
- Risk levels derived from `daysToFull` calculation in `lib/fleet-utils.js` (high/medium/low)
- Sidebar is resizable (drag right edge), width persisted to localStorage
- Notification toasts auto-dismiss after 5 seconds, max 2 shown at once
