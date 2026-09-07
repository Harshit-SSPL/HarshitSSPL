import mongoose from "mongoose";

const ProductDesignSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product reference is required"],
    },
    name: {
      type: String,
      required: [true, "Design/Model name is required"],
      trim: true,
    },
    dayImage: {
      type: String,
      required: [true, "Day image URL is required"],
    },
    nightImage: {
      type: String,
      default: "",
    },
    cloudinaryPublicId: {
      type: String,
      default: "",
    },
    specs: {
      type: String,
      default: "IP66 Weatherproof • Custom Engineering • ISO Standards",
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

ProductDesignSchema.index({ productId: 1, order: 1 });

const m = mongoose.default || mongoose;
export default m.models?.ProductDesign || m.model("ProductDesign", ProductDesignSchema);
