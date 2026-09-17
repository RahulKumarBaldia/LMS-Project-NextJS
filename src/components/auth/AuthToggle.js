export default function AuthToggle({ mode, setMode }) {
  return (
    <div className="mb-8 flex rounded-full bg-neutral-100 p-1">
      {[
        { id: "login", label: "Login" },
        { id: "signup", label: "Sign up" },
      ].map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => setMode(option.id)}
          className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
            mode === option.id
              ? "bg-neutral-900 text-white shadow-sm"
              : "text-neutral-500 hover:text-neutral-900"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
