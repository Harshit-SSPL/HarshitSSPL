import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });
import mongoose from 'mongoose';
import Product from '../src/models/Product.js';

async function updateStreetLights() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const streetLight = await Product.findOne({ slug: 'led-street-lights' });
  if (streetLight) {
    streetLight.dayImage = 'https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510369/ssil_products_day/day.png';
    streetLight.nightImage = 'https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510370/ssil_products_night/night.png';
    await streetLight.save();
    console.log('Updated led-street-lights in MongoDB:', streetLight);
  } else {
    console.log('led-street-lights not found');
  }
  process.exit(0);
}

updateStreetLights();
