import type { SeoMeta, FaqItem } from "./service";

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface Region {
  id: string;
  title: string;
  slug: string;
  district: string;
  city: string;
  type: "district" | "intercity";
  description: string;
  content: string;
  image: string;
  geo: GeoCoordinates;
  seo: SeoMeta;
  faq: FaqItem[];
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
