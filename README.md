# RepTran Marketing Site

A single-page marketing and conversion site for RepTran, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** with custom design tokens
- **Light and Dark Mode** with system preference detection
- **Framer Motion** animations (respects `prefers-reduced-motion`)
- **WCAG AA** accessibility compliance
- **Responsive Design** for all screen sizes
- **Unit Tests** with Jest and React Testing Library

## Color Palette

- Primary: `#0F6F6E`
- Secondary: `#38BFB2`
- Accent: `#FF6B5A`
- Positive: `#4CD964`
- Neutral/Dark: `#1E1E1E`
- Neutral/Light: `#F8F9FA`
- White Utility: `#FFFFFF`
- White Border: `#E9ECEF`
- Black Utility: `#2A2A2A`
- Black Border: `#404040`

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Testing

Run unit tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run tests with coverage:

```bash
npm run test:coverage
```

## Project Structure

```
.
├── app/
│   ├── api/
│   │   └── signup/
│   │       └── route.ts          # Signup API endpoint
│   ├── hooks/
│   │   └── useTheme.ts           # Theme hook
│   ├── globals.css               # Global styles and CSS variables
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page
├── components/
│   ├── __tests__/                # Component tests
│   ├── CtaBanner.tsx             # CTA banner component
│   ├── FeatureCard.tsx           # Feature card component
│   ├── Header.tsx                # Header with navigation
│   ├── Hero.tsx                  # Hero section
│   ├── ProductSnapshot.tsx       # Product snapshot with callouts
│   ├── SignupModal.tsx           # Signup modal
│   ├── StatCard.tsx              # Statistics card
│   ├── Testimonial.tsx           # Testimonial component
│   ├── ThemeToggle.tsx           # Theme toggle button
│   └── ThreeStep.tsx             # Three-step flow component
├── lib/
│   └── analytics.ts              # Analytics wrapper
├── jest.config.js                # Jest configuration
├── jest.setup.js                 # Jest setup
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.ts            # Tailwind configuration
└── tsconfig.json                 # TypeScript configuration
```

## Components

### Header

Sticky header with navigation, theme toggle, and mobile menu.

**Props:**
- `onPrimaryClick?: () => void` - Callback for primary CTA click

### ThemeToggle

Toggle between light and dark modes. Persists preference to localStorage.

### Hero

Hero section with headline, subline, CTAs, and product screenshot.

**Props:**
- `headline?: string` - Custom headline
- `sub?: string` - Custom subline

### ThreeStep

Three-step flow component showing how RepTran works.

**Props:**
- `steps?: Step[]` - Custom steps array

### StatCard

Statistics card with label, value, and optional delta.

**Props:**
- `label: string` - Stat label
- `value: string | number` - Stat value
- `delta?: { value: string | number; isPositive: boolean }` - Optional delta

### Testimonial

Testimonial card with avatar, name, role, and quote.

**Props:**
- `name: string` - Person name
- `role: string` - Person role
- `quote: string` - Testimonial quote
- `avatar?: string` - Optional avatar URL

### ProductSnapshot

Product screenshot with annotated callouts.

**Props:**
- `imageSrc?: string` - Image source
- `imageAlt?: string` - Image alt text
- `callouts?: Callout[]` - Array of callout labels and positions

### CtaBanner

Full-width CTA banner with gradient background.

**Props:**
- `headline?: string` - CTA headline
- `subline?: string` - CTA subline
- `ctaText?: string` - CTA button text
- `onCtaClick?: () => void` - CTA click handler

### SignupModal

Accessible modal for email signup with validation.

**Props:**
- `isOpen: boolean` - Modal open state
- `onClose: () => void` - Close handler
- `onSuccess?: () => void` - Success callback

## API Routes

### POST /api/signup

Signup endpoint for email collection.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "ok": true,
  "message": "Signup successful"
}
```

## Analytics

The analytics wrapper supports GA4 and PostHog. Set the following environment variables:

- `NEXT_PUBLIC_GA4_ID` - Google Analytics 4 ID
- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog key

If no analytics providers are configured, events are logged to the console.

## Accessibility

- Semantic HTML elements
- ARIA labels and roles where appropriate
- Keyboard navigation support
- Focus management in modals
- Color contrast meets WCAG AA standards
- Screen reader announcements
- Respects `prefers-reduced-motion`

## Animations

Framer Motion animations are used throughout the site. All animations respect the `prefers-reduced-motion` media query and are disabled for users who prefer reduced motion.

## Theme System

The theme system uses CSS variables mapped to Tailwind theme tokens. Theme preference is persisted to localStorage and respects system preferences.

## License

Copyright © 2024 RepTran. All rights reserved.


