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

interface props {
  urlId: string;
  url: string;
  reach: number;
  createdAt: string;
  handleDelete: () => void;
  handleGenerate?: () => void;
  handleEdit: () => void;
  key: string;
}

function LinksCard({
  urlId,
  url,
  reach,
  createdAt,
  handleDelete,
  handleGenerate,
  handleEdit,
  key,
}: props) {
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
        className="text-base font-bold hover:underline hover:underline-offset-4 sm:text-lg"
        target="_blank"
      >
        <span className="flex flex-row items-center gap-1">
          <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          {process.env.NEXT_PUBLIC_BASE_URL.split("://")[1]}/{urlId}
        </span>
      </Link>
      <span className="text-[12px] font-medium text-gray-400 sm:text-sm">
        {url}
      </span>

      <div className="mt-2 flex items-center justify-between">
        <p className="text-[12px] font-medium sm:text-sm">
          Clicks :{" "}
          <span className="text-base font-bold sm:text-lg">{reach}</span>
        </p>
        <div className="flex items-center gap-1">
          <button onClick={handleGenerate}>
            <QrCodeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button onClick={handleEdit}>
            <PencilSquareIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button>
            <TrashIcon
              className="h-4 w-4 sm:h-5 sm:w-5"
              onClick={handleDelete}
            />
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

export default LinksCard;
