import { Metadata } from "next";

import { meta } from "@/lib/const";
import PublicLinks from "@/components/pages/public-links";
import { redis } from "@/lib/upstash";

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
  try {
    const scan = await redis.scan(0, {
      count: 50,
      match: `${process.env.NEXT_PUBLIC_BASE_URL}*`,
    });
    let get = scan[1];
    let data: PublicLinksProps[] = get.map((item) => ({
      key: item,
      val: "",
      exp: -1,
    }));

    for (const x in data) {
      const pipeline2 = redis.multi();
      pipeline2.ttl(data[x].key);
      pipeline2.get(data[x].key);
      const [exp, url]: [number, { url: string }] = await pipeline2.exec();
      if (exp === -1) {
        delete data[x];
        continue;
      }

      data[x] = {
        key:
          process.env.NODE_ENV === "development"
            ? data[x].key.split(":")[3]
            : data[x].key.split(":")[2],
        val: url.url,
        exp,
      } as PublicLinksProps;
    }
    data = data.filter(Object);

    return data;
  } catch (error) {
    return null;
  }
}

async function Page() {
  const data = await getPublicLinks();

  return <>{data && <PublicLinks data={data} />}</>;
}

export default Page;
