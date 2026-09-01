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

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, "../../frontend/public");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadLocalFileToCloudinary = async (localRelativePath, folder = "ssil_website") => {
  try {
    const cleanRelative = localRelativePath.startsWith("/") ? localRelativePath.slice(1) : localRelativePath;
    const fullPath = path.join(publicDir, cleanRelative);

    if (!fs.existsSync(fullPath)) {
      console.warn(`[Cloudinary Migration] File not found locally: ${fullPath}`);
      return null;
    }

    const result = await cloudinary.uploader.upload(fullPath, {
      folder,
      resource_type: "image",
    });

    console.log(`[Cloudinary Uploaded] ${cleanRelative} -> ${result.secure_url}`);
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error(`[Cloudinary Migration Error] ${localRelativePath}:`, error.message);
    return null;
  }
};

export const migrateAllAssetsToCloudinary = async () => {
  console.log("==================================================");
  console.log("Starting Full Migration to Cloudinary CDN Storage");
  console.log(`Cloud: ${process.env.CLOUDINARY_CLOUD_NAME}`);
  console.log("==================================================");

  await connectDB();

  // Cache to avoid re-uploading the exact same local file path multiple times
  const uploadedCache = new Map();

  const getOrUpload = async (localPath, folder) => {
    if (!localPath || !localPath.startsWith("/")) return null;
    if (uploadedCache.has(localPath)) return uploadedCache.get(localPath);

    const res = await uploadLocalFileToCloudinary(localPath, folder);
    if (res) {
      uploadedCache.set(localPath, res);
    }
    return res;
  };

  // 1. Migrate National Projects
  console.log("\n[1/4] Migrating National Projects logos to Cloudinary...");
  const nationalProjects = await NationalProject.find();
  for (const proj of nationalProjects) {
    if (proj.logoUrl && proj.logoUrl.startsWith("/")) {
      const uploadRes = await getOrUpload(proj.logoUrl, "ssil_national_projects");
      if (uploadRes) {
        proj.logoUrl = uploadRes.url;
        proj.cloudinaryPublicId = uploadRes.publicId;
        await proj.save();
        console.log(`✓ Updated Project: ${proj.name}`);
      }
    }
  }

  // 2. Migrate Featured Products
  console.log("\n[2/4] Migrating Home Featured Products to Cloudinary...");
  const featuredProducts = await FeaturedProduct.find();
  for (const feat of featuredProducts) {
    if (feat.dayImage && feat.dayImage.startsWith("/")) {
      const uploadRes = await getOrUpload(feat.dayImage, "ssil_featured_products");
      if (uploadRes) {
        feat.dayImage = uploadRes.url;
        feat.dayCloudinaryId = uploadRes.publicId;
      }
    }
    if (feat.nightImage && feat.nightImage.startsWith("/")) {
      const uploadRes = await getOrUpload(feat.nightImage, "ssil_featured_products");
      if (uploadRes) {
        feat.nightImage = uploadRes.url;
        feat.nightCloudinaryId = uploadRes.publicId;
      }
    }
    await feat.save();
    console.log(`✓ Updated Featured Product: ${feat.name}`);
  }

  // 3. Migrate Catalog Products
  console.log("\n[3/4] Migrating Catalog Products to Cloudinary...");
  const products = await Product.find();
  for (const prod of products) {
    if (prod.dayImage && prod.dayImage.startsWith("/")) {
      const uploadRes = await getOrUpload(prod.dayImage, "ssil_products_day");
      if (uploadRes) {
        prod.dayImage = uploadRes.url;
        prod.dayCloudinaryId = uploadRes.publicId;
      }
    }
    if (prod.nightImage && prod.nightImage.startsWith("/")) {
      const uploadRes = await getOrUpload(prod.nightImage, "ssil_products_night");
      if (uploadRes) {
        prod.nightImage = uploadRes.url;
        prod.nightCloudinaryId = uploadRes.publicId;
      }
    }
    if (prod.heroImage && prod.heroImage.startsWith("/")) {
      const uploadRes = await getOrUpload(prod.heroImage, "ssil_products_hero");
      if (uploadRes) {
        prod.heroImage = uploadRes.url;
        prod.heroCloudinaryId = uploadRes.publicId;
      }
    }
    await prod.save();
    console.log(`✓ Updated Catalog Product: ${prod.name}`);
  }

  // 4. Migrate Product Designs
  console.log("\n[4/4] Migrating Product Designs to Cloudinary...");
  const designs = await ProductDesign.find();
  for (const des of designs) {
    if (des.dayImage && des.dayImage.startsWith("/")) {
      const uploadRes = await getOrUpload(des.dayImage, "ssil_product_designs");
      if (uploadRes) {
        des.dayImage = uploadRes.url;
        des.cloudinaryPublicId = uploadRes.publicId;
      }
    }
    if (des.nightImage && des.nightImage.startsWith("/")) {
      const uploadRes = await getOrUpload(des.nightImage, "ssil_product_designs");
      if (uploadRes) {
        des.nightImage = uploadRes.url;
      }
    }
    await des.save();
  }
  console.log(`✓ Updated ${designs.length} Product Designs to Cloudinary URLs.`);

  console.log("\n==================================================");
  console.log("All Assets Successfully Migrated & Hosted on Cloudinary!");
  console.log("==================================================");
};

if (process.argv[1] && process.argv[1].endsWith("migrateToCloudinary.js")) {
  migrateAllAssetsToCloudinary().then(() => {
    console.log("Migration process completed.");
    process.exit(0);
  });
}
