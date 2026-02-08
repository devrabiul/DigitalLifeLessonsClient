import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { FaUserShield, FaCamera, FaEnvelope, FaIdBadge } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import api from "../../services/api";

const AdminProfile = () => {
  const { user, dbUser, syncUser } = useAuth();
  const [name, setName] = useState(dbUser?.name || user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(dbUser?.photoURL || user?.photoURL || "");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put("/users/update", {
        email: user.email,
        name,
        photoURL,
      });
      await syncUser();
      setIsEditing(false);
      toast.success("Admin profile updated!");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
        {/* Header/Cover */}
        <div className="h-48 bg-gradient-to-r from-purple-600 to-blue-600 relative">
           <div className="absolute -bottom-16 left-12">
              <div className="relative group">
                <div className="w-32 h-32 rounded-[32px] bg-white p-1.5 shadow-2xl">
                   <div className="w-full h-full rounded-[26px] bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
                      {photoURL ? (
                        <img 
                          src={photoURL} 
                          alt="" 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = `<span class="text-4xl font-black text-blue-600">${name?.charAt(0)}</span>`;
                          }}
                        />
                      ) : (
                        <span className="text-4xl font-black text-blue-600">{name?.charAt(0)}</span>
                      )}
                   </div>
                </div>
                {isEditing && (
                   <label className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors border border-gray-100 animate-in zoom-in">
                      <FaCamera className="text-blue-600" />
                      <input 
                        type="text" 
                        className="hidden" 
                        onChange={(e) => setPhotoURL(e.target.value)}
                        placeholder="Paste image URL"
                      />
                   </label>
                )}
              </div>
           </div>
           <div className="absolute right-8 bottom-4">
              <span className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-white font-black text-xs uppercase tracking-widest border border-white/30">
                 <FaUserShield className="text-amber-300" /> Admin Restricted Access
              </span>
           </div>
        </div>

        <div className="pt-24 pb-12 px-12">
          {!isEditing ? (
            <div className="space-y-10">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-black text-gray-900 mb-2 flex items-center gap-3">
                    {name} <FaCheckCircle className="text-blue-500 text-2xl" />
                  </h1>
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                    <FaEnvelope className="text-blue-500" /> {user.email}
                  </p>
                </div>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-gray-900 text-white rounded-2xl font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-gray-200"
                >
                  Edit Profile
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest mb-1">Privilege Level</p>
                    <p className="text-xl font-black text-purple-600 uppercase">Super Admin</p>
                 </div>
                 <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest mb-1">Status</p>
                    <p className="text-xl font-black text-emerald-600 uppercase">Active</p>
                 </div>
                 <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest mb-1">Account Type</p>
                    <p className="text-xl font-black text-blue-600 uppercase">System Moderator</p>
                 </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-6 max-w-xl animate-in fade-in duration-300">
               <div className="grid grid-cols-1 gap-6">
                 <div>
                   <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Display Name</label>
                   <input 
                     type="text"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-bold"
                     required
                   />
                 </div>
                 <div>
                   <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Photo URL</label>
                   <input 
                     type="url"
                     value={photoURL}
                     onChange={(e) => setPhotoURL(e.target.value)}
                     className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-bold"
                     placeholder="https://example.com/photo.jpg"
                   />
                 </div>
               </div>
               
               <div className="flex gap-4 pt-4">
                  <button 
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all disabled:opacity-50"
                  >
                    {loading ? "Updating..." : "Save Changes"}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-8 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black text-sm hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
               </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;