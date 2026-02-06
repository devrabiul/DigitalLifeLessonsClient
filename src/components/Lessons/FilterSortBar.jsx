import { useState } from "react";

const categories = [
  "Personal Growth",
  "Career",
  "Relationships",
  "Mindset",
  "Mistakes Learned",
];

const emotionalTones = [
  "Motivational",
  "Sad",
  "Realization",
  "Gratitude",
  "Inspirational",
];

export default function FilterSortBar({ onFilter, onSort, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleClear = () => {
    setSearchTerm("");
    onSearch?.("");
    onFilter?.("clear", "");
    onSort?.("newest");
  };

  return (
    <div className="flex flex-wrap gap-4 mb-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
      <input
        type="text"
        placeholder="Search lessons..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-4 py-2 border border-gray-200 rounded-lg flex-1 min-w-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        onChange={(e) => onFilter?.("category", e.target.value)}
        className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        defaultValue=""
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => onFilter?.("emotionalTone", e.target.value)}
        className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        defaultValue=""
      >
        <option value="">All Emotional Tones</option>
        {emotionalTones.map((tone) => (
          <option key={tone} value={tone}>
            {tone}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => onSort?.(e.target.value)}
        className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        defaultValue="newest"
      >
        <option value="newest">Newest First</option>
        <option value="mostLiked">Most Liked</option>
        <option value="mostSaved">Most Saved</option>
        <option value="alphabetical">A-Z</option>
      </select>

      <button
        type="button"
        onClick={handleClear}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
      >
        Clear Filters
      </button>
    </div>
  );
}
