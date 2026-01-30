import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { showSuccess, showError } from '../../utils/toast';
import api from '../../services/api';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({
        lessons: 0,
        likes: 0,
        favorites: 0
    });
    const [formData, setFormData] = useState({
        displayName: '',
        photoURL: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                displayName: user.displayName || '',
                photoURL: user.photoURL || ''
            });
            fetchStats();
        }
    }, [user]);

    const fetchStats = async () => {
        try {
            const response = await api.get(`/lessons?uid=${user.uid}`);
            const lessons = response.data.lessons || response.data || [];
            const totalLikes = lessons.reduce((sum, l) => sum + (l.likesCount || 0), 0);
            
            setStats({
                lessons: lessons.length,
                likes: totalLikes,
                favorites: 0
            });
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await updateProfile(auth.currentUser, {
                displayName: formData.displayName,
                photoURL: formData.photoURL
            });
            showSuccess('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            showError(error?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const isPremium = user?.isPremium || false;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Cover */}
                <div className="relative h-40 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
                    
                    {/* Premium Badge */}
                    {isPremium && (
                        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                            <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm font-medium text-white">Premium</span>
                        </div>
                    )}

                    {/* Avatar */}
                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                        <div className="relative">
                            <img 
                                src={user?.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.displayName || 'U') + "&background=7c3aed&color=fff&size=128"} 
                                alt="Profile" 
                                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                            />
                            {isEditing && (
                                <button className="absolute bottom-0 right-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Profile Info */}
                <div className="pt-20 pb-8 px-6">
                    {!isEditing ? (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-800 mb-1">{user?.displayName || 'User'}</h2>
                            <p className="text-gray-500 mb-6">{user?.email}</p>
                            
                            <button
                                onClick={() => setIsEditing(true)}
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                Edit Profile
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Display Name
                                </label>
                                <input
                                    type="text"
                                    name="displayName"
                                    value={formData.displayName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Photo URL
                                </label>
                                <input
                                    type="url"
                                    name="photoURL"
                                    value={formData.photoURL}
                                    onChange={handleChange}
                                    placeholder="https://example.com/photo.jpg"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="flex-1 px-6 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 px-6 py-2.5 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-60"
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    )}
                    
                    {/* Stats */}
                    <div className="flex justify-center gap-8 border-t border-gray-100 pt-6 mt-6">
                        <div className="text-center">
                            <span className="block text-2xl font-bold text-gray-800">{stats.lessons}</span>
                            <span className="text-sm text-gray-500">Lessons</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-2xl font-bold text-gray-800">{stats.likes}</span>
                            <span className="text-sm text-gray-500">Total Likes</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-2xl font-bold text-gray-800">{stats.favorites}</span>
                            <span className="text-sm text-gray-500">Saved</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Account Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800">Account Information</h3>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                            <p className="font-medium text-gray-800">Email</p>
                            <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            {user?.emailVerified ? 'Verified' : 'Not Verified'}
                        </span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                            <p className="font-medium text-gray-800">Account Type</p>
                            <p className="text-sm text-gray-500">{isPremium ? 'Premium Member' : 'Free Account'}</p>
                        </div>
                        {!isPremium && (
                            <a href="/pricing" className="text-purple-600 text-sm font-medium hover:text-purple-700">
                                Upgrade →
                            </a>
                        )}
                    </div>
                    <div className="flex items-center justify-between py-3">
                        <div>
                            <p className="font-medium text-gray-800">Member Since</p>
                            <p className="text-sm text-gray-500">
                                {user?.metadata?.creationTime 
                                    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                      })
                                    : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-red-100 bg-red-50">
                    <h3 className="text-lg font-bold text-red-800">Danger Zone</h3>
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-800">Delete Account</p>
                            <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                        </div>
                        <button className="px-4 py-2 border border-red-300 text-red-600 font-medium rounded-xl hover:bg-red-50 transition-colors">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
