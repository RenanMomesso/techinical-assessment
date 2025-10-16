# Star Wars Planets Dashboard

React app showing Star Wars planets and their residents.

## Setup

```bash
npm install
npm start
```

Open http://localhost:3000

## Features

- Browse planets in a table
- Click planets for details modal
- Filter by climate/terrain/population  
- Save favorites (localStorage)
- View planet residents
- Share URLs

## AI Usage

**Used AI for:**
- Initial component boilerplate (GitHub Copilot)
- Test file setup
- TypeScript interfaces from API

**Wrote myself:**
- Custom hooks (favorites, filters)
- URL state management (AI was trying to implement everything but ended up with a clean solution)
- Error handling
- Component structure
- Styling

**Modified AI code because:**
- Split large components into smaller ones
- Updated to modern React patterns
- Added better error handling
- Improved caching logic

## Architecture

**TanStack Query** - API caching and loading states
**Custom hooks** - Business logic separation  
**LocalStorage** - Favorites persistence
**URL state** - Shareable links

## Challenges

**API rate limits** → Added caching
**Nested data loading** → Used dependent queries
**URL sync** → Custom hook for bidirectional sync
**TypeScript issues** → Made interfaces flexible

## With more time

- Virtual scrolling
- Search functionality
- Dark mode
- Better mobile UX
- More tests
- Offline support

## Dependencies

- `@tanstack/react-query` - Data fetching
- `@testing-library/react` - Testing
- `typescript` - Type safety
