export interface Review {
  id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  serviceSlug: string;
  pageSlug: string;
  status: "pending" | "approved" | "rejected";
  adminReply: string;
  createdAt: string;
  updatedAt: string;
}
