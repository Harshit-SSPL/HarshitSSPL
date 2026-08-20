export interface ProductSpec {
  wattage?: string;
  inputVoltage?: string;
  ipRating?: string;
  material?: string;
  dimensions?: string;
  colorTemperature?: string;
  mountingType?: string;
  [key: string]: string | undefined;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  description: string;
  dayImage: string;
  nightImage?: string;
  specifications: ProductSpec;
  applications: string[];
  isFeaturedHomepage?: boolean;
  status: 'ACTIVE' | 'ARCHIVED';
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  location: string;
  clientType: 'GOVERNMENT' | 'COMMERCIAL' | 'RESIDENTIAL' | 'INFRASTRUCTURE';
  description: string;
  coverImage: string;
  galleryImages: string[];
  executedYear?: string;
  status: 'COMPLETED' | 'ONGOING';
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  featuredImage: string;
  productCount: number;
}
