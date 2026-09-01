import mongoose from "mongoose";

const FooterSettingsSchema = new mongoose.Schema(
  {
    corporateOfficeAddress: {
      type: String,
      default: "Office No- 812A, 814, Puri High Street, Sector 81-121002, Faridabad, Haryana, India",
    },
    factoryAddress: {
      type: String,
      default: "Plot No. 5, Sector 65, Village Sahupura, Ballabgarh, 121004, Faridabad, Haryana, India",
    },
    phone1: {
      type: String,
      default: "+91 9999590064",
    },
    phone2: {
      type: String,
      default: "+91 9999990064",
    },
    email: {
      type: String,
      default: "ssindia2006@gmail.com",
    },
    gmapsCorporateQuery: {
      type: String,
      default: "812A%2C+814%2C+Puri+High+Street%2C+Sector+81-121002%2C+Faridabad%2C+Haryana%2C+India",
    },
    gmapsFactoryQuery: {
      type: String,
      default: "Plot+No.+5%2C+Sector+65%2C+Village+Sahupura%2C+Ballabgarh%2C+121004%2C+Faridabad%2C+Haryana%2C+India",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.FooterSettings || mongoose.model("FooterSettings", FooterSettingsSchema);
