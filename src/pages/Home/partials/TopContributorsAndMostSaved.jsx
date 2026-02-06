import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaChevronRight, FaBookmark, FaRankingStar } from "react-icons/fa6";
import api from "../../../services/api";

const TopContributorsAndMostSaved = () => {
  const [loading, setLoading] = useState(true);
  const [topContributors, setTopContributors] = useState([]);
  const [mostSavedLessons, setMostSavedLessons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contributorsRes, lessonsRes] = await Promise.all([
          api.get("/users/top-contributors"),
          api.get("/lessons/most-saved"),
        ]);
        setTopContributors(
          Array.isArray(contributorsRes.data) ? contributorsRes.data : [],
        );
        setMostSavedLessons(
          Array.isArray(lessonsRes.data) ? lessonsRes.data : [],
        );
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return rank;
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 text-white">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold">Top Contributors</h3>
                  <p className="text-white/80 text-sm mt-1">This Week</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <FaRankingStar className="text-2xl" />
                </div>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 bg-white/10 rounded-xl p-4 animate-pulse"
                    >
                      <div className="w-8 h-8 bg-white/20 rounded"></div>
                      <div className="w-12 h-12 bg-white/20 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-white/20 rounded w-24 mb-2"></div>
                        <div className="h-3 bg-white/20 rounded w-32"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : topContributors.length > 0 ? (
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div
                      key={contributor._id || index}
                      className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors"
                    >
                      <div className="flex items-center justify-center w-8 text-lg font-bold">
                        {getRankBadge(index + 1)}
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center font-semibold overflow-hidden">
                        {contributor.photoURL ? (
                          <img
                            src={contributor.photoURL}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          getInitials(contributor.name)
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{contributor.name}</h4>
                        <p className="text-white/70 text-sm">
                          {contributor.lessonsCount} lessons •{" "}
                          {contributor.totalLikes} likes
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-white/70">
                  <p>No contributors data yet.</p>
                </div>
              )}

              <Link
                to="/lessons"
                className="mt-6 inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium group"
              >
                View all contributors
                <FaChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Most Saved Lessons
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Community favorites
                  </p>
                </div>
                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                  <FaBookmark className="text-2xl text-rose-500" />
                </div>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 animate-pulse"
                    >
                      <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                      </div>
                      <div className="w-12 h-6 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : mostSavedLessons.length > 0 ? (
                <div className="space-y-4">
                  {mostSavedLessons.map((lesson, index) => (
                    <Link
                      key={lesson._id}
                      to={`/lessons/${lesson._id}`}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 font-semibold text-sm group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                          {lesson.title}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          by {lesson.author?.name || lesson.authorName} •{" "}
                          {lesson.category}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-rose-500 font-medium">
                        <FaBookmark className="w-4 h-4" />
                        {lesson.favoritesCount || 0}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No saved lessons data yet.</p>
                </div>
              )}

              <Link
                to="/lessons?sort=saves"
                className="mt-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium group"
              >
                View all saved lessons
                <FaChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TopContributorsAndMostSaved;
