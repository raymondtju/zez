import Head from "next/head";

import { getCurrentUser } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import IndexContent from "@/components/pages/home";

export default function Home({ session }) {
  return (
    <>
      <Head>
        <title>kraa.cc - url personalization </title>
        <meta name="description" content="Shorten your url" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar session={session} />
        <IndexContent />
        {/* <Footer /> */}
      </main>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getCurrentUser(req, res);
  return {
    props: {
      session,
    },
  };
}
