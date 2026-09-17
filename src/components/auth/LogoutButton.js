"use client";

import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/auth";
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
    >
      <LogOut size={15} />
      Logout
    </button>
  );
}
