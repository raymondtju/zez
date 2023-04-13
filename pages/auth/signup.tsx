import React, { useState } from "react";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";

import Layout from "@/components/Layout";
import { postData } from "@/utils";
import FormInput from "@/components/FormInput";
import { GetServerSideProps } from "next";

export default function Signup() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confPassword: "",
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
    setAlert(true);
    e.preventDefault();
    const result = await postData("/api/v1/user/signup", form);
    if (result?.data) {
      if (result?.status === 201) {
        toast.success(result?.data?.message || "Signed up successfully");
        setTimeout(() => {
          router.push("/signin");
        }, 2000);
      }
    } else {
      toast.error(result?.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Sign Up Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          {alert && <Toaster />}
          <div className="mx-auto mt-20 max-w-md">
            <h1 className="text-center text-4xl font-bold">Sign Up</h1>
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
                  label={"Your email"}
                  name={"email"}
                  type={"email"}
                  placeholder={"youremail@domain.com"}
                  onChange={handleChange}
                  value={form.email}
                />
                <FormInput
                  label={"Set password"}
                  name={"password"}
                  type={"password"}
                  placeholder={"********"}
                  onChange={handleChange}
                  value={form.password}
                />
                <FormInput
                  label={"Confirm password"}
                  name={"confPassword"}
                  type={"password"}
                  placeholder={"********"}
                  onChange={handleChange}
                  value={form.confPassword}
                />
                <button type="submit" className="formButton">
                  Create account
                </button>
              </form>
            </div>
            <p className="mt-10 text-center">
              Already own an account?
              <Link href="/signin" className="text-blue-700">
                {" Sign In"}
              </Link>
            </p>
          </div>
        </Layout>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
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
};
