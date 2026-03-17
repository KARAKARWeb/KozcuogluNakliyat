export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  source: "contact" | "pricing" | "survey";
  status: "unread" | "read" | "replied" | "archived";
  adminNote: string;
  createdAt: string;
  updatedAt: string;
}
