import Head from "next/head";
import Link from "next/link";
import React from "react";

import Layout from "@/components/Layout";

export default function Signup() {
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
          <div className="mx-auto mt-20 max-w-md">
            <h1 className="text-center text-4xl font-bold">Sign Up</h1>
            <div className="mt-5 flex flex-col">
              <form>
                <div className="mb-6">
                  <label htmlFor="username" className="formLabel">
                    Your username
                  </label>
                  <input
                    type="username"
                    id="username"
                    className="formInput"
                    placeholder="trolllink"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="formLabel">
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="formInput"
                    placeholder="trolllink@gmail.com"
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
                    className="formInput"
                    placeholder="********"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="formLabel">
                    Confirmation Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="formInput"
                    placeholder="********"
                    required
                  />
                </div>
                <button type="submit" className="formButton">
                  Submit
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
