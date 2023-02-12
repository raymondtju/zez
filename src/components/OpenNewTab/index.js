import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

export default function OpenNewTab({ targetUrl }) {
  return (
    <div>
      <Link href={targetUrl} target="_blank">
        <button
          className={`
          items-center p-2
        `}
        >
          <ArrowUpRightIcon className="h-5 w-5 fill-redGuy md:h-6 md:w-6" />
        </button>
      </Link>
    </div>
  );
}
