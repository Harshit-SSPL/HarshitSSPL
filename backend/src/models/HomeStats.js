import mongoose from "mongoose";

const HomeStatsSchema = new mongoose.Schema(
  {
    deployedFootprints: {
      value: { type: Number, default: 20000 },
      suffix: { type: String, default: "+" },
      label: { type: String, default: "Poles & Lighting Installations" },
      sublabel: { type: String, default: "DEPLOYED FOOTPRINT" },
    },
    yearsExperience: {
      value: { type: Number, default: 12 },
      suffix: { type: String, default: "+" },
      label: { type: String, default: "Years of Experience" },
      sublabel: { type: String, default: "ENGINEERING HERITAGE" },
    },
    statesServed: {
      value: { type: Number, default: 22 },
      suffix: { type: String, default: "+" },
      label: { type: String, default: "States & UTs Across India" },
      sublabel: { type: String, default: "PAN-INDIA PRESENCE" },
    },
    projectsCompleted: {
      value: { type: Number, default: 500 },
      suffix: { type: String, default: "+" },
      label: { type: String, default: "Government & Private Projects" },
      sublabel: { type: String, default: "EXECUTED CONTRACTS" },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.HomeStats || mongoose.model("HomeStats", HomeStatsSchema);
