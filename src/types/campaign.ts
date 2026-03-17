export interface Campaign {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  discountType: "percentage" | "fixed" | "free-service";
  discountValue: number;
  validFrom: string;
  validThrough: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}
