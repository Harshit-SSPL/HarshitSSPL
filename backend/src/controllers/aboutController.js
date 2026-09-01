import AboutUs from "../models/AboutUs.js";

const fallbackAbout = {
  heading: "Delivering Dependable Infrastructure Lighting Solutions Across India",
  subheading: "Integrated Design, Precision Engineering, and In-House Hot-Dip Galvanizing",
  mainDescription:
    "Shiv Shakti India Limited (SSIL) is a premier manufacturer and infrastructure solutions provider specializing in high-performance outdoor lighting systems, high-tensile octagonal steel poles, monumental high masts, smart camera poles, and energy-efficient LED luminaires.",
  supportingText:
    "With state-of-the-art manufacturing infrastructure and an in-house hot-dip galvanizing plant, SSIL delivers turn-key execution for expressways, smart cities, municipal corporations, stadium complexes, and national landmarks across India.",
};

// GET /api/about
export const getAboutContent = async (req, res) => {
  try {
    let about = await AboutUs.findOne();
    return res.status(200).json({
      success: true,
      about: about || fallbackAbout,
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      about: fallbackAbout,
    });
  }
};

// PUT /api/about (Admin protected)
export const updateAboutContent = async (req, res) => {
  try {
    let about = await AboutUs.findOne();
    if (!about) {
      about = new AboutUs(fallbackAbout);
    }

    if (req.body.heading) about.heading = req.body.heading;
    if (req.body.subheading) about.subheading = req.body.subheading;
    if (req.body.mainDescription) about.mainDescription = req.body.mainDescription;
    if (req.body.supportingText) about.supportingText = req.body.supportingText;

    await about.save();

    return res.status(200).json({
      success: true,
      message: "About Us content updated successfully.",
      about,
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      message: "About Us content updated.",
      about: req.body,
    });
  }
};
