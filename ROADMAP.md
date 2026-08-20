# ROADMAP.md — PROJECT IMPLEMENTATION ROADMAP

**Project**: Shiv Shakti India Limited (SSIL) Corporate Platform  
**Repository**: `https://github.com/Harshit-SSPL/HarshitSSPL`  

---

## DEVELOPMENT STRATEGY & PHASE PROGRESSION

The platform is developed strictly in sequential phases according to the **Frontend-First Execution Strategy**. Each phase requires explicit trigger and design approval from the project owner before execution begins.

---

### PHASE 0: PROJECT INITIALIZATION & ARCHITECTURE SETUP
* **Status**: **COMPLETE**
* **Scope**: Establish Git repository, setup workspace, and author foundational core documentation.
* **Deliverables**:
  * Git repository initialized with `.gitignore` and remote origin `https://github.com/Harshit-SSPL/HarshitSSPL`.
  * `README.md` — Corporate overview, tech direction, repository workflow.
  * `BRAIN.md` — Master context document, brand guardrails, day/night hover spec, anti-fabrication rules.
  * `ARCHITECTURE.md` — Current vs. future architecture, component taxonomy, data schemas, SEO/performance strategies.
  * `ROADMAP.md` — 21-phase master execution plan.
* **Verification**: Git commits pushed and verified on GitHub repository.

---

### PHASE 1: FRONTEND FOUNDATION & DESIGN SYSTEM SETUP
* **Status**: **PENDING** (Awaiting Phase 1 Trigger)
* **Scope**: Initialize Next.js project structure, install Tailwind CSS, configure Google Fonts, establish design system tokens (colors, typography, spacing, CSS variables).
* **Deliverables**:
  * Next.js workspace setup with TypeScript.
  * SSIL Color Palette configuration (`SSIL Red`, `SSIL Blue`, `Neutral Dark`, `Light BG`).
  * Basic layout frame (`Navbar` shell, `Footer` shell, container boundaries).

---

### PHASE 2: HOMEPAGE DESIGN & IMPLEMENTATION
* **Status**: **PENDING**
* **Scope**: Construct full interactive homepage based on explicit owner design instructions.
* **Deliverables**:
  * Hero Section (with video background support & fallbacks).
  * Company Overview & Corporate Statistics section.
  * Product Category Showcase Cards (with Day/Night hover transitions).
  * Featured Projects Section.
  * Contact CTA & Footer integration.

---

### PHASE 3: ABOUT US PAGE
* **Status**: **PENDING**
* **Scope**: Build dedicated About Us page highlighting SSIL background, corporate philosophy, infrastructure expertise, and engineering credentials.

---

### PHASE 4: PRODUCTS OVERVIEW PAGE
* **Status**: **PENDING**
* **Scope**: Implement master catalog page displaying all product categories (Bollards, Street Lights, Street Lamps, Indian Flag Poles, Solar Lighting, etc.).

---

### PHASE 5: PRODUCT CATEGORY PAGES
* **Status**: **PENDING**
* **Scope**: Dynamic category catalog pages (e.g., `/products/bollards`) showing grid of category-specific product cards with Day/Night hover effects.

---

### PHASE 6: INDIVIDUAL PRODUCT DETAIL PAGES
* **Status**: **PENDING**
* **Scope**: Dynamic product detail page (`/products/detail/[id]`) featuring high-resolution image viewers, specification table, applications, and inquiry button.

---

### PHASE 7: PROJECTS SHOWCASE PAGE
* **Status**: **PENDING**
* **Scope**: Projects gallery highlighting completed SSIL works (including Mathura Expressway, Omaxe World Street Faridabad sections).

---

### PHASE 8: CONTACT US PAGE
* **Status**: **PENDING**
* **Scope**: Contact Us page featuring office details, location map placeholder, corporate email/phone details, and interactive inquiry form UI.

---

### PHASE 9: FRONTEND REFINEMENT & RESPONSIVE OPTIMIZATION
* **Status**: **PENDING**
* **Scope**: Mobile/tablet responsive tuning, day/night mobile strategy resolution, cross-browser visual verification, UI performance polish.

---

### PHASE 10: BACKEND FOUNDATION & API ARCHITECTURE
* **Status**: **PENDING**
* **Scope**: Initialize Node.js / Express backend API server workspace, environment configurations, and base routing middleware.

---

### PHASE 11: DATABASE ARCHITECTURE & MONGODB INTEGRATION
* **Status**: **PENDING**
* **Scope**: Configure MongoDB database connection, Mongoose schemas for Products, Categories, Projects, and Admin User accounts.

---

### PHASE 12: AUTHENTICATION & SECURITY SYSTEM
* **Status**: **PENDING**
* **Scope**: Implement JWT authentication, password hashing (bcrypt), HTTP-Only cookie handling, and admin auth middleware.

---

### PHASE 13: CLOUDINARY MEDIA STORAGE INTEGRATION
* **Status**: **PENDING**
* **Scope**: Connect Cloudinary SDK to backend, construct image upload/delete handlers, CDN transformation URL generators.

---

### PHASE 14: ADMIN DASHBOARD FOUNDATION
* **Status**: **PENDING**
* **Scope**: Authenticated Admin Dashboard shell with sidebar navigation, security checks, and dashboard metrics overview.

---

### PHASE 15: ADMIN PRODUCT MANAGEMENT MODULE
* **Status**: **PENDING**
* **Scope**: Admin interfaces for adding products, editing specs, updating day/night photos via Cloudinary, archiving products.

---

### PHASE 16: ADMIN PROJECT MANAGEMENT MODULE
* **Status**: **PENDING**
* **Scope**: Admin interfaces for adding executed projects, uploading project gallery images, updating project metadata.

---

### PHASE 17: ADMIN PAGE & CONTENT MANAGEMENT MODULE
* **Status**: **PENDING**
* **Scope**: Admin interfaces for updating office contact info, phone numbers, email addresses, homepage showcase items.

---

### PHASE 18: FRONTEND / BACKEND INTEGRATION
* **Status**: **PENDING**
* **Scope**: Connect Next.js frontend dynamic pages to Backend REST APIs, replacing mock static JSON data with live MongoDB data.

---

### PHASE 19: REAL COMPANY CONTENT MIGRATION
* **Status**: **PENDING**
* **Scope**: Populate database and Cloudinary with official verified SSIL products, real high-res photography, and verified project details.

---

### PHASE 20: PRODUCTION TESTING, HARDENING & DEPLOYMENT
* **Status**: **PENDING**
* **Scope**: End-to-end security audit, core web vitals optimization, domain setup, SSL configuration, and production launch.
