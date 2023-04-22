import { NextRequest, NextResponse } from "next/server";
import { redis } from "./lib/upstash";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|index.js/|_app.js/|_document.js/|auth/|_static|_vercel|[\\w-]+\\.\\w+).*)",
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
  if (!find) return NextResponse.next();
  
  if (
    req.nextUrl.searchParams.get("bot") ||
    /bot/i.test(req.headers.get("user-agent"))
  ) {
    console.log("bot at", req.nextUrl.pathname);
    return NextResponse.rewrite(new URL(`/_link/${path}`, req.url));
  } else {
    return NextResponse.redirect(find.url);
  }
}
