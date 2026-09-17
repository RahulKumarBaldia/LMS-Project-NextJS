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
                ? "bg-neutral-900 text-white shadow-sm"
                : "bg-white text-neutral-600 ring-1 ring-neutral-200 hover:text-neutral-900 hover:ring-neutral-400"
            }`}
          >
            {difficulty}
          </button>
        );
      })}
    </div>
  );
}
