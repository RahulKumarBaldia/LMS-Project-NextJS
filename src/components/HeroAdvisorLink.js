"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function HeroAdvisorLink() {
  const { loading, isAuthenticated } = useAuth();

  if (loading || !isAuthenticated) {
    return null;
  }

  return (
    <Link
      href="/assistant"
      className="btn-secondary border-blue-200 hover:border-blue-300"
    >
      <Sparkles size={16} className="text-blue-600" />
      Ask the AI Advisor
    </Link>
  );
}
