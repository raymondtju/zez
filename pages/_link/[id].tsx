import Head from "next/head"

import { redis } from "@/lib/upstash"

export default function LinkPage({
  urlId, url
}) {
  return (
    <Head>
      <meta property="og:title" content={urlId} />
      <meta property="og:site_name" content={`${process.env.NEXT_PUBLIC_BASE_URL}:${urlId}`} />
      <meta property="og:description" content={`this is for ${urlId} pages`} />
      <meta property="og:image" content={"https://www.gravatar.com/avatar/069cd27f5db018a31e0d8719a5b66e23?s=64&d=identicon&r=PG"} />
      <meta
        property="og:image:alt"
        content={`OG image for ${urlId} (${urlId})`}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={`${process.env.NEXT_PUBLIC_BASE_URL}:${urlId}`} />
      <meta name="twitter:title" content={`${process.env.NEXT_PUBLIC_BASE_URL}:${urlId}`} />
      <meta name="twitter:description" content={`for twitter ${process.env.NEXT_PUBLIC_BASE_URL}:${urlId}`} />
      <meta name="twitter:image" content="https://www.gravatar.com/avatar/069cd27f5db018a31e0d8719a5b66e23?s=64&d=identicon&r=PG" />
      <meta
        property="twitter:image:alt"
        content={`OG image for ${urlId} (${process.env.NEXT_PUBLIC_BASE_URL}:${urlId})`}
      />
      <meta charSet="utf-8" />
    </Head>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params
  const find = await redis.get(`${process.env.NEXT_PUBLIC_BASE_URL}:${id}`)
  if (!find) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      urlId: id,
      url: find.url
    }
  }
}