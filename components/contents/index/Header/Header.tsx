import React, { useCallback, useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import clsx from "clsx";

import {
  ArrowRightIcon,
  LinkIcon,
  QrCodeIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";

import { postData } from "@/utils";
import ClipboardCopy from "@/helpers/ClipboardCopy";
import HeaderTitle from "./HeaderTitle";

import { useQrCode } from "@/helpers/useQrCode";

export default function Header() {
  const [url, seturl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>(null);
  const [error, setError] = useState<string>(null);
  const [loading, setLoading] = useState(false);
  const [temurl, setTemurl] = useState<string>(null);
  let qr = useQrCode();

  useEffect(() => {
    qr.update({ data: shortUrl });
  }, [shortUrl, qr]);

  const ref = useRef<HTMLDivElement>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setError("");
      setShortUrl("");

      const postData = await fetch("/api/url/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
        }),
      });
      const result = await postData.json();

      if (postData.status === 201) {
        setTimeout(() => {
          setShortUrl(
            `${process.env.NEXT_PUBLIC_BASE_URL}/${result?.data?.urlId}`
          );
          qr.update({
            data: `${shortUrl}`,
          });
          setLoading(false);
          setTemurl(url);
          seturl("");
        }, 500);
      } else {
        setTimeout(() => {
          setError(result?.response?.data?.message || "Something went wrong");
          setLoading(false);
        }, 500);
      }
    },
    [qr, shortUrl, url]
  );

  function handleGenerate() {
    qr.append(ref.current);
  }

  return (
    <header className="mt-16">
      <HeaderTitle />
      <div
        className={clsx(
          `mx-auto mt-20 rounded-full border-2 border-black bg-zinc-100 p-2 md:mt-28 md:p-4`,
          `w-full md:w-6/12 md:py-2`,
          "dark:border-zinc-100 dark:bg-zinc-900 dark:text-zinc-100 "
        )}
      >
        <form
          className="flex flex-row items-center justify-between gap-4"
          onSubmit={handleSubmit}
        >
          <LinkIcon className="w-6 h-6" />
          <input
            className={clsx(
              `w-full bg-zinc-100`,
              `focus:outline-none`,
              "dark:bg-transparent"
            )}
            type="url"
            placeholder="https://example.com"
            onChange={(e) => {
              seturl(e.target.value);
            }}
            value={url}
          />
          <button
            className={clsx(
              `whitespace-nowrap rounded-full bg-primary p-2 font-light text-white`,
              `transition-all duration-300 ease-in-out hover:scale-95 hover:bg-slate-800 focus:scale-105`,
              `${loading && "disabled cursor-not-allowed"}`,
              "dark:bg-zinc-100 dark:text-zinc-900"
            )}
            type="submit"
            disabled={loading}
          >
            <span className="sr-only">Shorten</span>
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </form>
      </div>

      {shortUrl && (
        <m.div
          className={clsx(
            `mx-auto mt-4 grid w-full grid-cols-1 overflow-hidden rounded-xl border-2 border-primary`,
            `md:w-6/12`,
            " dark:border-zinc-100 dark:text-zinc-100"
          )}
          initial={{
            y: -32,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            type: "spring",
            delay: 0.1,
            bounce: 0.7,
          }}
          exit={{
            y: -32,
            opacity: 0,
          }}
        >
          <div className="block w-full p-3 text-right">
            <a className="text-sm font-semibold">{temurl}</a>
          </div>
          <div
            className={clsx(
              "flex items-center justify-between bg-primary p-3 py-4 text-xl font-bold text-zinc-100",
              "dark: dark:bg-zinc-100 dark:text-zinc-900"
            )}
          >
            <a
              className="underline decoration-3 hover: underline-offset-2 hover:decoration-4"
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
            >
              {shortUrl}
            </a>
            <div className="flex items-center space-x-2">
              <ClipboardCopy text={shortUrl} />
              <ShareIcon className="w-5 h-5 " />
              <button onClick={handleGenerate}>
                <QrCodeIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div ref={ref} className="border-2 rounded-3xl" />
        </m.div>
      )}

      <div className="mt-10">
        {error && (
          <>
            <p className="text-2xl font-extrabold text-primary">{error}</p>
          </>
        )}
      </div>
    </header>
  );
}
