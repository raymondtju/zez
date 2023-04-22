import { NextApiRequest, NextApiResponse } from "next";
import { redis } from "@/lib/upstash";
import { nanoid } from "nanoid";

import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).send("Field required");
      }

      const urlId = nanoid(5);
      const session = await getCurrentUser(req, res);
      if (!session) {
        const create = await redis.set(
          `${process.env.NEXT_PUBLIC_BASE_URL}:${urlId}`,
          { url },
          { ex: 60 * 60 * 24 }
        );
        if (create == "OK") {
          return res.status(201).json({ data: { urlId }, expired: "1d" });
        } else
          return res.status(400).json({
            message: "Please try again.",
          });
      }

      const [create, redisStatus] = await Promise.all([
        prisma.url.create({
          data: {
            url,
            urlId,
            reach: 0,
            userId: session?.id,
          },
        }),
        redis.set(`${process.env.NEXT_PUBLIC_BASE_URL}:${urlId}`, { url }),
      ]);
      if (redisStatus !== "OK")
        return res.status(400).send("Please try again later.");

      return res.status(201).json({
        data: create,
      });
    } catch (error) {
      return res.status(500).send(error || "Internal server error");
    }
  } else {
    return res.status(405).send("Method not allowed");
  }
}
