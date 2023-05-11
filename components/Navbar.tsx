"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import clsx from "clsx";

import {
  ArrowLeftOnRectangleIcon,
  GlobeAltIcon,
  HomeIcon,
  LinkIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Menu } from "lucide-react";

import Container from "@/components/container";
import Button from "@/components/ui/button";
import Image from "next/image";

export default function Navbar({ session }) {
  const router = useRouter();
  const [isMenu, setIsMenu] = useState(false);

  const handleMenu = () => {
    setIsMenu(!isMenu);
  };

  return (
    <nav
      className={clsx(
        "sticky top-0 z-10 w-full bg-zinc-100/30 text-primary backdrop-blur-xl",
        "dark:border-zinc-100 dark:bg-primary/30 dark:text-zinc-100"
      )}
    >
      <Container>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-1">
            <Link href="/">
              <h1 className="text-2xl font-extrabold">
                <Image
                  src="/zez.png"
                  alt="logo"
                  width={20}
                  height={20}
                  className="mr-0.5 inline"
                />
              </h1>
            </Link>
          </div>

          <div
            className={clsx(
              `flex w-auto flex-row items-center gap-x-2 border-none sm:static sm:gap-x-6`
            )}
          >
            {/* <Link href={"https://github.com/raymondtju"} target="_blank">
              <div className="flex items-center gap-2 font-semibold underline underline-offset-4 hover:decoration-2">
                <GiftIcon className="w-5 h-5" />
                <span>Github</span>
              </div>
            </Link> */}

            {!session && (
              <div className="flex items-center gap-4">
                <Link href="/signin">
                  <Button className="px-3 py-1.5 sm:px-4 sm:py-2">
                    Signin
                  </Button>
                </Link>
              </div>
            )}

            <button className="flex items-center" onClick={handleMenu}>
              <Menu className="h-6 w-6" />
            </button>
            <div
              className={clsx(
                "transition-all duration-300 ease-in-out",
                `${
                  isMenu
                    ? "fixed inset-0 min-h-[100vh] bg-zinc-100/90 backdrop-blur-sm dark:bg-zinc-900/90"
                    : "hidden"
                }`
              )}
            >
              {/* <div className="fixed inset-0 h-[100vh] bg-zinc-100/90 backdrop-blur-md transition-all dark:bg-zinc-900/90 w-screen" /> */}
              <Container>
                <div className="relative float-right flex flex-col justify-end gap-6 duration-300">
                  <button
                    className="absolute right-0 top-4 flex justify-end"
                    onClick={handleMenu}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>

                  <div className="flex flex-row-reverse items-center gap-2">
                    <button
                      onClick={() => {
                        router.push("/public/links");
                      }}
                      className={clsx(
                        "mt-14 w-fit rounded-xl border-2 border-zinc-900 p-4",
                        "transition-all duration-300 ease-in-out hover:bg-zinc-900 hover:text-zinc-100",
                        "dark:bg-zinc-100 dark:text-zinc-900 dark:hover:border-zinc-100 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                      )}
                    >
                      <GlobeAltIcon className="h-6 w-6" />
                      <span>Public Link</span>
                    </button>
                  </div>

                  {session && (
                    <div className="flex items-center gap-2">
                      <Link href="/dashboard">
                        <button
                          className={clsx(
                            "rounded-xl border-2 border-zinc-900 p-4",
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
                            "rounded-xl border-2 border-zinc-900 p-4",
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
                          "rounded-xl border-2 border-zinc-900 p-4",
                          "duration-300 hover:bg-zinc-900 hover:text-zinc-100 ",
                          "dark:bg-zinc-100 dark:text-zinc-900 dark:hover:border-zinc-100 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                        )}
                        onClick={() => signOut({ callbackUrl: "/" })}
                      >
                        <span>
                          <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                          <span>Logout</span>
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </Container>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
}
