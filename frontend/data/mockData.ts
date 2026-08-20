import { ProductCategory, ProductItem, ProjectItem } from "@/types";

export const mockCategories: ProductCategory[] = [
  {
    id: "cat-1",
    name: "Bollards",
    slug: "bollards",
    description: "Architectural pathway and perimeter landscape lighting bollards engineered for high durability.",
    featuredImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    productCount: 18,
  },
  {
    id: "cat-2",
    name: "Street Lights",
    slug: "street-lights",
    description: "High-efficiency LED street lights for arterial municipal roads and highways.",
    featuredImage: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80",
    productCount: 24,
  },
  {
    id: "cat-3",
    name: "Street Lamps",
    slug: "street-lamps",
    description: "Decorative heritage and modern street lamps for urban plazas and pedestrian boulevards.",
    featuredImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    productCount: 15,
  },
  {
    id: "cat-4",
    name: "Indian Flag Poles",
    slug: "indian-flag-poles",
    description: "High-mast monument flag poles engineered for national landmarks and public squares.",
    featuredImage: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=800&q=80",
    productCount: 8,
  },
  {
    id: "cat-5",
    name: "Solar Lighting",
    slug: "solar-lighting",
    description: "Off-grid standalone solar street and garden lighting solutions with integrated lithium batteries.",
    featuredImage: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    productCount: 12,
  },
  {
    id: "cat-6",
    name: "Interior Lighting",
    slug: "interior-lighting",
    description: "Commercial architectural linear panels, downlights, and high-bay industrial luminaires.",
    featuredImage: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
    productCount: 30,
  },
  {
    id: "cat-7",
    name: "High-Mast Infrastructure Poles",
    slug: "large-poles",
    description: "Octagonal and polygonal high-mast stadium lighting poles and junction towers.",
    featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    productCount: 10,
  },
];

export const mockProducts: ProductItem[] = [
  {
    id: "prod-1",
    slug: "architectural-bollard-01",
    name: "SSIL Precision Bollard 01",
    categorySlug: "bollards",
    categoryName: "Bollards",
    description: "Premium die-cast aluminum LED bollard designed for architectural landscape pathways and commercial campuses.",
    dayImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    nightImage: "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=800&q=80",
    specifications: {
      wattage: "15W - 30W",
      inputVoltage: "220V - 240V AC",
      ipRating: "IP66 High Protection",
      material: "Die-Cast Extruded Aluminum",
      dimensions: "1000mm Height x 150mm Diameter",
      colorTemperature: "3000K Warm White / 4000K Neutral",
    },
    applications: ["Residential Societies", "Commercial Courtyards", "Public Parks"],
    isFeaturedHomepage: true,
    status: "ACTIVE",
  },
  {
    id: "prod-2",
    slug: "highway-street-light-90w",
    name: "SSIL Expressway Luminaires 90W",
    categorySlug: "street-lights",
    categoryName: "Street Lights",
    description: "High-power street light fixture with asymmetric lens distribution optimized for expressways and arterial corridors.",
    dayImage: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80",
    nightImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    specifications: {
      wattage: "90W - 150W",
      inputVoltage: "140V - 270V AC",
      ipRating: "IP66 / IK09 Impact Rated",
      material: "High Pressure Die Cast Aluminum",
      colorTemperature: "5700K Cool White",
    },
    applications: ["Expressways", "Municipal Highways", "Industrial Corridors"],
    isFeaturedHomepage: true,
    status: "ACTIVE",
  },
];

export const mockProjects: ProjectItem[] = [
  {
    id: "proj-1",
    slug: "mathura-expressway-section",
    title: "Mathura Expressway Lighting Section",
    location: "Mathura Expressway, Uttar Pradesh",
    clientType: "INFRASTRUCTURE",
    description: "Infrastructure lighting installation along a major highway section, delivering energy-efficient LED luminaires and high-mast poles.",
    coverImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80"
    ],
    executedYear: "2023",
    status: "COMPLETED",
  },
  {
    id: "proj-2",
    slug: "omaxe-world-street-faridabad",
    title: "Omaxe World Street Commercial Lighting",
    location: "Faridabad, Haryana",
    clientType: "COMMERCIAL",
    description: "Decorative architectural street lighting and custom bollard deployment across retail high-street boulevards.",
    coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
    ],
    executedYear: "2024",
    status: "COMPLETED",
  },
];
