import React, { useState } from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { signIn } from "next-auth/react";

import Layout from "@/components/Layout";
import FormInput from "@/components/ui/FormInput";
import { setUsername } from "@/state/user/slice";
import Button from "@/components/ui/Button";
import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/lib/auth";
import HeadLayout from "@/components/HeadLayout";

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

  // async function handleSubmit(
  //   e: React.FormEvent<HTMLFormElement>
  // ): Promise<void> {
  //   e.preventDefault();
  //   setAlert(true);
  //   const result = await postData("/api/v1/user/signin", form);
  //   if (result?.data) {
  //     if (result?.status === 200) {
  //       token = result.data.token;
  //       Cookies.set("token", token);
  //       dispatch(setUsername(form.username));
  //       toast.success(result?.data?.message || "Signed in successfully");
  //       setTimeout(() => {
  //         router.push("/");
  //       }, 2000);
  //     }
  //   } else {
  //     toast.error(result?.response?.data?.message || "Something went wrong");
  //   }
  // }

  return (
    <>
      <HeadLayout title="Singin - zez.pw - Free Custom URL Shortener" />
      <main>
        <Navbar />
        <Layout>
          {alert && <Toaster />}
          <div className="max-w-md mx-auto mt-20">
            <h1 className="text-4xl font-bold text-center">Sign In</h1>
            <div className="flex flex-col mt-5">
              {/* <form onSubmit={handleSubmit}>
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
              </form> */}

              <Button
                onClick={() => signIn("google", { callbackUrl: "/links" })}
                className="mt-4"
              >
                Signin with google
              </Button>
            </div>
            {/* <p className="mt-10 text-center">
              Need an account?
              <Link href="/auth/signup" className="text-blue-700">
                {" Create an account"}
              </Link>
            </p> */}
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
