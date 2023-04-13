import { useEffect, useState } from "react";
import Head from "next/head";
import { Toaster, toast } from "react-hot-toast";

import { useSelector } from "react-redux";
import IndexContent from "@/components/contents/index";

export default function Home() {
  // const user = useSelector((state) => state.user.username);
  // const [username, setUsername] = useState(null);

  // useEffect(() => {
  //   if (!user) return;
  //   setUsername(user);
  // }, [user, username]);

  // useEffect(() => {
  //   if (!username) return;
  //   toast.success(`Welcome back ${username}!`);

  //   setTimeout(() => {
  //     toast.dismiss();
  //   }, 5000);
  // }, [username]);

  return (
    <>
      <Head>
        <title>kraa.cc - url personalization </title>
        <meta name="description" content="Shorten your url" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* {user && (
          <Toaster
            toastOptions={{
              duration: 2000,
            }}
          />
        )} */}
        <IndexContent />
        {/* <Footer /> */}
      </main>
    </>
  );
}
