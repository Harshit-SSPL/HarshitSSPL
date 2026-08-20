# ARCHITECTURE.md — SYSTEM ARCHITECTURE SPECIFICATION

**Project**: Shiv Shakti India Limited (SSIL) Corporate Platform  
**Status**: Phase 0 — Initialization & Baseline Architecture Setup  

---

## 1. CURRENT VS. FUTURE ARCHITECTURE

### CURRENT STATE (Phase 0)
```text
+-------------------------------------------------------------------+
|                        LOCAL REPOSITORY                           |
|  - Baseline Documentation (README.md, BRAIN.md, ARCHITECTURE.md,   |
|    ROADMAP.md)                                                    |
|  - Git Version Control (.gitignore, main branch)                  |
|  - Remote Origin: https://github.com/Harshit-SSPL/HarshitSSPL    |
+-------------------------------------------------------------------+
```
* No frontend UI code.
* No backend server or API endpoints.
* No database or media cloud integration.

---

### PLANNED FUTURE STATE (Full System Architecture)

```text
                               +----------------------------------+
                               |        PUBLIC END USERS          |
                               +----------------------------------+
                                                |
                                                v
                               +----------------------------------+
                               |     NEXT.JS FRONTEND (WEB)       |
                               |  - Public Pages (Home, Products, |
                               |    Projects, About Us, Contact)  |
                               |  - Day/Night Interactive UI      |
                               +----------------------------------+
                                           |          |
                                API Requests          Media Asset URLs
                                           v          v
+-------------------------------+      +--------------------------+
|    AUTHENTICATED COMPANY      |      |   BACKEND API SERVER     |
|       ADMIN USERS             |----->|  - Node.js / Express     |
| - Product & Catalog Management|      |  - JWT Authentication    |
| - Project Showcase Updates    |      |  - Content Management    |
+-------------------------------+      +--------------------------+
                                                 |
                                     +-----------+-----------+
                                     |                       |
                                     v                       v
                        +-------------------------+ +-------------------+
                        |   MONGODB DATABASE      | |   CLOUDINARY CDN  |
                        | - Products & Categories | | - Product Images  |
                        | - Project Data          | | - Night Photos    |
                        | - Admin User Credentials| | - Project Media   |
                        +-------------------------+ +-------------------+
```

---

## 2. FRONTEND ARCHITECTURE

### Core Framework & Stack
* **Framework**: Next.js (App Router)
* **Language**: TypeScript (`strict: true`)
* **Styling**: Tailwind CSS + Custom Utility Modules (Vanilla CSS for custom animations)
* **State Management**: React Context / Hooks for UI state (e.g., mobile drawer, interactive filters)

### Component Hierarchy Design
```text
src/
├── app/
│   ├── layout.tsx             # Global layout (Navbar, Footer, Providers)
│   ├── page.tsx               # Homepage
│   ├── about/                 # About Us page
│   ├── products/              # Product catalog overview
│   │   ├── [category]/        # Category page (e.g., /products/bollards)
│   │   └── detail/[id]/       # Individual product detail page
│   ├── projects/              # Projects showcase page
│   └── contact/               # Contact Us page
├── components/
│   ├── common/                # Navbar, Footer, Buttons, Cards, Modals
│   ├── homepage/              # HeroVideo, ShowcaseGrid, CategoryCards
│   ├── products/              # ProductCard (Day/Night Hover), SpecificationTable
│   └── projects/              # ProjectGallery, LocationMapCard
├── data/
│   └── mock/                  # Mock JSON data mirroring future API schemas
├── lib/                       # Utility functions, helpers
└── types/                     # TypeScript interfaces
```

---

## 3. DATA ARCHITECTURE & TAXONOMY

### Product Data Schema
```typescript
export interface ProductSpec {
  wattage?: string;
  inputVoltage?: string;
  ipRating?: string;
  material?: string;
  dimensions?: string;
  colorTemperature?: string;
  mountingType?: string;
  [key: string]: string | undefined;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  description: string;
  dayImage: string;
  nightImage?: string;
  specifications: ProductSpec;
  applications: string[];
  isFeaturedHomepage: boolean;
  status: 'ACTIVE' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
}
```

### Project Data Schema
```typescript
export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  location: string;
  clientType: 'GOVERNMENT' | 'COMMERCIAL' | 'RESIDENTIAL' | 'INFRASTRUCTURE';
  description: string;
  coverImage: string;
  galleryImages: string[];
  executedYear?: string;
  status: 'COMPLETED' | 'ONGOING';
}
```

---

## 4. DAY/NIGHT HOVER INTERACTION ARCHITECTURE

### Technical Mechanism
```text
+-------------------------------------------------------------+
| Container (.group relative overflow-hidden)                  |
|                                                             |
| 1. Day Image (<img> absolute inset-0 transition-opacity)    |
|    - Default opacity: 100%                                  |
|    - Group-hover opacity: 0%                                |
|                                                             |
| 2. Night Image (<img> absolute inset-0 transition-opacity)  |
|    - Default opacity: 0%                                    |
|    - Group-hover opacity: 100%                              |
+-------------------------------------------------------------+
```
* **Performance Optimization**: Both images are preloaded via Next.js `<Image>` component to prevent flicker on initial hover.
* **Separation of Interaction**: Hover state toggles image visibility; Click event triggers navigation via Next.js `Link`.

---

## 5. MEDIA & ASSET STRATEGY

### Phase 1–9 (Frontend Development)
* Static placeholder assets located in `public/images/homepage/` and `public/branding/`.
* High-resolution stock images configured with exact dimensions to avoid Layout Shift (CLS).

### Phase 13+ (Cloudinary Integration)
* Production images stored in Cloudinary cloud buckets.
* Next.js custom image loader points to Cloudinary CDN domain for auto-WebP conversion, responsive `srcset`, and quality auto-tuning.

---

## 6. FUTURE BACKEND & ADMIN DASHBOARD ARCHITECTURE

### API Stack
* **Runtime**: Node.js / Express.js REST API
* **Database**: MongoDB with Mongoose ORM
* **Authentication**: JSON Web Tokens (JWT) stored in HTTP-Only secure cookies.

### Admin Authorization Model
* Intended for ~3 internal SSIL staff members.
* Role-based access control (`ROLE_ADMIN`).
* Admin endpoints protected by authentication middleware:
  * `POST /api/products` (Create Product + Cloudinary Upload)
  * `PUT /api/products/:id` (Update Specifications / Day-Night Images)
  * `DELETE /api/products/:id` (Archive Product)
  * `POST /api/projects` (Manage Executed Projects)

---

## 7. PERFORMANCE, RESPONSIVE & SEO STRATEGY

### Performance Goals
* **Core Web Vitals**: Target LCP < 2.5s, CLS < 0.1, FID/INP < 100ms.
* **Hero Video Strategy**: MP4/WebM H.265 encoded, muted, loop, poster attribute fallback, background deferred load.

### Responsive Strategy
* Fluid breakpoint system via Tailwind (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`).
* Navigation drawer adaptation for mobile viewports.

### SEO Strategy
* Server-side metadata generation per page.
* Semantic HTML5 tag usage (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
* Dynamic sitemap XML generation (`/sitemap.xml`).
* Open Graph tags (`og:title`, `og:description`, `og:image`) for social sharing.
