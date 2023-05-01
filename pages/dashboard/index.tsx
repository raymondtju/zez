import Head from "next/head";

import Layout from "@/components/Layout";
import HeadLayout from "@/components/HeadLayout";

export default function Dashboard() {
  return (
    <>
      <HeadLayout title="Dashboard - zez.pw - Free Custom URL Shortener" />
      <main>
        <Layout>
          <h1 className="mt-8 text-xl font-bold tracking-tighter">Dashboard</h1>
        </Layout>
      </main>
    </>
  );
}
