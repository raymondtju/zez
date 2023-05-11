import Head from "next/head";
import prisma from "@/lib/prismadb"

import { redis } from "@/lib/upstash";

export default function LinkPage({ urlId, url, title, meta, description, image }) {
  return (
    <Head>
      <meta property="og:title" content={title || "zez.pw"} />
      <meta
        property="og:site_name"
        content="zez.pw"
      />
      <meta property="og:description" content={description || `${process.env.NEXT_PUBLIC_BASE_URL}/${urlId}`} />
      <meta
        property="og:image"
        content={image || `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${urlId}`}
      />
      <meta
        property="og:image:alt"
        content={title}
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:site"
        content=""
      />
      <meta
        name="twitter:title"
        content={title || "zez.pw"}
      />
      <meta
        name="twitter:description"
        content={description || `${process.env.NEXT_PUBLIC_BASE_URL}/${urlId}`}
      />
      <meta
        name="twitter:image"
        content={image || `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${urlId}`}
      />
      <meta
        property="twitter:image:alt"
        content={title}
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
      title: meta?.title,
      description: meta?.description,
      image: meta?.image
    },
  };
}
