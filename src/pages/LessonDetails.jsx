import { useParams }  from "react-router";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import LoadingSpinner from "../components/UI/LoadingSpinner.jsx";
import AuthorSection from "../components/Lessons/AuthorSection.jsx";
import StatsSection from "../components/Lessons/StatsSection.jsx";
import InteractionButtons from "../components/Lessons/InteractionButtons.js";
import { useAuth } from "../hooks/useAuth";
import Comments from "../components/Lessons/Comments.js";
import SimilarLessons from "../components/Lessons/SimilarLessons.js";
import ShareButtons from "../components/Lessons/ShareButtons.js";

export default function LessonDetails() {
    const { id } = useParams();
    const { user } = useAuth();

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

    if (isLoading) return <LoadingSpinner />;

    if (isError || !lesson) {
        const isNetworkError =
            error?.code === "ERR_NETWORK" ||
            error?.message?.includes("ERR_CONNECTION_REFUSED") ||
            error?.message?.includes("Network Error");

        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {isNetworkError ? "Backend server is not running" : "Lesson not found"}
                </h2>
                <p className="text-gray-600">
                    {isNetworkError
                        ? "Start your backend or set VITE_API_URL in .env.local."
                        : "The lesson may have been removed or the link is invalid."}
                </p>
            </div>
        );
    }

    const title = lesson?.title || "Untitled Lesson";
    const imageUrl = lesson?.imageUrl || lesson?.image || lesson?.coverImage;
    const content = lesson?.content || lesson?.description || lesson?.story || "";

    const category = lesson?.category || "";
    const emotionalTone =
        lesson?.emotionalTone || lesson?.tone || lesson?.mood || "";

    const authorName =
        lesson?.authorName || lesson?.author?.name || lesson?.creatorName || "";
    const authorPhoto =
        lesson?.authorPhoto || lesson?.author?.photoURL || lesson?.creatorPhoto;
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
        ? new Date(lesson.createdAt).toLocaleDateString()
        : "";

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-64 md:h-80 object-cover rounded-2xl mb-8"
                    loading="lazy"
                />
            ) : null}

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {title}
            </h1>

            <div className="mb-6">
                <ShareButtons url={shareUrl} title={title} />
            </div>

            {createdAt ? (
                <p className="text-sm text-gray-500 mb-4">Published: {createdAt}</p>
            ) : null}

            <StatsSection likesCount={likesCount} favoritesCount={favoritesCount} />

            <AuthorSection
                authorId={authorId}
                authorName={authorName}
                authorPhoto={authorPhoto}
            />

            <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {content}
                </p>
            </div>

            <InteractionButtons
                key={`${id || ""}:${user?.uid || "guest"}`}
                lessonId={id}
                initialLikes={initialLikes}
                initialFavorites={initialFavorites}
            />

            <Comments lessonId={id} />

            <SimilarLessons
                currentLessonId={id}
                category={category}
                emotionalTone={emotionalTone}
            />
        </div>
    );
}