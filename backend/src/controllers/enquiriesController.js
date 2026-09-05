import Enquiry from "../models/Enquiry.js";

// 1. PUBLIC: Create New Enquiry or Contact Message
export const createEnquiry = async (req, res) => {
  try {
    const {
      type = "product_enquiry",
      firstName,
      lastName,
      email,
      phone,
      category,
      productCategory,
      model,
      productModel,
      message,
      enquiry,
    } = req.body;

    if (!firstName || !email) {
      return res.status(400).json({
        success: false,
        message: "First name and email are required.",
      });
    }

    const finalMessage = message || enquiry || "";
    if (!finalMessage) {
      return res.status(400).json({
        success: false,
        message: "Message/Enquiry details are required.",
      });
    }

    const newEnquiry = new Enquiry({
      type: type === "contact" || type === "contact_message" ? "contact_message" : "product_enquiry",
      firstName: firstName.trim(),
      lastName: (lastName || "").trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || "").trim(),
      productCategory: (productCategory || category || "").trim(),
      productModel: (productModel || model || "").trim(),
      message: finalMessage.trim(),
      status: "new",
    });

    await newEnquiry.save();

    return res.status(201).json({
      success: true,
      message: "Your enquiry has been received by our engineering team.",
      enquiry: newEnquiry,
    });
  } catch (error) {
    console.error("Error creating enquiry:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error submitting enquiry.",
      error: error.message,
    });
  }
};

// 2. ADMIN: Get All Enquiries with Summary Counters
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    const totalCount = enquiries.length;
    const newCount = enquiries.filter((e) => e.status === "new").length;
    const productCount = enquiries.filter((e) => e.type === "product_enquiry").length;
    const contactCount = enquiries.filter((e) => e.type === "contact_message").length;

    return res.json({
      success: true,
      stats: {
        total: totalCount,
        new: newCount,
        productEnquiries: productCount,
        contactMessages: contactCount,
      },
      enquiries,
    });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries.",
      error: error.message,
    });
  }
};

// 3. ADMIN: Update Enquiry Status
export const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const validStatuses = ["new", "reviewed", "replied", "archived"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const updateFields = {};
    if (status) updateFields.status = status;
    if (notes !== undefined) updateFields.notes = notes;

    const enquiry = await Enquiry.findByIdAndUpdate(id, updateFields, { new: true });

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    return res.json({
      success: true,
      message: "Enquiry updated successfully.",
      enquiry,
    });
  } catch (error) {
    console.error("Error updating enquiry:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update enquiry.",
      error: error.message,
    });
  }
};

// 4. ADMIN: Delete Enquiry
export const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const enquiry = await Enquiry.findByIdAndDelete(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    return res.json({
      success: true,
      message: "Enquiry deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting enquiry:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete enquiry.",
      error: error.message,
    });
  }
};
