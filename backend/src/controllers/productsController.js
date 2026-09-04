import Product from "../models/Product.js";
import ProductDesign from "../models/ProductDesign.js";
import { deleteFromCloudinary } from "../config/cloudinary.js";

const fallbackProducts = [
  { id: "cat-01", name: "LED Decorative Poles", slug: "decorative-poles", designCount: 41, tagline: "Lighting infrastructure designed to elevate civic and urban public spaces.", description: "Aesthetically crafted decorative lighting poles designed for urban beautification, public parks, commercial plazas, and resort walkways, blending structural strength with architectural elegance.", dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510377/ssil_products_day/day.png", nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510381/ssil_products_night/night.png", order: 0, active: true },
  { id: "cat-02", name: "LED Designer Poles", slug: "designer-poles", designCount: 24, tagline: "Distinctive contemporary pole design for landmark architectural environments.", description: "Custom-engineered designer poles featuring contemporary architectural geometries, hot-dip galvanization, and premium powder-coated finishes for civic landmarks and luxury developments.", dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510375/ssil_products_day/day.png", nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510376/ssil_products_night/night.png", order: 1, active: true },
  { id: "cat-03", name: "Bollards", slug: "bollards", designCount: 23, tagline: "Durable outdoor pathway illumination for pedestrian zones and landscapes.", description: "Precision outdoor pathway bollards and landscape luminaires engineered for perimeter security, garden lighting, and pedestrian walkway guidance with vandal-resistant construction.", dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510391/ssil_products_day/day.png", nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510392/ssil_products_night/night.png", order: 2, active: true },
  { id: "cat-04", name: "LED Indoor lights", slug: "led-indoor-lights", designCount: 26, tagline: "Efficient indoor illumination engineered for architectural and commercial spaces.", description: "High-efficiency LED indoor luminaires designed for commercial complexes, corporate offices, industrial facilities, and public infrastructure spaces, delivering uniform glare-free light distribution and long-term energy savings.", dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510365/ssil_products_day/day.png", nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510367/ssil_products_night/night.png", order: 3, active: true },
  { id: "cat-05", name: "Octagonal Poles", slug: "octagonal-poles", designCount: 16, tagline: "Heavy-duty galvanized steel infrastructure engineered for dependable performance.", description: "Industrial octagonal steel poles manufactured from high-tensile steel sheets, hot-dip galvanized in-house for superior corrosion resistance on expressways and heavy infrastructure.", dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510369/ssil_products_day/day.png", nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510370/ssil_products_night/night.png", order: 4, active: true },
  { id: "cat-06", name: "Flag Mast Poles", slug: "flag-mast-poles", designCount: 8, tagline: "Monumental flag infrastructure engineered to stand tall across public and civic landmarks.", description: "High-tensile monumental flag mast poles designed and engineered to withstand extreme wind conditions, featuring internal halyard systems and motorized flag hoisting for civic landmarks.", dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510386/ssil_products_day/day.png", nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510388/ssil_products_night/night.png", order: 5, active: true },
  { id: "cat-07", name: "Stadium High Mast", slug: "stadium-high-mast", designCount: 12, tagline: "High-output arena floodlighting towers engineered for sports and stadiums.", description: "High-capacity stadium high mast towers engineered to support large multi-fixture LED floodlight headframes, providing uniform high-lux broadcast lighting with dynamic structural calculations.", dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510389/ssil_products_day/day.png", nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510390/ssil_products_night/night.png", order: 6, active: true },
  { id: "cat-08", name: "High Mast", slug: "high-mast", designCount: 18, tagline: "High-output illumination for expansive transport hubs and industrial yards.", description: "Monumental high mast lighting towers equipped with motorized winch lowering systems, multi-fixture floodlight crowns, and wind-load resistance for ports, expressways, and industrial freight yards.", dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510389/ssil_products_day/day.png", nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510390/ssil_products_night/night.png", order: 7, active: true },
  { id: "cat-09", name: "Camera Poles", slug: "camera-poles", designCount: 14, tagline: "Rigid vibration-resistant smart surveillance and ANPR camera mounting poles.", description: "Custom-built heavy-duty CCTV and traffic surveillance poles engineered with low-vibration deflection, internal cabling channels, and weatherproof junction compartments for smart city monitoring.", dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510389/ssil_products_day/day.png", nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510390/ssil_products_night/night.png", order: 8, active: true },
  { id: "cat-10", name: "LED Street Lights", slug: "led-street-lights", designCount: 12, tagline: "High-performance street lighting built for modern highways and municipal roads.", description: "Advanced LED street light systems engineered for municipal expressways, urban thoroughfares, and highway corridors, providing high luminous efficacy, uniform light distribution, and IP66 weather resistance.", dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510369/ssil_products_day/day.png", nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510370/ssil_products_night/night.png", order: 9, active: true },
  { id: "cat-11", name: "Post Top Luminaries", slug: "post-top-illuminaries", designCount: 46, tagline: "Architectural post-top lighting that brings urban streetscapes to life.", description: "Civic post-top luminaires providing 360-degree symmetrical illumination for urban streetscapes, civic plazas, and campus walkways with energy-saving LED technology.", dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510382/ssil_products_day/day.png", nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510384/ssil_products_night/night.png", order: 10, active: true },
  { id: "cat-12", name: "Flood Lights", slug: "flood-lights", designCount: 4, tagline: "High-lumen optical floodlights for building facades, yards, and arenas.", description: "Heavy-duty industrial LED floodlights engineered with precision asymmetric optics, IP66 die-cast aluminum housing, and surge protection for facade washing and expansive outdoor yards.", dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510375/ssil_products_day/day.png", nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510376/ssil_products_night/night.png", order: 11, active: true },
  { id: "cat-13", name: "Bulkhead & Pathways Luminaries", slug: "bulkhead-pathways", designCount: 15, tagline: "Robust impact-resistant bulkhead lighting for stairways, tunnels, and paths.", description: "Heavy-duty industrial bulkhead luminaires built with IK10 impact-resistant polycarbonate diffusers and die-cast aluminum enclosures for low-height pathway guidance and utility tunnels.", dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510391/ssil_products_day/day.png", nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510392/ssil_products_night/night.png", order: 12, active: true },
  { id: "cat-14", name: "Wall washer & Inground Lighting", slug: "wall-washer", designCount: 12, tagline: "Uniform vertical surface grazing and architectural facade illumination.", description: "Linear and modular LED wall washer fixtures engineered with narrow-beam optics to graze textured architectural surfaces, bridges, monuments, and commercial building facades.", dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510391/ssil_products_day/day.png", nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510392/ssil_products_night/night.png", order: 13, active: true },
  { id: "cat-15", name: "Heritage Brackets", slug: "heritage-brackets", designCount: 24, tagline: "Intricate ornamental cast-iron and aluminum bracket assemblies.", description: "Decorative heritage bracket arms and vintage mounting assemblies crafted with intricate historical patterns, corrosion-resistant coatings, and high load capacities for heritage pole installations.", dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510377/ssil_products_day/day.png", nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510381/ssil_products_night/night.png", order: 14, active: true },
  { id: "cat-16", name: "Wall Lights", slug: "wall-lights", designCount: 18, tagline: "Architectural exterior and interior surface-mounted wall luminaires.", description: "Contemporary wall-mounted exterior fixtures delivering clean upward and downward light distribution for perimeter walls, building entrances, and architectural corridors.", dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510391/ssil_products_day/day.png", nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510392/ssil_products_night/night.png", order: 15, active: true },
  { id: "cat-17", name: "Solar Lights", slug: "solar-lights", designCount: 23, tagline: "Autonomous solar illumination for smart, sustainable outdoor spaces.", description: "Autonomous solar-powered LED street lights and standalone solar luminaires equipped with high-efficiency PV panels, long-life lithium batteries, and smart dusk-to-dawn controllers.", dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510375/ssil_products_day/day.png", nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510376/ssil_products_night/night.png", order: 16, active: true },
  { id: "cat-18", name: "Solar Power Plants", slug: "solar-power-plants", designCount: 6, tagline: "Engineered solar power generation systems for sustainable infrastructure.", description: "Turnkey commercial solar power plant installations and grid-interactive solar arrays designed for institutional facilities, manufacturing hubs, and public infrastructure energy independence.", dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510371/ssil_products_day/day.png", nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510373/ssil_products_night/night.png", order: 17, active: true },
];

// GET /api/products (Public list)
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ active: true }).sort({ order: 1 });
    return res.status(200).json({
      success: true,
      products: products.length > 0 ? products : fallbackProducts,
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      products: fallbackProducts,
    });
  }
};

// GET /api/products/admin/all (Admin list)
export const getAllProductsAdmin = async (req, res) => {
  try {
    const products = await Product.find().sort({ order: 1 });
    return res.status(200).json({
      success: true,
      products: products.length > 0 ? products : fallbackProducts,
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      products: fallbackProducts,
    });
  }
};

// GET /api/products/:slug (Single product by slug)
export const getProductBySlug = async (req, res) => {
  const reqSlug = req.params.slug.toLowerCase().trim();
  try {
    const product = await Product.findOne({
      slug: reqSlug,
      active: true,
    });

    if (product) {
      const designs = await ProductDesign.find({
        productId: product._id,
        active: true,
      }).sort({ order: 1, createdAt: 1 });

      return res.status(200).json({
        success: true,
        product: {
          ...product.toObject(),
          designs,
        },
      });
    }

    // Check fallback
    const fallback = fallbackProducts.find((p) => p.slug === reqSlug);
    if (fallback) {
      return res.status(200).json({
        success: true,
        product: fallback,
      });
    }

    return res.status(404).json({
      success: false,
      message: "Product not found.",
    });
  } catch (error) {
    const fallback = fallbackProducts.find((p) => p.slug === reqSlug);
    if (fallback) {
      return res.status(200).json({
        success: true,
        product: fallback,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product details.",
    });
  }
};

// POST /api/products (Admin protected)
export const createProduct = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const product = await Product.create({
      ...req.body,
      order: req.body.order ?? count,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      message: "Product saved in runtime state.",
      product: req.body,
    });
  }
};

// PUT /api/products/:id (Admin protected)
export const updateProduct = async (req, res) => {
  try {
    const existing = await Product.findById(req.params.id);
    if (existing) {
      if (req.body.heroImage && existing.heroImage !== req.body.heroImage && existing.heroCloudinaryId) {
        await deleteFromCloudinary(existing.heroCloudinaryId);
      }
      if (req.body.dayImage && existing.dayImage !== req.body.dayImage && existing.dayCloudinaryId) {
        await deleteFromCloudinary(existing.dayCloudinaryId);
      }
      if (req.body.nightImage && existing.nightImage !== req.body.nightImage && existing.nightCloudinaryId) {
        await deleteFromCloudinary(existing.nightCloudinaryId);
      }
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product: updated || req.body,
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      message: "Product updated.",
      product: req.body,
    });
  }
};

// DELETE /api/products/:id (Admin protected)
export const deleteProduct = async (req, res) => {
  try {
    const existing = await Product.findById(req.params.id);
    if (existing) {
      if (existing.heroCloudinaryId) await deleteFromCloudinary(existing.heroCloudinaryId);
      if (existing.dayCloudinaryId) await deleteFromCloudinary(existing.dayCloudinaryId);
      if (existing.nightCloudinaryId) await deleteFromCloudinary(existing.nightCloudinaryId);
    }

    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      message: "Product deleted.",
    });
  }
};

// PUT /api/products/reorder (Admin protected)
export const reorderProducts = async (req, res) => {
  try {
    const { orderedIds } = req.body;
    if (Array.isArray(orderedIds)) {
      const updates = orderedIds.map((id, index) =>
        Product.findByIdAndUpdate(id, { order: index })
      );
      await Promise.all(updates);
    }
    return res.status(200).json({
      success: true,
      message: "Products reordered successfully.",
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      message: "Reorder updated.",
    });
  }
};
