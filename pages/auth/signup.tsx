import React, { useState } from "react";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";

import Layout from "@/components/Layout";
import FormInput from "@/components/ui/FormInput";
import { GetServerSideProps } from "next";
import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/lib/auth";

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

  // async function handleSubmit(
  //   e: React.FormEvent<HTMLFormElement>
  // ): Promise<void> {
  //   setAlert(true);
  //   e.preventDefault();
  //   const result = await postData("/api/v1/user/signup", form);
  //   if (result?.data) {
  //     if (result?.status === 201) {
  //       toast.success(result?.data?.message || "Signed up successfully");
  //       setTimeout(() => {
  //         router.push("/signin");
  //       }, 2000);
  //     }
  //   } else {
  //     toast.error(result?.response?.data?.message || "Something went wrong");
  //   }
  // }

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Sign Up Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <Layout>
          {alert && <Toaster />}
          <div className="max-w-md mx-auto mt-20">
            <h1 className="text-4xl font-bold text-center">Sign Up</h1>
            <div className="flex flex-col mt-5">
              {/* <form onSubmit={handleSubmit}> */}
              {/* <FormInput
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
                </button> */}
              {/* </form> */}
            </div>
            <p className="mt-10 text-center">
              Already own an account?
              <Link href="/auth/signin" className="text-blue-700">
                {" Sign In"}
              </Link>
            </p>
          </div>
        </Layout>
      </main>
    </>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const session = await getCurrentUser(req, res);
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
