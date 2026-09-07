import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Product slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    tagline: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    designCount: {
      type: Number,
      default: 0,
    },
    dayImage: {
      type: String,
      default: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510375/ssil_products_day/day.png",
    },
    nightImage: {
      type: String,
      default: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510376/ssil_products_night/night.png",
    },
    heroImage: {
      type: String,
      default: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510355/ssil_banners/products-hero.png",
    },
    dayCloudinaryId: {
      type: String,
      default: "",
    },
    nightCloudinaryId: {
      type: String,
      default: "",
    },
    heroCloudinaryId: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.index({ order: 1 });

const m = mongoose.default || mongoose;
export default m.models?.Product || m.model("Product", ProductSchema);
