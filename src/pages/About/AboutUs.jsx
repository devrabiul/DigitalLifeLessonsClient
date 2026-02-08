import React from "react";
import { FaUsers, FaLightbulb, FaHeart, FaRocket } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-900 py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 skew-x-12 transform translate-x-20"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Our Mission is to <span className="text-blue-500">Empower Growth</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Life Lessons is a global community where wisdom is shared, experiences are celebrated, 
            and everyone has the opportunity to learn from the journeys of others.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4 p-8 bg-gray-50 rounded-[32px] hover:shadow-xl hover:shadow-gray-100 transition-all">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl">
              <FaUsers />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Community First</h3>
            <p className="text-gray-600 leading-relaxed">
              We believe in the power of shared experiences to bring people together and build meaningful connections.
            </p>
          </div>

          <div className="space-y-4 p-8 bg-gray-50 rounded-[32px] hover:shadow-xl hover:shadow-gray-100 transition-all">
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-2xl">
              <FaLightbulb />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Shared Wisdom</h3>
            <p className="text-gray-600 leading-relaxed">
              Every person has a story worth telling and a lesson worth sharing. We provide the platform for that wisdom.
            </p>
          </div>

          <div className="space-y-4 p-8 bg-gray-50 rounded-[32px] hover:shadow-xl hover:shadow-gray-100 transition-all">
            <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center text-2xl">
              <FaHeart />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Empathy & Respect</h3>
            <p className="text-gray-600 leading-relaxed">
              We foster an environment of kindness where every perspective is heard and every struggle is validated.
            </p>
          </div>

          <div className="space-y-4 p-8 bg-gray-50 rounded-[32px] hover:shadow-xl hover:shadow-gray-100 transition-all">
            <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl">
              <FaRocket />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Continuous Growth</h3>
            <p className="text-gray-600 leading-relaxed">
              Learning doesn't stop. We are committed to helping our users evolve through daily insights and reflections.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 relative">
             <div className="aspect-square bg-blue-600 rounded-[40px] rotate-3 absolute inset-0"></div>
             <div className="aspect-square bg-gray-900 rounded-[40px] -rotate-3 relative z-10 flex items-center justify-center p-12 overflow-hidden">
                <div className="text-white text-center">
                   <p className="text-6xl font-black mb-4">50k+</p>
                   <p className="text-sm font-bold uppercase tracking-widest text-blue-400">Stories Shared</p>
                </div>
             </div>
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">Our Story</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Life Lessons started as a simple idea: what if we had a place to record the mistakes we made and the wins we achieved, so others wouldn't have to start from scratch?
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Since 2024, our community has grown into a vibrant ecosystem of mentors, writers, and learners from all walks of life. We believe that by documenting the human experience, we make the world a more resilient and understanding place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
