import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const authenticateAdmin = async (req, res, next) => {
  try {
    let token = null;

    // 1. Check HTTP-Only Cookie
    if (req.cookies && req.cookies.admin_token) {
      token = req.cookies.admin_token;
    }

    // 2. Check Authorization Header (Bearer token)
    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in to access the admin panel.",
      });
    }

    const jwtSecret = process.env.JWT_SECRET || "ssil_secure_jwt_secret_key_2026_production_safe";
    const decoded = jwt.verify(token, jwtSecret);

    try {
      const admin = await Admin.findById(decoded.id).select("-passwordHash");
      if (admin) {
        req.admin = admin;
        return next();
      }
    } catch (err) {
      // fallback
    }

    req.admin = {
      id: decoded.id,
      username: decoded.username || "admin",
      role: decoded.role || "superadmin",
    };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token. Please log in again.",
    });
  }
};

export default authenticateAdmin;
