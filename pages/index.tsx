import Head from "next/head";

import { getCurrentUser } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Header from "@/components/pages/home/Header";
import Layout from "@/components/Layout";

export default function Home({ session }) {
  
  return (
    <>
      <Head>
        <title>zez.</title>
        <meta name="description" content="url shortener" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/zez.ico" />
      </Head>
      <main>
        <Navbar session={session} />
        <Layout>
          <Header />
        </Layout>
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
