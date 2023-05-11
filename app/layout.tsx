import "@/styles/globals.css"

import clsx from "clsx";
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/react";

const fontSatoshi = localFont({
  src: "../assets/fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900"
})

const fontChillax = localFont({
  src: "../assets/fonts/Chillax-Variable.woff2",
  variable: "--font-chillax",
  weight: "200 700"
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontSatoshi.variable} ${fontChillax.variable}`}>
      <body
        className={clsx(
          `bg-[#fafafa] font-satoshi selection:bg-zinc-900 selection:text-white`,
          "dark:bg-zinc-900",
          "duration-200 ease-in-out"
        )}
      >
        {children}
      </body>
      <Analytics />
    </html>
  );
}
