export type NotificationType =
  | "new-review"
  | "new-message"
  | "new-survey"
  | "new-404"
  | "campaign-expiring"
  | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  link: string;
  isRead: boolean;
  createdAt: string;
}
