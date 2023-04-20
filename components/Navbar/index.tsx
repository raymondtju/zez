import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";

import Layout from "../Layout";
import { toogleTheme } from "@/state/theme/slice";
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
import { signOut } from "next-auth/react";
import Button from "../Button";

export default function Navbar({ session }: { session?: any }) {
  let theme = useAppSelector((state) => state.theme.value);

  const dispatch = useAppDispatch();

  const router = useRouter();
  const [isToken, setIsToken] = useState(false);
  const [isMenu, setIsMenu] = useState(false);

  const root = router.pathname === "/";

  useEffect(() => {
    session ? setIsToken(true) : setIsToken(false);
  }, [session]);

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
        "sticky top-0 z-10 w-full border-b-[1px] border-slate-600 bg-zinc-100/30 text-primary backdrop-blur-xl",
        "dark:border-zinc-100 dark:bg-primary/30 dark:text-zinc-100"
      )}
    >
      <Layout>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-1">
            <Link href="/">
              <h1 className="text-lg font-extrabold md:text-xl lg:text-2xl ">
                kraa.cc
              </h1>
            </Link>
            <small className="flex items-end">(alpha)</small>
          </div>

          <div
            className={clsx(
              `flex w-auto flex-row items-center sm:gap-x-6 gap-x-2 border-none sm:static`
            )}
          >
            {/* <Link href={"https://github.com/raymondtju"} target="_blank">
              <div className="flex items-center gap-2 font-semibold underline underline-offset-4 hover:decoration-2">
                <GiftIcon className="w-5 h-5" />
                <span>Github</span>
              </div>
            </Link> */}

            {/* <button
              className={clsx(
                `border-spacing-0 rounded-full border-2 border-primary bg-zinc-100 px-5 py-2 font-bold text-primary`,
                "duration-300 hover:border-2 hover:bg-primary hover:text-zinc-100",
                "dark:border-2 dark:border-zinc-100 dark:bg-primary dark:text-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-primary"
              )}
            >
              Get Started
            </button> */}
            
            {router.pathname === "/" && !isToken && (
              <div className="flex items-center gap-4">
                <Link href="/auth/signin">
                  <Button className="px-3 py-1.5 sm:px-4 sm:py-2">Signin</Button>
                </Link>
              </div>
            )}

            {/* {router.pathname === "/auth/signup" || router.pathname === "/auth/signin" && (
              <div className="flex items-center gap-4">
                <Link href="/auth/signin">
                  <button
                    className={clsx(
                      `border-spacing-0 rounded-full border-2 border-primary bg-zinc-100 px-5 py-2 font-bold text-primary`,
                      "duration-300 hover:border-2 hover:bg-primary hover:text-zinc-100",
                      "dark:border-2 dark:border-zinc-100 dark:bg-primary dark:text-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-primary"
                    )}
                  >
                    Signin
                  </button>
                </Link>
              </div> 
            )} */}

            <button className="flex items-center" onClick={handleMenu}>
              <Bars2Icon className="w-6 h-7" />
            </button>
            <div
              className={clsx(
                "transition-all duration-300 ease-in-out",
                `${
                  isMenu ? "fixed inset-0 h-[100vh] backdrop-blur-sm bg-white/90" : "hidden"
                }`
              )}
            >
              {/* <div className="fixed inset-0 h-[100vh] bg-zinc-100/90 backdrop-blur-md transition-all dark:bg-zinc-900/90 w-screen" /> */}
              <Layout>
                <div className="relative flex flex-col justify-end float-right gap-3 duration-300">
                  <button
                    className="absolute right-0 flex justify-end top-4"
                    onClick={handleMenu}
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>

                  <button
                    onClick={() => dispatch(toogleTheme())}
                    className={clsx(
                      "mt-14 w-fit rounded-xl border-2 border-zinc-900 p-4",
                      "transition-all duration-300 ease-in-out hover:bg-zinc-900 hover:text-zinc-100",
                      "dark:bg-zinc-100 dark:text-zinc-900 dark:hover:border-zinc-100 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                    )}
                  >
                    {theme ? (
                      <SunIcon className="w-6 h-6" />
                    ) : (
                      <MoonIcon className="w-6 h-6" />
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
                          <HomeIcon className="w-6 h-6" />
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
                          <LinkIcon className="w-6 h-6" />
                          <span>Links</span>
                        </button>
                      </Link>

                      <button
                        className={clsx(
                          "mt-14 rounded-xl border-2 border-zinc-900 p-4",
                          "duration-300 hover:bg-zinc-900 hover:text-zinc-100 ",
                          "dark:bg-zinc-100 dark:text-zinc-900 dark:hover:border-zinc-100 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                        )}
                        onClick={() => signOut({ callbackUrl: "/" })}
                      >
                        <span>
                          <ArrowLeftOnRectangleIcon className="w-6 h-6" />
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
