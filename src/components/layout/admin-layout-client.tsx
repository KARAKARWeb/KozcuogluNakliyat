"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "./admin-sidebar";
import AdminHeader from "./admin-header";
import AdminMobileSidebar from "./admin-mobile-sidebar";
import CommandPalette from "@/components/admin/command-palette";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin";

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#e3000f] border-t-transparent" />
      </div>
    );
  }

  if (status === "unauthenticated" && !isLoginPage) {
    router.push("/admin");
    return null;
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>
      <AdminMobileSidebar open={mobileOpen} onOpenChange={setMobileOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
      <CommandPalette />
    </div>
  );
}
