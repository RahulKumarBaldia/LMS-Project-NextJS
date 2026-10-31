import AgentChat from "@/components/AgentChat";

export const metadata = {
  title: "Course Advisor",
};

export default function AssistantPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
      <AgentChat />
    </main>
  );
}