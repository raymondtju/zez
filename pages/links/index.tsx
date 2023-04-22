import Head from "next/head";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import Layout from "@/components/Layout";
import { Toaster } from "react-hot-toast";
import { getCurrentUser } from "@/lib/auth";
import { fetcher } from "@/lib/utils";
import LinksContainer from "@/components/pages/links/LinksContainer";
import Navbar from "@/components/Navbar";

export default function Links({ session }) {
  const { data, mutate, isLoading, error } = useSWR("/api/url", fetcher);

  // const [keyword, setKeyword] = useState("");

  // const [dataa, setDataa] = useState(data);
  // useEffect(() => {
  //   if (keyword) {
  //     const fil = data?.filter((item: { urlId: string }) => {
  //       return item.urlId.toLowerCase().includes(keyword);
  //     });
  //     setDataa(fil);
  //   } else {
  //     setDataa(data);
  //   }
  // }, [keyword, data]);

  return (
    <>
      <Head>
        <title>your links</title>
        <meta name="description" content="kraa.cc - your link list" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Toaster />
        <Navbar session={session} />
        <Layout>
          <h1 className="mt-8 text-2xl font-bold tracking-tighter">
            list of your link
          </h1>

          <div className="flex justify-end">
            <div className="flex items-center p-2 text-black bg-white rounded-lg w-fit">
              <MagnifyingGlassIcon className="w-5 h-5" />
              <input
                type="text"
                // onChange={(e) => setKeyword(e.target.value)}
                className="ml-2 focus:outline-none"
                placeholder="search your link"
              />
            </div>
          </div>
          <LinksContainer data={data} loading={isLoading} mutate={mutate} />
        </Layout>
      </main>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getCurrentUser(req, res);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
