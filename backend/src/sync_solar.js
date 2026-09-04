import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import ProductDesign from "./models/ProductDesign.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const CLOUDINARY_PRODUCTS_DAY = [
  "",
  "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510375/ssil_products_day/day.png",
  "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510377/ssil_products_day/day.png",
  "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510382/ssil_products_day/day.png",
  "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510386/ssil_products_day/day.png",
  "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510389/ssil_products_day/day.png",
  "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510391/ssil_products_day/day.png",
];

const CLOUDINARY_PRODUCTS_NIGHT = [
  "",
  "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510376/ssil_products_night/night.png",
  "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510381/ssil_products_night/night.png",
  "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510384/ssil_products_night/night.png",
  "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510388/ssil_products_night/night.png",
  "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510390/ssil_products_night/night.png",
  "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510392/ssil_products_night/night.png",
];

const newSolarProducts = [
  {
    name: "Solar Street Lights",
    slug: "solar-street-lights",
    designCount: 16,
    tagline: "Autonomous high-efficiency solar street lighting for highways and roads.",
    description: "All-in-one and split-type solar LED street lights engineered with high-efficiency monocrystalline solar panels, MPPT smart charge controllers, and deep-cycle lithium LiFePO4 batteries.",
    dayImage: CLOUDINARY_PRODUCTS_DAY[1],
    nightImage: CLOUDINARY_PRODUCTS_NIGHT[1],
    heroImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510364/ssil_banners/banner.png",
    order: 16,
    active: true,
  },
  {
    name: "Solar Bollards",
    slug: "solar-bollards",
    designCount: 12,
    tagline: "Eco-friendly solar landscape and pathway bollards.",
    description: "Modern architectural solar bollards designed for parks, resorts, and pedestrian pathways, operating with zero external wiring and dusk-to-dawn automated illumination.",
    dayImage: CLOUDINARY_PRODUCTS_DAY[6],
    nightImage: CLOUDINARY_PRODUCTS_NIGHT[6],
    heroImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510364/ssil_banners/banner.png",
    order: 17,
    active: true,
  },
  {
    name: "Solar Flood Lights",
    slug: "solar-flood-lights",
    designCount: 10,
    tagline: "High-output solar floodlighting for perimeter security and yards.",
    description: "Heavy-duty solar-powered LED floodlights engineered with high lumen output, wide beam angles, and rugged IP66 die-cast aluminum housing for off-grid outdoor areas.",
    dayImage: CLOUDINARY_PRODUCTS_DAY[1],
    nightImage: CLOUDINARY_PRODUCTS_NIGHT[1],
    heroImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510364/ssil_banners/banner.png",
    order: 18,
    active: true,
  },
  {
    name: "Solar Pilar Lights",
    slug: "solar-pillar-lights",
    designCount: 12,
    tagline: "Architectural solar pillar and gate top luminaires.",
    description: "Decorative solar pillar and post-cap lighting fixtures featuring integrated solar cells and 360-degree ambient lighting for boundary walls, gates, and terrace railings.",
    dayImage: CLOUDINARY_PRODUCTS_DAY[3],
    nightImage: CLOUDINARY_PRODUCTS_NIGHT[3],
    heroImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510382/ssil_products_day/day.png",
    nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510384/ssil_products_night/night.png",
    heroImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510364/ssil_banners/banner.png",
    order: 19,
    active: true,
  },
  {
    name: "Solar Power Plants",
    slug: "solar-power-plants",
    designCount: 6,
    tagline: "Engineered solar power generation systems for sustainable infrastructure.",
    description: "Turnkey commercial solar power plant installations and grid-interactive solar arrays designed for institutional facilities, manufacturing hubs, and public infrastructure energy independence.",
    dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510371/ssil_products_day/day.png",
    nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510373/ssil_products_night/night.png",
    heroImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510364/ssil_banners/banner.png",
    order: 20,
    active: true,
  },
];

async function run() {
  await connectDB();
  console.log("Connected to MongoDB. Syncing solar products...");

  // Remove legacy "solar-lights" product if present
  await Product.deleteMany({ slug: "solar-lights" });

  for (const p of newSolarProducts) {
    let prod = await Product.findOne({ slug: p.slug });
    if (!prod) {
      prod = await Product.create(p);
      console.log(`Created product: ${p.name}`);
    } else {
      prod.name = p.name;
      prod.tagline = p.tagline;
      prod.description = p.description;
      prod.order = p.order;
      if (!prod.heroImage) prod.heroImage = p.heroImage;
      await prod.save();
      console.log(`Updated product: ${p.name}`);
    }

    // Check designs count
    const existingDesigns = await ProductDesign.countDocuments({ productId: prod._id });
    if (existingDesigns === 0) {
      const designs = [];
      const count = Math.min(p.designCount || 8, 12);
      for (let i = 1; i <= count; i++) {
        const imgIndex = (i % 6) + 1;
        const numStr = String(i).padStart(2, "0");
        designs.push({
          productId: prod._id,
          name: `${p.name} Model ${numStr}`,
          dayImage: CLOUDINARY_PRODUCTS_DAY[imgIndex],
          nightImage: CLOUDINARY_PRODUCTS_NIGHT[imgIndex],
          specs: "IP66 Weatherproof • Custom Engineering • ISO Standards",
          order: i - 1,
          active: true,
        });
      }
      await ProductDesign.insertMany(designs);
      console.log(`Seeded ${designs.length} designs for ${p.name}`);
    }
  }

  console.log("Solar products sync complete!");
  process.exit(0);
}

run().catch((err) => {
  console.error("Error syncing solar products:", err);
  process.exit(1);
});
