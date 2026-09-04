import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });
import mongoose from 'mongoose';
import Product from '../src/models/Product.js';

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  const prods = await Product.find().sort({ order: 1 });
  console.log(JSON.stringify(prods.map(p => ({ order: p.order, name: p.name, slug: p.slug, day: p.dayImage, night: p.nightImage })), null, 2));
  process.exit(0);
}
main();
