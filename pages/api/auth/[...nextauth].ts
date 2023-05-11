import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/lib/prismadb";
import NextAuth from "next-auth/next";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  debug:
  process.env.NODE_ENV === "development" ||
  process.env.VERCEL_ENV === "preview" ||
  process.env.VERCEL_ENV === "development"
  ? true
  : false,
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
