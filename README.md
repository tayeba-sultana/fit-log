<div align="center">

# 🏋️ FitLog — Workout Library

**Train with intent. Log every set.**

A dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.

[🌐 Live Demo](YOUR_LIVE_LINK_HERE) · [💻 GitHub Repo](YOUR_GITHUB_LINK_HERE)

</div>

---

## 📖 About

FitLog is a responsive workout-planning web app. Browse a library of twelve lifts covering every major muscle group, open a detail page for sets, reps and step-by-step instructions, then add workouts to **Today's Plan** (max 5) or save them for later. Your plan's total exercises, minutes and calories update live, and everything is remembered after a page reload.

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| **Next.js 15** (App Router) | Pages, dynamic routing (`/workout/[id]`), 404 page |
| **React 19** | UI components and hooks |
| **TypeScript** | Type-safe workout data and context |
| **Tailwind CSS v4** + **daisyUI** | Styling and responsive layout |
| **Context API** | Shared Plan / Saved state across pages |
| **react-hot-toast** | Toast notifications |
| **localStorage** | Persisting plan and saved workouts |
| **Oswald + Inter** (`next/font`) | Typography |

## ✨ Key Features

1. **📚 Workout Library** — A responsive card grid (3 / 2 / 1 columns) that loads workouts from the FitLog API. It shows a loading animation while fetching. Each card shows muscle-group tags, equipment, duration, calories and rating.
2. **🔍 Workout Details Page** — Dynamic route with a two-column layout: a large image, a key-specs panel (equipment, difficulty, sets, reps, duration, calories, rating) and numbered instructions.
3. **📅 Today's Plan (max 5)** — Add lifts with a toast on every action. Duplicates and a full plan are blocked. Live Exercises / Minutes / Calories metrics update as you add or remove workouts.
4. **🔖 Saved for Later + Live Badges** — Save lifts to a separate Saved tab. The navbar **Plan** and **Saved** counters update instantly from anywhere in the app.
5. **✅ Smart My Plan Page** — Switch between Today's Plan and Saved tabs, sort by Duration, Calories or Rating, mark workouts as **Done**, remove them with **X**, and see a friendly empty state when nothing is there.

**Also included:** persistent data via localStorage, a custom 404 page, and a fully responsive layout for mobile, tablet and desktop.

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone YOUR_GITHUB_LINK_HERE
cd fitlog

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# Production build
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx            # Navbar + Footer + Toaster + PlanProvider
│   ├── page.tsx              # Home (Hero + Library)
│   ├── not-found.tsx         # 404 page
│   ├── globals.css
│   ├── workout/[id]/page.tsx # Workout details
│   └── my-plan/page.tsx      # My Plan (Today's Plan / Saved)
├── components/               # Navbar, Hero, WorkoutCard, LibrarySection, Footer
├── context/PlanContext.tsx   # Plan + Saved state, metrics, localStorage
├── types/index.ts            # Workout and PlanWorkout types
└── utils/api.ts              # API fetch functions
```

## 🌍 Deployment

Deployed on **Vercel**. Reloading any route works without errors.

---

<div align="center">
© 2026 FitLog — Workout Library. Train hard, log honest. 💪
</div>