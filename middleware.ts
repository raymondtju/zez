import { NextRequest, NextResponse } from "next/server";
import { redis } from "./lib/upstash";
import prisma from "@/lib/prismadb";

export const config = {
  matcher: [
    "/((?!api/|_next/|index.js/|_app.js/links/|_document.js/|auth/|_static|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname.split("/")[1];
  if (["favicon.ico", "", "auth", "links", "public"].includes(path)) {
    return NextResponse.next();
  }
  const find: { url: string } = await redis.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}:${path}`
  );
  if (find){
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/url/${path}/incr`, {
        method: "POST"
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  if (!find) return NextResponse.rewrite(new URL("/", req.url));
  
  if (
    req.nextUrl.searchParams.get("bot") ||
    /bot/i.test(req.headers.get("user-agent"))
  ) {
    return NextResponse.rewrite(new URL(`/_link/${path}`, req.url));
  }

  return NextResponse.redirect(find.url);
}
