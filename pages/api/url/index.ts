import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const session = await getCurrentUser(req, res);
      if (!session) {
        return res.status(401).send("Unauthorized");
      }

      const get = await prisma.url.findMany({
        where: {
          userId: session.id,
        },
      });
      return res.status(200).json(get);
    } catch (error) {
      return res.status(400).send(error);
    }
  } else return res.status(405).send("Method not allowed");
}
