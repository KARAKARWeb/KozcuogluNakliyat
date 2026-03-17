export interface Redirect {
  id: string;
  source: string;
  destination: string;
  type: "301" | "302";
  note: string;
  hitCount: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}
