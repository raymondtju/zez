import React from "react";

import Container from "@/components/container";
import Navbar from "@/components/navbar";
import { Metadata } from "next";
import UserAuthForm from "@/components/user-auth-form";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sigin - zez.pw - Free Custom URL Shortener",
  description: "Sigin to your account",
};

export default async function Sigin() {
  const session = await getCurrentUser();
  return (
    <>
      <main>
        <Navbar session={session} />
        <Container>
          <div className="mx-auto mt-20 max-w-md">
            <h1 className="text-center text-4xl font-bold">Signin</h1>
            <UserAuthForm />
          </div>
        </Container>
      </main>
    </>
  );
}
