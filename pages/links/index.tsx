import Head from "next/head";
import Image from "next/image";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Url } from "@prisma/client";

import { getCurrentUser } from "@/lib/auth";
import { fetcher } from "@/lib/utils";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import Layout from "@/components/Layout";
import LinksContainer from "@/components/pages/links/LinksContainer";
import Navbar from "@/components/Navbar";
import { Link2Icon, ArrowLeft, ArrowRight } from "lucide-react";
import clsx from "clsx";
import HeadLayout from "@/components/HeadLayout";

interface UrlResponse extends Array<Url> {
  data: Url[];
}

export default function Links({ session }) {
  const { data, mutate, isLoading, error } = useSWR<UrlResponse>(
    "/api/url",
    fetcher
  );
  const [select, setSelect] = useState<Url>(null);
  const [hide, setHide] = useState(false);
  const [forceHide, setForceHide] = useState(false);

  return (
    <>
      <HeadLayout title="Links - zez.pw - Free Custom URL Shortener" />
      <main>
        <Toaster />
        <Navbar session={session} />
        <Layout>
          <div className="relative flex w-full gap-4 mt-12">
            <div className="flex flex-col">
              {forceHide ? (
                <span
                  className="absolute -top-6 w-12 flex cursor-pointer justify-center rounded-lg border-[1px] border-slate-300 bg-white p-0.5 px-3 text-right text-[10px]"
                  onClick={() => setForceHide(!forceHide)}
                >
                  SHOW
                </span>
              ) : (
                <span
                  className="absolute -top-6 w-12 flex cursor-pointer justify-center rounded-lg border-[1px] border-slate-300 bg-white p-0.5 text-right text-[10px]"
                  onClick={() => setForceHide(!forceHide)}
                >
                  HIDE
                </span>
              )}
              <div
                className={clsx(
                  "h-fit rounded-xl border-[1px] border-slate-200 bg-white px-4 py-3",
                  hide && "px-2",
                  forceHide && "hidden"
                )}
              >
                <h1 className="relative flex items-center gap-1 pl-2 mb-2 text-lg font-bold">
                  <Link2Icon className="w-5 h-5" />{" "}
                  <span className={`${hide && "hidden"}`}>LINKS</span>
                  {hide ? (
                    <ArrowRight
                      className="absolute -right-6 h-6 w-6 cursor-pointer rounded-full border-[1px] border-slate-300 bg-white p-1 text-right"
                      onClick={() => setHide(!hide)}
                    />
                  ) : (
                    <ArrowLeft
                      className="absolute -right-6 h-6 w-6 cursor-pointer rounded-full border-[1px] border-slate-300 bg-white p-1 text-right"
                      onClick={() => setHide(!hide)}
                    />
                  )}
                </h1>
                <div className="flex flex-col gap-0.5">
                  {error && <p className="text-red-500">{error.message}</p>}
                  {isLoading && <p className="text-gray-500">Loading...</p>}
                  {data && data.length > 0 ? (
                    data.map((url) => (
                      <div
                        key={url.urlId}
                        className={clsx(
                          `relative inline-flex cursor-pointer items-center gap-2 rounded-lg border-[1px] border-white py-2 pl-2 pr-12 duration-300 hover:border-[1px] hover:border-slate-300 hover:bg-slate-100 ${
                            select === url &&
                            "border-[1px] border-slate-300 bg-slate-100"
                          }`,
                          hide && "pr-2"
                        )}
                        onClick={() => {
                          setSelect(url);
                          setHide(true);
                        }}
                      >
                        <div
                          className={clsx("absolute right-2", hide && "hidden")}
                        >
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
                        <p className={`${hide && "hidden"} w-20 truncate`}>{url.urlId}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No links found.</p>
                  )}
                </div>
              </div>
            </div>

            <LinksContainer
              data={select}
              loading={isLoading}
              mutate={() => {
                mutate();
                const filtered = data.filter((dataa) => {
                  dataa.urlId === select.urlId;
                });
                setSelect(filtered[0]);
              }}
              remove={() => {
                setSelect(null);
              }}
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
