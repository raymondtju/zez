import React from "react";
import { m } from "framer-motion";
import clsx from "clsx";

const container = {
  hidden: { y: -32, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
      type: "spring",
      delayChildren: 1.5,
      staggerChildren: 1,
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
      <m.h1
        className={clsx(
          "flex select-none flex-wrap justify-center gap-y-[-10] gap-x-4 text-center font-chillax text-[60px] font-black uppercase -tracking-wider",
          "leading-[70px] md:text-[70px] md:leading-[80px]"
        )}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {"SHORT & TRACK".split(" ").map((word, index) => {
          return (
            <m.span variants={item} key={index} className="">
              {word + " "}
            </m.span>
          );
        })}
      </m.h1>
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
