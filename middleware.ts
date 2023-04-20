import { NextRequest, NextResponse } from "next/server";
import { redis } from "./lib/upstash";

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
    "/((?!api/|_next/|_proxy/|index.js/|_app.js/|_document.js/|_root/|auth/|_static|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname.split("/")[1];
  if (["favicon.ico", "api", "", "/auth"].includes(path)) {
    return NextResponse.next();
  }

  const find: { url: string } = await redis.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}:${path}`
  );
  if (!find) return;
  else return NextResponse.redirect(find.url);
}
