"use client";

import { useState } from "react";
import InputField from "./InputField";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  const validConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const validForm = () => {
    if (!formData.name) {
      alert("Name is required");
      return false;
    }

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

    if (!formData.confirmPassword) {
      alert("Confirm password is required");
      return false;
    }

    if (
      !validConfirmPassword(
        formData.password,
        formData.confirmPassword
      )
    ) {
      alert("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validForm()) {
      return;
    }
  
    try {
      const response = await fetch("/api/auth/signup", {
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

      const redirectTo =
        data.user?.role === "admin" ? "/admin" : "/dashboard";

      window.location.href = redirectTo;
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <InputField
        onChange={handleChange}
        label="Full Name"
        type="text"
        name="name"
        placeholder="Rahul Kumar"
        required
      />

      <InputField
        onChange={handleChange}
        label="Email"
        type="email"
        name="email"
        placeholder="you@example.com"
        required
      />

      <InputField
        onChange={handleChange}
        label="Password"
        type="password"
        name="password"
        placeholder="••••••••"
        required
      />

      <InputField
        onChange={handleChange}
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="••••••••"
        required
      />

      <button
        type="submit"
        className="mt-2 rounded-full bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg"
      >
        Sign Up
      </button>
    </form>
  );
}