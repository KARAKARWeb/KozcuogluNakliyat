import { readData } from "@/lib/db";
import type { Settings } from "@/types";

export async function CustomCodeHead() {
  const settings = await readData<Settings>("settings.json");
  const code = settings.customCode?.head;
  if (!code) return null;
  return <div dangerouslySetInnerHTML={{ __html: code }} />;
}

export async function CustomCodeBodyStart() {
  const settings = await readData<Settings>("settings.json");
  const code = settings.customCode?.bodyStart;
  if (!code) return null;
  return <div dangerouslySetInnerHTML={{ __html: code }} />;
}

export async function CustomCodeFooter() {
  const settings = await readData<Settings>("settings.json");
  const code = settings.customCode?.footer;
  if (!code) return null;
  return <div dangerouslySetInnerHTML={{ __html: code }} />;
}
