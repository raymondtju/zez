import clsx from "clsx";
import React, { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div
      className={clsx(
        "mx-auto w-[90%] max-w-[75rem] text-zinc-900",
        " dark:text-zinc-100"
      )}
    >
      {children}
    </div>
  );
}