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
import GalleryProject from "./models/GalleryProject.js";
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
        { name: "DAE", logoUrl: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788614357/ssil_client_daesticker.png", category: "Government", order: 0 },
        { name: "INDIAN OIL", logoUrl: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788614361/ssil_client_indianoilsticker.png", category: "PSU & Energy", order: 1 },
        { name: "INDIAN RAILWAYS", logoUrl: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788614362/ssil_client_indianrailwaysticker.png", category: "Transit", order: 2 },
        { name: "GRAND RETREAT", logoUrl: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788614359/ssil_client_grandretreatsticker.png", category: "Hospitality", order: 3 },
        { name: "BPTP", logoUrl: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788614356/ssil_client_bptpsticker.png", category: "Infrastructure", order: 4 },
        { name: "THE CORENTHUM", logoUrl: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788614372/ssil_client_thecorenthumsticker.png", category: "Corporate", order: 5 },
        { name: "ACE", logoUrl: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788614353/ssil_client_acesticker.png", category: "Infrastructure", order: 6 },
        { name: "GALAXY GROUP", logoUrl: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788614357/ssil_client_galaxygroupsticker.png", category: "Real Estate", order: 7 },
        { name: "ASIAN FIDELIS", logoUrl: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788614355/ssil_client_asianfidelissticker.png", category: "Healthcare", order: 8 },
        { name: "ORO GROUP", logoUrl: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788614365/ssil_client_orogroupsticker.png", category: "Commercial", order: 9 },
        { name: "HABITAT ENVIRO", logoUrl: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788614361/ssil_client_habitatenvirosticker.png", category: "Environmental", order: 10 },
        { name: "M3M", logoUrl: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788614363/ssil_client_m3msticker.png", category: "Real Estate", order: 11 },
        { name: "RAHEJA", logoUrl: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788614366/ssil_client_rahejasticker.png", category: "Real Estate", order: 12 },
        { name: "ROF AALAYAS", logoUrl: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788614369/ssil_client_rofaalayassticker.png", category: "Residential", order: 13 },
        { name: "TDI", logoUrl: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788614371/ssil_client_tdisticker.png", category: "Infrastructure", order: 14 },
        { name: "RPS GROUP", logoUrl: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788614370/ssil_client_rpsgroupsticker.png", category: "Real Estate", order: 15 },
      ];
      await NationalProject.insertMany(initialProjects);
      console.log(`[Seed] Initialized ${initialProjects.length} shared National Projects.`);
    }

    // 4. Seed Featured Products for Home Page (Exactly 6)
    const featuredCount = await FeaturedProduct.countDocuments();
    if (featuredCount === 0) {
      const initialFeatured = [
        {
          name: "LED Designer Pole",
          category: "Contemporary Civic",
          tagline: "Distinctive contemporary pole geometries for landmark architectural developments.",
          description: "Custom-engineered designer poles featuring contemporary architectural geometries, hot-dip galvanization, and premium powder coating.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614330/ssil_hp_prod01_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614332/ssil_hp_prod01_night.png",
          slug: "designer-poles",
          order: 0,
          active: true,
        },
        {
          name: "LED Decorative Pole",
          category: "Urban & Architectural",
          tagline: "Aesthetic lighting infrastructure designed to elevate civic plazas and public parks.",
          description: "Aesthetically crafted decorative lighting poles designed for urban beautification, public parks, and commercial plazas.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614334/ssil_hp_prod02_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614336/ssil_hp_prod02_night.png",
          slug: "decorative-poles",
          order: 1,
          active: true,
        },
        {
          name: "Post Top Illuminaires",
          category: "Civic Lighting",
          tagline: "Civic post-top luminaires providing 360-degree symmetrical illumination.",
          description: "Post-top lighting systems that bring urban streetscapes and civic pathways to life.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614338/ssil_hp_prod03_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614340/ssil_hp_prod03_night.png",
          slug: "post-top-illuminaries",
          order: 2,
          active: true,
        },
        {
          name: "Indian Flag Pole",
          category: "Monumental Series",
          tagline: "Monumental flag infrastructure engineered to stand tall across public landmarks.",
          description: "High-tensile monumental flag mast poles designed to withstand extreme wind conditions with motorized halyard systems.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614342/ssil_hp_prod04_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614344/ssil_hp_prod04_night.png",
          slug: "flag-mast-poles",
          order: 3,
          active: true,
        },
        {
          name: "High Mast Lighting",
          category: "Industrial & Stadium",
          tagline: "High-output illumination for expansive transport hubs and stadiums.",
          description: "Monumental high mast lighting towers equipped with motorized winch lowering systems.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614346/ssil_hp_prod05_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614348/ssil_hp_prod05_night.png",
          slug: "high-mast",
          order: 4,
          active: true,
        },
        {
          name: "Architectural Bollard",
          category: "Landscape & Pathway",
          tagline: "Precision outdoor pathway luminaires for pedestrian zones and landscapes.",
          description: "Precision outdoor pathway bollards and landscape luminaires engineered for perimeter security and pedestrian walkways.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614350/ssil_hp_prod06_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614352/ssil_hp_prod06_night.png",
          slug: "bollards",
          order: 5,
          active: true,
        },
      ];
      await FeaturedProduct.insertMany(initialFeatured);
      console.log(`[Seed] Initialized ${initialFeatured.length} featured products.`);
    }

    // 5. Seed Catalog Products (21 items) and their Designs
    const productsCount = await Product.countDocuments();
    if (productsCount === 0) {
      const initialProducts = [
        {
          name: "LED Decorative Poles",
          slug: "decorative-poles",
          designCount: 41,
          tagline: "Lighting infrastructure designed to elevate civic and urban public spaces.",
          description: "Aesthetically crafted decorative lighting poles designed for urban beautification, public parks, and commercial plazas.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614334/ssil_hp_prod02_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614336/ssil_hp_prod02_night.png",
          order: 0,
        },
        {
          name: "LED Designer Poles",
          slug: "designer-poles",
          designCount: 24,
          tagline: "Distinctive contemporary pole design for landmark architectural environments.",
          description: "Custom-engineered designer poles featuring contemporary architectural geometries, hot-dip galvanization, and premium powder-coated finishes.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614330/ssil_hp_prod01_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614332/ssil_hp_prod01_night.png",
          order: 1,
        },
        {
          name: "Bollards",
          slug: "bollards",
          designCount: 23,
          tagline: "Durable outdoor pathway illumination for pedestrian zones and landscapes.",
          description: "Precision outdoor pathway bollards and landscape luminaires engineered for perimeter security and pedestrian walkways.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614350/ssil_hp_prod06_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614352/ssil_hp_prod06_night.png",
          order: 2,
        },
        {
          name: "LED Indoor lights",
          slug: "led-indoor-lights",
          designCount: 26,
          tagline: "Efficient indoor illumination engineered for architectural and commercial spaces.",
          description: "High-efficiency LED indoor luminaires designed for commercial complexes, corporate offices, and industrial facilities.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614316/ssil_product_indoor_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614319/ssil_product_indoor_night.png",
          order: 3,
        },
        {
          name: "Octagonal Poles",
          slug: "octagonal-poles",
          designCount: 16,
          tagline: "Heavy-duty galvanized steel infrastructure engineered for dependable performance.",
          description: "Industrial octagonal steel poles manufactured from high-tensile steel sheets, hot-dip galvanized in-house.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614320/ssil_product_octagonal_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614322/ssil_product_octagonal_night.png",
          order: 4,
        },
        {
          name: "Flag Mast Poles",
          slug: "flag-mast-poles",
          designCount: 8,
          tagline: "Monumental flag infrastructure engineered to stand tall across public landmarks.",
          description: "High-tensile monumental flag mast poles designed and engineered to withstand extreme wind conditions.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614342/ssil_hp_prod04_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614344/ssil_hp_prod04_night.png",
          order: 5,
        },
        {
          name: "Stadium High Mast",
          slug: "stadium-high-mast",
          designCount: 12,
          tagline: "High-output arena floodlighting towers engineered for sports and stadiums.",
          description: "High-capacity stadium high mast towers engineered to support large multi-fixture LED floodlight headframes.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614346/ssil_hp_prod05_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614348/ssil_hp_prod05_night.png",
          order: 6,
        },
        {
          name: "High Mast",
          slug: "high-mast",
          designCount: 18,
          tagline: "High-output illumination for expansive transport hubs and industrial yards.",
          description: "Monumental high mast lighting towers equipped with motorized winch lowering systems.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614346/ssil_hp_prod05_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614348/ssil_hp_prod05_night.png",
          order: 7,
        },
        {
          name: "Camera Poles",
          slug: "camera-poles",
          designCount: 14,
          tagline: "Rigid vibration-resistant smart surveillance and ANPR camera mounting poles.",
          description: "Custom-built heavy-duty CCTV and traffic surveillance poles engineered with low-vibration deflection.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614346/ssil_hp_prod05_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614348/ssil_hp_prod05_night.png",
          order: 8,
        },
        {
          name: "LED Street Lights",
          slug: "led-street-lights",
          designCount: 12,
          tagline: "High-performance street lighting built for modern highways and municipal roads.",
          description: "Advanced LED street light systems engineered for municipal expressways and highway corridors.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614320/ssil_product_octagonal_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614322/ssil_product_octagonal_night.png",
          order: 9,
        },
        {
          name: "Post Top Illuminaries",
          slug: "post-top-illuminaries",
          designCount: 46,
          tagline: "Architectural post-top lighting that brings urban streetscapes to life.",
          description: "Civic post-top luminaires providing 360-degree symmetrical illumination for urban streetscapes.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614338/ssil_hp_prod03_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614340/ssil_hp_prod03_night.png",
          order: 10,
        },
        {
          name: "Flood Lights",
          slug: "flood-lights",
          designCount: 4,
          tagline: "High-lumen optical floodlights for building facades, yards, and arenas.",
          description: "Heavy-duty industrial LED floodlights engineered with precision asymmetric optics.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614330/ssil_hp_prod01_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614332/ssil_hp_prod01_night.png",
          order: 11,
        },
        {
          name: "Bulkhead Pathways",
          slug: "bulkhead-pathways",
          designCount: 15,
          tagline: "Robust impact-resistant bulkhead lighting for stairways, tunnels, and paths.",
          description: "Heavy-duty industrial bulkhead luminaires built with IK10 impact-resistant polycarbonate diffusers.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614316/ssil_product_indoor_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614319/ssil_product_indoor_night.png",
          order: 12,
        },
        {
          name: "Wall Washer",
          slug: "wall-washer",
          designCount: 12,
          tagline: "Uniform vertical surface grazing and architectural facade illumination.",
          description: "Linear and modular LED wall washer fixtures engineered with narrow-beam optics.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614338/ssil_hp_prod03_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614340/ssil_hp_prod03_night.png",
          order: 13,
        },
        {
          name: "Heritage Brackets",
          slug: "heritage-brackets",
          designCount: 24,
          tagline: "Intricate ornamental cast-iron and aluminum bracket assemblies.",
          description: "Decorative heritage bracket arms and vintage mounting assemblies crafted with intricate historical patterns.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614334/ssil_hp_prod02_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614336/ssil_hp_prod02_night.png",
          order: 14,
        },
        {
          name: "Wall Lights",
          slug: "wall-lights",
          designCount: 18,
          tagline: "Architectural exterior and interior surface-mounted wall luminaires.",
          description: "Contemporary wall-mounted exterior fixtures delivering clean upward and downward light distribution.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614316/ssil_product_indoor_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614319/ssil_product_indoor_night.png",
          order: 15,
        },
        {
          name: "Solar Street Lights",
          slug: "solar-street-lights",
          designCount: 16,
          tagline: "Autonomous high-efficiency solar street lighting for highways and roads.",
          description: "All-in-one and split-type solar LED street lights engineered with high-efficiency monocrystalline solar panels.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614330/ssil_hp_prod01_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614332/ssil_hp_prod01_night.png",
          order: 16,
        },
        {
          name: "Solar Bollards",
          slug: "solar-bollards",
          designCount: 12,
          tagline: "Eco-friendly solar landscape and pathway bollards.",
          description: "Modern architectural solar bollards designed for parks, resorts, and pedestrian pathways.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614350/ssil_hp_prod06_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614352/ssil_hp_prod06_night.png",
          order: 17,
        },
        {
          name: "Solar Flood Lights",
          slug: "solar-flood-lights",
          designCount: 10,
          tagline: "High-output solar floodlighting for perimeter security and yards.",
          description: "Heavy-duty solar-powered LED floodlights engineered with high lumen output and wide beam angles.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614330/ssil_hp_prod01_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614332/ssil_hp_prod01_night.png",
          order: 18,
        },
        {
          name: "Solar Pilar Lights",
          slug: "solar-pillar-lights",
          designCount: 12,
          tagline: "Architectural solar pillar and gate top luminaires.",
          description: "Decorative solar pillar and post-cap lighting fixtures featuring integrated solar cells.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614338/ssil_hp_prod03_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614340/ssil_hp_prod03_night.png",
          order: 19,
        },
        {
          name: "Solar Power Plants",
          slug: "solar-power-plants",
          designCount: 6,
          tagline: "Engineered solar power generation systems for sustainable infrastructure.",
          description: "Turnkey commercial solar power plant installations and grid-interactive solar arrays.",
          dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614325/ssil_product_solar_day.png",
          nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614328/ssil_product_solar_night.png",
          order: 20,
        },
      ];

      const hpImagesDay = [
        "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614330/ssil_hp_prod01_day.png",
        "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614334/ssil_hp_prod02_day.png",
        "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614338/ssil_hp_prod03_day.png",
        "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614342/ssil_hp_prod04_day.png",
        "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614346/ssil_hp_prod05_day.png",
        "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614350/ssil_hp_prod06_day.png",
      ];
      const hpImagesNight = [
        "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614332/ssil_hp_prod01_night.png",
        "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614336/ssil_hp_prod02_night.png",
        "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614340/ssil_hp_prod03_night.png",
        "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614344/ssil_hp_prod04_night.png",
        "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614348/ssil_hp_prod05_night.png",
        "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614352/ssil_hp_prod06_night.png",
      ];

      for (const p of initialProducts) {
        const createdProduct = await Product.create(p);
        
        // Seed initial designs for this product
        const designs = [];
        const count = Math.min(p.designCount || 8, 12);
        for (let i = 1; i <= count; i++) {
          const imgIndex = (i - 1) % 6;
          const numStr = String(i).padStart(2, "0");
          designs.push({
            productId: createdProduct._id,
            name: `${p.name} Model ${numStr}`,
            dayImage: hpImagesDay[imgIndex],
            nightImage: hpImagesNight[imgIndex],
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

    // 7. Seed Gallery Projects
    const galleryCount = await GalleryProject.countDocuments();
    if (galleryCount === 0) {
      const initialGallery = [
        {
          number: "01",
          title: "Monumental High-Tensile National Flag Mast Installation",
          subtitle: "Civic Landmark & Government Infrastructure Deployment",
          location: "Civic Plaza & National Monument Complex, India",
          categoryTag: "MONUMENTAL FLAG MAST",
          provided: "SSIL supplied and installed a 100-foot monumental high-tensile Indian National Flag mast system equipped with internal motorized winch hoisting, wind-load resistant structural engineering, and 360-degree LED floodlighting.",
          description: "Designed for extreme weather resilience and structural durability, this landmark installation features hot-dip galvanized steel sections manufactured to exact government tender specifications.",
          image: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614342/ssil_hp_prod04_day.png",
          stats: [
            { label: "Mast Height", value: "100 Ft." },
            { label: "Wind Rating", value: "180 km/h" },
            { label: "Finish", value: "Hot-Dip Galvanized" },
          ],
          order: 0,
          active: true,
        },
        {
          number: "02",
          title: "Expressway & National Highway Lighting Corridor",
          subtitle: "High-Speed Roadway Infrastructure & Expressway Illumination",
          location: "State Expressway & Highway Corridor Network",
          categoryTag: "HIGHWAY INFRASTRUCTURE",
          provided: "SSIL manufactured and deployed heavy-duty octagonal steel poles, dual-arm brackets, and IP66 high-efficacy LED street luminaires across a 45 km expressway thoroughfare.",
          description: "Built to endure industrial traffic, vibration, and extreme seasonal weather, the high-performance optics deliver uniform luminaire distribution and zero glare.",
          image: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614330/ssil_hp_prod01_day.png",
          stats: [
            { label: "Corridor Span", value: "45 Km" },
            { label: "Protection", value: "IP66 / IK10" },
            { label: "Lifespan", value: "25+ Years" },
          ],
          order: 1,
          active: true,
        },
        {
          number: "03",
          title: "Urban Heritage Plazas & Civic Beautification",
          subtitle: "Architectural Heritage Lighting & Ornamental Pole Installation",
          location: "Royal Civic Plaza & Heritage Promenade",
          categoryTag: "HERITAGE & DESIGNER POLES",
          provided: "SSIL designed, cast, and supplied vintage ornamental heritage poles with intricate cast-iron brackets, antique bronze finishes, and warm 3000K LED post-top luminaires.",
          description: "Seamlessly blending historical aesthetic charm with modern energy-saving technology, this installation transforms public pedestrian promenades.",
          image: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614334/ssil_hp_prod02_day.png",
          stats: [
            { label: "Design Type", value: "Cast-Iron Vintage" },
            { label: "Color Temp", value: "3000K Warm LED" },
            { label: "Poles Deployed", value: "120+ Units" },
          ],
          order: 2,
          active: true,
        },
        {
          number: "04",
          title: "High Mast & Industrial Arena Floodlighting",
          subtitle: "High-Output Sports Arena & Logistic Yard Illumination",
          location: "Industrial Freight Terminal & Sports Stadium Arena",
          categoryTag: "HIGH MAST TOWERS",
          provided: "SSIL engineered and delivered multi-fixture high mast towers featuring motorized lowering winch mechanisms, asymmetric floodlight crowns, and high-lumen stadium optics.",
          description: "Providing high-intensity, flicker-free illumination across expansive logistics and athletic spaces.",
          image: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614346/ssil_hp_prod05_day.png",
          stats: [
            { label: "Tower Height", value: "30 Meters" },
            { label: "Luminaires", value: "16x 400W Floodlights" },
            { label: "Lowering System", value: "Motorized Winch" },
          ],
          order: 3,
          active: true,
        },
        {
          number: "05",
          title: "Smart Civic Post-Top & Pedestrian Urban Streetscapes",
          subtitle: "Municipal Smart City & Public Walkway Lighting",
          location: "Smart City Civic Centre & Commercial District",
          categoryTag: "SMART CIVIC LIGHTING",
          provided: "SSIL supplied contemporary post-top luminaires integrated onto smart pole structures, supporting IoT surveillance camera mounts, environmental sensors, and automated central management system (CMS) controls.",
          description: "An end-to-end municipal smart city deployment that optimizes energy consumption by up to 65%.",
          image: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614338/ssil_hp_prod03_day.png",
          stats: [
            { label: "Smart Controls", value: "IoT CMS Enabled" },
            { label: "Energy Savings", value: "Up to 65%" },
            { label: "Distribution", value: "360° Symmetrical" },
          ],
          order: 4,
          active: true,
        },
        {
          number: "06",
          title: "Landscape Pathway & Perimeter Security Bollard Installation",
          subtitle: "Luxury Real Estate & Public Resort Environment",
          location: "Commercial Park & Luxury Residential Estate",
          categoryTag: "PATHWAY BOLLARDS",
          provided: "SSIL manufactured and integrated outdoor vandal-resistant architectural bollards along perimeter walkways, garden lawns, and water feature promenades.",
          description: "Combining low-glare architectural lighting with robust corrosion-resistant extruded aluminum housings.",
          image: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614350/ssil_hp_prod06_day.png",
          stats: [
            { label: "Housing Material", value: "Extruded Aluminum" },
            { label: "Vandal Rating", value: "IK10 Impact Resistant" },
            { label: "Environment", value: "Coastal / Landscape" },
          ],
          order: 5,
          active: true,
        },
      ];
      await GalleryProject.insertMany(initialGallery);
      console.log(`[Seed] Initialized ${initialGallery.length} Gallery Projects.`);
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
