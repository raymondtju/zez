import React, { useCallback, useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import clsx from "clsx";

import {
  ArrowRightIcon,
  LinkIcon,
  QrCodeIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import HeaderTitle from "./HeaderTitle";
import { Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { useQrCode } from "@/lib/helpers/useQrCode";

export default function Header() {
  const [url, seturl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>(null);
  const [error, setError] = useState<string>(null);
  const [loading, setLoading] = useState(false);
  const [temurl, setTemurl] = useState<string>(null);

  const qr = useQrCode();
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  const handleGenerate = useCallback(
    async (url: string) => {
      await qr.update({ data: url });
      console.log(qr);
      qr.append(ref.current);
    },
    [qr]
  );
  const handleDownload = () => {
    qr.download({
      name: "qr-code",
    });
  };

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

  return (
    <header className="mt-10">
      <HeaderTitle />

      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Your QR</DialogTitle>
          </DialogHeader>
          <div ref={ref} className="flex justify-center" />
          <div className="flex justify-center font-bold">
            <button
              className="px-4 py-1 mx-auto rounded-lg bg-zinc-900 text-zinc-100 hover:bg-zinc-600"
              onClick={() => handleDownload()}
            >
              Download
            </button>
            <button
              className="px-4 py-1 mx-auto text-center border-2 rounded-lg border-zinc-900"
              onClick={() => {
                setOpen(false);
              }}
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>

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
            <ArrowRightIcon className={clsx("w-5 h-5", loading && "animate-spin")} />
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
              {`${shortUrl.split("://")[1]}`}
            </a>
            <div className="flex items-center space-x-2">
              <Copy
                className="w-4 h-4 cursor-pointer"
                onClick={() => navigator.clipboard.writeText(shortUrl)}
              />
              {/* <ShareIcon className="w-5 h-5 cursor-pointer" /> */}
              <button
                onClick={async () => {
                  setOpen(true);
                  await handleGenerate(shortUrl);
                }}
              >
                <QrCodeIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
          {/* <div ref={ref} className="border-2 rounded-3xl" /> */}
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
