export interface InternalLink {
  id: string;
  keyword: string;
  targetUrl: string;
  maxLinks: number;
  style: "text" | "bold" | "underline";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
