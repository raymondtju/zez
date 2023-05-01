import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { redis } from "@/lib/upstash";
import { getCurrentUser } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id, newID } = req.body;
    const session = await getCurrentUser(req, res);

    const checkAuth = await prisma.url.findFirst({
      where: {
        urlId: id as string,
        userId: session.id,
      },
    });
    if (!checkAuth) return res.status(401).send("Unauthorized");

    const checkDuplicate = await prisma.url.findFirst({
      where: {
        urlId: newID,
      },
    });
    if (checkDuplicate)
      return res.status(400).send("ID already exist.");

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
      return res.status(400).send("Failed to edit data.");
    }

    return res.status(200).json({ message: "Successfully edit data." });
  } else {
    return res.status(405).send("Method not allowed");
  }
}
