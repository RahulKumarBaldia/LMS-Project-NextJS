"use client";

const categories = [
  "Web Development",
  "JavaScript",
  "React",
  "Backend",
  "Database",
];

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((category) => {
        const active = category === selectedCategory;

        return (
          <button
            key={category}
            type="button"
            onClick={() =>
              onCategoryChange(active ? "All" : category)
            }
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              active
                ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-slate-900 hover:ring-blue-200"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
