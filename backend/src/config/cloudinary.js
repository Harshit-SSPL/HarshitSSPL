import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

export const isCloudinaryConfigured = () => {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

export const uploadToCloudinaryStream = (fileBuffer, folder = "ssil_website") => {
  return new Promise((resolve, reject) => {
    if (!isCloudinaryConfigured()) {
      return reject(new Error("Cloudinary credentials are not configured in backend .env"));
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    uploadStream.end(fileBuffer);
  });
};

export const deleteFromCloudinary = async (publicId) => {
  if (!publicId || !isCloudinaryConfigured()) return null;
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error(`[Cloudinary] Failed to delete asset ${publicId}:`, error.message);
    return null;
  }
};

export default cloudinary;
