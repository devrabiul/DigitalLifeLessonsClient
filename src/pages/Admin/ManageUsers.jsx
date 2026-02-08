import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { FaUserShield, FaUserPlus, FaTrash, FaCheck } from "react-icons/fa6";
import { toast } from "react-hot-toast";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (id, newRole) => {
    try {
      await api.put(`/admin/users/${id}/role`, { role: newRole });
      toast.success("Role updated successfully");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/admin/users/${id}`);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  if (loading) return <div className="p-8 text-center animate-pulse">Loading users...</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-black text-gray-900 mb-1">Manage Users</h1>
           <p className="text-gray-500 font-medium">Promote, demote, or manage community members</p>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
           <span className="text-blue-600 font-bold text-sm">{users.length} Total Users</span>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">User Info</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Lessons</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center overflow-hidden shrink-0">
                        {user.photoURL ? (
                          <img 
                            src={user.photoURL} 
                            alt="" 
                            className="w-full h-full object-cover" 
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = `<span class="text-blue-600 font-bold">${user.name?.charAt(0)}</span>`;
                            }}
                          />
                        ) : (
                          <span className="text-blue-600 font-bold">{user.name?.charAt(0)}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-600 border border-purple-200' 
                        : 'bg-blue-100 text-blue-600 border border-blue-200'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                       <span className="font-bold text-gray-900">{user.lessonsCount}</span>
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lessons</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-2">
                      {user.role !== 'admin' ? (
                        <button
                          onClick={() => handleUpdateRole(user._id, 'admin')}
                          className="p-2 text-purple-600 bg-purple-50 rounded-xl hover:bg-purple-600 hover:text-white transition-all border border-purple-100"
                          title="Make Admin"
                        >
                          <FaUserShield />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUpdateRole(user._id, 'user')}
                          className="p-2 text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-600 hover:text-white transition-all border border-blue-100"
                          title="Revoke Admin"
                        >
                          <FaUserPlus />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="p-2 text-rose-600 bg-rose-50 rounded-xl hover:bg-rose-600 hover:text-white transition-all border border-rose-100"
                        title="Delete User"
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

export default ManageUsers;