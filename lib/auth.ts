import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

export async function getCurrentUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
      const findUser = await prisma.user.findFirst({
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
