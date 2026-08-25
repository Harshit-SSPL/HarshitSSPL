export interface GalleryItem {
  id: string;
  name: string;
  dayImage: string;
  nightImage?: string;
  specs?: string;
}

export interface CatalogProduct {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  dayImage: string;
  nightImage: string;
  heroImage?: string;
  galleryImages: GalleryItem[];
}

// 36 Gallery Items for LED Indoor & Outdoor Lights
const ledIndoorOutdoorGallery: GalleryItem[] = Array.from({ length: 36 }, (_, i) => {
  const index = (i % 6) + 1;
  const itemNum = String(i + 1).padStart(2, "0");
  return {
    id: `led-light-${itemNum}`,
    name: `LED Lighting System Model ${itemNum}`,
    dayImage: `/images/products/homepage/product-0${index}/day.png`,
    nightImage: `/images/products/homepage/product-0${index}/night.png`,
    specs: "IP66 Rated • High Efficiency • ISO Certified",
  };
});

// Helper generator for other catalog product galleries
const generateGallery = (prefix: string, baseName: string, count: number = 8): GalleryItem[] => {
  return Array.from({ length: count }, (_, i) => {
    const index = (i % 6) + 1;
    const itemNum = String(i + 1).padStart(2, "0");
    return {
      id: `${prefix}-${itemNum}`,
      name: `${baseName} Series ${itemNum}`,
      dayImage: `/images/products/homepage/product-0${index}/day.png`,
      nightImage: `/images/products/homepage/product-0${index}/night.png`,
      specs: "Custom Engineering • Hot-Dip Galvanized • Heavy Duty",
    };
  });
};

export const catalogProducts: CatalogProduct[] = [
  {
    id: "cat-01",
    name: "LED Indoor & Outdoor Lights",
    slug: "led-indoor-outdoor-lights",
    tagline: "Efficient illumination engineered for every environment.",
    description:
      "Energy-efficient LED lighting solutions engineered for indoor and outdoor environments, combining dependable illumination, durability and efficient performance across commercial, residential and infrastructure applications.",
    dayImage: "/images/products/homepage/product-01/day.png",
    nightImage: "/images/products/homepage/product-01/night.png",
    heroImage: "/products/products-hero.png",
    galleryImages: ledIndoorOutdoorGallery,
  },
  {
    id: "cat-02",
    name: "LED Street Light",
    slug: "led-street-light",
    tagline: "High-performance lighting built for modern roads.",
    description:
      "Advanced LED street light systems engineered for municipal expressways, urban thoroughfares, and highway corridors, providing high luminous efficacy, uniform light distribution, and IP66 weather resistance.",
    dayImage: "/images/products/homepage/product-01/day.png",
    nightImage: "/images/products/homepage/product-01/night.png",
    heroImage: "/products/products-hero.png",
    galleryImages: generateGallery("street-light", "LED Street Luminaire", 12),
  },
  {
    id: "cat-03",
    name: "Decorative Pole",
    slug: "decorative-pole",
    tagline: "Lighting infrastructure designed to elevate public spaces.",
    description:
      "Aesthetically crafted decorative lighting poles designed for urban beautification, public parks, commercial plazas, and resort walkways, blending structural strength with architectural elegance.",
    dayImage: "/images/products/homepage/product-02/day.png",
    nightImage: "/images/products/homepage/product-02/night.png",
    heroImage: "/products/products-hero.png",
    galleryImages: generateGallery("dec-pole", "Decorative Pole Variant", 12),
  },
  {
    id: "cat-04",
    name: "Designer Pole",
    slug: "designer-pole",
    tagline: "Distinctive pole design for landmark environments.",
    description:
      "Custom-engineered designer poles featuring contemporary architectural geometries, hot-dip galvanization, and premium powder-coated finishes for civic landmarks and luxury developments.",
    dayImage: "/images/products/homepage/product-02/day.png",
    nightImage: "/images/products/homepage/product-02/night.png",
    heroImage: "/products/products-hero.png",
    galleryImages: generateGallery("des-pole", "Architectural Designer Pole", 10),
  },
  {
    id: "cat-05",
    name: "Outdoor Bollards",
    slug: "outdoor-bollards",
    tagline: "Durable outdoor illumination for pathways and landscapes.",
    description:
      "Precision outdoor pathway bollards and landscape luminaires engineered for perimeter security, garden lighting, and pedestrian walkway guidance with vandal-resistant construction.",
    dayImage: "/images/products/homepage/product-06/day.png",
    nightImage: "/images/products/homepage/product-06/night.png",
    heroImage: "/products/products-hero.png",
    galleryImages: generateGallery("bollard", "Landscape Pathway Bollard", 12),
  },
  {
    id: "cat-06",
    name: "Post Top Illuminaires",
    slug: "post-top-illuminaires",
    tagline: "Architectural lighting that brings streetscapes to life.",
    description:
      "Civic post-top luminaires providing 360-degree symmetrical illumination for urban streetscapes, civic plazas, and campus walkways with energy-saving LED technology.",
    dayImage: "/images/products/homepage/product-03/day.png",
    nightImage: "/images/products/homepage/product-03/night.png",
    heroImage: "/products/products-hero.png",
    galleryImages: generateGallery("post-top", "Civic Post Top Luminaire", 10),
  },
  {
    id: "cat-07",
    name: "Bulkhead Pathway",
    slug: "bulkhead-pathway",
    tagline: "Reliable pathway lighting built for everyday environments.",
    description:
      "Heavy-duty bulkhead pathway luminaires built with impact-resistant polycarbonate diffusers and die-cast aluminum housings for stairwells, perimeter walls, and industrial corridors.",
    dayImage: "/images/products/homepage/product-06/day.png",
    nightImage: "/images/products/homepage/product-06/night.png",
    heroImage: "/products/products-hero.png",
    galleryImages: generateGallery("bulkhead", "Heavy-Duty Bulkhead Fixture", 8),
  },
  {
    id: "cat-08",
    name: "Octagonal Pole",
    slug: "octagonal-pole",
    tagline: "Heavy-duty infrastructure engineered for dependable performance.",
    description:
      "Industrial octagonal steel poles manufactured from high-tensile steel sheets, hot-dip galvanized in-house for superior corrosion resistance on expressways and heavy infrastructure.",
    dayImage: "/images/products/homepage/product-05/day.png",
    nightImage: "/images/products/homepage/product-05/night.png",
    heroImage: "/products/products-hero.png",
    galleryImages: generateGallery("octagonal", "Galvanized Octagonal Steel Pole", 12),
  },
  {
    id: "cat-09",
    name: "High Mast",
    slug: "high-mast",
    tagline: "High-output illumination for large-scale environments.",
    description:
      "Monumental high mast lighting towers equipped with motorized winch lowering systems, multi-fixture floodlight crowns, and wind-load resistance for ports, stadiums, and industrial yards.",
    dayImage: "/images/products/homepage/product-05/day.png",
    nightImage: "/images/products/homepage/product-05/night.png",
    heroImage: "/products/products-hero.png",
    galleryImages: generateGallery("high-mast", "Monumental High Mast System", 10),
  },
  {
    id: "cat-10",
    name: "National Flag",
    slug: "national-flag",
    tagline: "Monumental flag infrastructure built to stand tall.",
    description:
      "High-tensile monumental flag mast poles designed and engineered to withstand extreme wind conditions, featuring internal halyard systems and motorized flag hoisting for civic landmarks.",
    dayImage: "/images/products/homepage/product-04/day.png",
    nightImage: "/images/products/homepage/product-04/night.png",
    heroImage: "/products/products-hero.png",
    galleryImages: generateGallery("flag-mast", "Monumental Flag Mast Pole", 8),
  },
  {
    id: "cat-11",
    name: "Solar Power Plant",
    slug: "solar-power-plant",
    tagline: "Engineered solar power solutions for sustainable infrastructure.",
    description:
      "Turnkey commercial solar power plant installations and grid-interactive solar arrays designed for institutional facilities, manufacturing hubs, and public infrastructure energy independence.",
    dayImage: "/images/products/homepage/product-01/day.png",
    nightImage: "/images/products/homepage/product-01/night.png",
    heroImage: "/products/products-hero.png",
    galleryImages: generateGallery("solar-plant", "Commercial Solar Array Installation", 8),
  },
  {
    id: "cat-12",
    name: "Solar Lighting",
    slug: "solar-lighting",
    tagline: "Independent solar illumination for smarter outdoor spaces.",
    description:
      "Autonomous solar-powered LED street lights and standalone solar luminaires equipped with high-efficiency PV panels, long-life lithium batteries, and smart dusk-to-dawn controllers.",
    dayImage: "/images/products/homepage/product-01/day.png",
    nightImage: "/images/products/homepage/product-01/night.png",
    heroImage: "/products/products-hero.png",
    galleryImages: generateGallery("solar-light", "Standalone Solar Street Light", 10),
  },
];
