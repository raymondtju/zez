import { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth";
import Navbar from "@/components/navbar";
import Header from "@/components/pages/home/header";
import Container from "@/components/container";
import { meta } from "@/lib/const";

export const metadata: Metadata = {
  ...meta({
    title: "zez.pw - Free Custom URL Shortener",
    description:
      "zez is a free URL shortener that allows you to shorten and customize long URLs into short and memorable links. Create custom short URLs for your website or social media profiles with ease.",
    image: `./og.png`,
  }),
};

export default async function HomePage() {
  const session = await getCurrentUser();
  return (
    <>
      <main>
        <Navbar session={session} />
        <Container>
          <Header />
        </Container>
      </main>
    </>
  );
}
