import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prismadb";
import { redis } from "@/lib/upstash";
import { getMetatags } from "@/lib/metatags";

export async function GET() {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const get = await prisma.url.findMany({
      where: {
        userId: session.id,
      },
      select: {
        urlId: true,
        image: true,
        url: true,
      },
    });

    return NextResponse.json(get, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 400,
    });
  }
}

export async function POST(req: Request) {
  let urlId = "";
  function generateId() {
    urlId = nanoid(5);
  }
  try {
    const body = await req.json();
    const { url } = await body;

    if (!url) {
      return NextResponse.json("Field required", {
        status: 400,
      });
    }
    const meta = await getMetatags(url);

    const match = await redis.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}:${urlId}`
    );
    if (match) generateId();

    const session = await getCurrentUser();
    if (!session) {
      const create = await redis.set(
        `${process.env.NEXT_PUBLIC_BASE_URL}:${urlId}`,
        { url },
        { ex: 60 * 60 * 24 }
      );
      if (create == "OK") {
        return NextResponse.json(
          { data: { urlId }, expired: "1d" },
          {
            status: 201,
          }
        );
      } else
        return NextResponse.json(
          {
            message: "Please try again.",
          },
          {
            status: 400,
          }
        );
    }

    const [create, redisStatus] = await Promise.all([
      prisma.url.create({
        data: {
          url,
          urlId,
          reach: 0,
          userId: session?.id,
          title: (meta.title as string) || "",
          description: (meta.description as string) || "",
          image: (meta.image as string) || "",
        },
      }),
      redis.set(`${process.env.NEXT_PUBLIC_BASE_URL}:${urlId}`, { url }),
    ]);
    if (redisStatus !== "OK")
      return NextResponse.json("Please try again later.", {
        status: 400,
      });

    return NextResponse.json(
      {
        data: create,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(error || "Internal server error", {
      status: 500,
    });
  }
}
