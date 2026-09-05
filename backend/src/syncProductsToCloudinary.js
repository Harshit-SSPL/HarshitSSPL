import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/Product.js";
import ProductDesign from "./models/ProductDesign.js";

dotenv.config();

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

const categoryImageMap = {
  "decorative-poles": { day: hpImagesDay[1], night: hpImagesNight[1], banner: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614300/ssil_banner_products_hero.png" },
  "designer-poles": { day: hpImagesDay[0], night: hpImagesNight[0], banner: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614304/ssil_banner_designer_poles.png" },
  "bollards": { day: hpImagesDay[5], night: hpImagesNight[5], banner: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614302/ssil_banner_bollards.png" },
  "led-indoor-lights": { day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614316/ssil_product_indoor_day.png", night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614319/ssil_product_indoor_night.png", banner: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614309/ssil_banner_indoor_lights.png" },
  "octagonal-poles": { day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614320/ssil_product_octagonal_day.png", night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614322/ssil_product_octagonal_night.png", banner: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614311/ssil_banner_octagonal_poles.png" },
  "flag-mast-poles": { day: hpImagesDay[3], night: hpImagesNight[3], banner: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614307/ssil_banner_flag_mast.png" },
  "stadium-high-mast": { day: hpImagesDay[4], night: hpImagesNight[4], banner: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614300/ssil_banner_products_hero.png" },
  "high-mast": { day: hpImagesDay[4], night: hpImagesNight[4], banner: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614300/ssil_banner_products_hero.png" },
  "camera-poles": { day: hpImagesDay[4], night: hpImagesNight[4], banner: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614300/ssil_banner_products_hero.png" },
  "led-street-lights": { day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614320/ssil_product_octagonal_day.png", night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614322/ssil_product_octagonal_night.png", banner: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614300/ssil_banner_products_hero.png" },
  "post-top-illuminaries": { day: hpImagesDay[2], night: hpImagesNight[2], banner: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614300/ssil_banner_products_hero.png" },
  "flood-lights": { day: hpImagesDay[0], night: hpImagesNight[0], banner: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614300/ssil_banner_products_hero.png" },
  "bulkhead-pathways": { day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614316/ssil_product_indoor_day.png", night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614319/ssil_product_indoor_night.png", banner: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614300/ssil_banner_products_hero.png" },
  "wall-washer": { day: hpImagesDay[2], night: hpImagesNight[2], banner: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614300/ssil_banner_products_hero.png" },
  "heritage-brackets": { day: hpImagesDay[1], night: hpImagesNight[1], banner: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614300/ssil_banner_products_hero.png" },
  "wall-lights": { day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614316/ssil_product_indoor_day.png", night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614319/ssil_product_indoor_night.png", banner: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614300/ssil_banner_products_hero.png" },
  "solar-street-lights": { day: hpImagesDay[0], night: hpImagesNight[0], banner: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614314/ssil_banner_solar_power_plants.png" },
  "solar-bollards": { day: hpImagesDay[5], night: hpImagesNight[5], banner: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614314/ssil_banner_solar_power_plants.png" },
  "solar-flood-lights": { day: hpImagesDay[0], night: hpImagesNight[0], banner: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614314/ssil_banner_solar_power_plants.png" },
  "solar-pillar-lights": { day: hpImagesDay[2], night: hpImagesNight[2], banner: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614314/ssil_banner_solar_power_plants.png" },
  "solar-power-plants": { day: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614325/ssil_product_solar_day.png", night: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614328/ssil_product_solar_night.png", banner: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614314/ssil_banner_solar_power_plants.png" },
};

const sync = async () => {
  await connectDB();

  console.log("Updating Products in MongoDB...");
  const prods = await Product.find();
  for (const p of prods) {
    const map = categoryImageMap[p.slug];
    if (map) {
      p.dayImage = map.day;
      p.nightImage = map.night;
      p.heroImage = map.banner;
      await p.save();
      console.log(`✓ Updated Product: ${p.name}`);
    }
  }

  console.log("Updating Product Designs in MongoDB...");
  const designs = await ProductDesign.find();
  for (const d of designs) {
    const imgIndex = (d.order || 0) % 6;
    d.dayImage = hpImagesDay[imgIndex];
    d.nightImage = hpImagesNight[imgIndex];
    await d.save();
  }
  console.log(`✓ Updated ${designs.length} Product Designs.`);

  console.log("Database Sync Complete!");
  process.exit(0);
};

sync().catch((e) => {
  console.error(e);
  process.exit(1);
});
