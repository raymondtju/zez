import Head from "next/head";
import React from "react";

import Layout from "@/components/Layout";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>dashboard</title>
        <meta name="description" content="kraa.cc - dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <h1 className="mt-8 text-xl font-bold tracking-tighter">Dashboard</h1>
        </Layout>
      </main>
    </>
  );
}
