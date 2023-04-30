import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id } = req.query;
    try {
      await prisma.url.updateMany({
        where: {
          urlId: id as string,
        },
        data: {
          reach: {
            increment: 1,
          },
        },
      });
      console.log("add");
      return res.status(200).send("");
    } catch (error) {
      console.log(error);
      return res.status(400).send("Error adding reach")
    }
  }
}
