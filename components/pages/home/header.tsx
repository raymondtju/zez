"use client";

import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

import { Copy } from "lucide-react";
import {
  ArrowRightIcon,
  LinkIcon,
  QrCodeIcon,
} from "@heroicons/react/24/solid";

import HeaderTitle from "./header-title";
import DialogQR from "@/components/dialog-qr";
import useQRDialog from "@/hooks/useQRDialog";

export default function Header() {
  const [url, seturl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [temurl, setTemurl] = useState<string>("");

  const qrDialog = useQRDialog();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setError("");
      setShortUrl("");

      const postData = await fetch("/links/api", {
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
        setShortUrl(
          `${process.env.NEXT_PUBLIC_BASE_URL}/${result?.data?.urlId}`
        );
        setTimeout(() => {
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
    [url]
  );

  return (
    <header className="mt-10">
      {qrDialog.isOpen && <DialogQR url={shortUrl} />}
      
      <HeaderTitle />
      <div
        className={clsx(
          `mx-auto mt-12 rounded-full border-2 border-black bg-zinc-100 p-2 md:mt-16 md:p-4`,
          `w-full md:w-6/12 md:py-2`,
          "dark:border-zinc-100 dark:bg-zinc-900 dark:text-zinc-100 "
        )}
      >
        <form
          className="flex flex-row items-center justify-between gap-4"
          onSubmit={handleSubmit}
        >
          <LinkIcon className="h-6 w-6" />
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
            required
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
            <ArrowRightIcon
              className={clsx("h-5 w-5", loading && "animate-spin")}
            />
          </button>
        </form>
      </div>

      {shortUrl && (
        <motion.div
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
              className="decoration-3 hover: underline underline-offset-2 hover:decoration-4"
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
            >
              {`${shortUrl.split("://")[1]}`}
            </a>
            <div className="flex items-center space-x-2">
              <Copy
                className="h-4 w-4 cursor-pointer"
                onClick={() => navigator.clipboard.writeText(shortUrl)}
              />
              {/* <ShareIcon className="w-5 h-5 cursor-pointer" /> */}
              <button
                onClick={() => {
                  qrDialog.onOpen();
                }}
              >
                <QrCodeIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </motion.div>
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
