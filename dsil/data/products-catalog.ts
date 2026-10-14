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
  designCount: number;
  dayImage: string;
  nightImage: string;
  heroImage?: string;
  category?: string;
  galleryImages: GalleryItem[];
}

export const catalogProducts: CatalogProduct[] = [
  {
    id: "cat-01",
    name: "LED Decorative Poles",
    slug: "decorative-poles",
    designCount: 41,
    tagline: "Lighting infrastructure designed to elevate civic and urban public spaces.",
    description:
      "Aesthetically crafted decorative lighting poles designed for urban beautification, public parks, commercial plazas, and resort walkways, blending structural strength with architectural elegance.",
    dayImage: "",
    nightImage: "",
    heroImage: "",
    galleryImages: [],
  },
  {
    id: "cat-02",
    name: "LED Designer Poles",
    slug: "designer-poles",
    designCount: 24,
    tagline: "Distinctive contemporary pole design for landmark architectural environments.",
    description:
      "Custom-engineered designer poles featuring contemporary architectural geometries, hot-dip galvanization, and premium powder-coated finishes for civic landmarks and luxury developments.",
    dayImage: "",
    nightImage: "",
    heroImage: "",
    galleryImages: [],
  },
  {
    id: "cat-03",
    name: "Bollards",
    slug: "bollards",
    designCount: 23,
    tagline: "Durable outdoor pathway illumination for pedestrian zones and landscapes.",
    description:
      "Precision outdoor pathway bollards and landscape luminaires engineered for perimeter security, garden lighting, and pedestrian walkway guidance with vandal-resistant construction.",
    dayImage: "",
    nightImage: "",
    heroImage: "",
    galleryImages: [],
  },
  {
    id: "cat-04",
    name: "LED Indoor lights",
    slug: "led-indoor-lights",
    designCount: 26,
    tagline: "Efficient indoor illumination engineered for architectural and commercial spaces.",
    description:
      "High-efficiency LED indoor luminaires designed for commercial complexes, corporate offices, industrial facilities, and public infrastructure spaces, delivering uniform glare-free light distribution and long-term energy savings.",
    dayImage: "",
    nightImage: "",
    heroImage: "",
    galleryImages: [],
  },
  {
    id: "cat-05",
    name: "Octagonal Poles",
    slug: "octagonal-poles",
    designCount: 16,
    tagline: "Heavy-duty galvanized steel infrastructure engineered for dependable performance.",
    description:
      "Industrial octagonal steel poles manufactured from high-tensile steel sheets, hot-dip galvanized in-house for superior corrosion resistance on expressways and heavy infrastructure.",
    dayImage: "",
    nightImage: "",
    heroImage: "",
    galleryImages: [],
  },
  {
    id: "cat-06",
    name: "Flag Mast Poles",
    slug: "flag-mast-poles",
    designCount: 8,
    tagline: "Monumental flag infrastructure engineered to stand tall across public and civic landmarks.",
    description:
      "High-tensile monumental flag mast poles designed and engineered to withstand extreme wind conditions, featuring internal halyard systems and motorized flag hoisting for civic landmarks.",
    dayImage: "",
    nightImage: "",
    heroImage: "",
    galleryImages: [],
  },
  {
    id: "cat-07",
    name: "Stadium High Mast",
    slug: "stadium-high-mast",
    designCount: 12,
    tagline: "High-output arena floodlighting towers engineered for sports and stadiums.",
    description:
      "High-capacity stadium high mast towers engineered to support large multi-fixture LED floodlight headframes, providing uniform high-lux broadcast lighting with dynamic structural calculations.",
    dayImage: "",
    nightImage: "",
    heroImage: "",
    galleryImages: [],
  },
  {
    id: "cat-08",
    name: "High Mast",
    slug: "high-mast",
    designCount: 18,
    tagline: "High-output illumination for expansive transport hubs and industrial yards.",
    description:
      "Monumental high mast lighting towers equipped with motorized winch lowering systems, multi-fixture floodlight crowns, and wind-load resistance for ports, expressways, and industrial freight yards.",
    dayImage: "",
    nightImage: "",
    heroImage: "",
    galleryImages: [],
  },
  {
    id: "cat-09",
    name: "Camera Poles",
    slug: "camera-poles",
    designCount: 14,
    tagline: "Rigid vibration-resistant smart surveillance and ANPR camera mounting poles.",
    description:
      "Custom-built heavy-duty CCTV and traffic surveillance poles engineered with low-vibration deflection, internal cabling channels, and weatherproof junction compartments for smart city monitoring.",
    dayImage: "",
    nightImage: "",
    heroImage: "",
    galleryImages: [],
  },
  {
    id: "cat-10",
    name: "LED Street Lights",
    slug: "led-street-lights",
    designCount: 12,
    tagline: "High-performance street lighting built for modern highways and municipal roads.",
    description:
      "Advanced LED street light systems engineered for municipal expressways, urban thoroughfares, and highway corridors, providing high luminous efficacy, uniform light distribution, and IP66 weather resistance.",
    dayImage: "",
    nightImage: "",
    heroImage: "",
    galleryImages: [],
  },
  {
    id: "cat-11",
    name: "Post Top Luminaries",
    slug: "post-top-illuminaries",
    designCount: 46,
    tagline: "Architectural post-top lighting that brings urban streetscapes to life.",
    description:
      "Civic post-top luminaires providing 360-degree symmetrical illumination for urban streetscapes, civic plazas, and campus walkways with energy-saving LED technology.",
    dayImage: "",
    nightImage: "",
    heroImage: "",
    galleryImages: [],
  },
  {
    id: "cat-12",
    name: "Flood Lights",
    slug: "flood-lights",
    designCount: 4,
    tagline: "High-lumen optical floodlights for building facades, yards, and arenas.",
    description:
      "Heavy-duty industrial LED floodlights engineered with precision asymmetric optics, IP66 die-cast aluminum housing, and surge protection for facade washing and expansive outdoor yards.",
    dayImage: "",
    nightImage: "",
    heroImage: "",
    galleryImages: [],
  },
  {
    id: "cat-13",
    name: "Bulkhead & Pathways Luminaries",
    slug: "bulkhead-pathways",
    designCount: 15,
    tagline: "Robust impact-resistant bulkhead lighting for stairways, tunnels, and paths.",
    description:
      "Heavy-duty industrial bulkhead luminaires built with IK10 impact-resistant polycarbonate diffusers and die-cast aluminum enclosures for low-height pathway guidance and utility tunnels.",
    dayImage: "",
    nightImage: "",
    heroImage: "",
    galleryImages: [],
  },
  {
    id: "cat-14",
    name: "Wall washer & Inground Lighting",
    slug: "wall-washer",
    designCount: 12,
    tagline: "Uniform vertical surface grazing and architectural facade illumination.",
    description:
      "Linear and modular LED wall washer fixtures engineered with narrow-beam optics to graze textured architectural surfaces, bridges, monuments, and commercial building facades.",
    dayImage: "",
    nightImage: "",
    heroImage: "",
    galleryImages: [],
  },
  {
    id: "cat-15",
    name: "Heritage Brackets",
    slug: "heritage-brackets",
    designCount: 24,
    tagline: "Intricate ornamental cast-iron and aluminum bracket assemblies.",
    description:
      "Decorative heritage bracket arms and vintage mounting assemblies crafted with intricate historical patterns, corrosion-resistant coatings, and high load capacities for heritage pole installations.",
    dayImage: "",
    nightImage: "",
    heroImage: "",
    galleryImages: [],
  },
  {
    id: "cat-16",
    name: "Wall Lights",
    slug: "wall-lights",
    designCount: 18,
    tagline: "Architectural exterior and interior surface-mounted wall luminaires.",
    description:
      "Contemporary wall-mounted exterior fixtures delivering clean upward and downward light distribution for perimeter walls, building entrances, and architectural corridors.",
    dayImage: "",
    nightImage: "",
    heroImage: "",
    galleryImages: [],
  },
  {
    id: "cat-17",
    name: "Solar Street Lights",
    slug: "solar-street-lights",
    designCount: 16,
    tagline: "Autonomous high-efficiency solar street lighting for highways and roads.",
    description:
      "All-in-one and split-type solar LED street lights engineered with high-efficiency monocrystalline solar panels, MPPT smart charge controllers, and deep-cycle lithium LiFePO4 batteries.",
    dayImage: "",
    nightImage: "",
    heroImage: "",
    galleryImages: [],
  },
  {
    id: "cat-18",
    name: "Solar Bollards",
    slug: "solar-bollards",
    designCount: 12,
    tagline: "Eco-friendly solar landscape and pathway bollards.",
    description:
      "Modern architectural solar bollards designed for parks, resorts, and pedestrian pathways, operating with zero external wiring and dusk-to-dawn automated illumination.",
    dayImage: "",
    nightImage: "",
    heroImage: "",
    galleryImages: [],
  },
  {
    id: "cat-19",
    name: "Solar Flood Lights",
    slug: "solar-flood-lights",
    designCount: 10,
    tagline: "High-output solar floodlighting for perimeter security and yards.",
    description:
      "Heavy-duty solar-powered LED floodlights engineered with high lumen output, wide beam angles, and rugged IP66 die-cast aluminum housing for off-grid outdoor areas.",
    dayImage: "",
    nightImage: "",
    heroImage: "",
    galleryImages: [],
  },
  {
    id: "cat-20",
    name: "Solar Pilar Lights",
    slug: "solar-pillar-lights",
    designCount: 12,
    tagline: "Architectural solar pillar and gate top luminaires.",
    description:
      "Decorative solar pillar and post-cap lighting fixtures featuring integrated solar cells and 360-degree ambient lighting for boundary walls, gates, and terrace railings.",
    dayImage: "",
    nightImage: "",
    heroImage: "",
    galleryImages: [],
  },
  {
    id: "cat-21",
    name: "Solar Power Plants",
    slug: "solar-power-plants",
    designCount: 6,
    tagline: "Engineered solar power generation systems for sustainable infrastructure.",
    description:
      "Turnkey commercial solar power plant installations and grid-interactive solar arrays designed for institutional facilities, manufacturing hubs, and public infrastructure energy independence.",
    dayImage: "",
    nightImage: "",
    heroImage: "",
    galleryImages: [],
  },
];

// 16 Mainstream infrastructure products (LED Decorative Poles to Wall Lights)
export const mainstreamProducts = catalogProducts.slice(0, 16);

// 5 Go Green / Solar products (Solar Street Lights, Solar Bollards, Solar Flood Lights, Solar Pilar Lights, Solar Power Plants)
export const solarProducts = catalogProducts.slice(16);
