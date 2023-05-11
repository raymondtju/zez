"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";

import { ItemLinksContainer, LinksContainer } from "@/lib/const";
import { formatSeconds } from "@/lib/utils";
import { ClockIcon, LinkIcon } from "@heroicons/react/24/solid";

const PublicLinks = ({ data }) => {
  return (
    <motion.div
      className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
      initial="hidden"
      animate="visible"
      variants={LinksContainer}
    >
      {data.map((link) => (
        <motion.div
          className={clsx(
            "flex flex-col overflow-hidden rounded-3xl border-2 border-zinc-900 p-3 px-5",
            "dark:border-zinc-100"
          )}
          variants={ItemLinksContainer}
          key={link.key}
        >
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/${link.key}`}
            className="text-base font-bold hover:underline hover:underline-offset-4 sm:text-lg"
            target="_blank"
          >
            <span className="flex flex-row items-center gap-1">
              <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              {process.env.NEXT_PUBLIC_BASE_URL?.split("://")[1]}/{link.key}
            </span>
          </Link>
          <span className="text-[12px] font-medium text-gray-400 sm:text-sm">
            {link.val}
          </span>

          <div className="my-3 border-b-[0.5px] border-gray-400"></div>
          <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
            <ClockIcon className="h-4 w-4" />
            <span>
              Expired in {formatSeconds(link.exp).hour}H{" "}
              {formatSeconds(link.exp).min}M{" "}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PublicLinks;
