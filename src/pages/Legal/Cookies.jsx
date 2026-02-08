import React from "react";
import { FaCookieBite, FaClock } from "react-icons/fa";

const Cookies = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-amber-500 p-12 text-center text-white relative">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <FaCookieBite className="text-8xl rotate-12" />
             </div>
             <h1 className="text-4xl font-black mb-4">Cookie Policy</h1>
             <div className="flex items-center justify-center gap-2 text-white/60 text-sm font-bold uppercase tracking-widest">
                <FaClock /> Last Updated: February 8, 2026
             </div>
          </div>
          
          <div className="p-12 space-y-10 prose prose-blue max-w-none">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What are Cookies?</h2>
              <p className="text-gray-600 leading-relaxed">
                Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Cookies</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li><strong>Essential:</strong> Used to authenticate users and prevent fraudulent use of user accounts.</li>
                <li><strong>Functional:</strong> Used to remember your preferences and settings.</li>
                <li><strong>Analytics:</strong> Used to track information how the platform is used so that we can make improvements.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Managing Your Cookies</h2>
              <p className="text-gray-600 leading-relaxed">
                Most web browsers allow you to control cookies through their settings. If you delete cookies or refuse to accept them, you might not be able to use all the features of the Service.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
