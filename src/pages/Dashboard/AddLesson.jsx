import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const AddLesson = () => {
    const { user } = useContext(AuthContext); 
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
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
            reports: []
        };

        try {
            // Get token
            const token = localStorage.getItem('access-token');
            const response = await axios.post('http://localhost:5000/api/lessons/create', lessonData, {
                 headers: {
                    Authorization: `Bearer ${token}`
                 }
            });

            if (response.data) {
                toast.success('Lesson Added Successfully!');
                reset();
                navigate('/dashboard/my-lessons');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to add lesson');
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Lesson</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Lesson Title</label>
                    <input 
                        {...register("title", { required: true })} 
                        type="text" 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 border p-2" 
                        placeholder="Enter lesson title"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description / Story</label>
                    <textarea 
                        {...register("description", { required: true })} 
                        rows="4"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 border p-2"
                        placeholder="Share your story..."
                    ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select {...register("category", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 border p-2">
                            <option value="Personal Growth">Personal Growth</option>
                            <option value="Career">Career</option>
                            <option value="Relationships">Relationships</option>
                            <option value="Mindset">Mindset</option>
                            <option value="Mistakes Learned">Mistakes Learned</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Emotional Tone</label>
                        <select {...register("emotional_tone", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 border p-2">
                             <option value="Motivational">Motivational</option>
                             <option value="Sad">Sad</option>
                             <option value="Realization">Realization</option>
                             <option value="Gratitude">Gratitude</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Privacy</label>
                        <select {...register("privacy", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 border p-2">
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Access Level</label>
                        <select {...register("access_level", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 border p-2">
                            <option value="free">Free</option>
                            <option value="premium">Premium</option>
                        </select>
                    </div>
                </div>
                
                <div>
                     <label className="block text-sm font-medium text-gray-700">Image URL (Optional)</label>
                     <input 
                        {...register("image_url")} 
                        type="url"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 border p-2"
                        placeholder="https://example.com/image.jpg"
                     />
                </div>

                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                    Publish Lesson
                </button>
            </form>
        </div>
    );
};

export default AddLesson;
