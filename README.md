# Big Trip

Big Trip is a trip route-planning and cost-calculation web app with a minimalist, desktop-only interface.

## Features

- Automatic route naming, built from the destinations of the trip's points, ordered chronologically by start date 
- Filtering trip points by Everything / Future / Present / Past
- Sorting trip points by Day, Time, or Price
- Add, edit, and delete trip points, each with a destination, date/time range, price, and optional offers
- User authentication (JWT-based) with a personal profile page
- All trip points are persisted per user on the mock server, so they're preserved across reloads and sessions

## Tech Stack

- React + TypeScript
- Vite
- CSS Modules
- axios for HTTP requests
- React Context for auth state
- A mock JSON API with JWT-based authentication

## Getting Started

### Cloning

```bash
git clone https://github.com/Timofey921/Summer-practice-2nd-course.git
```

### Installation

```bash
npm install
```

### Running the app

```bash
npm run dev
```