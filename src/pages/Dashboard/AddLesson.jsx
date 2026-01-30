import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';
import api from '../../services/api';
import { showSuccess, showError } from '../../utils/toast';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

const AddLesson = () => {
    const { user } = useContext(AuthContext); 
    const { dbUser } = useAuth();
    const isPremiumUser = dbUser?.isPremium || dbUser?.role === 'admin';
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            privacy: 'public',
            access_level: 'free',
            category: 'Personal Growth',
            emotional_tone: 'Motivational'
        }
    });
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async (data) => {
        setSubmitting(true);
        
        // Prepare data
        const lessonData = {
            ...data,
            author: {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                uid: user.uid
            },
            likes: [],
            likesCount: 0,
            favorites: [],
            favoritesCount: 0,
            reports: []
        };

        try {
            const response = await api.post('/lessons/create', lessonData);

            if (response.data) {
                showSuccess('Lesson published successfully!');
                reset();
                navigate('/dashboard/my-lessons');
            }
        } catch (error) {
            console.error(error);
            showError(error?.response?.data?.message || 'Failed to add lesson');
        } finally {
            setSubmitting(false);
        }
    };

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
                    <h2 className="text-3xl font-bold text-gray-800">Add New Lesson</h2>
                    <p className="text-gray-500 mt-1">Share your wisdom with the world</p>
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
                            placeholder="Enter a compelling title for your lesson"
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
                            {...register("description", { 
                                required: "Description is required",
                                minLength: { value: 50, message: "Description must be at least 50 characters" }
                            })} 
                            rows="6"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                            placeholder="Share your story, experience, or the lesson you've learned. Be detailed and inspiring..."
                        ></textarea>
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">Minimum 50 characters</p>
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
                                <label className={`flex items-center gap-3 p-3 border rounded-xl transition-colors ${
                                    isPremiumUser 
                                        ? 'border-gray-200 cursor-pointer hover:bg-gray-50' 
                                        : 'border-gray-100 cursor-not-allowed bg-gray-50 opacity-60'
                                }`}>
                                    <input
                                        type="radio"
                                        {...register("access_level")}
                                        value="premium"
                                        disabled={!isPremiumUser}
                                        className="w-4 h-4 text-purple-600 focus:ring-purple-500 disabled:opacity-50"
                                    />
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-800">Premium</span>
                                        <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs rounded-full">
                                            PRO
                                        </span>
                                    </div>
                                    <div className="ml-auto text-right">
                                        {isPremiumUser ? (
                                            <p className="text-xs text-gray-500">Premium members only</p>
                                        ) : (
                                            <Link to="/pricing" className="text-xs text-violet-600 font-medium hover:underline">
                                                Upgrade to unlock
                                            </Link>
                                        )}
                                    </div>
                                </label>
                                {!isPremiumUser && (
                                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                        <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Premium access level requires a premium subscription
                                    </p>
                                )}
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
                        <p className="mt-1 text-xs text-gray-500">Add a cover image to make your lesson more engaging</p>
                    </div>

                    {/* Submit */}
                    <div className="pt-6 border-t border-gray-100">
                        <button 
                            type="submit" 
                            disabled={submitting}
                            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {submitting ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Publishing...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    Publish Lesson
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Tips Card */}
            <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Tips for a great lesson
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Be specific and share real experiences
                    </li>
                    <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Include what you learned and how it changed you
                    </li>
                    <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Add a cover image to increase engagement
                    </li>
                    <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Choose the right category and tone for better discoverability
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AddLesson;
