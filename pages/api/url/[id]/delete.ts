import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { redis } from "@/lib/upstash";
import { getCurrentUser } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { id } = req.query;
    const session = await getCurrentUser(req, res);

    const checkAuth = await prisma.url.findFirst({
      where: {
        userId: session.id,
        urlId: id as string,
      },
    });
    if (!checkAuth) return res.status(401).send("Unauthorized");

    const [prismares, redisres] = await Promise.all([
      prisma.url.deleteMany({
        where: {
          urlId: id as string,
        },
      }),
      redis.del(`${process.env.NEXT_PUBLIC_BASE_URL}:${id}`),
    ]);
    if (prismares.count === 0 || redisres === 0) {
      return res.status(400).send("Failed to delete data.");
    }

    return res.status(200).send("Successfully delete data.");
  } else {
    return res.status(405).send("Method not allowed");
  }
}
