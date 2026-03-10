# Apex Parking Enforcement

A mobile-first, adaptive web application for private patrol and parking enforcement officers. Apex provides zone monitoring, smart timestamps, automated overstay detection, and a responsive officer activity feed — optimized for both field use on mobile devices and command-level review on desktop.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API & Data Contract](#api--data-contract)
- [Testing & Demo Guide](#testing--demo-guide)

---

## Features

- **Zone Dashboard** — Live view of all patrol zones ranked by urgency (violations, overstays, occupancy).
- **Zone Detail** — Per-zone vehicle list with overstay indicators, time-remaining progress bars, and inline enforcement actions (Check-in, Warning, Citation, Tow, Note).
- **Activity Feed** — Shift-wide log of all officer actions with smart timestamps and date filtering.
- **Smart Timestamps** — Logs from today display relative time ("45 mins ago"); older logs switch to absolute format ("Mar 8, 2026 · 14:30").
- **Dark / Light Mode** — Persistent theme preference stored in `localStorage`.
- **Responsive Layout** — Hamburger drawer on mobile (≥375px), full inline navigation on desktop (≥900px).
- **Demo Mode** — Developer toggle to simulate empty states across the entire application for presentations and QA.

---

## Tech Stack

| Technology         | Version | Rationale                                                                             |
| ------------------ | ------- | ------------------------------------------------------------------------------------- |
| React              | 19      | Concurrent rendering, `use` hook, and improved Suspense support                       |
| TypeScript         | 5.9     | Enforces domain model integrity and catches API contract drift at compile time        |
| Vite               | 7       | Sub-second HMR and optimized production builds with native ESM                        |
| Material UI (MUI)  | 7       | Accessible, themeable component library with built-in responsive utilities            |
| MUI X Date Pickers | 8       | First-class date input components integrated with the MUI theme system                |
| React Router       | 7       | File-based-compatible routing with `Outlet`-driven nested layouts                     |
| date-fns           | 4       | Modular, tree-shakeable date utilities for relative and absolute timestamp formatting |
| Emotion            | 11      | CSS-in-JS engine powering MUI's `sx` prop and theme tokens                            |

**State Management:** React Context API — lightweight global state for parking data (`ParkingDataContext`) and color mode (`ColorModeContext`). No external state library is required at this scale.

---

## Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **npm** 9 or higher (comes with Node 18+)

### Installation & Local Development

```bash
# 1. Clone the repository
git clone <repository-url>
cd apex

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Build for Production

```bash
npm run build
```

Output is written to `dist/`. Preview the production build locally:

```bash
npm run preview
```

### Environment Variables

This application currently uses a **fully mocked API layer** — no backend or environment variables are required for local development. All data is served from `src/data/mockData.ts` via a simulated async client (`src/api/client.ts`).

When integrating a real backend, create a `.env` file at the project root:

```env
VITE_API_BASE_URL=https://your-api-host.com/api/v1
```

---

## Project Structure

```
src/
├── api/                  # Mock API client and endpoint definitions
│   ├── client.ts         # mockFetch utility (simulates network latency)
│   └── endpoint.ts       # Typed endpoint functions (getZones, postAction, etc.)
├── components/
│   ├── features/
│   │   └── enforcement/  # Domain-specific components (ZoneCard, VehicleCard, LogEntry, etc.)
│   └── ui/               # Reusable primitive components (Button, Card, Chip, DatePicker, etc.)
├── context/
│   ├── ColorModeContext.tsx   # Light/dark theme state + localStorage persistence
│   └── ParkingDataContext.tsx # Parking data, action submission, demo mode state
├── data/
│   └── mockData.ts       # Static seed data for zones, vehicles, and officer logs
├── hooks/
│   ├── useParkingData.ts  # Typed context consumer for parking data
│   ├── useColorMode.ts    # Typed context consumer for color mode
│   └── useZoneDetail.ts   # Encapsulates zone + vehicle data fetching for ZoneDetail page
├── layouts/
│   ├── AppLayout.tsx      # Root layout: AppBar + NavDrawer + Outlet + demo banner
│   ├── AppBar.tsx         # Sticky header; desktop nav, profile menu, theme toggle
│   ├── NavDrawer.tsx      # Mobile sidebar drawer with nav, developer tools, theme toggle
│   └── nav.constants.tsx  # NAV_ITEMS shared between AppBar and NavDrawer
├── pages/
│   ├── Dashboard.tsx      # Zone grid ranked by urgency
│   ├── ZoneDetail.tsx     # Per-zone vehicle list and enforcement action form
│   └── Activity.tsx       # Officer activity feed with date filter
├── types/
│   └── domain.ts          # All TypeScript interfaces and enums for the domain model
└── utils/
    └── zone.utils.ts      # Pure utility functions (e.g., getZoneUrgency)
```

---

## API & Data Contract

All endpoints are mocked in `src/api/endpoint.ts` using an in-memory store. The function signatures represent the intended contract for a real REST or GraphQL backend.

### Endpoints

| Function                    | Method | Description                                                                        |
| --------------------------- | ------ | ---------------------------------------------------------------------------------- |
| `getZones()`                | GET    | Returns all parking zones                                                          |
| `getZoneById(id)`           | GET    | Returns a single zone by ID; throws if not found                                   |
| `getVehiclesByZone(zoneId)` | GET    | Returns all vehicles currently assigned to a zone                                  |
| `getLogs()`                 | GET    | Returns the full officer activity log (session-persistent)                         |
| `postAction(log)`           | POST   | Persists a new enforcement action; returns the created log with server-assigned ID |

### Data Models

#### `Zone`

```ts
interface Zone {
  id: string;
  name: string;
  location: string;
  currentOccupancy: number;
  maxCapacity: number;
  violationCount: number;
  lastChecked: string; // ISO 8601
}
```

#### `Vehicle`

```ts
interface Vehicle {
  id: string;
  licensePlate: string;
  state: string; // Registration state, e.g. "CA"
  zoneId: string;
  type: VehicleType; // Passenger | Commercial | Motorcycle | Emergency | EV
  arrivalTime: string; // ISO 8601
  timeLimitMinutes: number;
  isOverstayed: boolean;
  minutesRemaining: number;
}
```

#### `Alert`

```ts
interface Alert {
  id: string;
  zoneId: string;
  vehicleId: string;
  type: ViolationType; // ExpiredMeter | NoParkingZone | FireHydrant | PermitRequired | Overstay
  severity: AlertSeverity; // Low | Medium | High
  description: string;
  timestamp: string; // ISO 8601
}
```

#### `OfficerLog`

```ts
interface OfficerLog {
  id: string;
  action: ActionType; // Zone Check-in | Warning Issued | Citation Issued | General Note
  zoneId: string;
  vehicleId?: string;
  licensePlate?: string; // Denormalized for display — avoids a separate vehicle lookup
  timestamp: string; // ISO 8601
  notes?: string;
  officerId: string;
}
```

---

## Testing & Demo Guide

### Empty States

**Via date filter (Activity page):**

1. Navigate to **Activity**.
2. Use the date picker to select any date with no logged activity.
3. The feed renders the "No Activity Recorded" empty state.

**Via Demo Mode toggle:**

1. **Mobile:** Open the hamburger menu → scroll to **Developer Tools** → enable **Simulate Empty State**.
2. **Desktop:** Click the officer avatar (top right) → **Developer Tools** → enable **Simulate Empty State**.
3. A yellow banner — `DEMO MODE: EMPTY STATE ACTIVE` — appears below the AppBar on all pages.
4. Both Dashboard and Activity display their empty state UI with a faded icon, heading, and description.
5. Tap **Refresh Data** on either empty state to exit demo mode instantly.

### Error States

The mock API client (`src/api/client.ts`) intentionally injects a **10% random failure rate** on every request. Error states will trigger naturally through normal application use — no special setup required. When an error occurs:

- The Dashboard and Zone Detail pages display an inline error alert with a **Retry** button.
- The action form surfaces a form-level error alert if an enforcement action fails to submit.

To force an error immediately, refresh the page or submit actions repeatedly until one fails.

### Loading States

The mock API client simulates an **800ms network delay** on every request. All data-fetching surfaces use skeleton screens during this window — zone cards on the Dashboard, vehicle cards on Zone Detail, and log entries on Activity.

The `VehicleActionForm` submit button uses a `loading` prop tied to the `isSubmitting` context flag. To observe it:

1. Navigate to any zone via the Dashboard.
2. Select a vehicle and submit an enforcement action — the button disables and enters a loading state for the duration of the simulated async delay.

### Dark / Light Mode

- **Mobile:** Open the hamburger menu → tap the sun/moon icon in the bottom footer.
- **Desktop:** Click the sun/moon icon in the top-right of the AppBar.

The preference is persisted in `localStorage` under the key `apex-color-mode` and survives page refreshes.

### Mobile vs. Desktop Layout

Use Chrome DevTools device simulation to observe the responsive layout transition:

1. Open DevTools (`F12` or `Cmd+Option+I` on macOS).
2. Toggle Device Toolbar (`Cmd+Shift+M` on macOS / `Ctrl+Shift+M` on Windows).
3. Set width **below 900px** to see the mobile layout: hamburger menu, compact AppBar, stacked zone cards.
4. Set width to **900px or above** to see the desktop layout: inline navigation, two-column zone detail, avatar profile menu.

The minimum supported mobile width is **375px** (iPhone SE / standard small phone viewport).
