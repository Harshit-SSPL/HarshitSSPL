import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const AdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Admin username is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password hash is required"],
    },
    role: {
      type: String,
      default: "superadmin",
      enum: ["admin", "superadmin"],
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Method to verify password
AdminSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.passwordHash);
};

export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
