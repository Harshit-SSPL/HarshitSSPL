export interface GalleryProject {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  location: string;
  categoryTag: string;
  provided: string;
  description: string;
  image: string;
  stats?: { label: string; value: string }[];
}

export const galleryProjects: GalleryProject[] = [
  {
    id: "proj-01",
    number: "01",
    title: "Monumental High-Tensile National Flag Mast Installation",
    subtitle: "Civic Landmark & Government Infrastructure Deployment",
    location: "Civic Plaza & National Monument Complex, India",
    categoryTag: "MONUMENTAL FLAG MAST",
    provided: "SSIL supplied and installed a 100-foot monumental high-tensile Indian National Flag mast system equipped with internal motorized winch hoisting, wind-load resistant structural engineering, and 360-degree LED floodlighting.",
    description: "Designed for extreme weather resilience and structural durability, this landmark installation features hot-dip galvanized steel sections manufactured to exact government tender specifications, illuminating national heritage with precision engineering.",
    image: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614342/ssil_hp_prod04_day.png",
    stats: [
      { label: "Mast Height", value: "100 Ft." },
      { label: "Wind Rating", value: "180 km/h" },
      { label: "Finish", value: "Hot-Dip Galvanized" },
    ],
  },
  {
    id: "proj-02",
    number: "02",
    title: "Expressway & National Highway Lighting Corridor",
    subtitle: "High-Speed Roadway Infrastructure & Expressway Illumination",
    location: "State Expressway & Highway Corridor Network",
    categoryTag: "HIGHWAY INFRASTRUCTURE",
    provided: "SSIL manufactured and deployed heavy-duty octagonal steel poles, dual-arm brackets, and IP66 high-efficacy LED street luminaires across a 45 km expressway thoroughfare.",
    description: "Built to endure industrial traffic, vibration, and extreme seasonal weather, the high-performance optics deliver uniform luminaire distribution and zero glare, ensuring driver safety across major transport arteries.",
    image: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614330/ssil_hp_prod01_day.png",
    stats: [
      { label: "Corridor Span", value: "45 Km" },
      { label: "Protection", value: "IP66 / IK10" },
      { label: "Lifespan", value: "25+ Years" },
    ],
  },
  {
    id: "proj-03",
    number: "03",
    title: "Urban Heritage Plazas & Civic Beautification",
    subtitle: "Architectural Heritage Lighting & Ornamental Pole Installation",
    location: "Royal Civic Plaza & Heritage Promenade",
    categoryTag: "HERITAGE & DESIGNER POLES",
    provided: "SSIL designed, cast, and supplied vintage ornamental heritage poles with intricate cast-iron brackets, antique bronze finishes, and warm 3000K LED post-top luminaires.",
    description: "Seamlessly blending historical aesthetic charm with modern energy-saving technology, this installation transforms public pedestrian promenades and civic parks into vibrant night-time cultural destinations.",
    image: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614334/ssil_hp_prod02_day.png",
    stats: [
      { label: "Design Type", value: "Cast-Iron Vintage" },
      { label: "Color Temp", value: "3000K Warm LED" },
      { label: "Poles Deployed", value: "120+ Units" },
    ],
  },
  {
    id: "proj-04",
    number: "04",
    title: "High Mast & Industrial Arena Floodlighting",
    subtitle: "High-Output Sports Arena & Logistic Yard Illumination",
    location: "Industrial Freight Terminal & Sports Stadium Arena",
    categoryTag: "HIGH MAST TOWERS",
    provided: "SSIL engineered and delivered multi-fixture high mast towers featuring motorized lowering winch mechanisms, asymmetric floodlight crowns, and high-lumen stadium optics.",
    description: "Providing high-intensity, flicker-free illumination across expansive logistics and athletic spaces, SSIL's high mast towers offer effortless ground-level maintenance via automated motorized winch systems.",
    image: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614346/ssil_hp_prod05_day.png",
    stats: [
      { label: "Tower Height", value: "30 Meters" },
      { label: "Luminaires", value: "16x 400W Floodlights" },
      { label: "Lowering System", value: "Motorized Winch" },
    ],
  },
  {
    id: "proj-05",
    number: "05",
    title: "Smart Civic Post-Top & Pedestrian Urban Streetscapes",
    subtitle: "Municipal Smart City & Public Walkway Lighting",
    location: "Smart City Civic Centre & Commercial District",
    categoryTag: "SMART CIVIC LIGHTING",
    provided: "SSIL supplied contemporary post-top luminaires integrated onto smart pole structures, supporting IoT surveillance camera mounts, environmental sensors, and automated central management system (CMS) controls.",
    description: "An end-to-end municipal smart city deployment that optimizes energy consumption by up to 65% while enhancing urban safety and nighttime aesthetic appeal across high-density civic corridors.",
    image: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614338/ssil_hp_prod03_day.png",
    stats: [
      { label: "Smart Controls", value: "IoT CMS Enabled" },
      { label: "Energy Savings", value: "Up to 65%" },
      { label: "Distribution", value: "360° Symmetrical" },
    ],
  },
  {
    id: "proj-06",
    number: "06",
    title: "Landscape Pathway & Perimeter Security Bollard Installation",
    subtitle: "Luxury Real Estate & Public Resort Environment",
    location: "Commercial Park & Luxury Residential Estate",
    categoryTag: "PATHWAY BOLLARDS",
    provided: "SSIL manufactured and integrated outdoor vandal-resistant architectural bollards along perimeter walkways, garden lawns, and water feature promenades.",
    description: "Combining low-glare architectural lighting with robust corrosion-resistant extruded aluminum housings, these bollard installations provide subtle directional guidance for luxury residential developments.",
    image: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614350/ssil_hp_prod06_day.png",
    stats: [
      { label: "Housing Material", value: "Extruded Aluminum" },
      { label: "Vandal Rating", value: "IK10 Impact Resistant" },
      { label: "Environment", value: "Coastal / Landscape" },
    ],
  },
];
