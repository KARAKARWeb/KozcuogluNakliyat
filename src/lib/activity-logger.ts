import { readData, writeData } from "@/lib/db";

interface ActivityLog {
  id: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: string;
  user: string;
  createdAt: string;
}

export async function logActivity(action: string, entity: string, entityId?: string, details?: string) {
  try {
    const logs = await readData<ActivityLog[]>("activity-logs.json");

    logs.unshift({
      id: Date.now().toString(),
      action,
      entity,
      entityId: entityId || "",
      details: details || "",
      user: "admin",
      createdAt: new Date().toISOString(),
    });

    if (logs.length > 500) logs.splice(500);
    await writeData("activity-logs.json", logs);
  } catch {
    // silent fail
  }
}
