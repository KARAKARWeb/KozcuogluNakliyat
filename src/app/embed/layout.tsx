import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <meta httpEquiv="Content-Security-Policy" content="frame-ancestors *" />
      </head>
      <body>{children}</body>
    </html>
  );
}
