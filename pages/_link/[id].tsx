import Head from "next/head";
import prisma from "@/lib/prismadb"

import { redis } from "@/lib/upstash";

export default function LinkPage({ urlId, url, title, meta, description, image }) {
  return (
    <Head>
      <meta property="og:title" content={title || `${process.env.NEXT_PUBLIC_BASE_URL}/${urlId}`} />
      <meta
        property="og:site_name"
        content={`${process.env.NEXT_PUBLIC_BASE_URL}:${urlId}`}
      />
      <meta property="og:description" content={description || "zez.pw"} />
      <meta
        property="og:image"
        content={image}
      />
      <meta
        property="og:image:alt"
        content=""
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:site"
        content=""
      />
      <meta
        name="twitter:title"
        content={title || `${process.env.NEXT_PUBLIC_BASE_URL}/${urlId}`}
      />
      <meta
        name="twitter:description"
        content={description || "zez.pw"}
      />
      <meta
        name="twitter:image"
        content={image}
      />
      <meta
        property="twitter:image:alt"
        content={`OG image for ${urlId} (${process.env.NEXT_PUBLIC_BASE_URL}:${urlId})`}
      />
      <meta charSet="utf-8" />
    </Head>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const find = await redis.get<{ url: string }>(
    `${process.env.NEXT_PUBLIC_BASE_URL}:${id}`
  );
  const meta = await prisma.url.findFirst({
    where: {
      urlId: id
    }
  })
  if (!find) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      urlId: id,
      url: find.url,
      title: meta.title,
      description: meta.description,
      image: meta.image
    },
  };
}
