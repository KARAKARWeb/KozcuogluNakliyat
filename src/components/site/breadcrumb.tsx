import Link from "next/link";
import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbItem as ShadcnBreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DotIcon } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const all = [{ label: "Ana Sayfa", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList" className="mt-4">
      <ShadcnBreadcrumb>
        <BreadcrumbList className="text-gray-400">
          {all.map((item, i) => {
            const isLast = i === all.length - 1;
            return (
              <span key={i} className="contents" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                {i > 0 && (
                  <BreadcrumbSeparator>
                    <DotIcon className="h-4 w-4" />
                  </BreadcrumbSeparator>
                )}
                <ShadcnBreadcrumbItem>
                  {!isLast && item.href ? (
                    <BreadcrumbLink asChild className="text-gray-400 hover:text-white transition-colors">
                      <Link href={item.href} itemProp="item">
                        <span itemProp="name">{item.label}</span>
                      </Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="text-white">
                      <span itemProp="name">{item.label}</span>
                    </BreadcrumbPage>
                  )}
                </ShadcnBreadcrumbItem>
                <meta itemProp="position" content={String(i + 1)} />
              </span>
            );
          })}
        </BreadcrumbList>
      </ShadcnBreadcrumb>
    </nav>
  );
}
