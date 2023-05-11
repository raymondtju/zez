"use client"

import clsx from "clsx";
import React, { PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren) {
  return (
    <div
      className={clsx(
        "mx-auto px-4 max-w-5xl text-zinc-900",
        " dark:text-zinc-100"
      )}
    >
      {children}
    </div>
  );
}
