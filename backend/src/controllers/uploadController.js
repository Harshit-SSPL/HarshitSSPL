import { uploadToCloudinaryStream, isCloudinaryConfigured } from "../config/cloudinary.js";

export const uploadSingleImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided. Please select an image file to upload.",
      });
    }

    if (!isCloudinaryConfigured()) {
      return res.status(500).json({
        success: false,
        message: "Cloudinary is not properly configured on the server. Please check Cloudinary API keys.",
      });
    }

    const folder = req.body.folder || "ssil_website";

    // Direct memory stream upload to Cloudinary
    const result = await uploadToCloudinaryStream(req.file.buffer, folder);

    return res.status(200).json({
      success: true,
      message: "Image uploaded and hosted on Cloudinary successfully.",
      url: result.url,
      publicId: result.publicId,
    });
  } catch (error) {
    console.error("[Cloudinary Upload Error]:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to upload image to Cloudinary.",
    });
  }
};
