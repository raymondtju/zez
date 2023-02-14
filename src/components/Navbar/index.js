import React, { useState } from "react";
import Image from "next/image";

import GithubIcon from "/public/icons/github.svg";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-4">
      <Link href="/">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-extrabold text-redGuy">TrollLink.</h1>
        </div>
      </Link>
      <div className="flex flex-row gap-x-2">
        <div className="flex items-center gap-4">
          <button
            href="https://github.com/raymondtju"
            target="_blank"
            className={`hover: p-2 hover:rounded-lg hover:shadow-xl`}
          >
            <Image src={GithubIcon} alt="Github" />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/signin">
            <button
              className={`hover: rounded-lg py-2 px-4 shadow-lg hover:shadow-inner`}
            >
              <span>Sign In</span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
