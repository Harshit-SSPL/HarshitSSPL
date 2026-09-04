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
const mapOutputFile = path.resolve(__dirname, "../../frontend/data/cloudinary-map.json");

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
      overwrite: true,
      use_filename: true,
      unique_filename: false,
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
  console.log("Starting Full Migration of Website Assets to Cloudinary");
  console.log(`Cloud Account: ${process.env.CLOUDINARY_CLOUD_NAME}`);
  console.log("==================================================");

  await connectDB();

  const urlMap = {};
  const uploadedCache = new Map();

  const getOrUpload = async (localPath, folder) => {
    if (!localPath || !localPath.startsWith("/")) return null;
    if (uploadedCache.has(localPath)) return uploadedCache.get(localPath);

    const res = await uploadLocalFileToCloudinary(localPath, folder);
    if (res) {
      uploadedCache.set(localPath, res);
      urlMap[localPath] = res.url;
    }
    return res;
  };

  // 1. Scan and Upload All Branding & Hero & Product Images
  console.log("\n[1/4] Uploading Static Branding & Hero Banners...");
  const staticAssets = [
    { path: "/branding/companylogo-ui.png", folder: "ssil_branding" },
    { path: "/branding/companylogo.png", folder: "ssil_branding" },
    { path: "/products/products-hero.png", folder: "ssil_banners" },
    { path: "/images/products/bollards/banner.png", folder: "ssil_banners" },
    { path: "/images/products/designer-poles/banner.png", folder: "ssil_banners" },
    { path: "/images/products/flag-mast-poles/banner.png", folder: "ssil_banners" },
    { path: "/images/products/led-indoor-lights/banner.png", folder: "ssil_banners" },
    { path: "/images/products/octagonal-poles/banner.png", folder: "ssil_banners" },
    { path: "/images/products/solar-power-plants/banner.png", folder: "ssil_banners" },
    { path: "/images/products/led-indoor-lights/day.png", folder: "ssil_products_day" },
    { path: "/images/products/led-indoor-lights/night.png", folder: "ssil_products_night" },
    { path: "/images/products/octagonal-poles/day.png", folder: "ssil_products_day" },
    { path: "/images/products/octagonal-poles/night.png", folder: "ssil_products_night" },
    { path: "/images/products/solar-power-plants/day.png", folder: "ssil_products_day" },
    { path: "/images/products/solar-power-plants/night.png", folder: "ssil_products_night" },
    { path: "/images/products/homepage/product-01/day.png", folder: "ssil_products_day" },
    { path: "/images/products/homepage/product-01/night.png", folder: "ssil_products_night" },
    { path: "/images/products/homepage/product-02/day.png", folder: "ssil_products_day" },
    { path: "/images/products/homepage/product-02/night.png", folder: "ssil_products_night" },
    { path: "/images/products/homepage/product-03/day.png", folder: "ssil_products_day" },
    { path: "/images/products/homepage/product-03/night.png", folder: "ssil_products_night" },
    { path: "/images/products/homepage/product-04/day.png", folder: "ssil_products_day" },
    { path: "/images/products/homepage/product-04/night.png", folder: "ssil_products_night" },
    { path: "/images/products/homepage/product-05/day.png", folder: "ssil_products_day" },
    { path: "/images/products/homepage/product-05/night.png", folder: "ssil_products_night" },
    { path: "/images/products/homepage/product-06/day.png", folder: "ssil_products_day" },
    { path: "/images/products/homepage/product-06/night.png", folder: "ssil_products_night" },
  ];

  for (const asset of staticAssets) {
    await getOrUpload(asset.path, asset.folder);
  }

  // 2. Update MongoDB Featured Products
  console.log("\n[2/4] Syncing MongoDB Featured Products to Cloudinary...");
  const featuredProducts = await FeaturedProduct.find();
  for (const feat of featuredProducts) {
    if (feat.dayImage && (feat.dayImage.startsWith("/") || urlMap[feat.dayImage])) {
      const uploadRes = await getOrUpload(feat.dayImage, "ssil_products_day");
      if (uploadRes) {
        feat.dayImage = uploadRes.url;
        feat.dayCloudinaryId = uploadRes.publicId;
      }
    }
    if (feat.nightImage && (feat.nightImage.startsWith("/") || urlMap[feat.nightImage])) {
      const uploadRes = await getOrUpload(feat.nightImage, "ssil_products_night");
      if (uploadRes) {
        feat.nightImage = uploadRes.url;
        feat.nightCloudinaryId = uploadRes.publicId;
      }
    }
    await feat.save();
    console.log(`✓ Updated Featured Product in DB: ${feat.name}`);
  }

  // 3. Update MongoDB Catalog Products
  console.log("\n[3/4] Syncing MongoDB Catalog Products to Cloudinary...");
  const products = await Product.find();
  for (const prod of products) {
    if (prod.dayImage && (prod.dayImage.startsWith("/") || urlMap[prod.dayImage])) {
      const uploadRes = await getOrUpload(prod.dayImage, "ssil_products_day");
      if (uploadRes) {
        prod.dayImage = uploadRes.url;
        prod.dayCloudinaryId = uploadRes.publicId;
      }
    }
    if (prod.nightImage && (prod.nightImage.startsWith("/") || urlMap[prod.nightImage])) {
      const uploadRes = await getOrUpload(prod.nightImage, "ssil_products_night");
      if (uploadRes) {
        prod.nightImage = uploadRes.url;
        prod.nightCloudinaryId = uploadRes.publicId;
      }
    }
    if (prod.heroImage && (prod.heroImage.startsWith("/") || urlMap[prod.heroImage])) {
      const uploadRes = await getOrUpload(prod.heroImage, "ssil_banners");
      if (uploadRes) {
        prod.heroImage = uploadRes.url;
        prod.heroCloudinaryId = uploadRes.publicId;
      }
    }
    await prod.save();
    console.log(`✓ Updated Catalog Product in DB: ${prod.name}`);
  }

  // 4. Update MongoDB Product Designs
  console.log("\n[4/4] Syncing MongoDB Product Designs to Cloudinary...");
  const designs = await ProductDesign.find();
  for (const des of designs) {
    if (des.dayImage && (des.dayImage.startsWith("/") || urlMap[des.dayImage])) {
      const uploadRes = await getOrUpload(des.dayImage, "ssil_product_designs");
      if (uploadRes) {
        des.dayImage = uploadRes.url;
        des.cloudinaryPublicId = uploadRes.publicId;
      }
    }
    if (des.nightImage && (des.nightImage.startsWith("/") || urlMap[des.nightImage])) {
      const uploadRes = await getOrUpload(des.nightImage, "ssil_product_designs");
      if (uploadRes) {
        des.nightImage = uploadRes.url;
      }
    }
    await des.save();
  }
  console.log(`✓ Updated ${designs.length} Product Designs in DB.`);

  // Write URL Map JSON file
  fs.writeFileSync(mapOutputFile, JSON.stringify(urlMap, null, 2), "utf8");
  console.log(`\n✓ Cloudinary mapping dictionary written to: ${mapOutputFile}`);

  console.log("\n==================================================");
  console.log("All Image Assets Successfully Uploaded to Cloudinary!");
  console.log("==================================================");
};

if (process.argv[1] && process.argv[1].endsWith("migrateToCloudinary.js")) {
  migrateAllAssetsToCloudinary().then(() => {
    console.log("Migration process completed.");
    process.exit(0);
  }).catch((err) => {
    console.error("Migration failed:", err);
    process.exit(1);
  });
}
