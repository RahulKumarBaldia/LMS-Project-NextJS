export default function AssistantChatSkeleton() {
  return (
    <div
      className="grid animate-pulse gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"
      aria-busy="true"
      aria-label="Loading advisor"
    >
      <div className="flex h-[min(640px,70vh)] flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <div className="h-5 w-40 rounded-full bg-slate-200" />
          <div className="mt-2 h-4 w-64 max-w-full rounded-full bg-slate-100" />
        </div>
        <div className="flex flex-1 items-center justify-center px-5">
          <p className="text-sm text-slate-400">Loading your advisor…</p>
        </div>
      </div>
      <div className="hidden h-48 rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
        <div className="border-b border-slate-100 px-5 py-4">
          <div className="h-4 w-28 rounded-full bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
