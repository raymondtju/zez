"use client"

import Head from "next/head";

type Props = {
  title: string
}

function HeadLayout({title}: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="title" content="zez.pw - Free Custom URL Shortener" />
      <meta
        name="description"
        content="zez is a free online URL shortener that allows you to shorten and customize long URLs into short and memorable links. Create custom short URLs for your website or social media profiles with ease."
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://zez.pw/" />
      <meta property="og:title" content="zez.pw - Free Custom URL Shortener" />
      <meta
        property="og:description"
        content="zez is a free online URL shortener that allows you to shorten and customize long URLs into short and memorable links. Create custom short URLs for your website or social media profiles with ease."
      />
      <meta property="og:image" content="https://zez.pw/og.png?1237810233107" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://zez.pw/" />
      <meta
        property="twitter:title"
        content="zez.pw - Free Custom URL Shortener"
      />
      <meta
        property="twitter:description"
        content="zez is a free online URL shortener that allows you to shorten and customize long URLs into short and memorable links. Create custom short URLs for your website or social media profiles with ease."
      />
      <meta property="twitter:image" content="https://zez.pw/og.png?1237810233107" />

      <link rel="icon" href="https://zez.pw/favicon.ico" />
    </Head>
  );
}

export default HeadLayout;
