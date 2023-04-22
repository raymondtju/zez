import { Fragment, useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import clsx from "clsx";
import { LinkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";

import { removeData } from "@/utils";
import { formatDate } from "@/utils/formatDate";
import { useQrCode } from "@/helpers/useQrCode";
import LinksCard from "./LinksCard";

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
  mutate
}: {
  data?: any;
    loading: boolean;
  mutate: () => void
}) => {
  const router = useRouter();
  async function handleDelete(id: string) {
    const res = await toast.promise(fetch (`/api/url/${id}/delete`, {method: "DELETE"}), {
      loading: "Deleting...",
      success: "Deleted",
      error: "Failed to delete",
    });
    // if (res.status === 200) mutate();
    mutate()
  }

  const qr: any = useQrCode();
  const [target, setTarget] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    qr.update({ data: target });
    qr.append(ref.current);
  }, [target, qr]);

  const handleDownload = () => {
    qr.download({
      name: "qr-code",
    });
  };

  useEffect(() => {
    if (open) {
      ref.current.focus();
    }
  }, [open]);

  return (
    <div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <Dialog
            open={open}
            onClose={() => {
              setOpen(!open);
              setTarget("");
            }}
            className={clsx("relative z-10")}
          >
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 backdrop-blur-sm" />

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
                <Transition
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  show={open}
                  as={Fragment}
                >
                  <Dialog.Panel className="relative w-full p-4 overflow-hidden text-left transition-all transform bg-white shadow-xl rounded-xl sm:my-8 sm:w-fit sm:max-w-lg">
                    <Dialog.Title className="relative flex justify-center text-lg font-bold">
                      <span>your qr code</span>
                    </Dialog.Title>
                    <Dialog.Description className={"text-center"}>
                      scan or download qr below to redirect to your link
                    </Dialog.Description>

                    <div ref={ref} className="flex justify-center" />
                    <div className="flex justify-center mt-4 font-bold">
                      <button
                        className="px-4 py-1 mx-auto rounded-lg bg-zinc-900 text-zinc-100 hover:bg-zinc-600"
                        onClick={() => handleDownload()}
                      >
                        download
                      </button>
                      <button
                        className="px-4 py-1 mx-auto text-center border-2 rounded-lg border-zinc-900"
                        onClick={() => {
                          setOpen(false);
                          setTarget("");
                        }}
                      >
                        close
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition>
              </div>
            </div>
          </Dialog>
          {data?.length === 0 ? (
            <>
              <div className="flex flex-row items-center justify-center gap-1 ">
                <LinkIcon className="w-5 h-5" />
                <span className="uppercase">No links found.</span>
                <Link href="/">
                  <span className="font-bold text-blue-700 hover:underline hover:underline-offset-2">
                    Create
                  </span>
                </Link>
              </div>
            </>
          ) : (
            <m.div
              className="grid gap-4 mt-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              initial="hidden"
              animate="visible"
              variants={container}
            >
              {data.map((item) => (
                <Fragment key={item.urlId}>
                  <LinksCard
                    key={item._id}
                    urlId={item.urlId}
                    createdAt={formatDate(item.createdAt)}
                    reach={item.reach}
                    url={item.url}
                    handleDelete={() => handleDelete(item.urlId)}
                    handleGenerate={() => {
                      setTarget(`${process.env.NEXT_PUBLIC_BASE_URL}/${item.urlId}`);
                      setOpen(!open);
                    }}
                    handleEdit={() => {
                      // setEditId(item._id);
                      // setEditUrl(item.originalUrl);
                      // setEditModal(true);
                    }}
                  />
                </Fragment>
              ))}
            </m.div>
          )}
        </>
      )}
    </div>
  );
};

export default LinksContainer;
