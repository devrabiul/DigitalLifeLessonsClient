import { useParams, Link }  from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import api from "../services/api";
import LoadingSpinner from "../components/UI/LoadingSpinner.jsx";
import AuthorSection from "../components/Lessons/AuthorSection.jsx";
import StatsSection from "../components/Lessons/StatsSection.jsx";
import InteractionButtons from "../components/Lessons/InteractionButtons.js";
import { useAuth } from "../hooks/useAuth";
import Comments from "../components/Lessons/Comments.js";
import SimilarLessons from "../components/Lessons/SimilarLessons.js";
import ShareButtons from "../components/Lessons/ShareButtons.js";
import Swal from "sweetalert2";
import { showSuccess, showError } from "../utils/toast";

export default function LessonDetails() {
    const { id } = useParams();
    const { user } = useAuth();
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [reportSubmitting, setReportSubmitting] = useState(false);

    const {
        data: lesson,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["lesson", id],
        enabled: Boolean(id),
        queryFn: async () => {
            const res = await api.get(`/lessons/${id}`);
            return res.data;
        },
        retry: 1,
    });

    // Check if user has premium access
    const isPremiumUser = user?.isPremium || false;
    const isPremiumLesson = lesson?.access_level === 'premium' || lesson?.accessLevel === 'premium';
    const canAccessContent = !isPremiumLesson || isPremiumUser;

    const handleReport = async () => {
        if (!reportReason.trim()) {
            showError('Please provide a reason for reporting');
            return;
        }

        setReportSubmitting(true);
        try {
            await api.post(`/lessons/${id}/report`, {
                reason: reportReason,
                reportedBy: user?.uid
            });
            showSuccess('Report submitted successfully. Our team will review it.');
            setShowReportModal(false);
            setReportReason('');
        } catch (error) {
            showError(error?.response?.data?.message || 'Failed to submit report');
        } finally {
            setReportSubmitting(false);
        }
    };

    if (isLoading) return <LoadingSpinner />;

    if (isError || !lesson) {
        const isNetworkError =
            error?.code === "ERR_NETWORK" ||
            error?.message?.includes("ERR_CONNECTION_REFUSED") ||
            error?.message?.includes("Network Error");

        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {isNetworkError ? "Backend server is not running" : "Lesson not found"}
                    </h2>
                    <p className="text-gray-600 mb-6">
                        {isNetworkError
                            ? "Start your backend or set VITE_API_URL in .env.local."
                            : "The lesson may have been removed or the link is invalid."}
                    </p>
                    <Link to="/lessons" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Lessons
                    </Link>
                </div>
            </div>
        );
    }

    const title = lesson?.title || "Untitled Lesson";
    const imageUrl = lesson?.imageUrl || lesson?.image || lesson?.coverImage || lesson?.image_url;
    const content = lesson?.content || lesson?.description || lesson?.story || "";

    const category = lesson?.category || "";
    const emotionalTone =
        lesson?.emotionalTone || lesson?.emotional_tone || lesson?.tone || lesson?.mood || "";

    const authorName =
        lesson?.authorName || lesson?.author?.name || lesson?.creatorName || "";
    const authorPhoto =
        lesson?.authorPhoto || lesson?.author?.photo || lesson?.author?.photoURL || lesson?.creatorPhoto;
    const authorId =
        lesson?.authorId ||
        lesson?.author?.id ||
        lesson?.author?.uid ||
        lesson?.createdBy?.id ||
        lesson?.createdBy?.uid ||
        lesson?.userId ||
        "";

    const likesCount = lesson?.likesCount ?? lesson?.likes?.length ?? 0;
    const favoritesCount = lesson?.favoritesCount ?? 0;

    const initialLikes = Array.isArray(lesson?.likes) ? lesson.likes : [];
    const initialFavorites = Array.isArray(lesson?.favorites) ? lesson.favorites : [];

    const createdAt = lesson?.createdAt
        ? new Date(lesson.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        : "";

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    // Truncate content for non-premium users viewing premium content
    const displayContent = canAccessContent 
        ? content 
        : content.slice(0, 200) + (content.length > 200 ? '...' : '');

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Premium Badge */}
            {isPremiumLesson && (
                <div className="mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-sm font-medium rounded-full">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Premium Content
                    </span>
                </div>
            )}

            {/* Cover Image */}
            {imageUrl ? (
                <div className="relative">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-64 md:h-80 object-cover rounded-2xl mb-8"
                        loading="lazy"
                    />
                    {/* Category & Tone badges on image */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        {category && (
                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700">
                                {category}
                            </span>
                        )}
                        {emotionalTone && (
                            <span className="px-3 py-1 bg-purple-500/90 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                                {emotionalTone}
                            </span>
                        )}
                    </div>
                </div>
            ) : (
                /* Category badges without image */
                <div className="flex items-center gap-2 mb-4">
                    {category && (
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                            {category}
                        </span>
                    )}
                    {emotionalTone && (
                        <span className="px-3 py-1 bg-purple-100 rounded-full text-sm font-medium text-purple-700">
                            {emotionalTone}
                        </span>
                    )}
                </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
                {createdAt && (
                    <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {createdAt}
                    </span>
                )}
                <StatsSection likesCount={likesCount} favoritesCount={favoritesCount} />
            </div>

            {/* Share Buttons */}
            <div className="mb-6">
                <ShareButtons url={shareUrl} title={title} />
            </div>

            {/* Author Section */}
            <AuthorSection
                authorId={authorId}
                authorName={authorName}
                authorPhoto={authorPhoto}
            />

            {/* Content */}
            <div className="prose max-w-none mb-8">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                    {displayContent}
                </p>
            </div>

            {/* Premium Gating Banner */}
            {!canAccessContent && (
                <div className="my-8 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Premium Content</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        This lesson is exclusively available for premium members. Upgrade now to unlock the full content and all premium features.
                    </p>
                    <Link
                        to="/pricing"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Upgrade to Premium
                    </Link>
                </div>
            )}

            {/* Interaction Buttons */}
            {canAccessContent && (
                <InteractionButtons
                    key={`${id || ""}:${user?.uid || "guest"}`}
                    lessonId={id}
                    initialLikes={initialLikes}
                    initialFavorites={initialFavorites}
                />
            )}

            {/* Report Button */}
            <div className="flex justify-end mt-4 mb-8">
                <button
                    onClick={() => setShowReportModal(true)}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                    </svg>
                    Report this lesson
                </button>
            </div>

            {/* Report Modal */}
            {showReportModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Report Lesson</h3>
                            <button
                                onClick={() => setShowReportModal(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                            >
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                            Help us understand what's wrong with this lesson. Our team will review your report.
                        </p>
                        
                        {/* Report Reason Dropdown */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select a reason <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={reportReason}
                                onChange={(e) => setReportReason(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-gray-700"
                            >
                                <option value="">Choose a reason...</option>
                                <option value="Inappropriate Content">Inappropriate Content</option>
                                <option value="Hate Speech or Harassment">Hate Speech or Harassment</option>
                                <option value="Misleading or False Information">Misleading or False Information</option>
                                <option value="Spam or Promotional Content">Spam or Promotional Content</option>
                                <option value="Sensitive or Disturbing Content">Sensitive or Disturbing Content</option>
                                <option value="Copyright Violation">Copyright Violation</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {reportReason === 'Other' && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Please describe the issue
                                </label>
                                <textarea
                                    placeholder="Provide details about the issue..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                                    rows="3"
                                    onChange={(e) => setReportReason(`Other: ${e.target.value}`)}
                                />
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={() => { setShowReportModal(false); setReportReason(''); }}
                                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReport}
                                disabled={reportSubmitting || !reportReason}
                                className="flex-1 px-4 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {reportSubmitting ? 'Submitting...' : 'Submit Report'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Comments - only show for accessible content */}
            {canAccessContent && <Comments lessonId={id} />}

            <SimilarLessons
                currentLessonId={id}
                category={category}
                emotionalTone={emotionalTone}
            />
        </div>
    );
}