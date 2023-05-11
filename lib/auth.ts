import { getServerSession } from "next-auth/next";

import prisma from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);
    if (session) {
      const findUser = await prisma.user.findFirst({
        where: {
          email: session.user?.email as string,
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
