import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Product from "../src/models/Product.js";
import ProductDesign from "../src/models/ProductDesign.js";

async function diagnose() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set in backend/.env!");
    process.exit(1);
  }

  const maskedUri = uri.replace(/\/\/([^:]+):([^@]+)@/, "//***:***@");
  console.log("Connecting to MongoDB URI:", maskedUri);

  await mongoose.connect(uri);
  console.log("Connected to MongoDB successfully!");

  const products = await Product.find({}).sort({ order: 1 }).lean();
  console.log(`\n=== Total Products in DB: ${products.length} ===`);
  for (const p of products) {
    const designs = await ProductDesign.find({ productId: p._id }).lean();
    console.log(`- [${p.slug}] "${p.name}" (ID: ${p._id}) | dayImage: ${!!p.dayImage}, heroImage: ${!!p.heroImage} | Designs in DB: ${designs.length}`);
  }

  // Check Designer Poles vs LED Indoor Lights vs Decorative Poles
  console.log("\n=== Detailed check for designer-poles vs led-indoor-lights ===");
  const designerPoles = await Product.findOne({ slug: "designer-poles" }).lean();
  console.log("designer-poles record:", JSON.stringify(designerPoles, null, 2));

  if (designerPoles) {
    const dpDesigns = await ProductDesign.find({ productId: designerPoles._id }).lean();
    console.log(`designer-poles designs count: ${dpDesigns.length}`);
    if (dpDesigns.length > 0) {
      console.log("First design sample:", dpDesigns[0]);
    }
  }

  const indoorLights = await Product.findOne({ slug: "led-indoor-lights" }).lean();
  console.log("\nled-indoor-lights record:", JSON.stringify(indoorLights, null, 2));
  if (indoorLights) {
    const indoorDesigns = await ProductDesign.find({ productId: indoorLights._id }).lean();
    console.log(`led-indoor-lights designs count: ${indoorDesigns.length}`);
    if (indoorDesigns.length > 0) {
      console.log("First design sample:", indoorDesigns[0]);
    }
  }

  const decorativePoles = await Product.findOne({ slug: "decorative-poles" }).lean();
  console.log("\ndecorative-poles record:", JSON.stringify(decorativePoles, null, 2));
  if (decorativePoles) {
    const decDesigns = await ProductDesign.find({ productId: decorativePoles._id }).lean();
    console.log(`decorative-poles designs count: ${decDesigns.length}`);
    if (decDesigns.length > 0) {
      console.log("First design sample:", decDesigns[0]);
    }
  }

  await mongoose.disconnect();
}

diagnose().catch(err => {
  console.error("Diagnostic error:", err);
  process.exit(1);
});
