import { useState } from "react";

function formatCount(num) {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return String(num);
}

export default function StatsSection({ likesCount = 0, favoritesCount = 0 }) {
  const [randomViews] = useState(() => Math.floor(Math.random() * 10000));

  return (
    <div className="flex flex-wrap gap-8 mb-8 py-5 border-y border-gray-100">
      <div className="flex items-center gap-3">
        <span className="text-2xl text-red-500">❤️</span>
        <div>
          <p className="text-2xl font-bold text-gray-900">
            {formatCount(likesCount || 0)}
          </p>
          <p className="text-gray-500 text-sm">Likes</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-2xl text-yellow-500">🔖</span>
        <div>
          <p className="text-2xl font-bold text-gray-900">
            {formatCount(favoritesCount || 0)}
          </p>
          <p className="text-gray-500 text-sm">Favorites</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-2xl text-blue-500">👀</span>
        <div>
          <p className="text-2xl font-bold text-gray-900">
            {formatCount(randomViews)}
          </p>
          <p className="text-gray-500 text-sm">Views</p>
        </div>
      </div>
    </div>
  );
}
