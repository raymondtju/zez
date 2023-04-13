import React from "react";
import { m } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import {
  ClockIcon,
  LinkIcon,
  PencilSquareIcon,
  QrCodeIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

const containerItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

interface CardLinkProps {
  urlId: string;
  originalUrl: string;
  reach: number;
  createdAt: string;
  handleDelete: () => void;
  handleGenerate: () => void;
  handleEdit: () => void;
}

function CardLink({
  urlId,
  originalUrl,
  reach,
  createdAt,
  handleDelete,
  handleGenerate,
  handleEdit,
}: CardLinkProps) {
  return (
    <m.div
      className={clsx(
        "flex flex-col overflow-hidden rounded-3xl border-2 border-zinc-900 p-3 px-5",
        "dark:border-zinc-100"
      )}
      variants={containerItem}
    >
      <Link
        href={`/${urlId}`}
        className="text-lg font-bold hover:underline hover:underline-offset-4"
        target="_blank"
      >
        <span className="flex flex-row items-center gap-1">
          <LinkIcon className="h-5 w-5" />
          kraa.cc/{urlId}
        </span>
      </Link>
      <span className="text-sm font-medium text-gray-400">{originalUrl}</span>

      <div className="mt-2 flex items-center justify-between">
        <p className="text-sm font-medium">
          Clicks : <span className="text-lg font-bold">{reach}</span>
        </p>
        <div className="flex items-center gap-1">
          <button onClick={handleGenerate}>
            <QrCodeIcon className="h-5 w-5" />
          </button>
          <button onClick={handleEdit}>
            <PencilSquareIcon className="h-5 w-5" />
          </button>
          <button>
            <TrashIcon className="h-5 w-5" onClick={handleDelete} />
          </button>
        </div>
      </div>

      <div className="my-3 border-b-[0.5px] border-gray-400"></div>
      <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
        <ClockIcon className="h-4 w-4" />
        <span>{createdAt}</span>
      </div>
    </m.div>
  );
}

export default CardLink;
