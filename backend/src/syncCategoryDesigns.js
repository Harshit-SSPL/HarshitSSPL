import { connectDB } from "./config/db.js";
import Product from "./models/Product.js";
import ProductDesign from "./models/ProductDesign.js";
import dotenv from "dotenv";

dotenv.config();

const PRODUCT_IMAGE_MAP = {
  "decorative-poles": {
    day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614334/ssil_hp_prod02_day.png",
    night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614336/ssil_hp_prod02_night.png",
  },
  "designer-poles": {
    day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614330/ssil_hp_prod01_day.png",
    night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614332/ssil_hp_prod01_night.png",
  },
  "bollards": {
    day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614350/ssil_hp_prod06_day.png",
    night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614352/ssil_hp_prod06_night.png",
  },
  "led-indoor-lights": {
    day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614316/ssil_product_indoor_day.png",
    night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614319/ssil_product_indoor_night.png",
  },
  "octagonal-poles": {
    day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614320/ssil_product_octagonal_day.png",
    night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614322/ssil_product_octagonal_night.png",
  },
  "flag-mast-poles": {
    day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614342/ssil_hp_prod04_day.png",
    night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614344/ssil_hp_prod04_night.png",
  },
  "stadium-high-mast": {
    day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614346/ssil_hp_prod05_day.png",
    night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614348/ssil_hp_prod05_night.png",
  },
  "high-mast": {
    day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614346/ssil_hp_prod05_day.png",
    night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614348/ssil_hp_prod05_night.png",
  },
  "camera-poles": {
    day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614346/ssil_hp_prod05_day.png",
    night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614348/ssil_hp_prod05_night.png",
  },
  "led-street-lights": {
    day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614320/ssil_product_octagonal_day.png",
    night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614322/ssil_product_octagonal_night.png",
  },
  "post-top-illuminaries": {
    day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614338/ssil_hp_prod03_day.png",
    night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614340/ssil_hp_prod03_night.png",
  },
  "flood-lights": {
    day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614330/ssil_hp_prod01_day.png",
    night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614332/ssil_hp_prod01_night.png",
  },
  "bulkhead-pathways": {
    day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614316/ssil_product_indoor_day.png",
    night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614319/ssil_product_indoor_night.png",
  },
  "wall-washer": {
    day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614338/ssil_hp_prod03_day.png",
    night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614340/ssil_hp_prod03_night.png",
  },
  "heritage-brackets": {
    day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614334/ssil_hp_prod02_day.png",
    night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614336/ssil_hp_prod02_night.png",
  },
  "wall-lights": {
    day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614316/ssil_product_indoor_day.png",
    night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614319/ssil_product_indoor_night.png",
  },
  "solar-street-lights": {
    day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614330/ssil_hp_prod01_day.png",
    night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614332/ssil_hp_prod01_night.png",
  },
  "solar-bollards": {
    day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614350/ssil_hp_prod06_day.png",
    night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614352/ssil_hp_prod06_night.png",
  },
  "solar-flood-lights": {
    day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614330/ssil_hp_prod01_day.png",
    night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614332/ssil_hp_prod01_night.png",
  },
  "solar-pillar-lights": {
    day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614338/ssil_hp_prod03_day.png",
    night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614340/ssil_hp_prod03_night.png",
  },
  "solar-power-plants": {
    day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614325/ssil_product_solar_day.png",
    night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614328/ssil_product_solar_night.png",
  },
};

async function syncAllDesigns() {
  await connectDB();
  console.log("Syncing all ProductDesign images to match each product's specific images...");

  const products = await Product.find();
  for (const prod of products) {
    const map = PRODUCT_IMAGE_MAP[prod.slug] || {
      day: prod.dayImage,
      night: prod.nightImage || prod.dayImage,
    };

    const updated = await ProductDesign.updateMany(
      { productId: prod._id },
      {
        $set: {
          dayImage: map.day,
          nightImage: map.night,
        },
      }
    );

    console.log(`✓ ${prod.slug}: updated ${updated.modifiedCount} designs to category image: ${map.day}`);
  }

  console.log("Design sync complete!");
  process.exit(0);
}

syncAllDesigns().catch((err) => {
  console.error("Sync error:", err);
  process.exit(1);
});
