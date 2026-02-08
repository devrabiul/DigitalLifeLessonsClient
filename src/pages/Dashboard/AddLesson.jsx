import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";
import toast from "react-hot-toast";
import { FaPlus, FaLock, FaGlobe, FaEyeSlash, FaCrown, FaInfoCircle } from "react-icons/fa";

const CATEGORIES = [
  "Personal Growth",
  "Career",
  "Relationships",
  "Mindset",
  "Mistakes Learned",
];

const TONES = ["Motivational", "Sad", "Realization", "Gratitude"];

const AddLesson = () => {
  const { dbUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    story: "",
    category: "",
    emotionalTone: "",
    image: "",
    privacy: "public",
    access_level: "free",
  });

  const isPremiumUser = dbUser?.isPremium || dbUser?.role === "admin";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category || !formData.emotionalTone) {
      toast.error("Please select a category and emotional tone");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/lessons", formData);
      toast.success("Life lesson shared successfully!");
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Error adding lesson:", error);
      toast.error(error.response?.data?.message || "Failed to add lesson");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-10 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
              <FaPlus className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold">Share a Life Lesson</h1>
          </div>
          <p className="text-blue-100 max-w-xl">
            Your wisdom can change someone's life. Share your story, insights,
            and the lessons you've learned along the way.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 gap-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Lesson Title
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., What Failure Taught Me About Resilience"
                className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Description / Story / Insight
              </label>
              <textarea
                name="story"
                required
                rows={8}
                value={formData.story}
                onChange={handleChange}
                placeholder="Share your experience in detail..."
                className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Category
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none bg-white font-medium"
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Emotional Tone
                </label>
                <select
                  name="emotionalTone"
                  required
                  value={formData.emotionalTone}
                  onChange={handleChange}
                  className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none bg-white font-medium"
                >
                  <option value="">Select Tone</option>
                  {TONES.map((tone) => (
                    <option key={tone} value={tone}>
                      {tone}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Image URL (Optional)
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="relative">
                <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
                  Privacy Settings
                </label>
                <div className="flex gap-4">
                  <label className={`flex-1 flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.privacy === "public" ? "border-blue-600 bg-blue-50/50" : "border-gray-100 hover:border-gray-200"}`}>
                    <input
                      type="radio"
                      name="privacy"
                      value="public"
                      checked={formData.privacy === "public"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <FaGlobe className={`w-6 h-6 mb-2 ${formData.privacy === "public" ? "text-blue-600" : "text-gray-400"}`} />
                    <span className={`text-sm font-bold ${formData.privacy === "public" ? "text-blue-700" : "text-gray-600"}`}>Public</span>
                  </label>
                  <label className={`flex-1 flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.privacy === "private" ? "border-blue-600 bg-blue-50/50" : "border-gray-100 hover:border-gray-200"}`}>
                    <input
                      type="radio"
                      name="privacy"
                      value="private"
                      checked={formData.privacy === "private"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <FaEyeSlash className={`w-6 h-6 mb-2 ${formData.privacy === "private" ? "text-blue-600" : "text-gray-400"}`} />
                    <span className={`text-sm font-bold ${formData.privacy === "private" ? "text-blue-700" : "text-gray-600"}`}>Private</span>
                  </label>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Access Level
                  </label>
                  {!isPremiumUser && (
                    <div className="group relative">
                      <FaInfoCircle className="text-gray-400 cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-[10px] rounded-lg text-center font-medium shadow-xl">
                        Upgrade to Premium to create paid lessons
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-4">
                  <label className={`flex-1 flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.access_level === "free" ? "border-blue-600 bg-blue-50/50" : "border-gray-100 hover:border-gray-200"}`}>
                    <input
                      type="radio"
                      name="access_level"
                      value="free"
                      checked={formData.access_level === "free"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className={`text-sm font-bold ${formData.access_level === "free" ? "text-blue-700" : "text-gray-600"}`}>Free</span>
                  </label>
                  <label 
                    className={`flex-1 flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${!isPremiumUser ? "opacity-50 grayscale cursor-not-allowed bg-gray-50 border-gray-100" : formData.access_level === "premium" ? "border-violet-600 bg-violet-50/50" : "border-gray-100 hover:border-gray-200 cursor-pointer"}`}
                  >
                    <input
                      type="radio"
                      name="access_level"
                      value="premium"
                      disabled={!isPremiumUser}
                      checked={formData.access_level === "premium"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <FaCrown className={`w-5 h-5 mb-2 ${formData.access_level === "premium" ? "text-violet-600" : "text-gray-400"}`} />
                    <span className={`text-sm font-bold ${formData.access_level === "premium" ? "text-violet-700" : "text-gray-600"}`}>Premium</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-200 transform hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sharing...
                </>
              ) : (
                <>
                  Share My Wisdom
                  <FaPlus className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLesson;