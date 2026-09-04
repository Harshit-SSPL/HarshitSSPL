import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import Admin from "./models/Admin.js";
import HomeStats from "./models/HomeStats.js";
import NationalProject from "./models/NationalProject.js";
import FeaturedProduct from "./models/FeaturedProduct.js";
import Product from "./models/Product.js";
import ProductDesign from "./models/ProductDesign.js";
import AboutUs from "./models/AboutUs.js";
import FooterSettings from "./models/FooterSettings.js";
import { connectDB } from "./config/db.js";

dotenv.config();

export const seedDatabase = async () => {
  try {
    console.log("[Seed] Checking database initialization status...");
    await connectDB();

    if (mongoose.connection.readyState !== 1) {
      console.warn("[Seed] Warning: MongoDB not connected. Skipping database seeding.");
      return;
    }

    // 1. Seed Admin
    const adminUsername = (process.env.ADMIN_BOOTSTRAP_USERNAME || "admin").toLowerCase().trim();
    const adminPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD || "admin";
    const passwordHash = await bcrypt.hash(adminPassword, 10);

    const adminExists = await Admin.findOne({ username: adminUsername });
    if (!adminExists) {
      await Admin.create({
        username: adminUsername,
        passwordHash,
        role: "superadmin",
      });
      console.log(`[Seed] Created bootstrap admin account: '${adminUsername}'`);
    } else {
      adminExists.passwordHash = passwordHash;
      await adminExists.save();
      console.log(`[Seed] Verified and updated admin account: '${adminUsername}'`);
    }

    // 2. Seed HomeStats
    const statsCount = await HomeStats.countDocuments();
    if (statsCount === 0) {
      await HomeStats.create({
        deployedFootprints: {
          value: 20000,
          suffix: "+",
          label: "Poles & Lighting Installations",
          sublabel: "DEPLOYED FOOTPRINT",
        },
        yearsExperience: {
          value: 12,
          suffix: "+",
          label: "Years of Experience",
          sublabel: "ENGINEERING HERITAGE",
        },
        statesServed: {
          value: 22,
          suffix: "+",
          label: "States & UTs Across India",
          sublabel: "PAN-INDIA PRESENCE",
        },
        projectsCompleted: {
          value: 500,
          suffix: "+",
          label: "Government & Private Projects",
          sublabel: "EXECUTED CONTRACTS",
        },
      });
      console.log("[Seed] Initialized Home statistics.");
    }

    // 3. Seed Shared National Projects
    const projectsCount = await NationalProject.countDocuments();
    if (projectsCount === 0) {
      const initialProjects = [
        { name: "DAE", logoUrl: "/clients/DAESticker.png", category: "Government", order: 0 },
        { name: "INDIAN OIL", logoUrl: "/clients/IndianOilSticker.png", category: "PSU & Energy", order: 1 },
        { name: "INDIAN RAILWAYS", logoUrl: "/clients/IndianRailwaySticker.png", category: "Transit", order: 2 },
        { name: "GRAND RETREAT", logoUrl: "/clients/GrandRetreatSticker.png", category: "Hospitality", order: 3 },
        { name: "BPTP", logoUrl: "/clients/BPTPSticker.png", category: "Infrastructure", order: 4 },
        { name: "THE CORENTHUM", logoUrl: "/clients/TheCorenthumSticker.png", category: "Corporate", order: 5 },
        { name: "ACE", logoUrl: "/clients/ACESticker.png", category: "Infrastructure", order: 6 },
        { name: "GALAXY GROUP", logoUrl: "/clients/GalaxyGroupSticker.png", category: "Real Estate", order: 7 },
        { name: "ASIAN FIDELIS", logoUrl: "/clients/AsianFidelisSticker.png", category: "Healthcare", order: 8 },
        { name: "ORO GROUP", logoUrl: "/clients/OROGroupSticker.png", category: "Commercial", order: 9 },
        { name: "HABITAT ENVIRO", logoUrl: "/clients/HabitatEnviroSticker.png", category: "Environmental", order: 10 },
        { name: "M3M", logoUrl: "/clients/M3MSticker.png", category: "Real Estate", order: 11 },
        { name: "RAHEJA", logoUrl: "/clients/RahejaSticker.png", category: "Real Estate", order: 12 },
        { name: "ROF AALAYAS", logoUrl: "/clients/ROFAalayasSticker.png", category: "Residential", order: 13 },
        { name: "TDI", logoUrl: "/clients/TDISticker.png", category: "Infrastructure", order: 14 },
        { name: "RPS GROUP", logoUrl: "/clients/RPSGroupSticker.png", category: "Real Estate", order: 15 },
        { name: "SAMRIDDHI", logoUrl: "/clients/SamriddhiSticker.png", category: "Infrastructure", order: 16 },
        { name: "SAVANA", logoUrl: "/clients/SavanaSticker.png", category: "Residential", order: 17 },
        { name: "KLJ GROUP", logoUrl: "/clients/KLJGroupSticker.png", category: "Industrial", order: 18 },
        { name: "ADITYA BIRLA GROUP", logoUrl: "/clients/AdityaBirlaGroupSticker.png", category: "Corporate", order: 19 },
      ];
      await NationalProject.insertMany(initialProjects);
      console.log(`[Seed] Initialized ${initialProjects.length} shared National Projects.`);
    }

    // 4. Seed Featured Products for Home Page
    const featuredCount = await FeaturedProduct.countDocuments();
    if (featuredCount === 0) {
      const initialFeatured = [
        {
          name: "LED Indoor Lights",
          category: "Commercial & Architectural",
          tagline: "High-efficiency indoor illumination engineered for architectural and commercial spaces.",
          description: "High-efficiency LED indoor luminaires designed for commercial complexes, corporate offices, and industrial facilities.",
          dayImage: "/images/products/homepage/product-01/day.png",
          nightImage: "/images/products/homepage/product-01/night.png",
          slug: "led-indoor-lights",
          order: 0,
        },
        {
          name: "Decorative Poles",
          category: "Urban & Architectural",
          tagline: "Aesthetic lighting infrastructure designed to elevate civic plazas and public parks.",
          description: "Aesthetically crafted decorative lighting poles designed for urban beautification, public parks, and commercial plazas.",
          dayImage: "/images/products/homepage/product-02/day.png",
          nightImage: "/images/products/homepage/product-02/night.png",
          slug: "decorative-poles",
          order: 1,
        },
        {
          name: "Designer Poles",
          category: "Contemporary Civic",
          tagline: "Distinctive contemporary pole geometries for landmark architectural developments.",
          description: "Custom-engineered designer poles featuring contemporary architectural geometries, hot-dip galvanization, and premium powder coating.",
          dayImage: "/images/products/homepage/product-03/day.png",
          nightImage: "/images/products/homepage/product-03/night.png",
          slug: "designer-poles",
          order: 2,
        },
        {
          name: "Flag Mast System",
          category: "Monumental Series",
          tagline: "Monumental flag infrastructure engineered to stand tall across public landmarks.",
          description: "High-tensile monumental flag mast poles designed to withstand extreme wind conditions with motorized halyard systems.",
          dayImage: "/images/products/homepage/product-04/day.png",
          nightImage: "/images/products/homepage/product-04/night.png",
          slug: "flag-mast-poles",
          order: 3,
        },
        {
          name: "Smart Camera Poles",
          category: "Surveillance & Security",
          tagline: "Rigid low-vibration smart surveillance and ANPR traffic monitoring poles.",
          description: "Heavy-duty CCTV and traffic surveillance poles engineered with low-vibration deflection and internal cabling channels.",
          dayImage: "/images/products/homepage/product-05/day.png",
          nightImage: "/images/products/homepage/product-05/night.png",
          slug: "camera-poles",
          order: 4,
        },
        {
          name: "Bollard Lighting",
          category: "Landscape & Pathway",
          tagline: "Precision outdoor pathway luminaires for pedestrian zones and landscapes.",
          description: "Precision outdoor pathway bollards and landscape luminaires engineered for perimeter security and pedestrian walkways.",
          dayImage: "/images/products/homepage/product-06/day.png",
          nightImage: "/images/products/homepage/product-06/night.png",
          slug: "bollards",
          order: 5,
        },
      ];
      await FeaturedProduct.insertMany(initialFeatured);
      console.log(`[Seed] Initialized ${initialFeatured.length} featured products.`);
    }

    // 5. Seed Catalog Products (18 items) and their Designs
    const productsCount = await Product.countDocuments();
    if (productsCount === 0) {
      const initialProducts = [
        {
          name: "LED Indoor Lights",
          slug: "led-indoor-lights",
          designCount: 36,
          tagline: "Efficient indoor illumination engineered for architectural and commercial spaces.",
          description: "High-efficiency LED indoor luminaires designed for commercial complexes, corporate offices, industrial facilities, and public infrastructure spaces.",
          dayImage: "/images/products/homepage/product-01/day.png",
          nightImage: "/images/products/homepage/product-01/night.png",
          order: 0,
        },
        {
          name: "LED Street Lights",
          slug: "led-street-lights",
          designCount: 24,
          tagline: "High-performance street lighting built for modern highways and municipal roads.",
          description: "Advanced LED street light systems engineered for municipal expressways, urban thoroughfares, and highway corridors.",
          dayImage: "/images/products/homepage/product-01/day.png",
          nightImage: "/images/products/homepage/product-01/night.png",
          order: 1,
        },
        {
          name: "Decorative Poles",
          slug: "decorative-poles",
          designCount: 41,
          tagline: "Lighting infrastructure designed to elevate civic and urban public spaces.",
          description: "Aesthetically crafted decorative lighting poles designed for urban beautification, public parks, commercial plazas, and resort walkways.",
          dayImage: "/images/products/homepage/product-02/day.png",
          nightImage: "/images/products/homepage/product-02/night.png",
          order: 2,
        },
        {
          name: "Designer Poles",
          slug: "designer-poles",
          designCount: 28,
          tagline: "Distinctive contemporary pole design for landmark architectural environments.",
          description: "Custom-engineered designer poles featuring contemporary architectural geometries, hot-dip galvanization, and premium powder-coated finishes.",
          dayImage: "/images/products/homepage/product-02/day.png",
          nightImage: "/images/products/homepage/product-02/night.png",
          order: 3,
        },
        {
          name: "Octagonal Poles",
          slug: "octagonal-poles",
          designCount: 16,
          tagline: "Heavy-duty galvanized steel infrastructure engineered for dependable performance.",
          description: "Industrial octagonal steel poles manufactured from high-tensile steel sheets, hot-dip galvanized in-house for expressways and heavy infrastructure.",
          dayImage: "/images/products/homepage/product-05/day.png",
          nightImage: "/images/products/homepage/product-05/night.png",
          order: 4,
        },
        {
          name: "Flag Mast Poles",
          slug: "flag-mast-poles",
          designCount: 8,
          tagline: "Monumental flag infrastructure engineered to stand tall across public and civic landmarks.",
          description: "High-tensile monumental flag mast poles designed and engineered to withstand extreme wind conditions, featuring internal halyard systems.",
          dayImage: "/images/products/homepage/product-04/day.png",
          nightImage: "/images/products/homepage/product-04/night.png",
          order: 5,
        },
        {
          name: "Camera Poles",
          slug: "camera-poles",
          designCount: 14,
          tagline: "Rigid vibration-resistant smart surveillance and ANPR camera mounting poles.",
          description: "Custom-built heavy-duty CCTV and traffic surveillance poles engineered with low-vibration deflection and internal cabling channels.",
          dayImage: "/images/products/homepage/product-05/day.png",
          nightImage: "/images/products/homepage/product-05/night.png",
          order: 6,
        },
        {
          name: "Stadium High Mast",
          slug: "stadium-high-mast",
          designCount: 12,
          tagline: "High-output arena floodlighting towers engineered for sports and stadiums.",
          description: "High-capacity stadium high mast towers engineered to support large multi-fixture LED floodlight headframes.",
          dayImage: "/images/products/homepage/product-05/day.png",
          nightImage: "/images/products/homepage/product-05/night.png",
          order: 7,
        },
        {
          name: "High Mast",
          slug: "high-mast",
          designCount: 18,
          tagline: "High-output illumination for expansive transport hubs and industrial yards.",
          description: "Monumental high mast lighting towers equipped with motorized winch lowering systems, multi-fixture floodlight crowns, and wind-load resistance.",
          dayImage: "/images/products/homepage/product-05/day.png",
          nightImage: "/images/products/homepage/product-05/night.png",
          order: 8,
        },
        {
          name: "Flood Lights",
          slug: "flood-lights",
          designCount: 20,
          tagline: "High-lumen optical floodlights for building facades, yards, and arenas.",
          description: "Heavy-duty industrial LED floodlights engineered with precision asymmetric optics, IP66 die-cast aluminum housing, and surge protection.",
          dayImage: "/images/products/homepage/product-01/day.png",
          nightImage: "/images/products/homepage/product-01/night.png",
          order: 9,
        },
        {
          name: "Post Top Illuminaries",
          slug: "post-top-illuminaries",
          designCount: 46,
          tagline: "Architectural post-top lighting that brings urban streetscapes to life.",
          description: "Civic post-top luminaires providing 360-degree symmetrical illumination for urban streetscapes, civic plazas, and campus walkways.",
          dayImage: "/images/products/homepage/product-03/day.png",
          nightImage: "/images/products/homepage/product-03/night.png",
          order: 10,
        },
        {
          name: "Bollards",
          slug: "bollards",
          designCount: 22,
          tagline: "Durable outdoor pathway illumination for pedestrian zones and landscapes.",
          description: "Precision outdoor pathway bollards and landscape luminaires engineered for perimeter security, garden lighting, and pedestrian walkway guidance.",
          dayImage: "/images/products/homepage/product-06/day.png",
          nightImage: "/images/products/homepage/product-06/night.png",
          order: 11,
        },
        {
          name: "Solar Lights",
          slug: "solar-lights",
          designCount: 23,
          tagline: "Autonomous solar illumination for smart, sustainable outdoor spaces.",
          description: "Autonomous solar-powered LED street lights and standalone solar luminaires equipped with high-efficiency PV panels.",
          dayImage: "/images/products/homepage/product-01/day.png",
          nightImage: "/images/products/homepage/product-01/night.png",
          order: 12,
        },
        {
          name: "Bulkhead Pathways",
          slug: "bulkhead-pathways",
          designCount: 22,
          tagline: "Robust impact-resistant bulkhead lighting for stairways, tunnels, and paths.",
          description: "Heavy-duty industrial bulkhead luminaires built with IK10 impact-resistant polycarbonate diffusers and die-cast aluminum enclosures.",
          dayImage: "/images/products/homepage/product-06/day.png",
          nightImage: "/images/products/homepage/product-06/night.png",
          order: 13,
        },
        {
          name: "Wall Washer",
          slug: "wall-washer",
          designCount: 15,
          tagline: "Uniform vertical surface grazing and architectural facade illumination.",
          description: "Linear and modular LED wall washer fixtures engineered with narrow-beam optics to graze textured architectural surfaces.",
          dayImage: "/images/products/homepage/product-06/day.png",
          nightImage: "/images/products/homepage/product-06/night.png",
          order: 14,
        },
        {
          name: "Solar Power Plants",
          slug: "solar-power-plants",
          designCount: 6,
          tagline: "Engineered solar power generation systems for sustainable infrastructure.",
          description: "Turnkey commercial solar power plant installations and grid-interactive solar arrays designed for institutional facilities.",
          dayImage: "/images/products/homepage/product-01/day.png",
          nightImage: "/images/products/homepage/product-01/night.png",
          order: 15,
        },
        {
          name: "Heritage Brackets",
          slug: "heritage-brackets",
          designCount: 24,
          tagline: "Intricate ornamental cast-iron and aluminum bracket assemblies.",
          description: "Decorative heritage bracket arms and vintage mounting assemblies crafted with intricate historical patterns.",
          dayImage: "/images/products/homepage/product-02/day.png",
          nightImage: "/images/products/homepage/product-02/night.png",
          order: 16,
        },
        {
          name: "Wall Lights",
          slug: "wall-lights",
          designCount: 18,
          tagline: "Architectural exterior and interior surface-mounted wall luminaires.",
          description: "Contemporary wall-mounted exterior fixtures delivering clean upward and downward light distribution for perimeter walls.",
          dayImage: "/images/products/homepage/product-06/day.png",
          nightImage: "/images/products/homepage/product-06/night.png",
          order: 17,
        },
      ];

      for (const p of initialProducts) {
        const createdProduct = await Product.create(p);
        
        // Seed initial designs for this product
        const designs = [];
        const count = Math.min(p.designCount || 8, 12);
        for (let i = 1; i <= count; i++) {
          const imgIndex = (i % 6) + 1;
          const numStr = String(i).padStart(2, "0");
          designs.push({
            productId: createdProduct._id,
            name: `${p.name} Model ${numStr}`,
            dayImage: `/images/products/homepage/product-0${imgIndex}/day.png`,
            nightImage: `/images/products/homepage/product-0${imgIndex}/night.png`,
            specs: "IP66 Weatherproof • Custom Engineering • ISO Standards",
            order: i - 1,
            active: true,
          });
        }
        await ProductDesign.insertMany(designs);
      }
      console.log(`[Seed] Initialized ${initialProducts.length} products and their designs.`);
    }

    // 6. Seed About Us
    const aboutCount = await AboutUs.countDocuments();
    if (aboutCount === 0) {
      await AboutUs.create({});
      console.log("[Seed] Initialized About Us content.");
    }

    // 7. Seed Footer Settings
    const footerCount = await FooterSettings.countDocuments();
    if (footerCount === 0) {
      await FooterSettings.create({});
      console.log("[Seed] Initialized Footer settings.");
    }

    console.log("[Seed] Database initialization complete.");
  } catch (error) {
    console.error("[Seed Error]:", error);
  }
};

// If run directly via node src/seed.js
if (process.argv[1] && process.argv[1].endsWith("seed.js")) {
  seedDatabase().then(() => {
    console.log("[Seed] Finished script execution.");
    process.exit(0);
  });
}
