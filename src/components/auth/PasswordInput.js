"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  label,
  name,
  placeholder,
  ...rest
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-sm font-medium text-neutral-700"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 pr-11 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100"
          {...rest}
        />
        <button
          type="button"
          onClick={() => setVisible((show) => !show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-neutral-400 transition hover:bg-neutral-50 hover:text-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
        >
          {visible ? (
            <Eye className="h-4 w-4" strokeWidth={2} aria-hidden />
          ) : (
            <EyeOff className="h-4 w-4" strokeWidth={2} aria-hidden />
          )}
        </button>
      </div>
    </div>
  );
}
