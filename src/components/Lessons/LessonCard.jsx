import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";

function getLessonId(lesson) {
  return lesson?._id || lesson?.id;
}

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

  const category = lesson?.category || "General";
  const emotionalTone = lesson?.emotionalTone;
  const accessLevel = lesson?.access_level || "free";

  const likesCount = lesson?.likesCount ?? lesson?.likes?.length ?? 0;
  const favoritesCount = lesson?.favoritesCount ?? 0;

  // Check if content should be locked for this user
  const isPremiumLesson = accessLevel === "premium";
  const userIsPremium = dbUser?.isPremium || dbUser?.role === 'admin';
  const isLocked = isPremiumLesson && !userIsPremium;

  const excerptText = excerpt
    ? excerpt.length > 140
      ? `${excerpt.slice(0, 140)}...`
      : excerpt
    : "";

  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100 flex flex-col relative overflow-hidden ${isLocked ? 'ring-2 ring-violet-200' : ''}`}>
      {/* Premium Badge */}
      {isPremiumLesson && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Premium
            </span>
          </div>
        </div>
      )}

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

      {/* Content - blurred if locked */}
      <div className={`relative ${isLocked ? 'select-none' : ''}`}>
        {excerptText ? (
          <p className={`text-gray-600 mb-4 flex-1 ${isLocked ? 'blur-sm' : ''}`}>{excerptText}</p>
        ) : (
          <div className="flex-1" />
        )}
        
        {/* Lock Overlay */}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg">
              <svg className="w-6 h-6 text-violet-600 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-xs text-violet-700 font-medium">Premium Content</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-700 font-medium">{authorName}</div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-red-500 font-semibold">❤️ {likesCount}</span>
          <span className="text-gray-700 font-semibold">🔖 {favoritesCount}</span>
        </div>
      </div>

      {lessonId ? (
        isLocked ? (
          <Link
            to="/pricing"
            className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Unlock with Premium
          </Link>
        ) : (
          <Link
            to={`/lessons/${lessonId}`}
            className="mt-4 inline-block text-blue-600 font-semibold hover:text-blue-700"
          >
            Read Full Story →
          </Link>
        )
      ) : null}
    </div>
  );
}
