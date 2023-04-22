import Head from "next/head";
import useSWR from "swr"
import { Toaster } from "react-hot-toast";
import {m} from "framer-motion"

import { fetcher, formatSeconds } from "@/lib/utils";
import { getCurrentUser } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Layout from "@/components/Layout";
import { ItemLinksContainer, LinksContainer } from "@/lib/const";
import clsx from "clsx";
import Link from "next/link";
import { ClockIcon, LinkIcon } from "@heroicons/react/24/solid";

export type PublicLinksProps = {
  key?: string,
  val?: string,
  exp?: number
}

export async function getServerSideProps({ req, res }) {
  const session = await getCurrentUser(req, res);
  return {
    props: { session },
  };
}

function PublicLinks({session}) {
  const { data: links } = useSWR<PublicLinksProps[]>("/api/url?type=public", fetcher);
  
  return (
    <>
      <Head>
        <title>public links</title>
        <meta name="description" content="kraa.cc - public link list" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Toaster />
        <Navbar session={session} />
        <Layout>
          <h1 className="mt-8 text-2xl font-bold tracking-tighter">
            public links
          </h1>

          <m.div
            className="grid gap-4 mt-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={LinksContainer}
          >
            {links ? links.map((link, i) => (
              <m.div
                className={clsx(
                  "flex flex-col overflow-hidden rounded-3xl border-2 border-zinc-900 p-3 px-5",
                  "dark:border-zinc-100"
                )}
                variants={ItemLinksContainer}
                key={i}
              >
                <Link
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/${link.key}`}
                  className="text-base font-bold hover:underline hover:underline-offset-4 sm:text-lg"
                  target="_blank"
                >
                  <span className="flex flex-row items-center gap-1">
                    <LinkIcon className="w-4 h-4 sm:h-5 sm:w-5" />
                    {process.env.NEXT_PUBLIC_BASE_URL.split("://")[1]}/{link.key}
                  </span>
                </Link>
                <span className="text-[12px] font-medium text-gray-400 sm:text-sm">
                  {link.val}
                </span>

                <div className="flex items-center justify-between mt-2">
                  {/* <p className="text-[12px] font-medium sm:text-sm">
                    Clicks :{" "}
                    <span className="text-base font-bold sm:text-lg">{reach}</span>
                  </p> */}
                  {/* <div className="flex items-center gap-1">
                    <button onClick={handleGenerate}>
                      <QrCodeIcon className="w-4 h-4 sm:h-5 sm:w-5" />
                    </button>
                    <button onClick={handleEdit}>
                      <PencilSquareIcon className="w-4 h-4 sm:h-5 sm:w-5" />
                    </button>
                    <button>
                      <TrashIcon
                        className="w-4 h-4 sm:h-5 sm:w-5"
                        onClick={handleDelete}
                      />
                    </button>
                  </div> */}
                </div>

                <div className="my-3 border-b-[0.5px] border-gray-400"></div>
                <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
                  <ClockIcon className="w-4 h-4" />
                  <span>Expired in {formatSeconds(link.exp).hour}H {formatSeconds(link.exp).min}M </span>
                </div>
              </m.div>
            )) : (
              <div>loading ...</div>
            )}
          </m.div>

          <div>
            
          </div>
          {/* <LinksC ontainer data={links} loading={isLoading} mutate={mutate} /> */}
        </Layout>
      </main>
    </>
  )
}

export default PublicLinks;
