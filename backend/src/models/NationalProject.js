import mongoose from "mongoose";

const NationalProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },
    logoUrl: {
      type: String,
      required: [true, "Logo image URL is required"],
    },
    cloudinaryPublicId: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "Infrastructure",
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

NationalProjectSchema.index({ order: 1, createdAt: -1 });

export default mongoose.models.NationalProject || mongoose.model("NationalProject", NationalProjectSchema);
