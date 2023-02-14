import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import Layout from "@/components/Layout";
import { postData } from "@/utils";

export default function Signin() {
  const router = useRouter();
  let token;

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await postData("/api/v1/user/signin", form);
      console.log(result);
      if (result?.status === 200) {
        token = result.data.token;
        Cookies.set("token", token);
        router.push("/");
      }
      next();
    } catch (error) {
      console.log(error);
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
          <div className="mx-auto mt-20 max-w-md">
            <h1 className="text-center text-4xl font-bold">Sign In</h1>
            <div className="mt-5 flex flex-col">
              <form>
                <div className="mb-6">
                  <label htmlFor="text" className="formLabel">
                    Your username
                  </label>
                  <input
                    type="text"
                    id="text"
                    name="username"
                    className="formInput"
                    placeholder="trolllink"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="formLabel">
                    Your password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="formInput"
                    placeholder="********"
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="formButton"
                  onClick={handleSubmit}
                >
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
