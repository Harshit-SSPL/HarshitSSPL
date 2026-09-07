import ProductDesign from "../models/ProductDesign.js";
import Product from "../models/Product.js";
import { deleteFromCloudinary } from "../config/cloudinary.js";

// Helper to find a product by either MongoDB ObjectId or URL slug
const resolveProduct = async (identifier) => {
  if (!identifier) return null;
  if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
    const byId = await Product.findById(identifier).lean();
    if (byId) return byId;
  }
  return await Product.findOne({ slug: identifier.toLowerCase().trim() }).lean();
};

// GET /api/products/:productId/designs (Fetch public designs for a product)
export const getProductDesigns = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await resolveProduct(productId);
    if (!product) {
      return res.status(200).json({ success: true, designs: [] });
    }

    const designs = await ProductDesign.find({ productId: product._id, active: true })
      .sort({ order: 1, createdAt: 1 })
      .lean();
    return res.status(200).json({
      success: true,
      designs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product designs.",
    });
  }
};

// GET /api/products/:productId/designs/admin (Admin - includes inactive)
export const getAllProductDesignsAdmin = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await resolveProduct(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const designs = await ProductDesign.find({ productId: product._id })
      .sort({ order: 1, createdAt: 1 })
      .lean();
    return res.status(200).json({
      success: true,
      product,
      designs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch designs for admin.",
    });
  }
};

// POST /api/products/:productId/designs (Admin protected)
export const createProductDesign = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await resolveProduct(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Parent product not found.",
      });
    }

    const count = await ProductDesign.countDocuments({ productId: product._id });
    const design = await ProductDesign.create({
      ...req.body,
      productId: product._id,
      order: req.body.order ?? count,
    });

    // Update parent product designCount
    const newCount = await ProductDesign.countDocuments({ productId: product._id, active: true });
    await Product.findByIdAndUpdate(product._id, { designCount: newCount });

    return res.status(201).json({
      success: true,
      message: "Product design added successfully.",
      design,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create product design.",
    });
  }
};

// PUT /api/product-designs/:id (Admin protected)
export const updateProductDesign = async (req, res) => {
  try {
    const targetId = req.params.id || req.params.designId;
    const existing = await ProductDesign.findById(targetId);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Product design not found.",
      });
    }

    if (req.body.dayImage && existing.dayImage !== req.body.dayImage && existing.cloudinaryPublicId) {
      await deleteFromCloudinary(existing.cloudinaryPublicId);
    }

    const updated = await ProductDesign.findByIdAndUpdate(targetId, req.body, {
      new: true,
      runValidators: true,
    });

    // Update design count on parent
    const activeCount = await ProductDesign.countDocuments({ productId: existing.productId, active: true });
    await Product.findByIdAndUpdate(existing.productId, { designCount: activeCount });

    return res.status(200).json({
      success: true,
      message: "Product design updated successfully.",
      design: updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update product design.",
    });
  }
};

// DELETE /api/product-designs/:id (Admin protected)
export const deleteProductDesign = async (req, res) => {
  try {
    const targetId = req.params.id || req.params.designId;
    const design = await ProductDesign.findById(targetId);
    if (!design) {
      return res.status(404).json({
        success: false,
        message: "Product design not found.",
      });
    }

    if (design.cloudinaryPublicId) {
      await deleteFromCloudinary(design.cloudinaryPublicId);
    }

    const productId = design.productId;
    await ProductDesign.findByIdAndDelete(targetId);

    // Update parent product count
    const activeCount = await ProductDesign.countDocuments({ productId, active: true });
    await Product.findByIdAndUpdate(productId, { designCount: activeCount });

    return res.status(200).json({
      success: true,
      message: "Product design deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete product design.",
    });
  }
};
