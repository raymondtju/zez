import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

import Layout from "@/components/Layout";
import { postData } from "@/utils";
import FormInput from "@/components/FormInput";

export default function Signin() {
  const router = useRouter();
  let token;

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await postData("/api/v1/user/signin", form);
    if (result?.data) {
      if (result?.status === 200) {
        token = result.data.token;
        Cookies.set("token", token);
        toast.success(result?.data?.message || "Signed in successfully");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } else {
      toast.error(result?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Signin Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <Toaster />
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
                />
                <FormInput
                  label={"Yassword"}
                  name={"password"}
                  type={"password"}
                  placeholder={"********"}
                  onChange={handleChange}
                />
                <button type="submit" className="formButton">
                  Submit
                </button>
              </form>
            </div>
            <p className="mt-10 text-center">
              Need an account?
              <Link href="/signup" className="text-blue-700">
                {" Create an account"}
              </Link>
            </p>
          </div>
        </Layout>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const { token } = req.cookies;
  if (token) {
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
}
