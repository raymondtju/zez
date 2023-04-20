import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import prisma from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function getCurrentUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
      const findUser = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });
      if (!findUser) return null;

      return {
        id: findUser.id,
        ...session,
      };
    }

    return null;
  } catch (error) {
    return null;
  }
}
