import Head from "next/head";
import Image from "next/image";
import useSWR from "swr";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Url } from "@prisma/client";

import { getCurrentUser } from "@/lib/auth";
import { fetcher } from "@/lib/utils";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import Layout from "@/components/Layout";
import LinksContainer from "@/components/pages/links/LinksContainer";
import Navbar from "@/components/Navbar";
import { Link2Icon } from "lucide-react";

interface UrlResponse extends Array<Url> {
  data: Url[];
}

export default function Links({ session }) {
  const { data, mutate, isLoading, error } = useSWR<UrlResponse>(
    "/api/url",
    fetcher
  );
  const [select, setSelect] = useState<Url>(null);

  return (
    <>
      <Head>
        <title>your links</title>
        <meta name="description" content="zez -links" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/zez.ico" />
      </Head>
      <main>
        <Toaster />
        <Navbar session={session} />
        <Layout>
          <div className="flex w-full gap-4 mt-12">
            <div className="mb-72 max-h-screen rounded-xl border-[1px] border-slate-200 bg-white px-4 py-3">
              <h1 className="flex items-center gap-1 pl-2 mb-2 text-lg font-bold">
                <Link2Icon className="w-5 h-5" /> LINKS
              </h1>
              <div className="flex flex-col">
                {error && <p className="text-red-500">{error.message}</p>}
                {isLoading && <p className="text-gray-500">Loading...</p>}
                {data && data.length > 0 ? (
                  data.map((url) => (
                    <div
                      key={url.id}
                      className="relative inline-flex cursor-pointer items-center gap-2 rounded-lg border-[1px] border-white py-2 pl-2 pr-12 duration-300 hover:border-[1px] hover:border-slate-300 hover:bg-slate-100"
                      onClick={() => setSelect(url)}
                    >
                      <div className="absolute right-2">
                        <ChevronDoubleRightIcon className="w-4 h-4" />
                      </div>
                      <div className="w-6 h-6 overflow-hidden rounded-full shadow-inner bg-slate-200">
                        <Image
                          src={`https://www.google.com/s2/favicons?domain=${url.url}&sz=32`}
                          alt=""
                          width={24}
                          height={24}
                          className=""
                        />
                      </div>
                      <p>{url.urlId}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No links found.</p>
                )}
              </div>
            </div>
            <LinksContainer
              data={select}
              loading={isLoading}
              mutate={mutate(data)}
            />
          </div>
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
