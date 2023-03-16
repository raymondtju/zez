import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/, /_auth/, /_root/ (special pages for OG tags proxying, password protection, and placeholder _root pages)
     * 4. /_static (inside /public)
     * 5. /_vercel (Vercel internals)
     * 6. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_proxy/|index.js/|_app.js/|_document.js/|_auth/|_root/|_static|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(
  req: NextRequest
): Promise<NextResponse> {
  const path = req.nextUrl.pathname.split("/")[1];
  if (["favicon.ico", "api", ""].includes(path)) {
    return NextResponse.next();
  }
  const check = await fetch(
    `${process.env.NEXT_PUBLIC_DEV_BE_API}/api/v1/url/${path}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
  if (!check.result) {
    return;
  }
  return NextResponse.redirect(check.result.originalUrl);
}
