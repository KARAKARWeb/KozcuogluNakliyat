export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  serviceType: string;
  fromLocation: string;
  toLocation: string;
  completedAt: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}
