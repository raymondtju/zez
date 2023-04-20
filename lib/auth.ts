import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth/next";

export async function getCurrentUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);
    const token = await getToken({ req });
    if (session || token) {
      const findUser = await prisma.user.findFirst({
        where: {
          email: session.user.email || token.email,
        },
      });
      if (!findUser) return null;

      return {
        id: findUser.id,
        ...(session || token),
      };
    }

    return null;
  } catch (error) {
    return null;
  }
}
