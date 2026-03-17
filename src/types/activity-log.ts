export interface ActivityLog {
  id: string;
  action: "create" | "update" | "delete" | "login" | "logout" | "export" | "import";
  entity: string;
  entityId: string;
  description: string;
  userId: string;
  createdAt: string;
}
