import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

const generateToken = (admin) => {
  const jwtSecret = process.env.JWT_SECRET || "ssil_secure_jwt_secret_key_2026_production_safe";
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
  return jwt.sign(
    {
      id: admin._id || admin.id || "bootstrap_admin_id",
      username: admin.username,
      role: admin.role || "superadmin",
    },
    jwtSecret,
    { expiresIn }
  );
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both admin username and password.",
      });
    }

    const cleanUser = username.toLowerCase().trim();
    const bootstrapUser = (process.env.ADMIN_BOOTSTRAP_USERNAME || "admin").toLowerCase().trim();
    const bootstrapPass = process.env.ADMIN_BOOTSTRAP_PASSWORD || "admin";

    // 1. Try finding in MongoDB
    try {
      const admin = await Admin.findOne({ username: cleanUser });
      if (admin) {
        const isMatch = await admin.comparePassword(password);
        if (isMatch) {
          admin.lastLogin = new Date();
          await admin.save();
          const token = generateToken(admin);

          const isProduction = process.env.NODE_ENV === "production";
          res.cookie("admin_token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "strict" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });

          return res.status(200).json({
            success: true,
            message: "Admin login successful.",
            token,
            admin: {
              id: admin._id,
              username: admin.username,
              role: admin.role,
            },
          });
        }
      }
    } catch (dbErr) {
      // MongoDB query skipped or in fallback mode
    }

    // 2. Check Bootstrap fallback credentials
    if (cleanUser === bootstrapUser && password === bootstrapPass) {
      const fallbackAdmin = {
        _id: "admin_super_01",
        username: bootstrapUser,
        role: "superadmin",
      };

      const token = generateToken(fallbackAdmin);
      const isProduction = process.env.NODE_ENV === "production";
      res.cookie("admin_token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "strict" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
        message: "Admin login successful (Bootstrap credentials).",
        token,
        admin: {
          id: fallbackAdmin._id,
          username: fallbackAdmin.username,
          role: fallbackAdmin.role,
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid admin credentials.",
    });
  } catch (error) {
    console.error("[Auth Login Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during authentication.",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("admin_token", {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Admin logged out successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error during logout.",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      admin: req.admin || { username: "admin", role: "superadmin" },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving admin profile.",
    });
  }
};
