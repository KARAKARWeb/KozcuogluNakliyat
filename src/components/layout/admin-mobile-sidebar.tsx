"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import AdminSidebar from "./admin-sidebar";

interface AdminMobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AdminMobileSidebar({
  open,
  onOpenChange,
}: AdminMobileSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 p-0">
        <AdminSidebar />
      </SheetContent>
    </Sheet>
  );
}
