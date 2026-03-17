export type TrackingStep =
  | "request-received"
  | "survey-scheduled"
  | "survey-completed"
  | "contract-signed"
  | "packing-started"
  | "loading-started"
  | "in-transit"
  | "delivered";

export interface TrackingEvent {
  step: TrackingStep;
  label: string;
  date: string;
  note: string;
  isCompleted: boolean;
}

export interface TrackingItem {
  id: string;
  trackingCode: string;
  customerName: string;
  customerPhone: string;
  serviceType: string;
  fromAddress: string;
  toAddress: string;
  events: TrackingEvent[];
  currentStep: TrackingStep;
  status: "active" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}
