import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

function getInitials(name) {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase()).join("") || "U";
}

export default function AuthorSection({ authorId, authorName, authorPhoto }) {
  const { data: authorStats } = useQuery({
    queryKey: ["authorStats", authorId],
    enabled: Boolean(authorId),
    queryFn: async () => {
      const res = await api.get(`/users/${authorId}/stats`);
      return res.data;
    },
    retry: 0,
  });

  const totalLessons = authorStats?.totalLessons ?? 0;

  return (
    <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100 flex flex-col sm:flex-row sm:items-center gap-4">
      {authorPhoto ? (
        <img
          src={authorPhoto}
          alt={authorName || "Author"}
          className="w-20 h-20 rounded-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xl font-bold text-gray-700">
          {getInitials(authorName)}
        </div>
      )}

      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900">
          {authorName || "Unknown Creator"}
        </h3>
        <p className="text-gray-600 mt-1">{totalLessons} lessons created</p>

        {authorId ? (
          <Link
            to={`/profile/${authorId}`}
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            View all lessons by this author
          </Link>
        ) : null}
      </div>
    </div>
  );
}
