import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-56">
      <p className="text-center text-xs font-semibold text-zinc-100 dark:text-zinc-900">
        @2023,
        <Link
          href={"https://github.com/raymondtju"}
          target={"_blank"}
          className="font-bold"
        >
          {" Ferropayo"}
        </Link>
        .
      </p>
    </footer>
  );
}
