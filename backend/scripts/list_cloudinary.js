import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function listFolder(prefix) {
  const res = await cloudinary.api.resources({
    type: 'upload',
    prefix: prefix,
    max_results: 50,
  });
  console.log(`=== Folder: ${prefix} ===`);
  res.resources.forEach(r => {
    console.log(`${r.public_id} -> ${r.secure_url}`);
  });
}

async function main() {
  await listFolder('ssil_products_day');
  await listFolder('ssil_products_night');
  await listFolder('ssil_featured_products');
  await listFolder('ssil_banners');
  process.exit(0);
}
main();
