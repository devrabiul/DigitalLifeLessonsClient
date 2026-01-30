import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';
import { showSuccess, showError } from '../../../utils/toast';
import Swal from 'sweetalert2';

const ManageLessons = () => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        category: '',
        privacy: '',
        access_level: '',
        featured: ''
    });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchLessons = useCallback(async () => {
        try {
            const params = { page, limit: 20, search, ...filters };
            Object.keys(params).forEach(key => !params[key] && delete params[key]);
            
            const response = await api.get('/admin/lessons', { params });
            setLessons(response.data.lessons || []);
            setTotalPages(response.data.totalPages || 1);
        } catch (err) {
            console.error('Failed to fetch lessons:', err);
            showError('Failed to load lessons');
        } finally {
            setLoading(false);
        }
    }, [page, search, filters]);

    useEffect(() => {
        fetchLessons();
    }, [fetchLessons]);

    const handleToggleFeatured = async (lessonId, currentStatus) => {
        try {
            await api.patch(`/admin/lessons/${lessonId}/featured`);
            showSuccess(currentStatus ? 'Lesson unfeatured' : 'Lesson featured');
            fetchLessons();
        } catch {
            showError('Failed to update featured status');
        }
    };

    const handleDeleteLesson = async (lessonId, title) => {
        const result = await Swal.fire({
            title: 'Delete Lesson?',
            text: `This will permanently delete "${title}" and all associated reports. This cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete'
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/admin/lessons/${lessonId}`);
                showSuccess('Lesson deleted successfully');
                fetchLessons();
            } catch (error) {
                showError('Failed to delete lesson');
            }
        }
    };

    const categories = ['Personal Growth', 'Career', 'Relationships', 'Mindset', 'Mistakes Learned', 'Health', 'Finance', 'Education'];

    if (loading && page === 1) return <LoadingSpinner />;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-gray-800">Manage Lessons</h2>
                <p className="text-gray-500 mt-1">View and moderate all lessons</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search lessons..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    
                    <select
                        value={filters.category}
                        onChange={(e) => { setFilters(f => ({ ...f, category: e.target.value })); setPage(1); }}
                        className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <select
                        value={filters.privacy}
                        onChange={(e) => { setFilters(f => ({ ...f, privacy: e.target.value })); setPage(1); }}
                        className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                    >
                        <option value="">All Visibility</option>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>

                    <select
                        value={filters.access_level}
                        onChange={(e) => { setFilters(f => ({ ...f, access_level: e.target.value })); setPage(1); }}
                        className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                    >
                        <option value="">All Access Levels</option>
                        <option value="free">Free</option>
                        <option value="premium">Premium</option>
                    </select>

                    <select
                        value={filters.featured}
                        onChange={(e) => { setFilters(f => ({ ...f, featured: e.target.value })); setPage(1); }}
                        className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                    >
                        <option value="">All Lessons</option>
                        <option value="true">Featured Only</option>
                    </select>
                </div>
            </div>

            {/* Lessons Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Lesson</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Author</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Reports</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {lessons.map((lesson) => (
                                <tr key={lesson._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            {lesson.image_url ? (
                                                <img
                                                    src={lesson.image_url}
                                                    alt={lesson.title}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                                                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                    </svg>
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <p className="font-semibold text-gray-800 truncate max-w-xs">{lesson.title}</p>
                                                <p className="text-sm text-gray-500">{lesson.emotional_tone || 'Motivational'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={lesson.author?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(lesson.author?.name || 'U')}&background=7c3aed&color=fff`}
                                                alt={lesson.author?.name}
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <span className="text-sm text-gray-600">{lesson.author?.name || 'Unknown'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                            {lesson.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {lesson.privacy === 'public' ? (
                                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Public</span>
                                            ) : (
                                                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">Private</span>
                                            )}
                                            {lesson.access_level === 'premium' && (
                                                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">Premium</span>
                                            )}
                                            {lesson.isFeatured && (
                                                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">⭐ Featured</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {lesson.reportCount > 0 ? (
                                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                                                {lesson.reportCount} reports
                                            </span>
                                        ) : (
                                            <span className="text-sm text-gray-400">None</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                to={`/lessons/${lesson._id}`}
                                                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="View"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </Link>
                                            <button
                                                onClick={() => handleToggleFeatured(lesson._id, lesson.isFeatured)}
                                                className={`p-2 rounded-lg transition-colors ${
                                                    lesson.isFeatured 
                                                        ? 'text-amber-600 bg-amber-50 hover:bg-amber-100' 
                                                        : 'text-gray-500 hover:text-amber-600 hover:bg-amber-50'
                                                }`}
                                                title={lesson.isFeatured ? 'Unfeature' : 'Feature'}
                                            >
                                                <svg className="w-5 h-5" fill={lesson.isFeatured ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteLesson(lesson._id, lesson.title)}
                                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {lessons.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No lessons found matching your criteria
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-600">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageLessons;
