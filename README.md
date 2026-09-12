# Rail Journey Tracker

A React + Vite web app for tracking Indian Railways PNR status and searching trains between stations — built with live third-party APIs, a resilient offline fallback, and a custom railway-ticket-inspired theme.

**Live demo:** [rail-journey-tracker.vercel.app](https://rail-journey-tracker.vercel.app)

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [APIs Used](#apis-used)
- [Project Structure](#project-structure)
- [Known Limitations](#known-limitations)

---

## Features

### PNR Status Tracker
Enter any 10-digit PNR to see:
- **Smart validation** — only accepts exactly 10 digits, with instant feedback before any network request is made, so invalid input never wastes an API call
- **Live Status Dashboard** — a card styled as a physical ticket stub, showing train name/number, date of journey, travel class, and a color-coded chart-preparation badge (green = chart prepared, amber = not yet)
- **Passenger Status Table** — compares each passenger's booked status against their live current status (e.g. Waitlist 15 → RAC 4), with green/amber badges for Confirmed vs. Waitlist/RAC
- **Vertical Route Timeline** — a toggleable, collapsible timeline showing the journey's origin, intermediate stops, and destination
- **Sample PNR buttons** — four pre-loaded demo scenarios (confirmed booking, waitlist-to-RAC movement, RAC-to-confirmed, etc.) so the app is fully explorable without a real booking

### Train Search Between Stations
Enter two station codes (e.g. `NDLS` → `AGC`) to see:
- Real, live train schedule results pulled from a third-party rail data API
- Departure/arrival times, journey duration, and which days each train runs
- A graceful "no trains found" state for station pairs with no direct service

---

## Tech Stack

- **Vite** — dev server and build tooling
- **React** — functional components, hooks (`useState`), custom hooks
- **Tailwind CSS v4** — utility-first styling with a custom theme (`@theme` tokens)
- **RailRadar API** — live train search between stations
- **RapidAPI (shivesh96)** — live PNR status lookup
- Custom CSS for the ticket-stub visual effect and entrance animation
- **Vercel** — hosting and deployment

---

## Architecture

This project deliberately separates concerns the way a production app would:

```
User Input → Hook (fetch + fallback) → Normalizer (adapter) → UI Components
```

**1. Resilient fallback pattern.** Every live API call is wrapped in `try/catch`. If the live request fails, times out, hits a rate limit, or returns an error payload, the app automatically falls back to local mock JSON data instead of showing a broken UI. This mirrors how real production apps handle unreliable third-party dependencies.

**2. Adapter pattern for data normalization.** Third-party APIs return inconsistent field names (`train_name` vs `trainName` vs `TrainName`), and different APIs structure passenger/route data completely differently. `normalizePnrData.js` is the *only* place in the codebase that knows about these raw shapes — it converts anything thrown at it (live API response or mock JSON) into one clean, predictable object. Every UI component only ever sees this normalized shape, so swapping data sources never requires touching the UI.

**3. Tri-state UI handling.** Every async action explicitly tracks `idle` / `loading` / `success` / `error` (or `empty`, for zero-result searches) state, so the UI never gets stuck in an ambiguous or broken-looking state while waiting on a network request.

---

## Getting Started

### Prerequisites
- Node.js and npm installed

### Installation
```bash
git clone https://github.com/krishnabefore/Rail-Journey-Tracker.git
cd Rail-Journey-Tracker
npm install
```

### Environment Variables
Create a `.env` file in the project root:

```
VITE_RAPIDAPI_KEY=your_rapidapi_key
VITE_RAPIDAPI_HOST=real-time-pnr-status-api-for-indian-railways.p.rapidapi.com

VITE_RAILRADAR_API_KEY=your_railradar_key
VITE_RAILRADAR_HOST=https://api.railradar.in/v1
```

The app works even without real keys — it will simply always use local mock data instead of live results.

### Run locally
```bash
npm run dev
```

---

## APIs Used

| API | Provider | Purpose | Auth Style |
|---|---|---|---|
| [Real-Time PNR Status API](https://rapidapi.com/shivesh96/api/real-time-pnr-status-api-for-indian-railways) | RapidAPI (shivesh96) | Live PNR lookup | `X-RapidAPI-Key` header |
| [RailRadar](https://railradar.in/developers) | RailRadar | Trains between stations | `Authorization: Bearer` header |

Both are unofficial third-party services (India's railway system has no official public API), so response shapes and reliability vary — which is exactly why the fallback/normalization layers exist.

---

## Project Structure

```
src/
  components/
    PnrInput.jsx           Validated 10-digit PNR input
    StatusDashboard.jsx    Ticket-stub trip summary card
    PassengerTable.jsx     Booked vs. current status table
    RouteTimeline.jsx      Vertical journey timeline
    SamplePnrButtons.jsx   Quick-access demo data buttons
    StationSearchForm.jsx  From/To station code inputs
    TrainResultsList.jsx   Train search results cards
  hooks/
    usePnrStatus.js        Fetch + fallback + state for PNR lookup
    useTrainSearch.js      Fetch + fallback + state for train search
  utils/
    normalizePnrData.js    The adapter — cleans up inconsistent API shapes
  data/
    pnrData.json           Mock PNR records (4 varied scenarios)
    trainsData.json        Mock train schedule records
  App.jsx                  Tab switcher between the two features
  index.css                Tailwind import + custom theme tokens + ticket CSS
```

---

## Known Limitations

- Some free-tier PNR APIs may return the same fixed demo record regardless of the PNR entered — a limitation of that specific provider's free plan, not the app's logic. The mock-data "sample PNR" buttons exist specifically to guarantee varied, reliable demo results regardless of live API behavior.
- Train search depends on real-time schedule data — not every station-code pair has a direct train. `NDLS` → `AGC` is a reliable route to test with, since it has frequent daily service.
- Both third-party APIs are unofficial and may change or become unavailable without notice, since neither IRCTC nor Indian Railways offers a public official API.

---

## License

Personal / educational project.