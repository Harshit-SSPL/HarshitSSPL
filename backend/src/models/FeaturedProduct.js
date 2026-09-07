import mongoose from "mongoose";

const FeaturedProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Featured product name is required"],
      trim: true,
    },
    category: {
      type: String,
      default: "Infrastructure",
    },
    tagline: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    dayImage: {
      type: String,
      required: [true, "Day image URL is required"],
    },
    nightImage: {
      type: String,
      required: [true, "Night image URL is required"],
    },
    dayCloudinaryId: {
      type: String,
      default: "",
    },
    nightCloudinaryId: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      trim: true,
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

FeaturedProductSchema.index({ order: 1 });

const m = mongoose.default || mongoose;
export default m.models?.FeaturedProduct || m.model("FeaturedProduct", FeaturedProductSchema);
