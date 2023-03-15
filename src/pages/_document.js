import clsx from "clsx";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body
        className={clsx(
          `bg-zinc-100 font-satoshi selection:bg-gray-500 selection:text-white`,
          "dark:bg-zinc-900 ",
          "duration-200 ease-in-out"
        )}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
