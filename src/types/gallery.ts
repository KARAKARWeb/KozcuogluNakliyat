export interface GalleryItem {
  id: string;
  type: "image" | "video";
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  category: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}
