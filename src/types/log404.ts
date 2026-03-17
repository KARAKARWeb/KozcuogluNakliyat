export interface Log404 {
  id: string;
  url: string;
  referrer: string;
  userAgent: string;
  hitCount: number;
  status: "new" | "ignored" | "redirected";
  redirectId: string | null;
  firstSeen: string;
  lastSeen: string;
}
