import React from "react";
import { FaGavel, FaClock } from "react-icons/fa";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-900 p-12 text-center text-white relative">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <FaGavel className="text-8xl -rotate-12" />
             </div>
             <h1 className="text-4xl font-black mb-4">Terms & Conditions</h1>
             <div className="flex items-center justify-center gap-2 text-gray-400 text-sm font-bold uppercase tracking-widest">
                <FaClock /> Last Updated: February 8, 2026
             </div>
          </div>
          
          <div className="p-12 space-y-10 prose prose-blue max-w-none">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using Life Lessons (the "Service"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. User Content</h2>
              <p className="text-gray-600 leading-relaxed">
                You retain ownership of the content (lessons, stories, comments) you post. However, by posting, you grant Life Lessons a worldwide, non-exclusive, royalty-free license to use, copy, and display that content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Prohibited Conduct</h2>
              <p className="text-gray-600 leading-relaxed">
                You agree not to post content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable. We reserve the right to remove any content at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Premium Subscriptions</h2>
              <p className="text-gray-600 leading-relaxed">
                Premium accounts provide access to specialized content. Payments are handled via Stripe, and you agree to their terms of service regarding financial transactions.
              </p>
            </section>

            <section className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
              <h2 className="text-xl font-bold text-blue-900 mb-2">Contact Us</h2>
              <p className="text-blue-800 text-sm">
                If you have any questions about these Terms, please contact us at support@lifelessons.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
