"use client";

const difficulties = ["Beginner", "Intermediate", "Advanced"];

export default function DifficultyFilter({
  selectedDifficulty,
  onDifficultyChange,
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">
        Level
      </span>

      {difficulties.map((difficulty) => {
        const active = difficulty === selectedDifficulty;

        return (
          <button
            key={difficulty}
            type="button"
            onClick={() =>
              onDifficultyChange(active ? "All" : difficulty)
            }
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              active
                ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-slate-900 hover:ring-blue-200"
            }`}
          >
            {difficulty}
          </button>
        );
      })}
    </div>
  );
}
