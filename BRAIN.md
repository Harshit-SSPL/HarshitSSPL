# BRAIN.md — MASTER PROJECT CONTEXT & BRAIN DOCUMENT

**Project**: Shiv Shakti India Limited (SSIL) Corporate Platform  
**Repository**: `https://github.com/Harshit-SSPL/HarshitSSPL`  
**Current Phase**: Phase 0 — Project Initialization  


## 1. EXECUTIVE SUMMARY & COMPANY CONTEXT

### Legal & Corporate Entities
* **Primary Entity**: Shiv Shakti India Limited / Shiv Shakti Private Limited (SSIL)
* **Industry**: Outdoor Infrastructure & Architectural Lighting Solutions

### Business Operations & Domain Scope
SSIL specializes in engineering, manufacturing, and supplying comprehensive lighting infrastructure across diverse sectors:
* Public Highways, Expressways & Municipal Arterial Roads
* Urban Street Lighting & Smart Light Poles
* Residential Societies & Gated Community Developments
* Commercial Complexes & Retail High Streets
* Large Public & Private Real Estate Developments
* Outdoor Architectural & Decorative Heritage Lighting
* High-Mast & Infrastructure Poles (e.g., Indian Flag Poles, Stadium Lighting)
* Government & Municipal Tender-Based Lighting Contracts

### Verified Executed Projects (Context Only)
1. **Mathura Expressway** — Section lighting implementation
2. **Omaxe World Street, Faridabad** — Section lighting implementation
3. Other private, commercial, and municipal tender projects (`Client Input Required`)

> [!CAUTION]
> **Strict Anti-Fabrication Rule**: Do NOT invent additional clients, statistics, certifications, awards, project details, metric figures, or product model specifications. Any information not explicitly provided by SSIL leadership must be explicitly tagged as `TBD` or `Client Input Required`.

---

## 2. WEBSITE PURPOSE & AUDIENCE PROFILE

### Primary Purpose
The official digital portal for SSIL serves as the corporate showcase for B2B buyers, government contractors, municipal bodies, real estate developers, and architectural consultants.

### Key Objectives
1. Establish immediate trust, engineering scale, and brand credibility.
2. Present structured product categories and detailed product catalogs.
3. Showcase real executed infrastructure projects with high-resolution photography.
4. Facilitate project inquiries, product quotes, and contact routing.
5. Provide a secure internal Admin Dashboard for company staff to manage catalog products, project galleries, and page content.

### Visual Identity & Brand Guardrails
* **Visual Direction**: Clean, bright, corporate, premium, engineering-focused.
* **Color Palette**:
  * Primary Light Background: White (`#FFFFFF`) / Light Neutral (`#F8FAFC`)
  * SSIL Accent Red: Brand Red (`#E53E3E`)
  * SSIL Accent Blue: Sky/Light Blue (`#3182CE`)
  * Contrast Neutral: Dark Charcoal/Black (`#1A202C`)
* **Strict Anti-Patterns**: Must **NOT** resemble a SaaS dashboard, developer portfolio, cybersecurity site, gaming platform, or AI cyberpunk layout.

---

## 3. CORE TECHNICAL STRATEGIES

### Strategy 1: Frontend-First Development Order
Development follows a strict phased order:

```text
Frontend Implementation (Static/Mock Data) ~80-90%
       ↓
Backend API Development (Node.js/Express)
       ↓
Database Setup (MongoDB Schema)
       ↓
Cloudinary Media Storage Integration
       ↓
Admin Dashboard Construction
       ↓
Frontend/Backend Integration & Content Migration
       ↓
Production Hardening & Deployment
```

* **Rule**: Do NOT reverse this order. Do NOT build backend or database integrations during Phase 0.

### Strategy 2: Product & Component Architecture
The frontend UI components must consume structured mock data mirroring future API schemas.

#### Standard Product Schema Taxonomy
```typescript
interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;          // Day photo / default asset
  nightImage?: string;     // Night illumination photo
  specifications: Record<string, string>;
  status: 'ACTIVE' | 'ARCHIVED';
  applications?: string[];
}
```

### Strategy 3: Day/Night Hover Interaction Spec
Selected product cards and homepage showcase cards require an interactive Day/Night lighting transition:
* **Default State**: Card displays the `Day Image` of the lighting fixture/environment.
* **Hover State**: Moving cursor over the image triggers a smooth CSS opacity/crossfade transition displaying the `Night Image` (illuminated view).
* **Un-hover State**: Cursor leaving returns smoothly to the `Day Image`.
* **Click Action**: Clicking the card navigates directly to the corresponding category/product detail page.
* **Mobile Strategy**: Touch devices do not support hover. Mobile interaction strategy will be explicitly decided during Phase 9 (Responsive Optimization) — candidates include tap-to-toggle icon or automated scroll-reveal.

### Strategy 4: Temporary Asset & Media Protocol
* Stock images may be used temporarily during frontend construction.
* Stock assets must **never** be presented as real SSIL projects or verified client installations.
* Local assets stored during frontend phases live in `public/images/homepage/` or `public/branding/`.
* Source code repository must **never** store thousands of heavy production media assets.

### Strategy 5: Future Cloudinary & MongoDB Strategy
* **Cloudinary**: Production media storage, auto-formatting, CDN delivery, and responsive image resizing.
* **MongoDB**: Stores structured JSON data and Cloudinary image URLs/public IDs.
* **Admin Upload Workflow**:
  ```text
  Admin Dashboard -> Backend -> Cloudinary -> Public ID/URL -> MongoDB -> Next.js Frontend
  ```

### Strategy 6: Authentic Company Logo Integrity
* The company logo is a verified asset containing Red, Blue, Black, White background, "SSIL", and "The Best Lighting Solutions".
* **Rule**: Do not redesign, alter, or generate synthetic logos.

---

## 4. FUTURE ADMIN DASHBOARD VISION

The platform will eventually feature an authenticated dashboard for ~3 internal SSIL administrative accounts to manage:
* **Product Catalog**: Add, edit, archive, upload day/night photos, edit specifications, update categories.
* **Project Galleries**: Upload project photos, location details, scope descriptions.
* **Page Content**: Update office addresses, phone numbers, email contacts, company overview text.

---

## 5. KNOWN REQUIREMENTS & EXCLUSIONS

### Explicitly Excluded Technologies (Unless Requested)
* Redis / Celery / Message Queues
* PostgreSQL / SQL Databases
* Microservice Architectures / Kubernetes
* AI Chatbots / Complex AI Integrations
* Cyberpunk / Dark-mode default neon themes

### Core Technology Stack (Chosen)
* **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS
* **Backend (Future)**: Node.js / Express
* **Database (Future)**: MongoDB
* **Media (Future)**: Cloudinary CDN

---

## 6. PROJECT OPERATING RULES

1. **Deliberate Phase Execution**: Wait for explicit project owner prompts before starting any new phase.
2. **Strict Incremental Navigation**: Unbuilt pages in navigation bars must remain inactive or unlinked until implemented.
3. **Commit & Push Discipline**: Every completed phase must be verified, committed, pushed to `https://github.com/Harshit-SSPL/HarshitSSPL`, and verified.
