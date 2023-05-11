import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prismadb";
import { redis } from "@/lib/upstash";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getCurrentUser();
    const { id } = params;

    const [prismares, redisres] = await Promise.all([
      prisma.url.deleteMany({
        where: {
          urlId: id as string,
          userId: session?.id,
        },
      }),
      redis.del(`${process.env.NEXT_PUBLIC_BASE_URL}:${id}`),
    ]);
    if (prismares.count === 0 || redisres === 0) {
      return NextResponse.json(
        {
          message: "Failed to delete data.",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Successfully delete data.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 400,
      }
    );
  }
}

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const { id, newID } = await req.json();
  const session = await getCurrentUser();

  const checkAuth = await prisma.url.findFirst({
    where: {
      urlId: id as string,
      userId: session?.id,
    },
  });
  if (!checkAuth)
    return NextResponse.json(
      { message: "Unauthorized" },
      {
        status: 401,
      }
    );

  const checkDuplicate = await prisma.url.findFirst({
    where: {
      urlId: newID,
    },
  });
  if (checkDuplicate)
    return NextResponse.json(
      { message: "ID already exist" },
      {
        status: 400,
      }
    );

  const [prismares, redisres] = await Promise.all([
    prisma.url.updateMany({
      where: {
        urlId: id,
      },
      data: {
        urlId: newID,
      },
    }),
    redis.rename(
      `${process.env.NEXT_PUBLIC_BASE_URL}:${id}`,
      `${process.env.NEXT_PUBLIC_BASE_URL}:${newID}`
    ),
  ]);
  if (prismares.count === 0 || redisres !== "OK") {
    return NextResponse.json(
      {
        message: "Failed to edit data.",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json({}, { status: 200 });
}
