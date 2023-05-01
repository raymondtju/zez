import { m } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import { Trash2, PencilIcon, QrCode, Clock1 } from "lucide-react";

import Image from "next/image";
import { useState } from "react";


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
}

function LinksCard({
  urlId,
  url,
  reach,
  createdAt,
  handleDelete,
  handleGenerate,
  handleEdit,
}: props) {
  const [editLink, setEditLink] = useState({
    target: "",
    value: "",
    state: false
  });
 
  return (
    <m.div
      className={clsx(
        "rounded-2xl bg-white sm:p-5 p-4 w-full overflow-hidden",
        "dark:border-slate-100"
      )}
      style={{
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
      }}
      variants={containerItem}
    >
      <div className="flex justify-between w-full">
        <div className="flex flex-col w-4/5">
          <div className="flex items-center">
            <div className="flex items-center justify-center rounded-lg shrink-0 w-7 h-7 bg-slate-200">
              <Image
                src={`https://s2.googleusercontent.com/s2/favicons?domain=${url}` || "https://s2.googleusercontent.com/s2/favicons?domain=https://google.com/"}
                alt="web logo"
                width={16}
                height={16}
              />
            </div>
            
            <Link href={`${url}`} target="_blank">
              <p className="pl-2 text-lg font-bold transition-all duration-300 hover:underline hover:underline-offset-[3px] hover:decoration-2 underline-offset-1 ease-in-out cursor-pointer">
                {process.env.NEXT_PUBLIC_BASE_URL.split("://")[1]}/{urlId}
              </p>
            </Link>
          </div>
          
          <span className="pt-0.5 text-sm break-words text-slate-500 line-clamp-2">{url}</span>

          <div className="flex items-center justify-between mt-2">
            <p className="text-sm font-medium">
              Clicks : <span className="text-lg font-bold">{reach}</span>
            </p>
          </div>

          {/* <div className="my-2 border-b-[1px] border-slate-900 md:my-3"></div> */}
          <div className="flex items-center gap-1 text-xs font-medium text-slate-700">
            <Clock1 className="w-3 h-3 md:h-4 md:w-4" />
            <span>{createdAt}</span>
          </div>
        </div>

        <ul className="my-auto shadow-md rounded-2xl">
          <li>
            <button className="p-2 duration-200 rounded-full hover:bg-slate-100">
              <PencilIcon className="w-4 h-4 md:w-5 md:h-5 text-slate-700" />
            </button>
          </li>
          <li>
            <button onClick={handleGenerate} className="p-2 duration-200 rounded-full hover:bg-slate-100">
              <QrCode className="w-4 h-4 md:w-5 md:h-5 text-slate-700" />
            </button>
          </li>
          <li>
            <button onClick={handleDelete} className="p-2 duration-200 rounded-full hover:bg-slate-100">
              <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-slate-700" />
            </button>
          </li>
        </ul>
      </div>
    </m.div>
  );
}

export default LinksCard;
