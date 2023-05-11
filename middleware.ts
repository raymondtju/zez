import { NextRequest, NextResponse } from "next/server";
import { redis } from "./lib/upstash";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|logo.png|og.png|signin|links|public|github.svg|zez.png).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname.split("/")[1];
  if (["", "public", "links"].includes(path)) {
    return NextResponse.next();
  }
  const find = await redis.get<{ url: string }>(
    `${process.env.NEXT_PUBLIC_BASE_URL}:${path}`
  );
  if (find?.url) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/link/${path}/incr`, {
        method: "POST",
      });
    } catch (error) {
      console.log(error);
    }
  }

  if (!find) return NextResponse.rewrite(new URL("/", req.url));

  if (
    req.nextUrl.searchParams.get("bot") ||
    /bot/i.test(req.headers.get("user-agent") as string)
  ) {
    return NextResponse.rewrite(new URL(`/_link/${path}`, req.url));
  }

  return NextResponse.redirect(find.url);
}
