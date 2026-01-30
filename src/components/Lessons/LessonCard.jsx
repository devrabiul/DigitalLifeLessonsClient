import { Link } from "react-router";

function getLessonId(lesson) {
  return lesson?._id || lesson?.id;
}

export default function LessonCard({ lesson }) {
  const lessonId = getLessonId(lesson);

  const title = lesson?.title || "Untitled Lesson";
  const excerpt =
    lesson?.excerpt ||
    lesson?.shortDescription ||
    lesson?.description ||
    lesson?.story ||
    "";

  const authorName =
    lesson?.authorName ||
    lesson?.author?.name ||
    lesson?.creatorName ||
    lesson?.createdBy?.name ||
    "Unknown";

  const category = lesson?.category || "General";
  const emotionalTone = lesson?.emotionalTone;

  const likesCount = lesson?.likesCount ?? lesson?.likes?.length ?? 0;
  const favoritesCount = lesson?.favoritesCount ?? 0;

  const excerptText = excerpt
    ? excerpt.length > 140
      ? `${excerpt.slice(0, 140)}...`
      : excerpt
    : "";

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100 flex flex-col">
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
          {category}
        </span>
        {emotionalTone ? (
          <span className="inline-flex items-center bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">
            {emotionalTone}
          </span>
        ) : null}
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>

      {excerptText ? (
        <p className="text-gray-600 mb-4 flex-1">{excerptText}</p>
      ) : (
        <div className="flex-1" />
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-700 font-medium">{authorName}</div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-red-500 font-semibold">❤️ {likesCount}</span>
          <span className="text-gray-700 font-semibold">🔖 {favoritesCount}</span>
        </div>
      </div>

      {lessonId ? (
        <Link
          to={`/lessons/${lessonId}`}
          className="mt-4 inline-block text-blue-600 font-semibold hover:text-blue-700"
        >
          Read Full Story →
        </Link>
      ) : null}
    </div>
  );
}
