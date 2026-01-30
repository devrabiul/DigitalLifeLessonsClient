import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const DashboardHome = () => {
    const authInfo = useContext(AuthContext);
    const { user } = authInfo || {};

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome back, {user?.displayName?.split(' ')[0]}! 👋</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="text-blue-100 text-sm font-medium uppercase tracking-wider mb-2">Total Lessons</div>
                    <div className="text-4xl font-bold">0</div>
                </div>
                
                 <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="text-purple-100 text-sm font-medium uppercase tracking-wider mb-2">Total Views</div>
                    <div className="text-4xl font-bold">0</div>
                </div>
                
                 <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="text-pink-100 text-sm font-medium uppercase tracking-wider mb-2">Favorites</div>
                    <div className="text-4xl font-bold">0</div>
                </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
                <p className="text-gray-500">No recent activity to show.</p>
            </div>
        </div>
    );
};

export default DashboardHome;
