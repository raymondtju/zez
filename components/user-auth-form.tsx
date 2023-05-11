"use client";

import { signIn } from "next-auth/react";

import Button from "./ui/button";
import FormInput from "./ui/form-input";

type UserAuthFormProps = {};

const UserAuthForm = ({ ...props }: UserAuthFormProps) => {
  return (
    <>
      <div className="mt-5 flex flex-col" {...props}>
        <FormInput
          name="email"
          type="email"
          placeholder="example@zez.pw"
          disabled={true}
        />
        <Button
          onClick={() => signIn("google", { callbackUrl: "/links" })}
          className="mb-4"
          disabled={true}
        >
          Sigin with email
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#fafafa] px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button
          onClick={() => signIn("google", { callbackUrl: "/links" })}
          className="mt-4"
        >
          Sigin with google
        </Button>
      </div>
    </>
  );
};

export default UserAuthForm;
