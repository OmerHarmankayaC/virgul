export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink pointer-events-none"
        fill="none" stroke="currentColor" strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="text"
        placeholder="Kitap adı veya yazar ara..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-9 pr-4 py-2.5 border-2 border-ink bg-white text-sm font-medium text-ink placeholder-ink/40 focus:outline-none focus:shadow-brutal-sm transition-shadow"
      />
    </div>
  );
}
