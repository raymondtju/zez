"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { formatDate } from "@/utils/formatDate";

import { Url } from "@prisma/client";
import {
  ArrowUpRightFromCircle,
  BarChart2,
  CalendarRange,
  Copy,
} from "lucide-react";
import Button from "@/components/ui/button";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormInput from "@/components/ui/form-input";
import DialogQR from "@/components/dialog-qr";
import useQRDialog from "@/hooks/useQRDialog";

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
  remove,
}: {
  data: Url | null;
  loading?: boolean;
  mutate?: () => void;
  remove?: () => void;
}) => {
  const router = useRouter();
  

  const handleDelete = async (id: string) => {
    const res = await toast.promise(
      fetch(`/links/api/${id}`, { method: "DELETE" }),
      {
        loading: "Deleting...",
        success: "Deleted",
        error: "Failed to delete",
      }
    );
    if (res.status === 200) {
      router.push("/links");
      router.replace("/links");
    }
    mutate;
  };

  const qrDialog = useQRDialog();

  const [editField, setEditField] = useState({
    id: "",
    newID: "",
  });
  const [metaField, setMetaField] = useState({
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!data) return null;

  return (
    <>
      {qrDialog.isOpen && (
        <DialogQR
          url={`${process.env.NEXT_PUBLIC_BASE_URL}/${data.urlId}`}
        />
      )}

      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <motion.div
            className="w-full"
            initial="hidden"
            animate="visible"
            variants={container}
          >
            <div className="flex flex-row items-start gap-2">
              <Image
                src={`https://www.google.com/s2/favicons?domain=${data.url}&sz=32`}
                alt=""
                width={24}
                height={24}
                className="mt-1.5"
              />
              <div className="w-full">
                <h2 className="text-2xl font-black">
                  <Link
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/${data.urlId}`}
                    target="_blank"
                  >
                    {data.title || data.urlId}
                  </Link>
                </h2>
                <p className="flex items-center gap-1 font-semibold underline underline-offset-2">
                  {process.env.NEXT_PUBLIC_BASE_URL}/{data.urlId}
                  <Copy
                    className="h-3 w-3 cursor-pointer text-blue-900"
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
                    <ArrowUpRightFromCircle className="h-3 w-3 cursor-pointer text-blue-900" />
                  </Link>
                </p>
                <div className="flex items-center gap-2">
                  <p className="max-w-lg items-center gap-1 overflow-hidden truncate rounded-xl bg-slate-200 px-2 py-0.5 text-xs font-bold text-slate-500">
                    {data.url}
                  </p>
                  <Copy
                    className="h-3 w-3 cursor-pointer text-blue-900"
                    onClick={() => navigator.clipboard.writeText(data.url)}
                  />
                </div>
              </div>
            </div>

            <div className="flex w-full justify-end gap-3">
              <Button
                onClick={async () => {
                  qrDialog.onOpen();
                }}
                className="bg-blue-800"
              >
                Generate QR
              </Button>
              <Button
                onClick={() => handleDelete(data.urlId)}
                className="bg-blue-800"
              >
                Delete
              </Button>
            </div>

            <div className="mt-3 flex gap-3">
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

            <div className="mt-10 w-full">
              <Tabs defaultValue="edit" className="w-full max-w-[500px]">
                <TabsList className="">
                  <TabsTrigger className="px-5" value="edit">
                    Edit
                  </TabsTrigger>
                  <TabsTrigger className="px-5" value="metatags">
                    Metatags
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="edit">
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      try {
                        const response = await fetch(`/links/api/${data.urlId}`, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(editField),
                        });
                        if (response.ok) {
                          toast.promise(Promise.resolve(), {
                            loading: "Loading...",
                            success: "Edited",
                            error: (err) => err,
                          });
                          if (response.status === 200) router.push(`/links/${editField.newID}`)
                        } else {
                          console.error(response);
                        }
                      } catch (error) {
                        toast.error(error.toString());
                      }
                    }}
                    onChange={(e) => {
                      setEditField({
                        ...editField,
                        id: data.urlId,
                        [(e.target as HTMLInputElement).name]: (
                          e.target as HTMLInputElement
                        ).value,
                      });
                    }}
                  >
                    <FormInput
                      type="text"
                      label="Previous Handler"
                      placeholder={data.urlId}
                      name="id"
                      disabled
                    />
                    <FormInput
                      type="text"
                      label="New Handler"
                      placeholder="input your new url handle"
                      name="newID"
                    />
                    <Button>Save</Button>
                  </form>
                </TabsContent>
                <TabsContent value="metatags">
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      try {
                        setIsLoading(true);
                        const response = await fetch(
                          `/api/link/${data.urlId}/meta`,
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(metaField),
                          }
                        );
                        if (response.ok) {
                          setIsLoading(false);
                          toast.promise(Promise.resolve(), {
                            loading: "Loading...",
                            success: "Meta updated",
                            error: (err) => err,
                          });
                          if (response.status === 200) router.refresh();
                        } else {
                          console.error(response);
                        }
                      } catch (error) {
                        toast.error(error.toString());
                      }
                    }}
                  >
                    <FormInput
                      type="text"
                      label="Title"
                      placeholder="title"
                      name="title"
                      onChange={(e) => {
                        setMetaField({
                          ...metaField,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      required={false}
                    />
                    <FormInput
                      type="text"
                      label="Description"
                      placeholder="description"
                      name="description"
                      onChange={(e) => {
                        setMetaField({
                          ...metaField,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      required={false}
                    />
                    <FormInput
                      type="file"
                      label="Image"
                      placeholder="input your new url handle"
                      name="text"
                      disabled
                      required={false}
                    />
                    <Button disabled={loading}>Save</Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default LinksContainer;
