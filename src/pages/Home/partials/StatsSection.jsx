import React from "react";

const StatsSection = () => {
  return (
    <>
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                10K+
              </div>
              <div className="text-sm text-gray-500 font-medium">
                Life Lessons
              </div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                50K+
              </div>
              <div className="text-sm text-gray-500 font-medium">
                Active Users
              </div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                5K+
              </div>
              <div className="text-sm text-gray-500 font-medium">
                Contributors
              </div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-gray-900 mb-1 group-hover:text-rose-600 transition-colors">
                100K+
              </div>
              <div className="text-sm text-gray-500 font-medium">
                Lives Impacted
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StatsSection;
