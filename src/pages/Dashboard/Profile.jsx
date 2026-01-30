import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                    <img 
                        src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                        alt="Profile" 
                        className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                    />
                </div>
            </div>
            
            <div className="pt-20 pb-8 px-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{user?.displayName}</h2>
                <p className="text-gray-500 mb-6">{user?.email}</p>
                
                <div className="flex justify-center gap-8 border-t border-gray-100 pt-6">
                     <div className="text-center">
                         <span className="block text-2xl font-bold text-gray-800">0</span>
                         <span className="text-sm text-gray-500">Lessons</span>
                     </div>
                     <div className="text-center">
                         <span className="block text-2xl font-bold text-gray-800">0</span>
                         <span className="text-sm text-gray-500">Followers</span>
                     </div>
                     <div className="text-center">
                         <span className="block text-2xl font-bold text-gray-800">0</span>
                         <span className="text-sm text-gray-500">Following</span>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
