"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AgentChat from "@/components/AgentChat";
import AssistantChatSkeleton from "@/components/assistant/AssistantChatSkeleton";

/**
 * Client shell for the advisor. The page is already server-gated;
 * this only covers client-side logout / expired sessions without
 * briefly mounting the chat for guests.
 */
export default function AssistantPageBody() {
  const router = useRouter();
  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/auth?next=/assistant");
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated) {
    return (
      <>
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
            <p className="section-eyebrow">AI Advisor</p>
            <h1 className="mt-1 page-heading">Course Advisor</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
              Loading your advisor…
            </p>
          </div>
        </div>
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <AssistantChatSkeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <p className="section-eyebrow">AI Advisor</p>
          <h1 className="mt-1 page-heading">Course Advisor</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
            Tell Skillwern&apos;s advisor what you want to learn and your budget —
            it searches the catalog and helps you checkout safely.
          </p>
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <AgentChat />
      </div>
    </>
  );
}
