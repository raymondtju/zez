import React from "react";

export default function FormInput({
  type,
  onChange,
  placeholder,
  name,
  label,
}) {
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
        required
      />
    </div>
  );
}
