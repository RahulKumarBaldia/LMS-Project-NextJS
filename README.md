# LMSCourse

A full-stack Learning Management System built with **Next.js**, **MongoDB**, and **JWT auth**. Students can browse courses, enroll, track lesson progress, and continue learning from a personal dashboard. Admins can manage courses and lessons.

---

## Features

- **Auth** — signup, login, logout with `httpOnly` JWT cookies; roles: `student`, `instructor`, `admin`
- **Courses** — browse, search, and filter by category / difficulty; course detail pages with lesson lists
- **Enrollment** — enroll in courses and access learning content
- **Lessons** — lesson viewer with sidebar navigation and previous / next lesson support
- **Progress** — mark lessons complete and track course completion
- **Dashboard** — enrolled courses, continue learning, and completed courses
- **Admin** — course and lesson management UI (`/admin`)
- **Seed APIs** — bootstrap courses, lessons, and an admin user for local / temporary prod setup

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4, Lucide icons |
| Database | MongoDB + Mongoose |
| Auth | JWT (`jsonwebtoken`) + bcrypt password hashing |

Architecture follows a layered flow:

```text
API route → controller → service → model
```

---

## Project structure

```text
src/
├── app/                 # Pages + API routes (App Router)
│   ├── api/             # REST endpoints (auth, courses, lessons, enrollment, progress, seed)
│   ├── admin/           # Admin panel
│   ├── auth|login|signup/
│   ├── courses/         # Catalog + course detail
│   ├── dashboard/       # Learner dashboard
│   └── learn/           # Lesson player
├── components/          # UI (auth, courses, dashboard, learning, admin)
├── context/             # AuthContext
├── controllers/         # Request handlers
├── services/            # Business logic
├── models/              # Mongoose models (User, Course, Lesson, Enrollment, Progress)
├── middleware/          # Auth + role checks
├── validators/          # Input validation
├── lib/                 # db, auth, cookies, env helpers
└── data/                # Static seed content for courses/lessons
```

### Main pages

| Route | Purpose |
| --- | --- |
| `/` | Landing / featured courses |
| `/courses` | Course catalog |
| `/courses/[slug]` | Course detail + enroll |
| `/learn/[courseSlug]/[lessonSlug]` | Lesson player |
| `/dashboard` | Learner progress |
| `/login`, `/signup`, `/auth` | Authentication |
| `/admin` | Admin management |

---

## Environment

Copy `.env.example` to `.env.local` (local) or set the same values on your host (Vercel/etc):

```bash
cp .env.example .env.local
```

**Required**

- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — long random secret for auth tokens

**Optional (admin seed)**

- `ADMIN_NAME`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

**Production-only**

- `ALLOW_SEED=true` — temporarily enable seed routes; remove immediately after use

---

## Local development

```bash
npm install
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

### Seed data (dev only; app must be running)

```bash
# Courses
# GET http://localhost:3000/api/seed

# Lessons
npm run seed:lessons
# or GET http://localhost:3000/api/seed/lessons

# Admin user
npm run seed:admin
# or GET http://localhost:3000/api/seed/admin
```

Default local admin (if env not set): `admin@brand.com` / `Admin@123456`

---

## Scripts

```bash
npm run dev          # start development server
npm run build        # production build
npm run start        # run production server
npm run lint         # eslint
npm run seed:admin   # create admin (app must be running)
npm run seed:lessons # seed lessons (app must be running)
```

---

## Production notes

- Seed routes (`/api/seed/*`) are **disabled** in production unless `ALLOW_SEED=true`.
- In production, admin seed also requires `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
- After seeding, remove `ALLOW_SEED` immediately.
- Auth cookie is `httpOnly`, `sameSite=lax`, and `secure` in production.
