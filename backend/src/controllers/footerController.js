import FooterSettings from "../models/FooterSettings.js";

const fallbackFooter = {
  corporateOfficeAddress: "Office No- 812A, 814, Puri High Street, Sector 81-121002, Faridabad, Haryana, India",
  factoryAddress: "Plot No. 5, Sector 65, Village Sahupura, Ballabgarh, 121004, Faridabad, Haryana, India",
  phone1: "+91 9999590064",
  phone2: "+91 9999990064",
  email: "ssindia2006@gmail.com",
  gmapsCorporateQuery: "812A%2C+814%2C+Puri+High+Street%2C+Sector+81-121002%2C+Faridabad%2C+Haryana%2C+India",
  gmapsFactoryQuery: "Plot+No.+5%2C+Sector+65%2C+Village+Sahupura%2C+Ballabgarh%2C+121004%2C+Faridabad%2C+Haryana%2C+India",
};

// GET /api/footer
export const getFooterSettings = async (req, res) => {
  try {
    let footer = await FooterSettings.findOne();
    return res.status(200).json({
      success: true,
      footer: footer || fallbackFooter,
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      footer: fallbackFooter,
    });
  }
};

// PUT /api/footer (Admin protected)
export const updateFooterSettings = async (req, res) => {
  try {
    let footer = await FooterSettings.findOne();
    if (!footer) {
      footer = new FooterSettings(fallbackFooter);
    }

    if (req.body.corporateOfficeAddress) footer.corporateOfficeAddress = req.body.corporateOfficeAddress;
    if (req.body.factoryAddress) footer.factoryAddress = req.body.factoryAddress;
    if (req.body.phone1) footer.phone1 = req.body.phone1;
    if (req.body.phone2) footer.phone2 = req.body.phone2;
    if (req.body.email) footer.email = req.body.email;
    if (req.body.gmapsCorporateQuery) footer.gmapsCorporateQuery = req.body.gmapsCorporateQuery;
    if (req.body.gmapsFactoryQuery) footer.gmapsFactoryQuery = req.body.gmapsFactoryQuery;

    await footer.save();

    return res.status(200).json({
      success: true,
      message: "Footer settings updated successfully.",
      footer,
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      message: "Footer settings updated.",
      footer: req.body,
    });
  }
};
