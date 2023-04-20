import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { signIn } from "next-auth/react";

import Layout from "@/components/Layout";
import FormInput from "@/components/FormInput";
import { postData } from "@/utils";
import { setUsername } from "@/state/user/slice";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/lib/auth";

export default function Signin() {
  const dispatch = useDispatch();

  const router = useRouter();
  let token: string;

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [alert, setAlert] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    setAlert(true);
    const result = await postData("/api/v1/user/signin", form);
    if (result?.data) {
      if (result?.status === 200) {
        token = result.data.token;
        Cookies.set("token", token);
        dispatch(setUsername(form.username));
        toast.success(result?.data?.message || "Signed in successfully");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } else {
      toast.error(result?.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Signin Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <Layout>
          {alert && <Toaster />}
          <div className="mx-auto mt-20 max-w-md">
            <h1 className="text-center text-4xl font-bold">Sign In</h1>
            <div className="mt-5 flex flex-col">
              <form onSubmit={handleSubmit}>
                <FormInput
                  label={"Your username"}
                  name={"username"}
                  type={"text"}
                  placeholder={"trolllink"}
                  onChange={handleChange}
                  value={form.username}
                />
                <FormInput
                  label={"Yassword"}
                  name={"password"}
                  type={"password"}
                  placeholder={"********"}
                  onChange={handleChange}
                  value={form.password}
                />
                <Button type="submit" disabled={true}>
                  Submit
                </Button>
              </form>

              <Button onClick={() => signIn("google")} className="mt-4">
                Signin with google
              </Button>
            </div>
            <p className="mt-10 text-center">
              Need an account?
              <Link href="/auth/signup" className="text-blue-700">
                {" Create an account"}
              </Link>
            </p>
          </div>
        </Layout>
      </main>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getCurrentUser(context.req, context.res)
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
