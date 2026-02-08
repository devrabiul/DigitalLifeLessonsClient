import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import LessonCard from "../../components/Lessons/LessonCard";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";
import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaFlag,
  FaShareAlt,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaChevronRight,
  FaCrown,
  FaLock,
  FaChevronLeft,
  FaComment,
  FaPaperPlane,
  FaTimes,
  FaBook,
} from "react-icons/fa";

const ImageWithFallback = ({ src, alt, className, icon: Icon = FaUser }) => {
  const [imgError, setImgError] = useState(false);
  useEffect(() => {
    setImgError(false);
  }, [src]);
  if (imgError || !src) {
    return (
      <div className={`${className} bg-gray-50 flex items-center justify-center text-gray-300`}>
        <Icon />
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setImgError(true)} />;
};

const LessonDetails = () => {
  const { id } = useParams();
  const { user, isPremium } = useAuth();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarLessons, setSimilarLessons] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/lessons/${id}`);
        setLesson(data);
        setIsLiked(data.likes?.includes(user?.email));
        
        if (user) {
          const { data: favorites } = await api.get("/favorites");
          setIsFavorited(favorites.some(f => f.lessonId === id));
        }

        const { data: similar } = await api.get(`/lessons/${id}/similar`);
        setSimilarLessons(similar);

        const { data: comms } = await api.get(`/lessons/${id}/comments`);
        setComments(comms);

      } catch (error) {
        toast.error("Failed to load lesson details");
        navigate("/lessons");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
    window.scrollTo(0, 0);
  }, [id, user, navigate]);

  const handleLike = async () => {
    if (!user) {
      toast.error("Please log in to like lessons");
      return;
    }
    try {
      const { data } = await api.post(`/lessons/${id}/like`);
      setIsLiked(data.liked);
      setLesson(prev => ({
        ...prev,
        likesCount: data.liked ? prev.likesCount + 1 : prev.likesCount - 1
      }));
    } catch (error) {
      toast.error("Failed to toggle like");
    }
  };

  const handleFavorite = async () => {
    if (!user) {
      toast.error("Please log in to save lessons");
      return;
    }
    try {
      if (isFavorited) {
        await api.delete(`/favorites/${id}`);
        toast.success("Removed from favorites");
      } else {
        await api.post("/favorites", { lessonId: id });
        toast.success("Saved to favorites");
      }
      setIsFavorited(!isFavorited);
      setLesson(prev => ({
        ...prev,
        favoritesCount: isFavorited ? prev.favoritesCount - 1 : prev.favoritesCount + 1
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update favorites");
    }
  };

  const handleReport = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please log in to report lessons");
    if (!reportReason) return toast.error("Please select a reason");

    try {
      await api.post(`/lessons/${id}/report`, { reason: reportReason });
      toast.success("Lesson reported. Thank you for keeping our community safe.");
      setShowReportModal(false);
      setReportReason("");
    } catch (error) {
      toast.error("Failed to report lesson");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please log in to comment");
    if (!newComment.trim()) return;

    try {
      const { data } = await api.post(`/lessons/${id}/comments`, { 
        comment: newComment,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL
      });
      setComments([data, ...comments]);
      setNewComment("");
      toast.success("Comment posted!");
    } catch (error) {
      toast.error("Failed to post comment");
    }
  };

  const isRestricted = lesson?.access_level === "premium" && !isPremium && lesson?.author?.email !== user?.email;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!lesson) return null;

  return (
    <div className="min-h-screen bg-white pb-20 relative">
      <div className="relative h-[400px] overflow-hidden">
        <div className="absolute top-8 left-8 z-20">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-md text-white rounded-xl font-bold text-sm border border-white/30 hover:bg-black/40 transition-all"
          >
            <FaChevronLeft /> Back
          </button>
        </div>
        <ImageWithFallback
          src={lesson.photoURL}
          alt={lesson.title}
          className="w-full h-full object-cover"
          icon={FaBook}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                {lesson.category}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/30">
                {lesson.emotionalTone}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              {lesson.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 -mt-10 relative z-10">
        <div className="lg:col-span-2 space-y-8">
          <div className={`bg-white rounded-[32px] p-8 lg:p-12 shadow-2xl shadow-gray-200/50 border border-gray-50 relative ${isRestricted ? 'overflow-hidden' : ''}`}>
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-100">
               <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-black text-gray-900 leading-none">{lesson.likesCount}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Reactions</p>
                  </div>
                  <div className="h-8 w-px bg-gray-100"></div>
                  <div className="text-center">
                    <p className="text-2xl font-black text-gray-900 leading-none">{lesson.favoritesCount}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Saves</p>
                  </div>
                  <div className="h-8 w-px bg-gray-100"></div>
                  <div className="text-center">
                    <p className="text-2xl font-black text-gray-900 leading-none">
                      {lesson.viewsCount > 999 ? `${(lesson.viewsCount / 1000).toFixed(1)}K` : lesson.viewsCount || 0}
                    </p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Views</p>
                  </div>
               </div>

               <div className="flex items-center gap-2">
                 <button 
                  onClick={handleLike}
                  className={`p-3 rounded-2xl transition-all transform hover:scale-110 ${isLiked ? 'bg-rose-50 text-rose-600' : 'bg-gray-50 text-gray-400 hover:bg-rose-50 hover:text-rose-600'}`}
                 >
                   {isLiked ? <FaHeart className="w-5 h-5" /> : <FaRegHeart className="w-5 h-5" />}
                 </button>
                 <button 
                  onClick={handleFavorite}
                  className={`p-3 rounded-2xl transition-all transform hover:scale-110 ${isFavorited ? 'bg-amber-50 text-amber-600' : 'bg-gray-50 text-gray-400 hover:bg-amber-50 hover:text-amber-600'}`}
                 >
                   {isFavorited ? <FaBookmark className="w-5 h-5" /> : <FaRegBookmark className="w-5 h-5" />}
                 </button>
               </div>
            </div>

            <div className="prose prose-lg max-w-none relative">
              {isRestricted ? (
                <div className="relative">
                  <p className="text-gray-900 leading-relaxed blur-lg select-none">
                    {lesson.story}
                  </p>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-white/40 backdrop-blur-[2px] rounded-3xl">
                    <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white text-3xl mb-6 shadow-xl shadow-indigo-200 animate-bounce">
                      <FaLock />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">Premium Lesson</h3>
                    <p className="text-gray-500 mb-8 max-w-sm">This life lesson is reserved for our Premium members. Join them to unlock full access.</p>
                    <Link to="/pricing" className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                      Upgrade to Unlock
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap font-medium">
                  {lesson.story}
                </p>
              )}
            </div>

            {!isRestricted && (
              <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Share this lesson:</span>
                  <div className="flex items-center gap-2">
                    <FacebookShareButton url={window.location.href}>
                      <FacebookIcon size={36} round />
                    </FacebookShareButton>
                    <TwitterShareButton url={window.location.href}>
                      <TwitterIcon size={36} round />
                    </TwitterShareButton>
                    <LinkedinShareButton url={window.location.href}>
                      <LinkedinIcon size={36} round />
                    </LinkedinShareButton>
                    <WhatsappShareButton url={window.location.href}>
                      <WhatsappIcon size={36} round />
                    </WhatsappShareButton>
                  </div>
                </div>

                <button 
                  onClick={() => setShowReportModal(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 text-gray-500 rounded-xl text-sm font-bold hover:bg-rose-50 hover:text-rose-600 transition-all"
                >
                  <FaFlag className="text-xs" /> Report Lesson
                </button>
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-[32px] p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <FaComment className="text-blue-600" /> Reflection & Comments
            </h3>

            <form onSubmit={handleCommentSubmit} className="mb-12">
              <div className="relative">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share a thoughtful reflection on this lesson..."
                  className="w-full h-32 px-6 py-4 rounded-[24px] border border-gray-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none text-gray-700 font-medium resize-none bg-white"
                />
                <button
                  type="submit"
                  className="absolute bottom-4 right-4 bg-blue-600 text-white p-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </form>

            <div className="space-y-6">
              {comments.length > 0 ? (
                comments.map((comment, i) => (
                  <div key={comment._id || i} className="flex gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm animate-in slide-in-from-bottom-4 duration-300">
                    <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden shrink-0">
                      <ImageWithFallback src={comment.userPhoto} icon={FaUser} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">{comment.userName}</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{comment.comment}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                   <p className="text-gray-400 font-medium italic">No reflections yet. Be the first to share your thoughts.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-100/50">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Shared by</p>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 overflow-hidden border border-gray-100">
                <ImageWithFallback src={lesson.author?.photo} alt={lesson.author?.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-black text-xl text-gray-900">{lesson.author?.name}</h4>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-tighter">Verified Author</p>
              </div>
            </div>
            
            <Link 
              to={`/profile/${lesson.author?.email}`}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gray-50 text-gray-900 rounded-2xl font-bold text-sm hover:bg-gray-100 transition-all"
            >
              View Lessons Portfolio <FaChevronRight className="text-[10px]" />
            </Link>
          </div>

          <div className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden">
             <div className="relative z-10 space-y-6">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-400">
                   <FaCalendarAlt />
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Shared On</p>
                    <p className="font-bold">{new Date(lesson.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                 </div>
               </div>

               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
                   <FaClock />
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Reading Time</p>
                    <p className="font-bold">{Math.ceil((lesson.story?.split(' ').length || 0) / 200)} Min Read</p>
                 </div>
               </div>

               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-400">
                   <FaCrown />
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Access Level</p>
                    <p className="font-bold capitalize">{lesson.access_level}</p>
                 </div>
               </div>
             </div>
             <div className="absolute top-0 right-0 p-8 opacity-10">
               <FaBook className="w-24 h-24 rotate-12" />
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-20 pb-10">
        <div className="flex items-center gap-4 mb-10">
           <h2 className="text-3xl font-black text-gray-900">Recommended for You</h2>
           <div className="h-0.5 flex-1 bg-gray-100 rounded-full"></div>
        </div>
        
        {similarLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {similarLessons.map(sl => (
              <LessonCard key={sl._id} lesson={sl} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-[32px] border border-dashed border-gray-200">
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-gray-200 shadow-sm">
                <FaBook />
             </div>
             <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Deep Discovery</p>
             <p className="text-gray-400 mt-1">No other lessons found in this category yet.</p>
          </div>
        )}
      </div>

      {showReportModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setShowReportModal(false)}></div>
          <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8">
               <div className="flex items-center justify-between mb-8">
                 <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                   <FaFlag className="text-rose-600" /> Report Content
                 </h2>
                 <button onClick={() => setShowReportModal(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                   <FaTimes />
                 </button>
               </div>

               <form onSubmit={handleReport} className="space-y-6">
                 <div>
                   <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Reason for reporting</label>
                   <select 
                    required
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:ring-4 focus:ring-rose-50 focus:border-rose-500 transition-all outline-none font-medium text-gray-700"
                   >
                     <option value="">Select a reason...</option>
                     <option value="Inappropriate Content">Inappropriate Content</option>
                     <option value="Hate Speech or Harassment">Hate Speech or Harassment</option>
                     <option value="Misleading or False Information">Misleading or False Information</option>
                     <option value="Spam or Promotional Content">Spam or Promotional Content</option>
                     <option value="Sensitive or Disturbing Content">Sensitive or Disturbing Content</option>
                     <option value="Other">Other</option>
                   </select>
                 </div>

                 <div className="flex items-center gap-4 p-4 bg-rose-50 rounded-2xl">
                    <FaFlag className="text-rose-600 shrink-0" />
                    <p className="text-xs text-rose-700 font-medium leading-relaxed">
                      Our moderators will review this lesson within 24 hours. Abuse of the reporting system may lead to profile restrictions.
                    </p>
                 </div>

                 <div className="pt-4 flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowReportModal(false)}
                      className="flex-1 px-8 py-4 bg-gray-50 text-gray-900 rounded-2xl font-bold hover:bg-gray-100 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-2 px-10 py-4 bg-rose-600 text-white rounded-2xl font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-100"
                    >
                      Submit Report
                    </button>
                 </div>
               </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonDetails;