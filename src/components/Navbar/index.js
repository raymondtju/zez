import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import GithubIcon from "/public/assets/icons/github.svg";
import Link from "next/link";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  const router = useRouter();
  const [isToken, setIsToken] = useState(false);

  const root = router.pathname === "/";

  useEffect(() => {
    Cookies.get("token") ? setIsToken(true) : setIsToken(false);
  }, [root, isToken]);

  const handleLogout = () => {
    Cookies.remove("token");
    router.reload();
  };

  return (
    <nav className="flex items-center justify-between py-4">
      <Link href="/">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-extrabold text-redGuy">TrollLink.</h1>
        </div>
      </Link>
      <div className="flex flex-row gap-x-2">
        <Link href={"https://github.com/raymondtju"} target="_blank">
          <div className="hover: flex items-center gap-4 p-2 hover:rounded-lg hover:shadow-xl">
            <Image src={GithubIcon} alt="Github" />
          </div>
        </Link>
        {router.pathname !== "/signin" && (
          <>
            {isToken ? (
              <div className="flex items-center gap-2">
                <Link href="/dashboard">
                  <button
                    className={`hover: rounded-lg py-2 px-4 shadow-lg hover:shadow-inner`}
                  >
                    <span>Dashboard</span>
                  </button>
                </Link>

                <button
                  className={`hover: block h-full rounded-lg p-2 shadow-lg hover:shadow-inner`}
                  onClick={handleLogout}
                >
                  <span>
                    <ArrowLeftOnRectangleIcon className="h-5 w-5 fill-red-600" />
                  </span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/signin">
                  <button
                    className={`hover: rounded-lg py-2 px-4 shadow-lg hover:shadow-inner`}
                  >
                    <span>Sign In</span>
                  </button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
