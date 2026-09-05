import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import { connectDB } from "./config/db.js";
import NationalProject from "./models/NationalProject.js";
import FeaturedProduct from "./models/FeaturedProduct.js";
import Product from "./models/Product.js";
import ProductDesign from "./models/ProductDesign.js";
import GalleryProject from "./models/GalleryProject.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, "../../frontend/public");
const mapOutputFile = path.resolve(__dirname, "../../frontend/data/cloudinary-map.json");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFile = async (localRelPath, publicId) => {
  const cleanRel = localRelPath.startsWith("/") ? localRelPath.slice(1) : localRelPath;
  const fullPath = path.join(publicDir, cleanRel);

  if (!fs.existsSync(fullPath)) {
    console.warn(`[Skip] File does not exist locally: ${fullPath}`);
    return null;
  }

  try {
    const res = await cloudinary.uploader.upload(fullPath, {
      public_id: publicId,
      overwrite: true,
      resource_type: "image",
    });
    console.log(`✓ Uploaded ${cleanRel} -> ${res.secure_url}`);
    return {
      url: res.secure_url,
      publicId: res.public_id,
    };
  } catch (err) {
    console.error(`✗ Error uploading ${cleanRel}:`, err.message);
    return null;
  }
};

export const runFullMigration = async () => {
  console.log("===============================================================");
  console.log("Starting Definitive Cloudinary Asset Upload & Database Sync");
  console.log("===============================================================");

  await connectDB();

  const urlMap = {};

  // 1. Branding
  const brandingFiles = [
    { local: "branding/companylogo-ui.png", id: "ssil_branding_companylogo_ui" },
    { local: "branding/companylogo.png", id: "ssil_branding_companylogo" },
    { local: "products/products-hero.png", id: "ssil_banner_products_hero" },
  ];
  for (const item of brandingFiles) {
    const res = await uploadFile(item.local, item.id);
    if (res) urlMap["/" + item.local] = res.url;
  }

  // 2. Category Banners
  const bannerFiles = [
    { local: "images/products/bollards/banner.png", id: "ssil_banner_bollards" },
    { local: "images/products/designer-poles/banner.png", id: "ssil_banner_designer_poles" },
    { local: "images/products/flag-mast-poles/banner.png", id: "ssil_banner_flag_mast" },
    { local: "images/products/led-indoor-lights/banner.png", id: "ssil_banner_indoor_lights" },
    { local: "images/products/octagonal-poles/banner.png", id: "ssil_banner_octagonal_poles" },
    { local: "images/products/solar-power-plants/banner.png", id: "ssil_banner_solar_power_plants" },
  ];
  for (const item of bannerFiles) {
    const res = await uploadFile(item.local, item.id);
    if (res) urlMap["/" + item.local] = res.url;
  }

  // 3. Subcategory Distinct Images
  const subCategoryFiles = [
    { local: "images/products/led-indoor-lights/day.png", id: "ssil_product_indoor_day" },
    { local: "images/products/led-indoor-lights/night.png", id: "ssil_product_indoor_night" },
    { local: "images/products/octagonal-poles/day.png", id: "ssil_product_octagonal_day" },
    { local: "images/products/octagonal-poles/night.png", id: "ssil_product_octagonal_night" },
    { local: "images/products/solar-power-plants/day.png", id: "ssil_product_solar_day" },
    { local: "images/products/solar-power-plants/night.png", id: "ssil_product_solar_night" },
  ];
  for (const item of subCategoryFiles) {
    const res = await uploadFile(item.local, item.id);
    if (res) urlMap["/" + item.local] = res.url;
  }

  // 4. Homepage 6 Distinct Products
  const homepageProducts = [
    { local: "images/products/homepage/product-01/day.png", id: "ssil_hp_prod01_day" },
    { local: "images/products/homepage/product-01/night.png", id: "ssil_hp_prod01_night" },
    { local: "images/products/homepage/product-02/day.png", id: "ssil_hp_prod02_day" },
    { local: "images/products/homepage/product-02/night.png", id: "ssil_hp_prod02_night" },
    { local: "images/products/homepage/product-03/day.png", id: "ssil_hp_prod03_day" },
    { local: "images/products/homepage/product-03/night.png", id: "ssil_hp_prod03_night" },
    { local: "images/products/homepage/product-04/day.png", id: "ssil_hp_prod04_day" },
    { local: "images/products/homepage/product-04/night.png", id: "ssil_hp_prod04_night" },
    { local: "images/products/homepage/product-05/day.png", id: "ssil_hp_prod05_day" },
    { local: "images/products/homepage/product-05/night.png", id: "ssil_hp_prod05_night" },
    { local: "images/products/homepage/product-06/day.png", id: "ssil_hp_prod06_day" },
    { local: "images/products/homepage/product-06/night.png", id: "ssil_hp_prod06_night" },
  ];
  for (const item of homepageProducts) {
    const res = await uploadFile(item.local, item.id);
    if (res) urlMap["/" + item.local] = res.url;
  }

  // 5. Client Stickers
  const clientDir = path.join(publicDir, "clients");
  if (fs.existsSync(clientDir)) {
    const clientFiles = fs.readdirSync(clientDir);
    for (const file of clientFiles) {
      if (file.endsWith(".png") || file.endsWith(".jpg") || file.endsWith(".svg")) {
        const baseName = path.basename(file, path.extname(file)).toLowerCase();
        const res = await uploadFile(`clients/${file}`, `ssil_client_${baseName}`);
        if (res) urlMap[`/clients/${file}`] = res.url;
      }
    }
  }

  // Save urlMap JSON
  fs.writeFileSync(mapOutputFile, JSON.stringify(urlMap, null, 2), "utf8");
  console.log(`\n✓ Generated URL mapping file: ${mapOutputFile}`);

  // 6. SYNC MONGODB DATABASE COLLECTIONS WITH PURE CLOUDINARY URLS
  console.log("\n--- Syncing MongoDB Collections with Clean Cloudinary Assets ---");

  // Sync FeaturedProducts (Exactly 6 items)
  await FeaturedProduct.deleteMany({});
  const featuredSeed = [
    {
      name: "LED Designer Pole",
      category: "Contemporary Civic",
      tagline: "Distinctive contemporary pole geometries for landmark architectural developments.",
      description: "Custom-engineered designer poles featuring contemporary architectural geometries, hot-dip galvanization, and premium powder coating.",
      dayImage: urlMap["/images/products/homepage/product-01/day.png"] || "https://res.cloudinary.com/wlgmz8gr/image/upload/ssil_hp_prod01_day",
      nightImage: urlMap["/images/products/homepage/product-01/night.png"] || "https://res.cloudinary.com/wlgmz8gr/image/upload/ssil_hp_prod01_night",
      slug: "designer-poles",
      order: 0,
      active: true,
    },
    {
      name: "LED Decorative Pole",
      category: "Urban & Architectural",
      tagline: "Aesthetic lighting infrastructure designed to elevate civic plazas and public parks.",
      description: "Aesthetically crafted decorative lighting poles designed for urban beautification, public parks, and commercial plazas.",
      dayImage: urlMap["/images/products/homepage/product-02/day.png"] || "https://res.cloudinary.com/wlgmz8gr/image/upload/ssil_hp_prod02_day",
      nightImage: urlMap["/images/products/homepage/product-02/night.png"] || "https://res.cloudinary.com/wlgmz8gr/image/upload/ssil_hp_prod02_night",
      slug: "decorative-poles",
      order: 1,
      active: true,
    },
    {
      name: "Post Top Illuminaires",
      category: "Civic Lighting",
      tagline: "Civic post-top luminaires providing 360-degree symmetrical illumination.",
      description: "Post-top lighting systems that bring urban streetscapes and civic pathways to life.",
      dayImage: urlMap["/images/products/homepage/product-03/day.png"] || "https://res.cloudinary.com/wlgmz8gr/image/upload/ssil_hp_prod03_day",
      nightImage: urlMap["/images/products/homepage/product-03/night.png"] || "https://res.cloudinary.com/wlgmz8gr/image/upload/ssil_hp_prod03_night",
      slug: "post-top-illuminaries",
      order: 2,
      active: true,
    },
    {
      name: "Indian Flag Pole",
      category: "Monumental Series",
      tagline: "Monumental flag infrastructure engineered to stand tall across public landmarks.",
      description: "High-tensile monumental flag mast poles designed to withstand extreme wind conditions with motorized halyard systems.",
      dayImage: urlMap["/images/products/homepage/product-04/day.png"] || "https://res.cloudinary.com/wlgmz8gr/image/upload/ssil_hp_prod04_day",
      nightImage: urlMap["/images/products/homepage/product-04/night.png"] || "https://res.cloudinary.com/wlgmz8gr/image/upload/ssil_hp_prod04_night",
      slug: "flag-mast-poles",
      order: 3,
      active: true,
    },
    {
      name: "High Mast Lighting",
      category: "Industrial & Stadium",
      tagline: "High-output illumination for expansive transport hubs and stadiums.",
      description: "Monumental high mast lighting towers equipped with motorized winch lowering systems.",
      dayImage: urlMap["/images/products/homepage/product-05/day.png"] || "https://res.cloudinary.com/wlgmz8gr/image/upload/ssil_hp_prod05_day",
      nightImage: urlMap["/images/products/homepage/product-05/night.png"] || "https://res.cloudinary.com/wlgmz8gr/image/upload/ssil_hp_prod05_night",
      slug: "high-mast",
      order: 4,
      active: true,
    },
    {
      name: "Architectural Bollard",
      category: "Landscape & Pathway",
      tagline: "Precision outdoor pathway luminaires for pedestrian zones and landscapes.",
      description: "Precision outdoor pathway bollards and landscape luminaires engineered for perimeter security and pedestrian walkways.",
      dayImage: urlMap["/images/products/homepage/product-06/day.png"] || "https://res.cloudinary.com/wlgmz8gr/image/upload/ssil_hp_prod06_day",
      nightImage: urlMap["/images/products/homepage/product-06/night.png"] || "https://res.cloudinary.com/wlgmz8gr/image/upload/ssil_hp_prod06_night",
      slug: "bollards",
      order: 5,
      active: true,
    },
  ];
  await FeaturedProduct.insertMany(featuredSeed);
  console.log(`✓ Seeded ${featuredSeed.length} Featured Products with clean Cloudinary URLs.`);

  // Update National Projects logos in MongoDB
  const projects = await NationalProject.find();
  for (const p of projects) {
    if (p.logoUrl && urlMap[p.logoUrl]) {
      p.logoUrl = urlMap[p.logoUrl];
      await p.save();
    }
  }
  console.log(`✓ Updated ${projects.length} National Projects logos in DB.`);

  console.log("\n===============================================================");
  console.log("Migration Complete! All Database Items have Direct Cloudinary URLs");
  console.log("===============================================================");
};

runFullMigration().then(() => process.exit(0)).catch((e) => {
  console.error("Migration failed:", e);
  process.exit(1);
});
