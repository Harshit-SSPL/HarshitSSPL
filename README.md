# SHIV SHAKTI INDIA LIMITED (SSIL) — CORPORATE DIGITAL PLATFORM

Official digital infrastructure and corporate platform for **Shiv Shakti India Limited / Shiv Shakti Private Limited (SSIL)**.

---

## 1. MONOREPO STRUCTURE

The repository is structured following a clean monorepo architecture separating public website concerns from future backend services:

```text
HarshitSSIP/
├── frontend/                  <-- Active Next.js App Router Application
│   ├── app/                   <-- Page Routes & Layouts (Glassmorphism Navbar, Footer)
│   ├── components/            <-- Reusable UI Components & Shadcn Primitives
│   ├── data/                  <-- Mock Data Taxonomies (Products, Projects)
│   ├── lib/                   <-- Utility Functions (cn)
│   ├── types/                 <-- TypeScript Models
│   ├── public/
│   │   ├── branding/          <-- Authentic SSIL Company Logo (companylogo.png)
│   │   └── videos/            <-- Homepage Hero Background Video (hero.mp4)
│   ├── package.json
│   ├── next.config.mjs
│   ├── tsconfig.json
│   └── tailwind.config.ts
│
├── backend/                   <-- Reserved Boundary for Future Phase 10 API
├── .gitignore
├── README.md
├── BRAIN.md
├── ARCHITECTURE.md
└── ROADMAP.md
```

---

## 2. PROJECT OVERVIEW

Shiv Shakti India Limited (SSIL) is a premier manufacturer and provider of outdoor, street, and architectural lighting infrastructure solutions. SSIL delivers tailored lighting designs and engineered solutions across diverse sectors including public highways, municipal streets, residential complexes, commercial developments, public landmarks, and large-scale government/tender projects.

### Verified Executed Project References
* **Mathura Expressway** (Section lighting execution)
* **Omaxe World Street, Faridabad** (Section lighting execution)
* Additional private, commercial, and government tender projects.

---

## 3. WEBSITE PURPOSE & DESIGN PHILOSOPHY

This platform serves as SSIL's primary digital corporate presence. Its objectives are to:
* Showcase engineering capability, scale, trust, and infrastructure expertise.
* Present product categories (Bollards, Street Lights, Street Lamps, Indian Flag Poles, Solar Lighting, Interior Lighting, Large Infrastructure Poles, etc.).
* Highlight detailed product specifications, day/night lighting transitions, and application environments.
* Showcase completed infrastructure projects with verified photography.
* Provide interactive inquiry and contact routing for prospective B2B and government clients.
* Provide an authenticated internal Admin Dashboard for authorized company personnel to manage products, categories, media, and project showcases.

### Design Aesthetics & Identity
The platform's visual identity reflects engineering rigor and corporate reliability:
* **Primary Palette**: White primary background (`#FFFFFF`), SSIL Red (`#E53E3E`), Light/Sky Blue (`#3182CE` / `#63B3ED`), and dark neutral typography (`#0F172A`).
* **Header & Hero**: Glassmorphism navbar with backdrop blur (`bg-white/70 backdrop-blur-md`), floating seamlessly over a full-bleed responsive background video (`hero.mp4`).
* **Visual Tone**: Clean, bright, modern, corporate, premium, and engineering-focused.

---

## 4. CURRENT PROJECT STATUS

* **Current Status**: **Phase 1 — Frontend Foundation, Monorepo Setup & Hero Video Integration** (Complete)
* **Active State**: Monorepo split (`frontend/` and `backend/`), Next.js App Router, TypeScript, Glassmorphism Navbar with authentic `companylogo.png`, `hero.mp4` background video hero section, baseline UI components (`Stats2`, `StickyScroll`, `FeatureCard`), and corporate footer.
* **Local Preview**: Running locally on `http://localhost:3005`.

---

## 5. LOCAL DEVELOPMENT WORKFLOW

All frontend development commands must be executed from the `frontend/` directory:

```bash
# Navigate into the frontend application directory
cd frontend

# Install dependencies
npm install

# Run local development server
npm run dev

# Run production build validation
npm run build
```

Open `http://localhost:3005` to view the live local preview.
