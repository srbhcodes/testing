# Token Trading Table

A real-time token discovery dashboard built with modern web technologies.

## Live Demo
🔗 [Vercel Deployment](#) *(add your link)*

## Features
- **3-Column Layout**: New Pairs, Final Stretch, Migrated tokens
- **Real-Time Updates**: WebSocket-powered price changes with visual feedback
- **Interactive UI**: Tooltips, popovers, modals, sorting controls
- **Responsive Design**: Works from 320px mobile to 1920px desktop
- **Performance Optimized**: Memoized components, lazy loading, smooth animations

## Tech Stack
- Next.js 14 (App Router)
- TypeScript (Strict Mode)
- Tailwind CSS
- Redux Toolkit
- React Query
- Radix UI Primitives
- Framer Motion

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npx playwright test
```

## Testing

Visual regression tests are included using Playwright.

```bash
# Generate baseline snapshots
npx playwright test --update-snapshots

# Run visual comparison
npx playwright test
```

### Deterministic Mode
Add `?freeze=1` to the URL to lock data for consistent snapshots.

## Responsive Breakpoints
- 320px (Mobile)
- 768px (Tablet)
- 1280px (Desktop)
- 1920px (Large Desktop)

## Performance
- Lighthouse Score: ≥90 (Mobile & Desktop)
- Interaction Response: <100ms
- No Layout Shifts

## Screenshots

| Mobile | Tablet | Desktop |
|--------|--------|---------|
| *320px* | *768px* | *1920px* |

## Demo Video
📺 [YouTube Demo](#) *(add your link)*

---