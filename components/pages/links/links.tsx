"use client";

import Image from "next/image";
import clsx from "clsx";
import useSWR from "swr";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import { Link2Icon, ArrowLeft, ArrowRight } from "lucide-react";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

import { fetcher } from "@/lib/utils";
import { Url } from "@prisma/client";
import Link from "next/link";

interface UrlResponse extends Array<Url> {
  data: Url[] | null;
}

const Links = () => {
  const { data, mutate, isLoading, error } = useSWR<UrlResponse>(
    "/links/api",
    fetcher
  );

  const [select, setSelect] = useState<Url | null>(null);
  const [hide, setHide] = useState(false);
  const [forceHide, setForceHide] = useState(false);
  
  return (
    <>
      <Toaster />
      <div className="relative block w-fit">
        <div className="flex flex-col">
          {forceHide ? (
            <span
              className="absolute -top-6 flex w-12 cursor-pointer justify-center rounded-lg border-[1px] border-slate-300 bg-white p-0.5 px-3 text-right text-[10px]"
              onClick={() => setForceHide(!forceHide)}
            >
              SHOW
            </span>
          ) : (
            <span
              className="absolute -top-6 flex w-12 cursor-pointer justify-center rounded-lg border-[1px] border-slate-300 bg-white p-0.5 text-right text-[10px]"
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
            <h1 className="relative mb-2 flex items-center gap-1 pl-2 text-lg font-bold">
              <Link2Icon className="h-5 w-5" />{" "}
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
              {isLoading && !error && (
                <p className="text-gray-500">Loading...</p>
              )}
              {data && data.length > 0 ? (
                data.map((url) => (
                  <Link
                    href={`/links/${url.urlId}`}
                    key={url.urlId}
                    prefetch={false}
                    scroll={false}
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    <div
                      className={clsx(
                        `relative inline-flex items-center gap-2 rounded-lg border-[1px] border-white py-2 pl-2 pr-12 duration-300 hover:border-[1px] hover:border-slate-300 hover:bg-slate-100 ${
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
                        <ChevronDoubleRightIcon className="h-4 w-4" />
                      </div>
                      <div className="h-6 w-6 overflow-hidden rounded-full bg-slate-200 shadow-inner">
                        <Image
                          src={`https://www.google.com/s2/favicons?domain=${url.url}&sz=32`}
                          alt=""
                          width={24}
                          height={24}
                          className=""
                        />
                      </div>
                      <p className={`${hide && "hidden"} w-20 truncate text-ellipsis`}>
                        {url.urlId}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500">No links found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Links;
