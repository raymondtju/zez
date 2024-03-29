"use client"

import React, { ReactNode } from "react";
import LoadingIcon from "@/components/ui/icons/Loading";

interface IButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  loading?: boolean;
  onClick?: () => void
}

const Button: React.FC<IButton> = ({
  children,
  disabled,
  loading,
  className,
  onClick,
  ...props
}) => {
  return (
    <button
      className={`w-full rounded-lg border-none bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500 sm:w-auto ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <p>
          <LoadingIcon />
        </p>
      )}
      {children}
    </button>
  );
};

export default Button;
