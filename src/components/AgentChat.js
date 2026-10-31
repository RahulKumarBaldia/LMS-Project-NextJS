"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PayPalCheckout from "@/components/PayPalCheckout";

const SUGGESTIONS = [
  "I am a beginner and want to learn JavaScript, budget 15 dollars",
  "Show me advanced courses under 30 dollars",
  "What courses do you have?",
  "Which course is best for learning backend?",
];

const TOOL_LABELS = {
  search_courses: "Searched the course catalog",
  get_my_enrollments: "Checked your enrollments",
  show_checkout: "Prepared a checkout card",
};

function describeAction(action) {
  const args = action.args || {};
  if (action.tool === "search_courses") {
    const parts = [];
    if (args.query) parts.push(`"${args.query}"`);
    if (args.maxPrice) parts.push(`max $${args.maxPrice}`);
    return parts.length > 0 ? parts.join(", ") : "all courses";
  }
  return "";
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-2">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="h-2 w-2 animate-bounce rounded-full bg-neutral-400"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  );
}

export default function AgentChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [checkout, setCheckout] = useState(null);
  const [enrolled, setEnrolled] = useState(null);
  const [error, setError] = useState("");
  const [activityGroups, setActivityGroups] = useState([]);
  const bottomRef = useRef(null);

  // Page khulte hi purani chat database se lao
  useEffect(() => {
    let cancelled = false;

    async function loadHistory() {
      try {
        const res = await fetch("/api/agent");

        // Login nahi hai toh error ki jagah login ka card dikhao
        if (res.status === 401) {
          if (!cancelled) setNeedsLogin(true);
          return;
        }

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Could not load chat");
        if (cancelled) return;
        setMessages(data.messages || []);
        setActivityGroups(data.activity || []);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setReady(true);
      }
    }

    loadHistory();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading, checkout, enrolled, ready]);

  async function send(textOverride) {
    const text = (textOverride ?? input).trim();
    if (!text || loading || !ready) return;

    const next = [...messages, { role: "user", text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setCheckout(null);
    setEnrolled(null);
    setError("");

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (res.status === 401) {
        setNeedsLogin(true);
        return;
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setMessages([...next, { role: "assistant", text: data.reply }]);
      setCheckout(data.checkout || null);

      if (data.activity && data.activity.length > 0) {
        setActivityGroups((prev) => [
          ...prev,
          { prompt: text, actions: data.activity },
        ]);
      }
    } catch (err) {
      // Fail hua message hata do aur input mein wapas daal do (server ne save nahi kiya)
      setMessages(messages);
      setInput(text);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    send();
  }

  async function resetChat() {
    try {
      await fetch("/api/agent", { method: "DELETE" });
    } catch {
      // delete fail ho toh bhi screen saaf kar do
    }
    setMessages([]);
    setInput("");
    setCheckout(null);
    setEnrolled(null);
    setError("");
    setActivityGroups([]);
  }

  function handlePaymentSuccess() {
    const title = checkout?.title || "the course";
    setEnrolled({ title });
    setCheckout(null);
    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: `You are enrolled in ${title}. Happy learning!` },
    ]);
  }

  if (needsLogin) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-xl font-semibold text-neutral-900">
          Please log in to use the AI Advisor
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          The advisor checks which courses you already own and sets up your
          checkout, so it needs your account.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/auth"
            className="rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Login
          </Link>
          <Link
            href="/auth?mode=signup"
            className="rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-semibold text-neutral-900 transition hover:border-neutral-900"
          >
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      {/* Chat */}
      <section className="flex flex-col rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <header className="flex items-start justify-between gap-4 border-b border-neutral-200 px-5 py-4">
          <div>
            <h1 className="text-xl font-semibold text-neutral-900">
              Course Advisor
            </h1>
            <p className="mt-0.5 text-sm text-neutral-500">
              Tell me what you want to learn and your budget. I will find a
              course and set up checkout.
            </p>
          </div>
          <button
            type="button"
            onClick={resetChat}
            className="shrink-0 rounded-lg border border-neutral-200 px-3 py-1.5 text-sm text-neutral-600 transition hover:bg-neutral-50"
          >
            New chat
          </button>
        </header>

        <div
          aria-live="polite"
          className="flex h-[55vh] min-h-[340px] flex-col gap-4 overflow-y-auto px-5 py-5"
        >
          {!ready && (
            <p className="m-auto text-sm text-neutral-400">
              Loading your chat...
            </p>
          )}

          {ready && messages.length === 0 && (
            <div className="m-auto max-w-md text-center">
              <p className="text-sm font-medium text-neutral-700">
                Try one of these
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => send(suggestion)}
                    disabled={loading}
                    className="rounded-full border border-neutral-200 px-3 py-1.5 text-left text-sm text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-semibold text-white">
                  AI
                </div>
              )}
              <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "rounded-br-md bg-neutral-900 text-white"
                    : "rounded-bl-md bg-neutral-100 text-neutral-900"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-end gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-semibold text-white">
                AI
              </div>
              <div className="rounded-2xl rounded-bl-md bg-neutral-100 px-3">
                <TypingDots />
              </div>
            </div>
          )}

          {checkout && (
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                Checkout
              </p>
              <h3 className="mt-1 font-semibold text-neutral-900">
                {checkout.title}
              </h3>
              <p className="mt-1 text-2xl font-bold text-neutral-900">
                ${checkout.price}{" "}
                <span className="text-sm font-normal text-neutral-500">
                  USD
                </span>
              </p>
              <p className="mb-3 mt-1 text-xs text-neutral-500">
                You approve this payment on PayPal. The agent cannot charge
                you. Test mode, no real money.
              </p>
              <PayPalCheckout
                key={checkout.courseId}
                courseId={checkout.courseId}
                onSuccess={handlePaymentSuccess}
              />
            </div>
          )}

          {enrolled && (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
              <p className="font-semibold text-green-800">
                Payment successful
              </p>
              <p className="mt-1 text-sm text-green-700">
                You are now enrolled in {enrolled.title}.
              </p>
              <Link
                href="/dashboard"
                className="mt-3 inline-block rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-800"
              >
                Go to my dashboard
              </Link>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {error && (
          <div className="mx-5 mb-3 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex gap-2 border-t border-neutral-200 p-4"
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Type your message..."
            disabled={loading || !ready}
            className="min-w-0 flex-1 rounded-xl border border-neutral-300 px-4 py-2.5 text-sm outline-none transition focus:border-neutral-900 disabled:bg-neutral-50"
          />
          <button
            type="submit"
            disabled={loading || !ready || !input.trim()}
            className="rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </section>

      {/* Agent Activity */}
      <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-neutral-900">
          Agent Activity
        </h2>
        <p className="mt-0.5 text-xs text-neutral-500">
          What the agent did behind the scenes.
        </p>

        {activityGroups.length === 0 ? (
          <p className="mt-4 text-sm text-neutral-400">No actions yet.</p>
        ) : (
          <div className="mt-4 flex flex-col gap-5">
            {activityGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <p className="truncate text-xs font-medium text-neutral-500">
                  For: &ldquo;{group.prompt}&rdquo;
                </p>
                <ol className="mt-2 flex flex-col gap-2">
                  {group.actions.map((action, actionIndex) => (
                    <li
                      key={actionIndex}
                      className="flex items-start gap-2 rounded-lg bg-neutral-50 px-3 py-2"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-semibold text-white">
                        {actionIndex + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm text-neutral-900">
                          {TOOL_LABELS[action.tool] || action.tool}
                        </p>
                        {describeAction(action) && (
                          <p className="truncate text-xs text-neutral-500">
                            {describeAction(action)}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        )}

        <p className="mt-5 border-t border-neutral-200 pt-4 text-xs text-neutral-500">
          Every payment needs your approval on PayPal. The agent can only show
          a checkout card.
        </p>
      </aside>
    </div>
  );
}