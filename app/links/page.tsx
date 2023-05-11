import { meta } from "@/lib/const";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...meta({
    title: "Your Links | zez.pw - Free Custom URL Shortener",
    description:
      "zez is a free URL shortener that allows you to shorten and customize long URLs into short and memorable links. Create custom short URLs for your website or social media profiles with ease.",
    image: `./og.png`,
  }),
};

export default async function Page() {
  return (
    <>
      <h1>Select an url to view detailed info.</h1>
    </>
  );
}
