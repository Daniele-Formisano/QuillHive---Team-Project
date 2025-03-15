import React, { useState } from "react";

export default function InputField({
  label,
  id,
  type,
  placeholder,
  ...others
}) {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="relative h-[48px] mb-10">
      <label
        htmlFor={id}
        className="absolute left-1 top-[-30px] text-sm font-normal text-secondary-brand"
        style={{
          fontFamily: "'Intelo', sans-serif",
          fontSize: "14px",
          lineHeight: "36px",
        }}
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        className="w-full h-full px-4 py-2 text-sm text-gray-800 border-2 border-stroke-brand rounded-[50px] bg-white focus:outline-none focus:ring-2 focus:ring-primary-brand"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        {...others}
      />
    </div>
  );
}
