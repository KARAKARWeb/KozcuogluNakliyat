import { NextRequest, NextResponse } from "next/server";
import regionsData from "@/data/regions.json";
import redirectsData from "@/data/redirects.json";

const regionSlugs = new Set((regionsData as { slug: string }[]).map((r) => r.slug));

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect kontrolü
  const redirect = (redirectsData as any[]).find(
    (r) => r.source === pathname && r.isActive
  );
  
  if (redirect) {
    const url = request.nextUrl.clone();
    url.pathname = redirect.destination;
    
    if (redirect.type === "permanent" || redirect.type === "301") {
      return NextResponse.redirect(url, { status: 301 });
    } else {
      return NextResponse.redirect(url, { status: 302 });
    }
  }

  // Sadece *.html isteklerini yakala
  if (pathname.endsWith(".html")) {
    const slug = pathname.slice(1, -5); // "/abc.html" → "abc"

    // Sadece regions slug'larıyla eşleşirse rewrite yap
    if (regionSlugs.has(slug)) {
      const url = request.nextUrl.clone();
      url.pathname = `/${slug}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|admin|uploads|sw\\.js|manifest\\.json|robots\\.txt|sitemap\\.xml|offline).*)"],
};
