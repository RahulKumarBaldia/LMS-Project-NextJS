import { requireAuth } from "@/lib/requireAuth";
import AssistantPageBody from "@/components/assistant/AssistantPageBody";

export const metadata = {
  title: "Course Advisor",
};

export const dynamic = "force-dynamic";

export default async function AssistantPage() {
  // Server gate: guests never receive the advisor page HTML.
  await requireAuth({ nextPath: "/assistant" });

  return (
    <main className="min-h-screen w-full bg-slate-50">
      <AssistantPageBody />
    </main>
  );
}
