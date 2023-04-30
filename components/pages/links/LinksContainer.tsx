import { Fragment, useEffect, useRef, useState, useCallback } from "react";
import { m } from "framer-motion";
import clsx from "clsx";
import { LinkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
// import { Dialog, Transition } from "@headlessui/react";

import { removeData } from "@/utils";
import { formatDate } from "@/utils/formatDate";
import { useQrCode } from "@/lib/helpers/useQrCode";
import LinksCard from "./LinksCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Url } from "@prisma/client";
import {
  ArrowUpRightFromCircle,
  BarChart2,
  CalendarRange,
  Copy,
  Link2,
  Stars,
} from "lucide-react";
import Button from "@/components/ui/Button";

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

const LinksContainer = ({
  data,
  loading,
  mutate,
}: {
  data: Url;
  loading: boolean;
  mutate: any;
}) => {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    const res = await toast.promise(
      fetch(`/api/url/${id}/delete`, { method: "DELETE" }),
      {
        loading: "Deleting...",
        success: "Deleted",
        error: "Failed to delete",
      }
    );
    if (res.status === 200) router.reload();
    mutate();
  };

  const qr: any = useQrCode();
  const [target, setTarget] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handleGenerate = useCallback(
    async (url: string) => {
      await qr.update({ data: url });
      qr.append(ref.current);
    },
    [qr]
  );

  const handleDownload = () => {
    qr.download({
      name: "qr-code",
    });
  };

  if (!data) return null;

  return (
    <>
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
                setTarget("");
              }}
            >
              Close
            </button>
          </div>
          <DialogDescription></DialogDescription>
        </DialogContent>
      </Dialog>

      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <m.div
            className="w-full"
            initial="hidden"
            animate="visible"
            variants={container}
          >
            <h2 className="text-2xl font-black">
              <Link
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/${data.urlId}`}
                target="_blank"
                onClick={() => {
                  setTimeout(async () => {
                    await mutate;
                    console.log(mutate);
                  }, 5000);
                }}
              >
                {data.title || data.urlId}
              </Link>
            </h2>
            <p className="flex items-center gap-1 font-semibold underline underline-offset-2">
              {process.env.NEXT_PUBLIC_BASE_URL}/{data.urlId}
              <Copy
                className="w-3 h-3 text-blue-900 cursor-pointer"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/${data.urlId}`
                  )
                }
              />
              <Link
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/${data.urlId}`}
                target="_blank"
              >
                <ArrowUpRightFromCircle className="w-3 h-3 text-blue-900 cursor-pointer" />
              </Link>
            </p>

            <div className="flex justify-end gap-3">
              <Button
                onClick={async () => {
                  setOpen(true);
                  await handleGenerate(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/${data.urlId}`
                  );
                }} className="bg-blue-800"
              >
                Generate QR
              </Button>
              <Button onClick={() => handleDelete(data.urlId)} className="bg-blue-800">Delete</Button>
            </div>

            <div className="flex gap-3 mt-3">
              <div className="flex w-[33%] flex-row gap-2 rounded-lg border-[1px] border-gray-200 bg-white px-5 py-2">
                <BarChart2 className="mt-1.5 inline h-6 w-6" />

                <div className="">
                  <h3 className="text-lg font-semibold">Reach</h3>
                  <span className="text-lg font-bold text-blue-900">
                    {data.reach}
                  </span>
                </div>
              </div>
              <div className="flex w-[60%] flex-row gap-2 rounded-lg border-[1px] border-gray-200 bg-white px-5 py-2">
                <CalendarRange className="mt-1.5 inline h-6 w-6" />
                <div className="">
                  <h3 className="text-lg font-semibold">Created at</h3>
                  <span className="text-lg font-bold text-blue-900">
                    {formatDate(data.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </m.div>
        </>
      )}
    </>
  );
};

export default LinksContainer;
