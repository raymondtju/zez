import Head from "next/head";
import React, { useState } from "react";
import { ClockIcon, LinkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";

import Layout from "@/components/Layout";
import { fetchData } from "@/utils";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const containerItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function Dashboard({ data }) {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Trolllink Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <h1 className="mt-8 text-xl font-bold tracking-tighter">
            YOUR TROLLING LINKS
          </h1>

          <motion.div
            className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
            // hidden={{ opacity: 1, scale: 0 }}
            // visible={{
            //   opacity: 1,
            //   scale: 1,
            //   transition: {
            //     delayChildren: 0.3,
            //     staggerChildren: 0.2,
            //   },
            // }}
            initial="hidden"
            animate="visible"
            variants={container}
          >
            {data.reverse().map((item) => (
              <motion.div
                key={item._id}
                className="flex flex-col overflow-hidden rounded-lg border-[1px] border-gray-200 bg-white p-4 px-6"
                // hidden={{ y: 20, opacity: 0 }}
                // visible={{
                //   y: 0,
                //   opacity: 1,
                // }}
                variants={containerItem}
              >
                <Link
                  href={item.shortUrl}
                  className="text-lg font-bold hover:underline hover:underline-offset-4"
                >
                  <span className="flex flex-row items-center gap-1">
                    <LinkIcon className="h-5 w-5" />
                    trolllink.vercel.app/{item.urlId}
                  </span>
                </Link>
                <span className="text-sm font-medium text-gray-400">
                  {item.originalUrl}
                </span>
                <p className="mt-2 text-sm font-medium">
                  Clicks :{" "}
                  <span className="text-lg font-bold">{item.reach}</span>
                </p>
                <div className="my-3 border-b-[0.5px] border-gray-400"></div>
                <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
                  <ClockIcon className="h-4 w-4" />
                  <span>{formatDate(item.createdAt)}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div>
            {data.length === 0 && (
              <>
                <div className="flex flex-row items-center justify-center gap-1 ">
                  <LinkIcon className="h-5 w-5" />
                  <span className="uppercase">No links found.</span>
                  <Link href="/">
                    <span className="font-bold text-blue-700 hover:underline hover:underline-offset-2">
                      Create
                    </span>
                  </Link>
                </div>
              </>
            )}
          </div>
        </Layout>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const res = await fetchData(`/api/v1/url`, token);
  // console.log(res.data.result);
  return {
    props: { data: res.data.result },
  };
}
