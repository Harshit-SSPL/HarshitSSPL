import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Product from "../src/models/Product.js";
import ProductDesign from "../src/models/ProductDesign.js";

async function checkAll() {
  await mongoose.connect(process.env.MONGODB_URI);
  const products = await Product.find({}).sort({ order: 1 });
  console.log(`Checking ${products.length} products...\n`);

  for (const p of products) {
    const designs = await ProductDesign.find({ productId: p._id }).sort({ order: 1 });
    const emptyDay = designs.filter(d => !d.dayImage || d.dayImage.trim() === "");
    const emptyNight = designs.filter(d => !d.nightImage || d.nightImage.trim() === "");
    const invalidUrls = designs.filter(d => d.dayImage && !d.dayImage.startsWith("http"));
    console.log(`Product [${p.slug}] "${p.name}" (hero: ${!!p.heroImage}, day: ${!!p.dayImage})`);
    console.log(`  Total designs in DB: ${designs.length} | Missing dayImage: ${emptyDay.length} | Missing nightImage: ${emptyNight.length} | Non-http dayImage: ${invalidUrls.length}`);
    if (designs.length > 0) {
      console.log(`  Design 1 dayImage: ${designs[0].dayImage}`);
    }
  }

  await mongoose.disconnect();
}

checkAll().catch(e => { console.error(e); process.exit(1); });
