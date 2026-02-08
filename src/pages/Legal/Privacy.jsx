import React from "react";
import { FaShieldAlt, FaClock } from "react-icons/fa";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-blue-600 p-12 text-center text-white relative">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <FaShieldAlt className="text-8xl rotate-default" />
             </div>
             <h1 className="text-4xl font-black mb-4">Privacy Policy</h1>
             <div className="flex items-center justify-center gap-2 text-white/60 text-sm font-bold uppercase tracking-widest">
                <FaClock /> Last Updated: February 8, 2026
             </div>
          </div>
          
          <div className="p-12 space-y-10 prose prose-blue max-w-none">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information Collection</h2>
              <p className="text-gray-600 leading-relaxed">
                We collect information you provide directly to us (name, email, profile photo) and information about your usage of the platform to improve your experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Data</h2>
              <p className="text-gray-600 leading-relaxed">
                Your data is used to personalize your dashboard, track your lessons, and process premium subscriptions. We do not sell your personal data to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cookies & Tracking</h2>
              <p className="text-gray-600 leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-600 leading-relaxed">
                We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.
              </p>
            </section>

            <section className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
              <h2 className="text-xl font-bold text-blue-900 mb-2">Data Rights</h2>
              <p className="text-blue-800 text-sm">
                You have the right to request access to or deletion of your personal data at any time. Email us at privacy@lifelessons.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
