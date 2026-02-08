import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { FaLock, FaCrown, FaCalendarAlt } from "react-icons/fa";
import { getLessonId } from "../../utils/lessonUtils";

export default function LessonCard({ lesson }) {
  const { dbUser } = useAuth();
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

  const authorPhoto =
    lesson?.authorPhoto ||
    lesson?.author?.photo ||
    lesson?.author?.photoURL ||
    null;

  const category = lesson?.category || "General";
  const emotionalTone = lesson?.emotionalTone;
  const accessLevel = lesson?.access_level || "free";
  const createdAt = lesson?.createdAt ? new Date(lesson.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }) : "Recent";

  const likesCount = lesson?.likesCount ?? lesson?.likes?.length ?? 0;

  const isPremiumLesson = accessLevel === "premium";
  const userIsPremium = dbUser?.isPremium || dbUser?.role === 'admin';
  const isLocked = isPremiumLesson && !userIsPremium;

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const excerptText = excerpt
    ? excerpt.length > 140
      ? `${excerpt.slice(0, 140)}...`
      : excerpt
    : "";

  return (
    <div className={`group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 flex flex-col relative overflow-hidden h-full ${isLocked ? 'ring-1 ring-violet-100 hover:ring-violet-200' : 'hover:border-blue-100'}`}>
      <div className="absolute top-0 right-0 z-10">
        {isPremiumLesson ? (
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-xl flex items-center gap-1.5 uppercase tracking-wider shadow-sm">
            <FaCrown className="w-3 h-3" />
            Premium
          </div>
        ) : (
          <div className="bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1.5 rounded-bl-xl flex items-center gap-1 uppercase tracking-wider">
            Free Access
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-flex items-center bg-gray-50 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide border border-gray-100">
          {category}
        </span>
        {emotionalTone ? (
          <span className="inline-flex items-center bg-gray-50 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide border border-gray-100">
            {emotionalTone}
          </span>
        ) : null}
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-blue-600 transition-colors">{title}</h3>

      <div className={`relative mb-8 flex-grow ${isLocked ? 'select-none' : ''}`}>
        {excerptText ? (
          <p className={`text-gray-600 text-sm leading-relaxed ${isLocked ? 'blur-[5px] opacity-40' : ''}`}>{excerptText}</p>
        ) : (
          <p className="text-gray-400 text-sm italic">No description available</p>
        )}
        
        {isLocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-center bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-violet-50 max-w-[80%]">
              <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <FaLock className="w-4 h-4 text-violet-600" />
              </div>
              <p className="text-sm text-violet-900 font-bold">Premium Lesson</p>
              <p className="text-[11px] text-violet-700/70 font-medium">Upgrade to view full lesson</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex items-center justify-center border border-gray-200">
              {authorPhoto ? (
                <img src={authorPhoto} alt={authorName} className="w-full h-full object-cover" onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `<span class="text-xs font-bold text-gray-400">${getInitials(authorName)}</span>`;
                }} />
              ) : (
                <span className="text-xs font-bold text-gray-400">{getInitials(authorName)}</span>
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 line-clamp-1">{authorName}</p>
              <div className="flex items-center gap-1.5 text-gray-500 text-[10px]">
                <FaCalendarAlt className="w-2.5 h-2.5" />
                <span>{createdAt}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs font-bold text-gray-700">
              <span className="text-red-500 text-sm">❤️</span> {likesCount}
            </span>
          </div>
        </div>

        {lessonId && (
          isLocked ? (
            <Link
              to="/pricing"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-bold rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all shadow-lg shadow-violet-200"
            >
              <FaCrown className="w-4 h-4" />
              Upgrade to View
            </Link>
          ) : (
            <Link
              to={`/lessons/${lessonId}`}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 group-hover:bg-blue-700"
            >
              See Details →
            </Link>
          )
        )}
      </div>
    </div>
  );
}
