import React from "react";
import { Link } from "react-router";
import "./css/Home.css";

const Home = () => {
  const featuredLessons = [
    {
      id: 1,
      title: "The Power of Starting Small",
      excerpt: "How tiny habits lead to massive transformations...",
      author: "Jane Smith",
      likes: 124,
      category: "Personal Growth",
    },
    {
      id: 2,
      title: "Career Pivot: My Journey",
      excerpt: "From corporate to entrepreneurship at 35...",
      author: "John Doe",
      likes: 89,
      category: "Career",
    },
    {
      id: 3,
      title: "Lessons from Failure",
      excerpt: "What my biggest failure taught me about success...",
      author: "Alex Johnson",
      likes: 203,
      category: "Mindset",
    },
  ];

  const categories = [
    { name: "Personal Growth", icon: "🌱" },
    { name: "Career", icon: "💼" },
    { name: "Relationships", icon: "💝" },
    { name: "Mindset", icon: "🧠" },
    { name: "Mistakes Learned", icon: "📖" },
    { name: "Health & Wellness", icon: "🏃‍♂️" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="py-12 md:py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="max-w-lg">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Life Lessons That Transform
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Share, discover, and learn from real-life experiences. Wisdom from
              people who've been there.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/lessons"
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 text-center"
              >
                Explore Lessons
              </Link>
              <Link
                to="/register"
                className="px-8 py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition duration-300 text-center"
              >
                Share Your Story
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden group hover:shadow-2xl transition-all duration-700">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 animate-gradient-xy"></div>

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>

              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-cyan-400/40 to-blue-500/40 rounded-full blur-xl animate-pulse"></div>
              <div
                className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative group/center">
                  <div className="absolute inset-0 w-48 h-48 border-4 border-white/20 rounded-full animate-ping"></div>

                  <div className="w-32 h-32 bg-gradient-to-br from-white/20 to-white/10 rounded-full backdrop-blur-lg border border-white/30 flex items-center justify-center shadow-2xl group-hover/center:scale-110 transition-all duration-500">
                    <span className="text-5xl">✨</span>
                  </div>

                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
                  </div>
                  <div className="absolute -right-6 top-1/2 transform -translate-y-1/2">
                    <div
                      className="w-4 h-4 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <div
                      className="w-4 h-4 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "1s" }}
                    ></div>
                  </div>
                  <div className="absolute -left-6 top-1/2 transform -translate-y-1/2">
                    <div
                      className="w-4 h-4 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "1.5s" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-white text-center font-semibold text-sm md:text-base">
                    Discover Wisdom • Share Stories • Transform Lives
                  </p>
                </div>
              </div>

              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/50 rounded-tl-xl"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/50 rounded-tr-xl"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/50 rounded-bl-xl"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/50 rounded-br-xl"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                1,234+
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">
                Life Lessons
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                567+
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">
                Active Contributors
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                89K+
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">
                Lessons Learned
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                4.8
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">
                Avg. Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-0">
            Featured Lessons
          </h2>
          <Link
            to="/lessons"
            className="text-blue-600 font-semibold hover:text-blue-700 transition duration-300"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
            >
              <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                {lesson.category}
              </span>

              <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                {lesson.title}
              </h3>

              <p className="text-gray-600 mb-4 line-clamp-3">
                {lesson.excerpt}
              </p>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100 mb-4">
                <span className="font-semibold text-gray-700">
                  {lesson.author}
                </span>
                <span className="text-red-500 font-semibold">
                  ❤️ {lesson.likes}
                </span>
              </div>

              <Link
                to={`/lessons/${lesson.id}`}
                className="text-blue-600 font-semibold hover:text-blue-700 transition duration-300"
              >
                Read Full Story →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
          Browse by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/lessons?category=${category.name}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center group hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-50 transition duration-300">
                <span className="text-3xl">{category.icon}</span>
              </div>
              <h3 className="font-semibold text-gray-800">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Share Your Story?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Your experiences could help others navigate similar challenges. Join
            our community of learners and sharers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition duration-300 text-lg"
            >
              Start Sharing
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition duration-300 text-lg"
            >
              Already a Member? Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
