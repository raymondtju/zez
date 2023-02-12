import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-56">
      <p className="text-center text-sm font-semibold text-slate-500">
        @2023,
        <Link
          href={"https://github.com/raymondtju"}
          target={"_blank"}
          className="font-bold text-gray-800"
        >
          {" Ferropayo"}
        </Link>
        .
      </p>
    </footer>
  );
}
