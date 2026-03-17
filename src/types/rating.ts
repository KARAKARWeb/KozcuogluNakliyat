export interface Rating {
  id: string;
  pageSlug: string;
  pageName: string;
  mode: "auto" | "manual";
  ratingValue: number;
  reviewCount: number;
  bestRating: number;
  worstRating: number;
  updatedAt: string;
}
