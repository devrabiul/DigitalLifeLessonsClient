import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import { FaArrowRight, FaHeart, FaBookmark, FaCrown } from "react-icons/fa6";

const FeaturedLifeLessons = () => {
  const [loading, setLoading] = useState(true);
  const [featuredLessons, setFeaturedLessons] = useState([]);

  useEffect(() => {
    const fetchFeaturedLessons = async () => {
      try {
        const response = await api.get("/lessons/featured?limit=4");
        setFeaturedLessons(response.data);
      } catch (error) {
        console.error("Failed to fetch featured lessons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedLessons();
  }, []);

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
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              Discover Wisdom
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Featured Life Lessons
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Handpicked stories of growth, resilience, and transformation from
              our community
            </p>
          </div>
          <Link
            to="/lessons"
            className="mt-4 md:mt-0 text-blue-600 font-medium inline-flex items-center gap-2 group hover:text-blue-700 transition-colors"
          >
            View all lessons
            <FaArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-6 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="flex justify-between items-center mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-12"></div>
                </div>
              </div>
            ))}
          </div>
        ) : featuredLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredLessons.map((lesson) => (
              <Link
                key={lesson._id}
                to={`/lessons/${lesson._id}`}
                className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-full">
                    {lesson.category}
                  </span>
                  {lesson.access_level === "premium" && (
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-wider rounded-full">
                      <FaCrown className="w-2.5 h-2.5" />
                      Premium
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {lesson.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                  {lesson.shortDescription ||
                    (lesson.story
                      ? lesson.story.slice(0, 100) + "..."
                      : "No description available")}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                      {lesson.author?.photoURL || lesson.photoURL ? (
                        <img
                          src={lesson.author?.photoURL || lesson.photoURL}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.parentElement.innerHTML = `<span>${getInitials(lesson.author?.name || lesson.authorName)}</span>`;
                          }}
                        />
                      ) : (
                        <span>
                          {getInitials(
                            lesson.author?.name || lesson.authorName,
                          )}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-medium text-gray-700 truncate max-w-[80px]">
                      {lesson.author?.name || lesson.authorName || "Anonymous"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <span className="flex items-center gap-1 text-[11px] font-medium">
                      <FaHeart className="w-3 h-3 text-red-400" />
                      {lesson.likesCount || 0}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-medium">
                      <FaBookmark className="w-3 h-3 text-blue-400" />
                      {lesson.favoritesCount || 0}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">
              No featured lessons yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedLifeLessons;
