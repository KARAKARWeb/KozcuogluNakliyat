import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  children?: React.ReactNode;
}

export default function PageHeader({
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  children,
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-[#122032]">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button className="bg-[#e3000f] hover:bg-[#c5000d]">
            <Plus className="mr-2 h-4 w-4" />
            {actionLabel}
          </Button>
        </Link>
      )}
      {actionLabel && onAction && !actionHref && (
        <Button onClick={onAction} className="bg-[#e3000f] hover:bg-[#c5000d]">
          <Plus className="mr-2 h-4 w-4" />
          {actionLabel}
        </Button>
      )}
      {children}
    </div>
  );
}
