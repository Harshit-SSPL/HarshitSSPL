import { uploadToCloudinaryStream, isCloudinaryConfigured } from "../config/cloudinary.js";

export const uploadSingleImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided in upload request.",
      });
    }

    const folder = req.body.folder || "ssil_website";

    // 1. If Cloudinary is configured, stream to Cloudinary
    if (isCloudinaryConfigured()) {
      const result = await uploadToCloudinaryStream(req.file.buffer, folder);
      return res.status(200).json({
        success: true,
        message: "Image uploaded to Cloudinary successfully.",
        url: result.url,
        publicId: result.publicId,
      });
    }

    // 2. Fallback: Return a data URI or local static indicator if Cloudinary is not configured yet
    const base64 = req.file.buffer.toString("base64");
    const dataUri = `data:${req.file.mimetype};base64,${base64}`;

    return res.status(200).json({
      success: true,
      message: "Image processed successfully (Cloudinary credentials optional/pending).",
      url: dataUri,
      publicId: `local_${Date.now()}`,
    });
  } catch (error) {
    console.error("[Upload Error]:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to upload image.",
    });
  }
};
