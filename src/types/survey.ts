export interface SurveyRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  fromAddress: string;
  fromFloor: string;
  fromElevator: string;
  toAddress: string;
  toFloor: string;
  toElevator: string;
  homeType: string;
  moveDate: string;
  preferredDate: string;
  note: string;
  status: "pending" | "contacted" | "scheduled" | "completed" | "cancelled";
  adminNote: string;
  createdAt: string;
  updatedAt: string;
}
