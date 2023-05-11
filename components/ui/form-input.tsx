"use client"

import clsx from "clsx";
import React from "react";

interface FormInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  type: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  name: string;
  label?: string;
  disabled?: boolean;
}

export default function FormInput({
  type,
  onChange,
  placeholder,
  name,
  label,
  disabled
}: FormInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="formLabel">
        {label}
      </label>
      <input
        type={type}
        name={name}
        className={clsx("block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900", "disabled:bg-gray-100 disabled:text-gray-700 disabled:cursor-not-allowed")}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        required
      />
    </div>
  );
}
