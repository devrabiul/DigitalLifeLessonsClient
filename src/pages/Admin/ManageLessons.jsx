import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { FaStar, FaTrash, FaCrown, FaFilter } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";

const ManageLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const res = await api.get("/admin/lessons");
      setLessons(res.data);
    } catch (err) {
      toast.error("Failed to fetch lessons");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFeatured = async (id, currentStatus) => {
    try {
      await api.put(`/admin/lessons/${id}/featured`, { isFeatured: !currentStatus });
      toast.success(!currentStatus ? "Lesson Featured" : "Feature Removed");
      fetchLessons();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleMarkReviewed = async (id) => {
    try {
      await api.put(`/admin/lessons/${id}/reviewed`);
      toast.success("Lesson marked as reviewed");
      fetchLessons();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleDeleteLesson = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this lesson?")) return;
    try {
      await api.delete(`/lessons/${id}`);
      toast.success("Lesson deleted");
      fetchLessons();
    } catch (err) {
      toast.error("Failed to delete lesson");
    }
  };

  const filteredLessons = lessons.filter(l => {
    if (filter === "featured") return l.isFeatured;
    if (filter === "premium") return l.access_level === "premium";
    if (filter === "unreviewed") return !l.reviewed;
    return true;
  });

  if (loading) return <div className="p-8 text-center animate-pulse">Loading lessons...</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-black text-gray-900 mb-1">Manage Lessons</h1>
           <p className="text-gray-500 font-medium">Moderate content and curate featured stories</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
           <FaFilter className="text-gray-400 ml-2" />
           <select 
             value={filter} 
             onChange={(e) => setFilter(e.target.value)}
             className="bg-transparent border-none text-sm font-bold text-gray-700 focus:ring-0 cursor-pointer pr-8"
           >
             <option value="all">All Lessons</option>
             <option value="featured">Featured Only</option>
             <option value="premium">Premium Only</option>
             <option value="unreviewed">Unreviewed</option>
           </select>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Lesson Info</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Access</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Featured</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredLessons.map((lesson) => (
                <tr key={lesson._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 truncate max-w-[300px]">{lesson.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{lesson.category}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-[10px] text-gray-500 font-medium">by {lesson.author?.name || "Unknown"}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    {lesson.access_level === 'premium' ? (
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-wider rounded-full border border-amber-100">
                        <FaCrown className="text-[8px]" /> Premium
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-wider rounded-full border border-gray-200">
                        Free
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <button 
                        onClick={() => handleToggleFeatured(lesson._id, lesson.isFeatured)}
                        className={`p-2 rounded-xl transition-all border ${
                          lesson.isFeatured 
                            ? 'bg-amber-100 text-amber-600 border-amber-200' 
                            : 'bg-gray-50 text-gray-300 border-gray-100 hover:text-amber-400 hover:bg-amber-50'
                        }`}
                      >
                        <FaStar className={lesson.isFeatured ? "animate-pulse" : ""} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-2">
                       {!lesson.reviewed && (
                         <button
                           onClick={() => handleMarkReviewed(lesson._id)}
                           className="p-2 text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100"
                           title="Mark Reviewed"
                         >
                           <FaCheckCircle />
                         </button>
                       )}
                      <button
                        onClick={() => handleDeleteLesson(lesson._id)}
                        className="p-2 text-rose-600 bg-rose-50 rounded-xl hover:bg-rose-600 hover:text-white transition-all border border-rose-100"
                        title="Delete Lesson"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageLessons;