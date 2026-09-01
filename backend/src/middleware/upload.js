import multer from "multer";

// Use memory storage for direct buffer streaming to Cloudinary
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/svg+xml",
    "image/gif",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file format. Only JPEG, PNG, WebP, SVG, and GIF images are allowed."), false);
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB maximum file size
  },
  fileFilter,
});

export default upload;
