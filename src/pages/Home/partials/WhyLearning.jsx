import React from "react";

const WhyLearning = () => {
  const benefits = [
    {
      icon: "🎯",
      title: "Real-World Wisdom",
      description:
        "Learn from authentic experiences, not just theory. Get practical insights that you can apply immediately in your life.",
      color: "blue",
    },
    {
      icon: "🤝",
      title: "Community Support",
      description:
        "Connect with people who understand your journey. Share, discuss, and grow together with like-minded individuals.",
      color: "purple",
    },
    {
      icon: "💪",
      title: "Personal Growth",
      description:
        "Accelerate your development by learning from others' successes and mistakes. Avoid common pitfalls on your path.",
      color: "emerald",
    },
    {
      icon: "🌟",
      title: "Inspire Others",
      description:
        "Your experiences matter. By sharing your story, you could be the light that guides someone through their darkness.",
      color: "rose",
    },
  ];
  return (
    <>
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Why Learning From Life Matters
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Real experiences offer insights that no textbook can provide.
              Here's why our community stands out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-transparent hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 ${
                    benefit.color === "blue"
                      ? "bg-blue-100 group-hover:bg-blue-500"
                      : benefit.color === "purple"
                        ? "bg-purple-100 group-hover:bg-purple-500"
                        : benefit.color === "emerald"
                          ? "bg-emerald-100 group-hover:bg-emerald-500"
                          : "bg-rose-100 group-hover:bg-rose-500"
                  } transition-colors duration-300`}
                >
                  <span className="group-hover:scale-110 transition-transform">
                    {benefit.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyLearning;
