import { Metadata } from "next";

import { meta } from "@/lib/const";
import PublicLinks from "@/components/pages/public-links";

export const metadata: Metadata = {
  ...meta({
    title: "Public Links | zez.pw - Free Custom URL Shortener",
    description:
      "zez is a free URL shortener that allows you to shorten and customize long URLs into short and memorable links. Create custom short URLs for your website or social media profiles with ease.",
    image: `./og.png`,
  }),
};

export type PublicLinksProps = {
  key: string;
  val: string;
  exp: number;
};

async function getPublicLinks() {
  const get = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/links/api?type=public`
  );
  return get.json();
}

async function Page() {
  const data = await getPublicLinks();

  return (
    <>
      <PublicLinks data={data} />
    </>
  );
}

export default Page;
