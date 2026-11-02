"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "./InputField";
import PasswordInput from "./PasswordInput";
import { resolveAuthRedirect } from "@/lib/authRedirect";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validPassword = (password) => {
    return password.length >= 8;
  };

  const validForm = () => {
    if (!formData.email) {
      alert("Email is required");
      return false;
    }

    if (!validEmail(formData.email)) {
      alert("Invalid email");
      return false;
    }

    if (!formData.password) {
      alert("Password is required");
      return false;
    }

    if (!validPassword(formData.password)) {
      alert("Password must be at least 8 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validForm()) {
      return;
    }
  
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      alert(data.message);
      return;
    }

    const redirectTo = resolveAuthRedirect(
      data.user,
      searchParams.get("next")
    );

    window.location.href = redirectTo;
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <InputField
        onChange={handleChange}
        label="Email"
        type="email"
        name="email"
        placeholder="you@example.com"
        required
      />

      <PasswordInput
        onChange={handleChange}
        label="Password"
        name="password"
        placeholder="••••••••"
        required
      />

      <div className="flex justify-end">
        <span className="text-sm font-medium text-neutral-400">
          Forgot password? Contact support
        </span>
      </div>

      <button
        type="submit"
        className="mt-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25"
      >
        Log In
      </button>
    </form>
  );
}