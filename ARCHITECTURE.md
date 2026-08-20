# ARCHITECTURE.md — SYSTEM ARCHITECTURE SPECIFICATION

**Project**: Shiv Shakti India Limited (SSIL) Corporate Platform  
**Status**: Phase 1 — Monorepo Architecture, Glassmorphism Navbar & Hero Video Integration  

---

## 1. MONOREPO SYSTEM ARCHITECTURE

```text
+-------------------------------------------------------------------+
|                        HARSHITSSIP ROOT                           |
|  - Root Documentation: README.md, BRAIN.md, ARCHITECTURE.md,      |
|    ROADMAP.md, .gitignore                                         |
|  - Git Repository: https://github.com/Harshit-SSPL/HarshitSSPL    |
+-------------------------------------------------------------------+
                                  |
            +---------------------+---------------------+
            |                                           |
            v                                           v
+-----------------------+                   +-----------------------+
|   FRONTEND / (ACTIVE) |                   |  BACKEND / (RESERVED) |
| - Next.js App Router  |                   | - Reserved for        |
| - Glassmorphism UI    |                   |   Future Node.js/     |
| - Video Hero Layer    |                   |   Express REST API    |
| - Authentic SSIL Logo |                   |   (Phase 10+)         |
+-----------------------+                   +-----------------------+
```

---

## 2. FRONTEND DIRECTORY TAXONOMY

```text
frontend/
├── app/
│   ├── globals.css            # Tailwind & CSS variables
│   ├── layout.tsx             # Root layout with Glassmorphism Navbar & Footer
│   └── page.tsx               # Homepage with Video Hero background
├── components/
│   └── ui/                    # Base Shadcn primitives & SSIL section components
│       ├── shadcnblocks-com-navbar1.tsx  # Glassmorphism Navbar with companylogo.png
│       ├── footer-section.tsx             # Corporate Footer with companylogo.png
│       ├── stats-2.tsx
│       ├── sticky-scroll-reveal.tsx
│       └── feature-card.tsx
├── data/
│   └── mockData.ts            # Static mock dataset for products, categories, projects
├── lib/
│   └── utils.ts               # Tailwind merge helper (cn)
├── types/
│   └── index.ts               # TypeScript interfaces
└── public/
    ├── branding/
    │   └── companylogo.png    # Authentic SSIL Logo Asset
    └── videos/
        └── homepage/
            └── hero.mp4       # Authentic SSIL Hero Video Asset
```

---

## 3. HERO VIDEO & GLASSMORPHISM NAVBAR ARCHITECTURE

### Stacking & Layering Order
```text
+---------------------------------------------------------------+
| Layer 3 (Top): Glassmorphism Navbar                           |
|   - fixed top-0 inset-x-0 z-50                                |
|   - bg-white/70 backdrop-blur-md border-b border-white/20     |
|   - Renders /branding/companylogo.png on extreme left         |
+---------------------------------------------------------------+
| Layer 2 (Middle): Hero Content Overlay                        |
|   - relative z-20 container text-white                        |
|   - Headline: "Architectural & Outdoor Infrastructure Lighting"|
|   - Subheadline & CTA buttons                                 |
+---------------------------------------------------------------+
| Layer 1.5: Gradient Contrast Overlay                          |
|   - absolute inset-0 bg-gradient-to-r from-slate-950/90 z-10  |
+---------------------------------------------------------------+
| Layer 1 (Bottom): Background Video                            |
|   - absolute inset-0 z-0 object-cover                         |
|   - <video autoPlay muted loop playsInline src="/videos/..." />|
+---------------------------------------------------------------+
```

---

## 4. FUTURE BACKEND & DATABASE BOUNDARY

* **Backend Boundary**: `backend/` directory is reserved for future Phase 10 backend development.
* **Database & Media Integration**: MongoDB schema definitions and Cloudinary media uploading will be introduced in future phases. No backend dependencies exist in Phase 1.
