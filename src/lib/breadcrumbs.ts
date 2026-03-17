export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function generateBreadcrumbs(
  path: string,
  customLabels?: Record<string, string>
): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [
    { label: "Kozcuoğlu Nakliyat", href: "/" },
  ];

  if (path === "/" || path === "") return crumbs;

  const segments = path.replace(/^\//, "").replace(/\.html$/, "").split("/");
  let currentPath = "";

  for (const segment of segments) {
    currentPath += `/${segment}`;
    const label =
      customLabels?.[segment] ||
      segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    crumbs.push({ label, href: currentPath });
  }

  return crumbs;
}
