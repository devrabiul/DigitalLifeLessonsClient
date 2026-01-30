import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";
import { showError, showSuccess } from "../../utils/toast";

function getInitials(name) {
  if (!name) return "U";
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] || "U";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
  return (first + last).toUpperCase();
}

function getCreatedAt(comment) {
  const raw =
    comment?.createdAt ??
    comment?.created_at ??
    comment?.timestamp ??
    comment?.time;
  if (!raw) return null;
  const date = raw instanceof Date ? raw : new Date(raw);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

export default function Comments({ lessonId }) {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState("");
  const queryClient = useQueryClient();

  const {
    data: comments,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["comments", lessonId],
    enabled: Boolean(lessonId),
    queryFn: async () => {
      const res = await api.get(`/lessons/${lessonId}/comments`);
      return res.data;
    },
    retry: 1,
  });

  const postCommentMutation = useMutation({
    mutationFn: async (content) => {
      return api.post(`/lessons/${lessonId}/comments`, { content });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["comments", lessonId],
      });
      setNewComment("");
      showSuccess("Comment posted");
    },
    onError: () => showError("Failed to post comment"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      showError("Please log in to comment");
      return;
    }

    const content = newComment.trim();
    if (!content) {
      showError("Comment cannot be empty");
      return;
    }

    postCommentMutation.mutate(content);
  };

  const list = Array.isArray(comments) ? comments : [];

  const isNetworkError =
    error?.code === "ERR_NETWORK" ||
    error?.message?.includes("ERR_CONNECTION_REFUSED") ||
    error?.message?.includes("Network Error");

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">
        Comments ({list.length || 0})
      </h3>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-4 border border-gray-200 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            rows={3}
          />
          <button
            type="submit"
            disabled={postCommentMutation.isPending}
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {postCommentMutation.isPending ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <p className="mb-8 text-gray-500">Please log in to comment</p>
      )}

      {isLoading ? <div>Loading comments...</div> : null}

      {isError ? (
        <div className="text-gray-600">
          {isNetworkError
            ? "Backend server is not running (cannot load comments)."
            : "Failed to load comments."}
        </div>
      ) : null}

      {!isLoading && !isError ? (
        <div className="space-y-6">
          {list.map((comment) => {
            const id = comment?._id || comment?.id || comment?.commentId;
            const userName =
              comment?.userName || comment?.authorName || comment?.name || "User";
            const userPhoto =
              comment?.userPhoto || comment?.photoURL || comment?.authorPhoto;
            const createdAt = getCreatedAt(comment);
            const content = comment?.content || comment?.text || "";

            return (
              <div
                key={id || `${userName}:${String(createdAt || "")}:${content}`}
                className="bg-gray-50 rounded-lg p-4"
              >
                <div className="flex items-start mb-3">
                  {userPhoto ? (
                    <img
                      src={userPhoto}
                      alt={userName}
                      className="w-10 h-10 rounded-full mr-3 object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full mr-3 bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
                      {getInitials(userName)}
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold text-gray-900">{userName}</h4>
                    <p className="text-gray-500 text-sm">
                      {createdAt
                        ? formatDistanceToNow(createdAt, { addSuffix: true })
                        : ""}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 whitespace-pre-line">{content}</p>
              </div>
            );
          })}

          {list.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No comments yet. Be the first to comment!
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
