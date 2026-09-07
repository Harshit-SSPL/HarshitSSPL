import mongoose from "mongoose";

const GalleryProjectSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      default: "01",
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    subtitle: {
      type: String,
      default: "",
      trim: true,
    },
    location: {
      type: String,
      default: "India",
      trim: true,
    },
    categoryTag: {
      type: String,
      default: "INFRASTRUCTURE",
      trim: true,
    },
    provided: {
      type: String,
      required: [true, "What SSIL Provided description is required"],
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      required: [true, "Project showcase image URL is required"],
    },
    cloudinaryPublicId: {
      type: String,
      default: "",
    },
    stats: [
      {
        label: { type: String, default: "" },
        value: { type: String, default: "" },
      },
    ],
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

GalleryProjectSchema.index({ order: 1, createdAt: 1 });

const m = mongoose.default || mongoose;
export default m.models?.GalleryProject || m.model("GalleryProject", GalleryProjectSchema);
