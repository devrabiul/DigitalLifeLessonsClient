import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";
import toast from "react-hot-toast";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaCrown,
  FaGlobe,
  FaInfoCircle,
  FaEllipsisV,
  FaExternalLinkAlt,
  FaTimes,
  FaSave,
  FaBook,
  FaUser,
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

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setImgError(true)}
    />
  );
};

const CATEGORIES = ["Personal Growth", "Career", "Relationships", "Mindset", "Mistakes Learned"];
const TONES = ["Motivational", "Sad", "Realization", "Gratitude"];

const MyLessons = () => {
  const { dbUser } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLesson, setEditingLesson] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const isPremiumUser = dbUser?.isPremium || dbUser?.role === "admin";

  const fetchMyLessons = async () => {
    try {
      const { data } = await api.get("/lessons/my-lessons");
      setLessons(data);
    } catch (error) {
      toast.error("Failed to fetch your lessons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMyLessons(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lesson permanently?")) return;
    try {
      await api.delete(`/lessons/${id}`);
      toast.success("Lesson deleted successfully");
      setLessons(lessons.filter((l) => l._id !== id));
    } catch (error) {
      toast.error("Failed to delete lesson");
    }
  };

  const handleTogglePrivacy = async (lesson) => {
    const newPrivacy = lesson.privacy === "public" ? "private" : "public";
    try {
      await api.put(`/lessons/${lesson._id}`, { privacy: newPrivacy });
      setLessons(lessons.map((l) => (l._id === lesson._id ? { ...l, privacy: newPrivacy } : l)));
      toast.success(`Lesson is now ${newPrivacy}`);
    } catch (error) {
      toast.error("Failed to update privacy");
    }
  };

  const handleToggleAccess = async (lesson) => {
    if (!isPremiumUser) {
      toast.error("Only premium users can create premium lessons");
      return;
    }
    const newAccess = lesson.access_level === "free" ? "premium" : "free";
    try {
      await api.put(`/lessons/${lesson._id}`, { access_level: newAccess });
      setLessons(lessons.map((l) => (l._id === lesson._id ? { ...l, access_level: newAccess } : l)));
      toast.success(`Lesson set to ${newAccess}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update access level");
    }
  };

  const openUpdateModal = (lesson) => {
    setEditingLesson({
      ...lesson,
      image: lesson.photoURL || "",
    });
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      await api.put(`/lessons/${editingLesson._id}`, {
        title: editingLesson.title,
        story: editingLesson.story,
        category: editingLesson.category,
        emotionalTone: editingLesson.emotionalTone,
        photoURL: editingLesson.image,
        privacy: editingLesson.privacy,
        access_level: editingLesson.access_level,
      });
      toast.success("Lesson updated successfully!");
      setIsUpdateModalOpen(false);
      fetchMyLessons();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update lesson");
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl shadow-blue-100 mb-10 overflow-hidden relative">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">My Life Lessons</h1>
          <p className="text-blue-100">Manage, edit, and track the impact of your shared lesson.</p>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10 flex gap-4">
          <FaBook className="w-24 h-24 rotate-12" />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lesson Info</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Visibility</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Access</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Stats</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {lessons.length > 0 ? (
                lessons.map((lesson) => (
                  <tr key={lesson._id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-gray-100 flex">
                          <ImageWithFallback
                            src={lesson.photoURL}
                            alt={lesson.title}
                            className="w-full h-full object-cover"
                            icon={FaBook}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 truncate max-w-[200px]">{lesson.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                              {lesson.category}
                            </span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                              {new Date(lesson.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() => handleTogglePrivacy(lesson)}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          lesson.privacy === "public"
                            ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {lesson.privacy === "public" ? <><FaGlobe /> Public</> : <><FaEyeSlash /> Private</>}
                      </button>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() => handleToggleAccess(lesson)}
                        disabled={!isPremiumUser}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          lesson.access_level === "premium"
                            ? "bg-violet-50 text-violet-600 hover:bg-violet-100"
                            : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {lesson.access_level === "premium" ? <><FaCrown /> Premium</> : "Free"}
                      </button>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                          ❤️ {lesson.likesCount || 0}
                        </span>
                        <span className="text-[10px] font-medium text-gray-400">
                          Saves: {lesson.favoritesCount || 0}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 text-xl">
                        <Link
                          to={`/lessons/${lesson._id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Lesson"
                        >
                          <FaExternalLinkAlt className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => openUpdateModal(lesson)}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Edit Lesson"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(lesson._id)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Lesson"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center">
                    <div className="max-w-xs mx-auto">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-200 text-3xl">
                        <FaBook />
                      </div>
                      <p className="text-gray-900 font-bold mb-1">No lessons yet</p>
                      <p className="text-gray-500 text-sm mb-6">Start by sharing your first life lesson with the world.</p>
                      <Link
                        to="/dashboard/add-lesson"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all"
                      >
                        Create Now <FaPlus />
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isUpdateModalOpen && editingLesson && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsUpdateModalOpen(false)}></div>
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in duration-300">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex items-center justify-between text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FaEdit /> Edit Lesson
              </h2>
              <button
                onClick={() => setIsUpdateModalOpen(false)}
                className="p-2 rounded-xl hover:bg-white/20 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={editingLesson.title}
                  onChange={(e) => setEditingLesson({ ...editingLesson, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Category & Tone</label>
                <div className="grid grid-cols-2 gap-4">
                  <select
                    required
                    value={editingLesson.category}
                    onChange={(e) => setEditingLesson({ ...editingLesson, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none font-medium bg-white"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select
                    required
                    value={editingLesson.emotionalTone}
                    onChange={(e) => setEditingLesson({ ...editingLesson, emotionalTone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none font-medium bg-white"
                  >
                    {TONES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Story / Lesson</label>
                <textarea
                  required
                  rows={6}
                  value={editingLesson.story}
                  onChange={(e) => setEditingLesson({ ...editingLesson, story: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none font-medium leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Image URL</label>
                <div className="space-y-3">
                  <input
                    type="url"
                    value={editingLesson.image}
                    onChange={(e) => setEditingLesson({ ...editingLesson, image: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none font-medium"
                    placeholder="https://example.com/image.jpg"
                  />
                  {editingLesson.image && (
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border border-gray-100 flex">
                      <ImageWithFallback
                        src={editingLesson.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        icon={FaUser}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-2">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Privacy</label>
                  <div className="flex gap-2">
                    {["public", "private"].map(p => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setEditingLesson({ ...editingLesson, privacy: p })}
                        className={`flex-1 py-2 px-3 rounded-xl border-2 text-xs font-bold capitalize transition-all ${
                          editingLesson.privacy === p ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-50 text-gray-400"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Access</label>
                  <div className="flex gap-2">
                    {["free", "premium"].map(a => (
                      <button
                        key={a}
                        type="button"
                        disabled={a === "premium" && !isPremiumUser}
                        onClick={() => setEditingLesson({ ...editingLesson, access_level: a })}
                        className={`flex-1 py-2 px-3 rounded-xl border-2 text-xs font-bold capitalize transition-all ${
                          editingLesson.access_level === a
                            ? a === "premium" ? "border-violet-600 bg-violet-50 text-violet-700" : "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-gray-50 text-gray-400"
                        } disabled:opacity-30`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={updateLoading}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-200 transform hover:-translate-y-1 transition-all disabled:opacity-70"
                >
                  {updateLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <><FaSave /> Save Changes</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLessons;