import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import { Link } from 'react-router';
import toast from 'react-hot-toast';

const MyLessons = () => {
    const { user } = useContext(AuthContext);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchMyLessons();
        }
    }, [user]);

    const fetchMyLessons = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/lessons?uid=${user.uid}`);
            setLessons(response.data.lessons || response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this lesson?")) {
            try {
                const token = localStorage.getItem('access-token');
                await axios.delete(`http://localhost:5000/api/lessons/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success("Lesson deleted successfully");
                fetchMyLessons();
            } catch (error) {
                toast.error("Failed to delete lesson");
            }
        }
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div className="overflow-x-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">My Lessons</h2>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead>
                    <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <th className="px-6 py-3 border-b">Title</th>
                        <th className="px-6 py-3 border-b">Category</th>
                        <th className="px-6 py-3 border-b">Tone</th>
                        <th className="px-6 py-3 border-b">Likes</th>
                        <th className="px-6 py-3 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {lessons.map((lesson) => (
                        <tr key={lesson._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                {lesson.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {lesson.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {lesson.emotional_tone}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {lesson.likesCount || 0}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                                <Link to={`/lessons/${lesson._id}`} className="text-blue-600 hover:text-blue-900">View</Link>
                                <button className="text-orange-600 hover:text-orange-900">Edit</button>
                                <button onClick={() => handleDelete(lesson._id)} className="text-red-600 hover:text-red-900">Delete</button>
                            </td>
                        </tr>
                    ))}
                    {lessons.length === 0 && (
                        <tr>
                            <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                You haven't created any lessons yet.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MyLessons;
