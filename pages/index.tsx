import { getCurrentUser } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Header from "@/components/pages/home/Header";
import Layout from "@/components/Layout";
import HeadLayout from "@/components/HeadLayout";

export default function Home({ session }) {
  return (
    <>
      <HeadLayout title="zez.pw - Free Custom URL Shortener" />
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
