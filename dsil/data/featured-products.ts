export interface FeaturedProduct {
  id: string;
  name: string;
  category?: string;
  tagline?: string;
  description?: string;
  dayImage: string;
  nightImage: string;
  slug?: string;
}

export const featuredProducts: FeaturedProduct[] = [
  {
    id: "product-01",
    name: "LED Designer Pole",
    category: "Contemporary Civic",
    tagline: "Distinctive contemporary pole geometries for landmark architectural developments.",
    description: "Custom-engineered designer poles featuring contemporary architectural geometries, hot-dip galvanization, and premium powder coating.",
    dayImage: "",
    nightImage: "",
    slug: "designer-poles",
  },
  {
    id: "product-02",
    name: "LED Decorative Pole",
    category: "Urban & Architectural",
    tagline: "Aesthetic lighting infrastructure designed to elevate civic plazas and public parks.",
    description: "Aesthetically crafted decorative lighting poles designed for urban beautification, public parks, and commercial plazas.",
    dayImage: "",
    nightImage: "",
    slug: "decorative-poles",
  },
  {
    id: "product-03",
    name: "Post Top Illuminaires",
    category: "Civic Lighting",
    tagline: "Civic post-top luminaires providing 360-degree symmetrical illumination.",
    description: "Post-top lighting systems that bring urban streetscapes and civic pathways to life.",
    dayImage: "",
    nightImage: "",
    slug: "post-top-illuminaries",
  },
  {
    id: "product-04",
    name: "Indian Flag Pole",
    category: "Monumental Series",
    tagline: "Monumental flag infrastructure engineered to stand tall across public landmarks.",
    description: "High-tensile monumental flag mast poles designed to withstand extreme wind conditions with motorized halyard systems.",
    dayImage: "",
    nightImage: "",
    slug: "flag-mast-poles",
  },
  {
    id: "product-05",
    name: "High Mast Lighting",
    category: "Industrial & Stadium",
    tagline: "High-output illumination for expansive transport hubs and stadiums.",
    description: "Monumental high mast lighting towers equipped with motorized winch lowering systems.",
    dayImage: "",
    nightImage: "",
    slug: "high-mast",
  },
  {
    id: "product-06",
    name: "Architectural Bollard",
    category: "Landscape & Pathway",
    tagline: "Precision outdoor pathway luminaires for pedestrian zones and landscapes.",
    description: "Precision outdoor pathway bollards and landscape luminaires engineered for perimeter security and pedestrian walkways.",
    dayImage: "",
    nightImage: "",
    slug: "bollards",
  },
];
