import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';
import { useParams, useNavigate, Link } from 'react-router';
import api from '../../services/api';
import { showSuccess, showError } from '../../utils/toast';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const UpdateLesson = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const fetchLesson = useCallback(async () => {
        try {
            const response = await api.get(`/lessons/${id}`);
            const lessonData = response.data;
            
            // Check if user owns this lesson
            if (lessonData.author?.uid !== user?.uid && lessonData.authorId !== user?.uid) {
                showError('You can only edit your own lessons');
                navigate('/dashboard/my-lessons');
                return;
            }
            
            setLesson(lessonData);
            reset({
                title: lessonData.title || '',
                description: lessonData.description || lessonData.content || lessonData.story || '',
                category: lessonData.category || 'Personal Growth',
                emotional_tone: lessonData.emotional_tone || lessonData.emotionalTone || 'Motivational',
                privacy: lessonData.privacy || 'public',
                access_level: lessonData.access_level || lessonData.accessLevel || 'free',
                image_url: lessonData.image_url || lessonData.imageUrl || ''
            });
        } catch (error) {
            console.error(error);
            showError('Failed to load lesson');
            navigate('/dashboard/my-lessons');
        } finally {
            setLoading(false);
        }
    }, [id, user, reset, navigate]);

    useEffect(() => {
        fetchLesson();
    }, [fetchLesson]);

    const onSubmit = async (data) => {
        setSubmitting(true);
        try {
            await api.put(`/lessons/${id}`, data);
            showSuccess('Lesson updated successfully!');
            navigate('/dashboard/my-lessons');
        } catch (error) {
            console.error(error);
            showError(error?.response?.data?.message || 'Failed to update lesson');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link
                    to="/dashboard/my-lessons"
                    className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Update Lesson</h2>
                    <p className="text-gray-500 mt-1">Edit your lesson details</p>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lesson Title <span className="text-red-500">*</span>
                        </label>
                        <input 
                            {...register("title", { required: "Title is required" })} 
                            type="text" 
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
                            placeholder="Enter a compelling title"
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description / Story <span className="text-red-500">*</span>
                        </label>
                        <textarea 
                            {...register("description", { required: "Description is required", minLength: { value: 50, message: "Description must be at least 50 characters" } })} 
                            rows="6"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                            placeholder="Share your story, experience, or the lesson you've learned..."
                        ></textarea>
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                        )}
                    </div>

                    {/* Category & Tone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select 
                                {...register("category", { required: true })} 
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
                            >
                                <option value="Personal Growth">Personal Growth</option>
                                <option value="Career">Career</option>
                                <option value="Relationships">Relationships</option>
                                <option value="Mindset">Mindset</option>
                                <option value="Mistakes Learned">Mistakes Learned</option>
                                <option value="Health">Health</option>
                                <option value="Finance">Finance</option>
                                <option value="Education">Education</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Emotional Tone <span className="text-red-500">*</span>
                            </label>
                            <select 
                                {...register("emotional_tone", { required: true })} 
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
                            >
                                <option value="Motivational">Motivational</option>
                                <option value="Sad">Sad</option>
                                <option value="Realization">Realization</option>
                                <option value="Gratitude">Gratitude</option>
                                <option value="Inspirational">Inspirational</option>
                                <option value="Reflective">Reflective</option>
                            </select>
                        </div>
                    </div>

                    {/* Privacy & Access */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Visibility
                            </label>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input
                                        type="radio"
                                        {...register("privacy")}
                                        value="public"
                                        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                                    />
                                    <div>
                                        <span className="font-medium text-gray-800">Public</span>
                                        <p className="text-xs text-gray-500">Visible to everyone</p>
                                    </div>
                                </label>
                                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input
                                        type="radio"
                                        {...register("privacy")}
                                        value="private"
                                        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                                    />
                                    <div>
                                        <span className="font-medium text-gray-800">Private</span>
                                        <p className="text-xs text-gray-500">Only you can see this</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Access Level
                            </label>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input
                                        type="radio"
                                        {...register("access_level")}
                                        value="free"
                                        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                                    />
                                    <div>
                                        <span className="font-medium text-gray-800">Free</span>
                                        <p className="text-xs text-gray-500">Available to all users</p>
                                    </div>
                                </label>
                                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input
                                        type="radio"
                                        {...register("access_level")}
                                        value="premium"
                                        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                                    />
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-800">Premium</span>
                                        <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs rounded-full">
                                            PRO
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 ml-auto">Premium members only</p>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cover Image URL <span className="text-gray-400">(optional)</span>
                        </label>
                        <div className="relative">
                            <input 
                                {...register("image_url")} 
                                type="url"
                                className="w-full px-4 py-3 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="https://example.com/image.jpg"
                            />
                            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                        <Link
                            to="/dashboard/my-lessons"
                            className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-center"
                        >
                            Cancel
                        </Link>
                        <button 
                            type="submit" 
                            disabled={submitting}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {submitting ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Update Lesson
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateLesson;
