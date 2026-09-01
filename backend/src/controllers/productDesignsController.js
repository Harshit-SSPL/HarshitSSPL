import ProductDesign from "../models/ProductDesign.js";
import Product from "../models/Product.js";
import { deleteFromCloudinary } from "../config/cloudinary.js";

// GET /api/products/:productId/designs (Fetch designs for a product)
export const getProductDesigns = async (req, res) => {
  try {
    const { productId } = req.params;
    const designs = await ProductDesign.find({ productId, active: true }).sort({ order: 1, createdAt: 1 });
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
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const designs = await ProductDesign.find({ productId }).sort({ order: 1, createdAt: 1 });
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
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Parent product not found.",
      });
    }

    const count = await ProductDesign.countDocuments({ productId });
    const design = await ProductDesign.create({
      ...req.body,
      productId,
      order: req.body.order ?? count,
    });

    // Update parent product designCount
    const newCount = await ProductDesign.countDocuments({ productId, active: true });
    await Product.findByIdAndUpdate(productId, { designCount: newCount });

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
    const existing = await ProductDesign.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Product design not found.",
      });
    }

    if (req.body.dayImage && existing.dayImage !== req.body.dayImage && existing.cloudinaryPublicId) {
      await deleteFromCloudinary(existing.cloudinaryPublicId);
    }

    const updated = await ProductDesign.findByIdAndUpdate(req.params.id, req.body, {
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
    const design = await ProductDesign.findById(req.params.id);
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
    await ProductDesign.findByIdAndDelete(req.params.id);

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
