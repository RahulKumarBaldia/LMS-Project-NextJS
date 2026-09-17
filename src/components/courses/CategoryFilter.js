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
                ? "bg-neutral-900 text-white shadow-sm"
                : "bg-white text-neutral-600 ring-1 ring-neutral-200 hover:text-neutral-900 hover:ring-neutral-400"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
