import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../../services/api";
import toast from "react-hot-toast";
import {
  FaHeart,
  FaTrash,
  FaExternalLinkAlt,
  FaBook,
  FaUser,
  FaFilter,
  FaTimes,
} from "react-icons/fa";

const CATEGORIES = ["Personal Growth", "Career", "Relationships", "Mindset", "Mistakes Learned"];
const TONES = ["Motivational", "Sad", "Realization", "Gratitude"];

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

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setImgError(true)}
    />
  );
};

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ category: "", emotionalTone: "" });

  const fetchFavorites = async () => {
    try {
      const { data } = await api.get("/favorites", { params: filter });
      setFavorites(data);
    } catch (error) {
      toast.error("Failed to fetch favorites");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [filter]);

  const handleRemove = async (lessonId) => {
    if (!window.confirm("Are you sure you want to remove this lesson from your favorites?")) return;
    try {
      await api.delete(`/favorites/${lessonId}`);
      toast.success("Removed from favorites");
      setFavorites(favorites.filter((f) => f.lessonId !== lessonId));
    } catch (error) {
      toast.error("Failed to remove from favorites");
    }
  };

  const clearFilters = () => setFilter({ category: "", emotionalTone: "" });

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-8 rounded-3xl text-white shadow-xl shadow-rose-100 mb-10 overflow-hidden relative">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">My Favorites</h1>
          <p className="text-rose-100">Wisdom you've saved to revisit and reflect upon.</p>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10 flex gap-4">
          <FaHeart className="w-24 h-24 rotate-12" />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 text-gray-400 mr-2">
          <FaFilter className="text-sm" />
          <span className="text-xs font-bold uppercase tracking-widest">Filters:</span>
        </div>
        
        <select
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          className="px-4 py-2 rounded-xl border border-gray-100 bg-gray-50 text-sm font-medium focus:ring-2 focus:ring-rose-500 outline-none transition-all"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          value={filter.emotionalTone}
          onChange={(e) => setFilter({ ...filter, emotionalTone: e.target.value })}
          className="px-4 py-2 rounded-xl border border-gray-100 bg-gray-50 text-sm font-medium focus:ring-2 focus:ring-rose-500 outline-none transition-all"
        >
          <option value="">All Tones</option>
          {TONES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        {(filter.category || filter.emotionalTone) && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 text-rose-600 text-sm font-bold hover:bg-rose-50 rounded-xl transition-all"
          >
            Clear <FaTimes />
          </button>
        )}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lesson Info</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Author</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Category</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {favorites.length > 0 ? (
                favorites.map((fav) => (
                  <tr key={fav._id} className="hover:bg-rose-50/30 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-gray-100 flex">
                          <ImageWithFallback
                            src={fav.photoURL}
                            alt={fav.title}
                            className="w-full h-full object-cover"
                            icon={FaBook}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 truncate max-w-[250px]">{fav.title}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1">
                            Added on {new Date(fav.addedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-[10px]">
                          <FaUser />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{fav.authorName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full uppercase tracking-widest">
                        {fav.category}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 text-xl">
                        <Link
                          to={`/lessons/${fav.lessonId}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Lesson"
                        >
                          <FaExternalLinkAlt className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleRemove(fav.lessonId)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Remove from Favorites"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-20 text-center">
                    <div className="max-w-xs mx-auto">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-200 text-3xl">
                        <FaHeart />
                      </div>
                      <p className="text-gray-900 font-bold mb-1">No favorites saved</p>
                      <p className="text-gray-500 text-sm mb-6">Explore lessons and save the ones that inspire you.</p>
                      <Link
                        to="/lessons"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-xl font-bold text-sm hover:bg-rose-600 transition-all"
                      >
                        Explore Lessons <FaExternalLinkAlt className="text-xs" />
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Favorites;