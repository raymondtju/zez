"use client";

import React from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const container = {
  hidden: { y: -10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
      type: "spring",
      staggerChildren: 0.5,
    },
  },
};

const item = {
  visible: {
    scale: [1, 1.05, 1.05, 1, 1],
  },
};

function HeaderTitle() {
  return (
    <div
      className={clsx(
        "block h-full items-center pt-12 text-primary",
        "dark:text-zinc-100"
      )}
    >
      <p className="mx-auto mb-4 flex w-fit cursor-grab items-center gap-1 rounded-3xl bg-slate-200 px-4 py-1 shadow-sm duration-300 hover:-translate-y-0.5 hover:bg-slate-100">
        Code is available on{" "}
        <Image
          src="/github.svg"
          alt="logo"
          width={20}
          height={20}
          className="inline"
        />{" "}
        <Link href="https://github.com/raymondtju/zez" target="_blank">
          <span className="cursor-pointer font-bold underline">Github</span>
        </Link>
      </p>
      <h1
        className={clsx(
          "flex select-none flex-wrap justify-center gap-x-4 gap-y-[-10] text-center font-chillax text-[60px] font-black uppercase -tracking-wider",
          "leading-[70px] md:text-[70px] md:leading-[80px]"
        )}
      >
        SHORT & TRACK
      </h1>
      <p
        className={clsx(
          `mx-auto text-center text-lg font-bold leading-none md:text-xl`
        )}
      >
        Say{" "}
        <span className="underline decoration-2 underline-offset-2">
          goodbye
        </span>{" "}
        to bulky links that take up valuable character space.
      </p>
    </div>
  );
}

export default HeaderTitle;
