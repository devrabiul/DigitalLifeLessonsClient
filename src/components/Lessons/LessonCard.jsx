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

  const authorPhoto = lesson?.author?.photo || lesson?.author?.photoURL || null;

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
    ? excerpt.length > 100
      ? `${excerpt.slice(0, 100)}...`
      : excerpt
    : "";

  return (
    <div className={`group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col relative overflow-hidden h-full ${isLocked ? 'ring-1 ring-violet-100' : 'hover:border-blue-100'}`}>
      
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={lesson?.photoURL || 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80'} 
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isLocked ? 'blur-sm grayscale' : ''}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        <div className="absolute top-4 right-4 z-10">
          {isPremiumLesson ? (
            <div className="bg-amber-400 text-amber-950 text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 uppercase tracking-wider shadow-lg">
              <FaCrown className="w-3 h-3" />
              Premium
            </div>
          ) : (
            <div className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full border border-white/30 uppercase tracking-wider">
              Free
            </div>
          )}
        </div>

        <div className="absolute bottom-4 left-4">
          <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
            {category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-black text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        <div className={`relative mb-6 flex-grow ${isLocked ? 'select-none' : ''}`}>
          <p className="text-gray-500 text-sm leading-relaxed font-medium">
            {excerptText || "Embark on this journey of wisdom and growth..."}
          </p>
          
          {isLocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/10 backdrop-blur-[2px] rounded-xl">
              <FaLock className="text-violet-600 mb-1" />
              <p className="text-[10px] text-violet-700 font-bold uppercase tracking-widest">Locked</p>
            </div>
          )}
        </div>

        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gray-100 overflow-hidden flex items-center justify-center border-2 border-white shadow-sm ring-1 ring-gray-100">
              {authorPhoto ? (
                <img src={authorPhoto} alt={authorName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs font-black text-gray-400">{getInitials(authorName)}</span>
              )}
            </div>
            <div>
              <p className="text-xs font-black text-gray-900 line-clamp-1">{authorName}</p>
              <div className="flex items-center gap-1.5 text-gray-400 text-[9px] font-bold uppercase tracking-tighter">
                <FaCalendarAlt className="w-2 h-2" />
                <span>{createdAt}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100">
            <span className="text-rose-500 text-xs">❤️</span>
            <span className="text-xs font-black text-rose-700">{likesCount}</span>
          </div>
        </div>

        <div className="mt-6">
          {lessonId && (
            isLocked ? (
              <Link
                to="/pricing"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-violet-600 text-white text-xs font-black rounded-2xl hover:bg-violet-700 transition-all shadow-lg shadow-violet-100 uppercase tracking-widest"
              >
                <FaCrown className="w-3 h-3" />
                Unlock Now
              </Link>
            ) : (
              <Link
                to={`/lessons/${lessonId}`}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 text-white text-xs font-black rounded-2xl hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 uppercase tracking-widest"
              >
                Read Lesson →
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}
