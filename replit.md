# Workspace

## Overview

Little Stars Daycare — a full professional daycare company website built with React + Vite frontend and Express 5 backend, connected to PostgreSQL via Drizzle ORM.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite, TailwindCSS, Framer Motion, Wouter routing, shadcn/ui components
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

- `artifacts/daycare-website` — Main daycare website (React + Vite), served at `/`
- `artifacts/api-server` — REST API server, served at `/api`

## Pages

- `/` — Home page with hero, stats, program highlights, testimonials, FAQ teaser, newsletter signup
- `/programs` — All daycare programs listing (alternating layout)
- `/programs/:id` — Individual program detail page with sidebar enrollment CTA
- `/enroll` — 3-step enrollment form (parent info, child info, program selection)
- `/staff` — Meet the team page with hover overlay cards
- `/gallery` — Photo gallery with category filters + full lightbox viewer
- `/events` — Upcoming events with colored type badges
- `/contact` — Contact form + info card + OpenStreetMap embed
- `/about` — Our story, philosophy, timeline, core values, accreditations, join the team
- `/faq` — Full FAQ with 4 categories (Enrollment, Daily Schedule, Safety, Tuition)
- `/*` — Branded 404 page

## Features Added (v2 - 100% Complete)
- Social media links (Facebook, Instagram, YouTube) in top bar and footer
- Clickable phone/email links in top bar and footer
- Google Fonts properly loaded in HTML head (Fraunces serif + Outfit sans)
- SEO meta tags and Open Graph tags
- Star emoji favicon
- Gallery lightbox with keyboard navigation (arrow keys, Escape)
- FAQ page with accordion (4 categories, 14 questions)
- FAQ teaser section on home page
- Newsletter signup section on home page
- About page: history timeline, accreditations section, "Join Our Team" CTA
- Contact page: teal hero header, OpenStreetMap embed
- Branded 404 page with animated star icon
- `xl` button size variant added to Button component
- Footer: FAQ link, hours of operation, social links

## API Endpoints

- `GET /api/programs` — List all programs
- `POST /api/programs` — Create program
- `GET /api/programs/:id` — Get program by ID
- `GET /api/enrollments` — List enrollments
- `POST /api/enrollments` — Submit enrollment
- `GET /api/staff` — List staff members
- `GET /api/gallery` — Gallery photos
- `GET /api/testimonials` — Parent testimonials
- `GET /api/events` — Upcoming events
- `POST /api/contact` — Submit contact message
- `GET /api/stats` — Daycare-wide statistics

## Database Tables

- `programs` — Daycare programs with age ranges, pricing, capacity
- `enrollments` — Enrollment requests from parents
- `staff` — Staff member profiles
- `gallery` — Gallery photo entries
- `testimonials` — Parent reviews
- `events` — Upcoming events
- `contact_messages` — Contact form submissions

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
