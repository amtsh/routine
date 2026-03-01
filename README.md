# Routine

A habit tracker PWA to improve quality of life by building good habits. Track daily habits, maintain streaks, and add suggested habits with minimal friction.

## Features

- Track habits with daily completion status
- Streak tracking with visual indicators
- Pre-built habit suggestions (physical health, mental health, knowledge)
- Add custom habits with emoji picker and flexible intervals
- Reorder habits via drag-and-drop
- Dark/light theme with system preference support
- Installable PWA (Progressive Web App)
- Data stored locally in the browser

## Tech Stack

- [Next.js 15](https://nextjs.org) (App Router)
- [React 18](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [Framer Motion](https://www.framer.com/motion)
- [Vaul](https://vaul.emilkowal.ski) (drawer)
- [Lucide React](https://lucide.dev) (icons)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
app/
  page.tsx          # Home (habit list)
  home/             # Home components, empty state, menu
  new/              # Add habit flow
  edit/[id]/        # Edit habit
  reorder/          # Drag-and-drop reorder
  suggestions/      # Browse & add suggested habits
  clearcache/       # Clear local data
lib/
  context/          # SavedHabitsContext (localStorage)
  types.ts          # Habit type definitions
  utils.ts          # Helpers, suggestion data
components/
  ui/               # Radix-based UI primitives
  PillMenu.tsx      # Floating action menu
```

