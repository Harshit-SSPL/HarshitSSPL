import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["product_enquiry", "contact_message"],
      default: "product_enquiry",
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    productCategory: {
      type: String,
      trim: true,
      default: "",
    },
    productModel: {
      type: String,
      trim: true,
      default: "",
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "reviewed", "replied", "archived"],
      default: "new",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

enquirySchema.pre("save", function (next) {
  if (this.firstName || this.lastName) {
    this.fullName = `${this.firstName || ""} ${this.lastName || ""}`.trim();
  }
  next();
});

const Enquiry = mongoose.model("Enquiry", enquirySchema);
export default Enquiry;
