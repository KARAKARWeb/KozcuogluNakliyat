import AuthSessionProvider from "@/components/providers/session-provider";
import AdminLayoutClient from "@/components/layout/admin-layout-client";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: { default: "Admin Panel", template: "%s | Admin" },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthSessionProvider>
      <AdminLayoutClient>{children}</AdminLayoutClient>
      <Toaster />
    </AuthSessionProvider>
  );
}
