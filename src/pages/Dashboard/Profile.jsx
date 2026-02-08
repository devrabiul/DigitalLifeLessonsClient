import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";
import LessonCard from "../../components/Lessons/LessonCard";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaImage,
  FaSave,
  FaCrown,
  FaBook,
  FaHeart,
  FaEdit,
  FaTimes,
  FaSpinner,
} from "react-icons/fa";

const Profile = () => {
  const { dbUser, refreshUserStatus } = useAuth();
  const [stats, setStats] = useState(null);
  const [userLessons, setUserLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: dbUser?.name || "",
    photoURL: dbUser?.photoURL || "",
  });

  const fetchProfileData = async () => {
    if (!dbUser?.email) return;
    try {
      const [statsRes, lessonsRes] = await Promise.all([
        api.get(`/stats/user/${dbUser.email}`),
        api.get(`/lessons?authorEmail=${dbUser.email}&limit=100`),
      ]);
      setStats(statsRes.data);
      setUserLessons(lessonsRes.data.lessons);
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [dbUser]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      await api.put("/users/update", {
        email: dbUser.email,
        name: formData.name,
        photoURL: formData.photoURL,
      });
      await refreshUserStatus();
      toast.success("Profile updated successfully!");
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
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
    <div className="space-y-12 pb-20">
      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
        <div className="px-8 pb-8">
          <div className="relative flex flex-col md:flex-row md:items-end gap-6 -mt-12 mb-8">
            <div className="w-32 h-32 rounded-3xl border-4 border-white overflow-hidden bg-gray-50 shadow-lg shrink-0">
              {dbUser?.photoURL ? (
                <img src={dbUser.photoURL} alt={dbUser.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
                  <FaUser />
                </div>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">{dbUser?.name}</h1>
                {dbUser?.isPremium && (
                  <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border border-amber-200">
                    <FaCrown className="text-[10px]" /> PREMIUM ⭐
                  </span>
                )}
              </div>
              <p className="text-gray-500 font-medium flex items-center gap-2">
                <FaEnvelope className="text-sm" /> {dbUser?.email}
              </p>
            </div>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all transform hover:-translate-y-1 shadow-lg shadow-gray-200"
            >
              <FaEdit /> Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
              <div className="flex items-center gap-3 text-blue-600 mb-2">
                <FaBook className="text-xl" />
                <span className="text-xs font-bold uppercase tracking-widest">Lessons</span>
              </div>
              <p className="text-3xl font-black text-blue-900">{stats?.lessonsCount || 0}</p>
            </div>
            <div className="bg-rose-50 p-6 rounded-3xl border border-rose-100">
              <div className="flex items-center gap-3 text-rose-600 mb-2">
                <FaHeart className="text-xl" />
                <span className="text-xs font-bold uppercase tracking-widest">Saved</span>
              </div>
              <p className="text-3xl font-black text-rose-900">{stats?.favoritesCount || 0}</p>
            </div>
            <div className="bg-violet-50 p-6 rounded-3xl border border-violet-100 lg:col-span-2">
              <div className="flex items-center gap-3 text-violet-600 mb-2">
                <FaUser className="text-xl" />
                <span className="text-xs font-bold uppercase tracking-widest">Membership</span>
              </div>
              <p className="text-sm font-bold text-violet-900 leading-relaxed">
                Member since {new Date(dbUser?.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Shared Wisdom</h2>
          <div className="h-1 flex-1 mx-8 bg-gray-100 rounded-full hidden md:block"></div>
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
            {userLessons.length} Public Lessons
          </span>
        </div>

        {userLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userLessons.map((lesson) => (
              <LessonCard key={lesson._id} lesson={lesson} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[32px] border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-200 text-4xl">
              <FaBook />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No public lessons yet</h3>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Share your experiences with the community of thousands.
            </p>
          </div>
        )}
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)}></div>
          <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FaEdit className="text-blue-600" /> Update Profile
                </h2>
                <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Display Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none font-medium"
                    />
                    <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Photo URL</label>
                  <div className="relative">
                    <input
                      type="url"
                      value={formData.photoURL}
                      onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none font-medium"
                      placeholder="https://example.com/avatar.jpg"
                    />
                    <FaImage className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={updateLoading}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all disabled:opacity-70 shadow-lg shadow-gray-200"
                  >
                    {updateLoading ? <FaSpinner className="animate-spin" /> : <><FaSave /> Save Changes</>}
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

export default Profile;