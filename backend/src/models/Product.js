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
      default: "/images/products/homepage/product-01/day.png",
    },
    nightImage: {
      type: String,
      default: "/images/products/homepage/product-01/night.png",
    },
    heroImage: {
      type: String,
      default: "/products/products-hero.png",
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

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
