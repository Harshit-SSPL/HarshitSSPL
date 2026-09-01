import mongoose from "mongoose";

const AboutUsSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      default: "Delivering Dependable Infrastructure Lighting Solutions Across India",
    },
    subheading: {
      type: String,
      default: "Integrated Design, Precision Engineering, and In-House Hot-Dip Galvanizing",
    },
    mainDescription: {
      type: String,
      default:
        "Shiv Shakti India Limited (SSIL) is a premier manufacturer and infrastructure solutions provider specializing in high-performance outdoor lighting systems, high-tensile octagonal steel poles, monumental high masts, smart camera poles, and energy-efficient LED luminaires.",
    },
    supportingText: {
      type: String,
      default:
        "With state-of-the-art manufacturing infrastructure and an in-house hot-dip galvanizing plant, SSIL delivers turn-key execution for expressways, smart cities, municipal corporations, stadium complexes, and national landmarks across India.",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.AboutUs || mongoose.model("AboutUs", AboutUsSchema);
