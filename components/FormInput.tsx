import React from "react";

interface FormInputProps {
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  name: string;
  label?: string;
  value?: string | "";
}

export default function FormInput({
  type,
  onChange,
  placeholder,
  name,
  label,
  value,
}: FormInputProps) {
  return (
    <div className="mb-6">
      <label htmlFor={name} className="formLabel">
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="formInput"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required
      />
    </div>
  );
}
