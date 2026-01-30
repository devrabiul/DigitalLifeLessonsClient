import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";
import { showError, showSuccess } from "../../utils/toast";

function toIdList(value) {
  if (Array.isArray(value)) return value;
  return [];
}

export default function InteractionButtons({
  lessonId,
  initialLikes,
  initialFavorites,
}) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const likesList = useMemo(() => toIdList(initialLikes), [initialLikes]);
  const favoritesList = useMemo(() => toIdList(initialFavorites), [initialFavorites]);

  const [isLiked, setIsLiked] = useState(() =>
    Boolean(user?.uid && likesList.includes(user.uid))
  );
  const [likesCount, setLikesCount] = useState(() => likesList.length || 0);

  const [isFavorited, setIsFavorited] = useState(() =>
    Boolean(user?.uid && favoritesList.includes(user.uid))
  );
  const [favoritesCount, setFavoritesCount] = useState(
    () => favoritesList.length || 0
  );

  const [loading, setLoading] = useState(false);

  const requireLogin = (message) => {
    showError(message);
    navigate("/login");
  };

  const handleLike = async () => {
    if (!lessonId) return;
    if (!user) return requireLogin("Please log in to like this lesson");

    const nextLiked = !isLiked;
    const previousLiked = isLiked;
    const previousCount = likesCount;

    setIsLiked(nextLiked);
    setLikesCount((prev) => (nextLiked ? prev + 1 : Math.max(0, prev - 1)));
    setLoading(true);

    try {
      await api.patch(`/lessons/${lessonId}/like`);
      showSuccess(nextLiked ? "Liked lesson!" : "Removed like");
    } catch {
      setIsLiked(previousLiked);
      setLikesCount(previousCount);
      showError("Failed to update like");
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async () => {
    if (!lessonId) return;
    if (!user) return requireLogin("Please log in to save this lesson");

    const nextFavorited = !isFavorited;
    const previousFavorited = isFavorited;
    const previousCount = favoritesCount;

    setIsFavorited(nextFavorited);
    setFavoritesCount((prev) =>
      nextFavorited ? prev + 1 : Math.max(0, prev - 1)
    );
    setLoading(true);

    try {
      await api.patch(`/lessons/${lessonId}/favorite`);
      showSuccess(nextFavorited ? "Added to favorites!" : "Removed from favorites");
    } catch {
      setIsFavorited(previousFavorited);
      setFavoritesCount(previousCount);
      showError("Failed to update favorites");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 mt-8">
      <button
        type="button"
        onClick={handleFavorite}
        disabled={loading}
        className={`px-6 py-3 rounded-lg flex items-center gap-2 transition border ${
          isFavorited
            ? "bg-yellow-500 text-white border-yellow-500"
            : "bg-gray-50 hover:bg-gray-100 text-gray-800 border-gray-200"
        } disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        <span className="text-xl">🔖</span>
        <span className="font-semibold">{isFavorited ? "Saved" : "Save"}</span>
        <span className="font-semibold">({favoritesCount})</span>
      </button>

      <button
        type="button"
        onClick={handleLike}
        disabled={loading}
        className={`px-6 py-3 rounded-lg flex items-center gap-2 transition border ${
          isLiked
            ? "bg-red-500 text-white border-red-500"
            : "bg-gray-50 hover:bg-gray-100 text-gray-800 border-gray-200"
        } disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        <span className="text-xl">❤️</span>
        <span className="font-semibold">{isLiked ? "Liked" : "Like"}</span>
        <span className="font-semibold">({likesCount})</span>
      </button>
    </div>
  );
}
