import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Cookies from "js-cookie";
import clsx from "clsx";

import Layout from "../Layout";
import { toogleTheme } from "@/state/theme/slice";
import { setUsername } from "@/state/user/slice";
import {
  ArrowLeftOnRectangleIcon,
  Bars2Icon,
  GiftIcon,
  HomeIcon,
  LinkIcon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "@/hooks";

export default function Navbar() {
  let theme = useAppSelector((state) => state.theme.value);

  const dispatch = useAppDispatch();

  const router = useRouter();
  const [isToken, setIsToken] = useState(false);
  const [isMenu, setIsMenu] = useState(false);

  const root = router.pathname === "/";

  useEffect(() => {
    Cookies.get("token") ? setIsToken(true) : setIsToken(false);
  }, [root, isToken]);

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(setUsername(null));
    localStorage.removeItem("username");
    router.reload();
  };

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const handleMenu = () => {
    setIsMenu(!isMenu);
  };

  return (
    <nav
      className={clsx(
        "sticky top-0 z-10 w-full border-b-[0.1rem] border-primary bg-zinc-100/30 text-primary backdrop-blur-xl",
        "dark:border-zinc-100 dark:bg-primary/30 dark:text-zinc-100"
      )}
    >
      <Layout>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-1">
            <Link href="/">
              <h1 className="text-2xl font-extrabold ">kraa.cc</h1>
            </Link>
            <small className="flex items-end">(alpha)</small>
          </div>

          <div
            className={clsx(
              `flex w-auto flex-row items-center gap-x-6 border-none sm:static`
            )}
          >
            <Link href={"https://github.com/raymondtju"} target="_blank">
              <div className="flex items-center gap-2 font-semibold underline underline-offset-4 hover:decoration-2">
                <GiftIcon className="h-5 w-5" />
                <span>Github</span>
              </div>
            </Link>

            {router.pathname === "/" && !isToken && (
              <div className="flex items-center gap-4">
                <Link href="/signin">
                  <button
                    className={clsx(
                      `border-spacing-0 rounded-full border-2 border-primary bg-zinc-100 py-2 px-5 font-bold text-primary`,
                      "duration-300 hover:border-2 hover:bg-primary hover:text-zinc-100",
                      "dark:border-2 dark:border-zinc-100 dark:bg-primary dark:text-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-primary"
                    )}
                  >
                    Get Started
                  </button>
                </Link>
              </div>
            )}

            {router.pathname === "/signup" && (
              <div className="flex items-center gap-4">
                <Link href="/signin">
                  <button
                    className={clsx(
                      `border-spacing-0 rounded-full border-2 border-primary bg-zinc-100 py-2 px-5 font-bold text-primary`,
                      "duration-300 hover:border-2 hover:bg-primary hover:text-zinc-100",
                      "dark:border-2 dark:border-zinc-100 dark:bg-primary dark:text-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-primary"
                    )}
                  >
                    Sign In
                  </button>
                </Link>
              </div>
            )}

            {router.pathname === "/signin" && (
              <div className="flex items-center gap-4">
                <Link href="/signup">
                  <button
                    className={clsx(
                      `border-spacing-0 rounded-full border-2 border-primary bg-zinc-100 py-2 px-5 font-bold text-primary`,
                      "duration-300 hover:border-2 hover:bg-primary hover:text-zinc-100",
                      "dark:border-2 dark:border-zinc-100 dark:bg-primary dark:text-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-primary"
                    )}
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            )}

            <button className="flex items-center" onClick={handleMenu}>
              <Bars2Icon className="h-6 w-6" />
            </button>
            <div
              className={clsx(
                "flex transition-all duration-300 ease-in-out",
                `${
                  isMenu ? "fixed inset-0 h-[100vh] backdrop-blur-xl" : "hidden"
                }`
              )}
            >
              <div className="fixed inset-0 h-[100vh] bg-zinc-100/70 backdrop-blur-xl transition-all dark:bg-zinc-900/70" />
              <Layout>
                <div className="relative float-right flex flex-col justify-end gap-3 duration-300">
                  <button
                    className="absolute right-0 top-4 flex justify-end"
                    onClick={handleMenu}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>

                  <button
                    onClick={() => dispatch(toogleTheme())}
                    className={clsx(
                      "mt-14 w-fit rounded-xl border-2 border-zinc-900 p-4",
                      "duration-300 hover:bg-zinc-900 hover:text-zinc-100 ",
                      "dark:bg-zinc-100 dark:text-zinc-900 dark:hover:border-zinc-100 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                    )}
                  >
                    {theme ? (
                      <SunIcon className="h-6 w-6" />
                    ) : (
                      <MoonIcon className="h-6 w-6" />
                    )}

                    <span>{`Theme mode: ${theme ? "dark" : "light"}`}</span>
                  </button>

                  {isToken && (
                    <div className="flex items-center gap-2">
                      <Link href="/dashboard">
                        <button
                          className={clsx(
                            "mt-14 rounded-xl border-2 border-zinc-900 p-4",
                            "duration-300 hover:bg-zinc-900 hover:text-zinc-100 ",
                            "dark:bg-zinc-100 dark:text-zinc-900 dark:hover:border-zinc-100 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                          )}
                          onClick={handleMenu}
                        >
                          <HomeIcon className="h-6 w-6" />
                          <span>Dashboard</span>
                        </button>
                      </Link>
                      <Link href="/links">
                        <button
                          className={clsx(
                            "mt-14 rounded-xl border-2 border-zinc-900 p-4",
                            "duration-300 hover:bg-zinc-900 hover:text-zinc-100 ",
                            "dark:bg-zinc-100 dark:text-zinc-900 dark:hover:border-zinc-100 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                          )}
                          onClick={handleMenu}
                        >
                          <LinkIcon className="h-6 w-6" />
                          <span>Links</span>
                        </button>
                      </Link>

                      <button
                        className={clsx(
                          "mt-14 rounded-xl border-2 border-zinc-900 p-4",
                          "duration-300 hover:bg-zinc-900 hover:text-zinc-100 ",
                          "dark:bg-zinc-100 dark:text-zinc-900 dark:hover:border-zinc-100 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                        )}
                        onClick={handleLogout}
                      >
                        <span>
                          <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                          <span>Logout</span>
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </Layout>
            </div>
          </div>
        </div>
      </Layout>
    </nav>
  );
}
