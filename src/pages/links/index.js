import Head from "next/head";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { LinkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { m } from "framer-motion";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import clsx from "clsx";

import Layout from "@/components/Layout";
import { fetchData, removeData } from "@/utils";
import { formatDate } from "@/utils/formatDate";
import { qrOptions, useQrCode } from "@/components/QRCode";
import CardLink from "@/components/Card/CardLink";
import { Toaster, toast } from "react-hot-toast";

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

function Links({ data }) {
  const router = useRouter();
  const qr = useQrCode(qrOptions);

  const [target, setTarget] = useState("");
  const [open, setOpen] = useState(false);

  const [keyword, setKeyword] = useState("");

  const ref = useRef(null);

  useEffect(() => {
    qr.update({ data: target });
    qr.append(ref.current);
  }, [target, qr]);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleDelete = async (id) => {
    const res = await toast.promise(removeData(`/api/v1/url/remove/${id}`), {
      loading: "Deleting...",
      success: "Deleted",
      error: "Failed to delete",
    });
    console.log(res);
    if (res.status === 200) {
      refreshData();
    }
  };

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

  const [dataa, setDataa] = useState(data);
  useEffect(() => {
    if (keyword) {
      const fil = data.filter((item) => {
        return item.urlId.toLowerCase().includes(keyword);
      });
      setDataa(fil);
    } else {
      setDataa(data);
    }
  }, [keyword, data]);

  return (
    <>
      <Head>
        <title>your links</title>
        <meta name="description" content="kraa.cc - your link list" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Dialog
          open={open}
          onClose={() => {
            setOpen(!open);
            setTarget("");
          }}
          className={clsx("relative z-10")}
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity" />

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                <Dialog.Panel className="relative w-full transform overflow-hidden rounded-xl bg-white p-4 text-left shadow-xl transition-all sm:my-8 sm:w-fit sm:max-w-lg">
                  <Dialog.Title className="relative flex justify-center text-lg font-bold">
                    <span>your qr code</span>
                  </Dialog.Title>
                  <Dialog.Description className={"text-center"}>
                    scan or download qr below to redirect to your link
                  </Dialog.Description>

                  <div ref={ref} className="flex justify-center" />
                  <div className="mt-4 flex justify-center font-bold">
                    <button
                      className="mx-auto rounded-lg bg-zinc-900 px-4 py-1 text-zinc-100 hover:bg-zinc-600"
                      onClick={() => handleDownload()}
                    >
                      download
                    </button>
                    <button
                      className="mx-auto rounded-lg border-2 border-zinc-900 px-4 py-1 text-center"
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
        <Toaster />
        <Layout>
          <h1 className="mt-8 text-2xl font-bold tracking-tighter">
            list of your link
          </h1>

          <div className="flex justify-end">
            <div className="flex w-fit items-center rounded-lg bg-white p-2 text-black">
              <MagnifyingGlassIcon className="h-5 w-5" />
              <input
                type="text"
                onChange={(e) => setKeyword(e.target.value)}
                className="ml-2 focus:outline-none"
                placeholder="search your link"
              />
            </div>
          </div>
          {data.length === 0 ? (
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
          ) : (
            <m.div
              className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              initial="hidden"
              animate="visible"
              variants={container}
            >
              {dataa.map((item) => (
                <Fragment key={item._id}>
                  <CardLink
                    key={item._id}
                    urlId={item.urlId}
                    id={item._id}
                    createdAt={formatDate(item.createdAt)}
                    reach={item.reach}
                    shortUrl={item.shortUrl}
                    originalUrl={item.originalUrl}
                    handleDelete={() => handleDelete(item._id)}
                    handleGenerate={() => {
                      setTarget("https://kraa.cc/" + item.urlId);
                      // console.log("item.shortUrl", item.shortUrl);
                      setOpen(!open);
                    }}
                    handleEdit={() => {
                      setEditId(item._id);
                      setEditUrl(item.originalUrl);
                      setEditModal(true);
                    }}
                  />
                </Fragment>
              ))}
            </m.div>
          )}
        </Layout>
      </main>
    </>
  );
}

export default Links;

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
  return {
    props: { data: res.data.result },
  };
}
