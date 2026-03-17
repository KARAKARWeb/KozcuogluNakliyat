import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // .html uzantılı istekleri rewrite et
  if (pathname.endsWith(".html")) {
    const slug = pathname.slice(1, -5); // "/abc.html" → "abc"
    const url = request.nextUrl.clone();
    url.pathname = `/${slug}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|admin|uploads|sw\\.js|manifest\\.json|robots\\.txt|sitemap\\.xml|offline).*)"],
};
