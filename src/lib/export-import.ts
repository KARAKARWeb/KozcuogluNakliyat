// Export/Import Utility Functions

export function exportToJSON<T>(data: T[], filename: string) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  filename: string,
  columns?: { key: keyof T; label: string }[]
) {
  if (data.length === 0) return;

  const cols = columns || Object.keys(data[0]).map((key) => ({ key, label: key }));
  
  // CSV Header
  const header = cols.map((col) => `"${col.label}"`).join(",");
  
  // CSV Rows
  const rows = data.map((item) => {
    return cols
      .map((col) => {
        const value = item[col.key];
        if (value === null || value === undefined) return '""';
        if (typeof value === "object") return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        return `"${String(value).replace(/"/g, '""')}"`;
      })
      .join(",");
  });

  const csv = [header, ...rows].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}-${new Date().toISOString().split("T")[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportToExcel<T extends Record<string, any>>(
  data: T[],
  filename: string,
  columns?: { key: keyof T; label: string }[]
) {
  // Excel export using CSV format (compatible with Excel)
  exportToCSV(data, filename, columns);
}

export function parseCSV(csvText: string): Record<string, string>[] {
  const lines = csvText.split("\n").filter((line) => line.trim());
  if (lines.length === 0) return [];

  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  const data: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || "";
    });
    data.push(row);
  }

  return data;
}

export function parseJSON<T>(jsonText: string): T[] {
  try {
    const parsed = JSON.parse(jsonText);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (error) {
    throw new Error("Invalid JSON format");
  }
}

export async function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

// Export to XML
export function exportToXML<T extends Record<string, any>>(
  data: T[],
  filename: string,
  rootElement: string = 'data',
  itemElement: string = 'item'
) {
  const xmlItems = data.map(item => {
    const fields = Object.entries(item)
      .map(([key, value]) => `    <${key}>${escapeXml(String(value))}</${key}>`)
      .join('\n');
    return `  <${itemElement}>\n${fields}\n  </${itemElement}>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<${rootElement}>\n${xmlItems}\n</${rootElement}>`;
  
  const blob = new Blob([xml], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}-${new Date().toISOString().split('T')[0]}.xml`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Bulk import with validation
export async function bulkImport<T>(
  file: File,
  validator?: (item: any) => boolean
): Promise<{ success: T[]; errors: Array<{ item: any; error: string }> }> {
  const text = await readFileAsText(file);
  const extension = file.name.split('.').pop()?.toLowerCase();
  
  let items: any[] = [];
  
  try {
    if (extension === 'json') {
      items = parseJSON(text);
    } else if (extension === 'csv') {
      items = parseCSV(text);
    } else {
      throw new Error('Unsupported file format');
    }
  } catch (error) {
    throw new Error(`Parse error: ${error}`);
  }

  const success: T[] = [];
  const errors: Array<{ item: any; error: string }> = [];

  items.forEach(item => {
    try {
      if (validator && !validator(item)) {
        errors.push({ item, error: 'Validation failed' });
      } else {
        success.push(item as T);
      }
    } catch (error) {
      errors.push({ item, error: String(error) });
    }
  });

  return { success, errors };
}

// Export with template
export function exportWithTemplate<T extends Record<string, any>>(
  data: T[],
  template: string,
  filename: string
) {
  const content = data.map(item => {
    let result = template;
    Object.entries(item).forEach(([key, value]) => {
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
    });
    return result;
  }).join('\n\n');

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
