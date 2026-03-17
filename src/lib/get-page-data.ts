import { readData } from "@/lib/db";
import type { Page } from "@/types";

export async function getPageData(pageId: string): Promise<Page | null> {
  try {
    const pages = await readData<Page[]>("pages.json");
    return pages.find((p) => p.id === pageId) || null;
  } catch {
    return null;
  }
}
