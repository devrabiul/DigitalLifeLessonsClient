import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Link } from 'react-router';
import api from '../../services/api';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const MyFavorites = () => {
    const { user } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchFavorites();
        }
    }, [user]);

    const fetchFavorites = async () => {
        try {
            const response = await api.get(`/users/${user.uid}/favorites`);
            setFavorites(response.data || []);
        } catch (error) {
            console.error('Failed to fetch favorites:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFavorite = async (lessonId) => {
        try {
            await api.delete(`/lessons/${lessonId}/favorite`);
            setFavorites(favorites.filter(f => f._id !== lessonId));
        } catch (error) {
            console.error('Failed to remove favorite:', error);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">My Favorites</h2>
                    <p className="text-gray-500 mt-1">Lessons you've saved for later</p>
                </div>
                <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    {favorites.length} {favorites.length === 1 ? 'lesson' : 'lessons'}
                </span>
            </div>

            {favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((lesson) => (
                        <div
                            key={lesson._id}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
                        >
                            {/* Image */}
                            <div className="relative h-48 bg-gradient-to-br from-purple-100 to-blue-100">
                                {lesson.image_url || lesson.imageUrl ? (
                                    <img
                                        src={lesson.image_url || lesson.imageUrl}
                                        alt={lesson.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <svg className="w-16 h-16 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                )}
                                
                                {/* Remove Button */}
                                <button
                                    onClick={() => handleRemoveFavorite(lesson._id)}
                                    className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                                    title="Remove from favorites"
                                >
                                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                {/* Category Badge */}
                                <div className="absolute bottom-3 left-3">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                                        {lesson.category}
                                    </span>
                                </div>

                                {/* Premium Badge */}
                                {lesson.access_level === 'premium' && (
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-full text-xs font-medium flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            Premium
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                                    {lesson.title}
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                                    {lesson.description}
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3 mb-4">
                                    <img
                                        src={lesson.author?.photo || lesson.authorPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(lesson.author?.name || 'User')}&background=7c3aed&color=fff`}
                                        alt={lesson.author?.name}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <span className="text-sm text-gray-600">{lesson.author?.name || 'Anonymous'}</span>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                                            </svg>
                                            {lesson.likesCount || 0}
                                        </span>
                                    </div>
                                    <Link
                                        to={`/lessons/${lesson._id}`}
                                        className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1"
                                    >
                                        Read more
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No favorites yet</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        Start exploring and save lessons that inspire you. They'll appear here for easy access.
                    </p>
                    <Link
                        to="/lessons"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Explore Lessons
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyFavorites;
