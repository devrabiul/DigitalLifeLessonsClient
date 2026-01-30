import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import api from "../services/api";
import "./css/Home.css";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredLessons, setFeaturedLessons] = useState([]);
  const [topContributors, setTopContributors] = useState([]);
  const [mostSavedLessons, setMostSavedLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hero Slider Data
  const heroSlides = [
    {
      id: 1,
      title: "Learn from Real Life Experiences",
      subtitle: "Discover wisdom from people who've walked the path before you",
      description:
        "Join thousands of learners gaining insights from authentic life stories and experiences shared by our community.",
      cta: "Start Learning",
      ctaLink: "/lessons",
      bgGradient: "from-blue-600 via-blue-700 to-purple-700",
      image: "💡",
    },
    {
      id: 2,
      title: "Share Your Journey",
      subtitle: "Your story could change someone's life",
      description:
        "Every experience matters. Share your lessons learned and inspire others to overcome challenges and achieve their goals.",
      cta: "Share Your Story",
      ctaLink: "/register",
      bgGradient: "from-purple-600 via-pink-600 to-rose-600",
      image: "✨",
    },
    {
      id: 3,
      title: "Grow Together as a Community",
      subtitle: "Connect with like-minded individuals",
      description:
        "Be part of a supportive community where wisdom is shared, questions are answered, and everyone grows together.",
      cta: "Join Community",
      ctaLink: "/register",
      bgGradient: "from-emerald-600 via-teal-600 to-cyan-600",
      image: "🌱",
    },
  ];

  // Fetch dynamic data
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [featuredRes, contributorsRes, mostSavedRes] = await Promise.all([
          api.get('/lessons/featured'),
          api.get('/lessons/top-contributors'),
          api.get('/lessons/most-saved')
        ]);
        
        setFeaturedLessons(featuredRes.data.lessons || []);
        setTopContributors(contributorsRes.data.contributors || []);
        setMostSavedLessons(mostSavedRes.data.lessons || []);
      } catch (error) {
        console.error('Failed to fetch home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Why Learning From Life Matters - 4 Benefit Cards (Static)
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

  // Helper function to get initials from name
  const getInitials = (name) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Helper to get badge for rank
  const getRankBadge = (rank) => {
    if (rank === 1) return '🏆';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner / Slider */}
      <section className="relative h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : index < currentSlide
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            }`}
          >
            <div
              className={`h-full bg-gradient-to-r ${slide.bgGradient} flex items-center`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="text-white">
                    <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
                      {slide.subtitle}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                      {slide.description}
                    </p>
                    <Link
                      to={slide.ctaLink}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      {slide.cta}
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                  <div className="hidden lg:flex justify-center">
                    <div className="text-[180px] animate-bounce-slow">
                      {slide.image}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all z-10"
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all z-10"
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Slider Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide
                  ? "w-10 h-3 bg-white rounded-full"
                  : "w-3 h-3 bg-white/50 rounded-full hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
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

      {/* Featured Life Lessons (Dynamic) */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                Discover Wisdom
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                Featured Life Lessons
              </h2>
              <p className="text-gray-600 mt-2 max-w-2xl">
                Handpicked stories of growth, resilience, and transformation
                from our community
              </p>
            </div>
            <Link
              to="/lessons"
              className="mt-4 md:mt-0 text-blue-600 font-medium inline-flex items-center gap-1 group hover:text-blue-700"
            >
              View all lessons
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
                </div>
              ))}
            </div>
          ) : featuredLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredLessons.map((lesson) => (
                <Link
                  key={lesson._id}
                  to={`/lessons/${lesson._id}`}
                  className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                      {lesson.category}
                    </span>
                    {lesson.access_level === 'premium' && (
                      <span className="px-2 py-0.5 bg-violet-100 text-violet-600 text-xs font-medium rounded-full">
                        Premium
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {lesson.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {lesson.shortDescription || lesson.story?.slice(0, 100) + '...'}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {lesson.author?.photoURL ? (
                          <img src={lesson.author.photoURL} alt="" className="w-full h-full rounded-full object-cover" />
                        ) : (
                          getInitials(lesson.author?.name || lesson.authorName)
                        )}
                      </div>
                      <span className="text-sm text-gray-700">{lesson.author?.name || lesson.authorName}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                        </svg>
                        {lesson.likesCount || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        {lesson.favoritesCount || 0}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <p className="text-gray-500">No featured lessons yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Learning From Life Matters (4 Benefit Cards - Static) */}
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

      {/* Two Additional Sections */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Top Contributors of the Week (Dynamic) */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 text-white">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold">Top Contributors</h3>
                  <p className="text-white/80 text-sm mt-1">This Week</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/10 rounded-xl p-4 animate-pulse">
                      <div className="w-8 h-8 bg-white/20 rounded"></div>
                      <div className="w-12 h-12 bg-white/20 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-white/20 rounded w-24 mb-2"></div>
                        <div className="h-3 bg-white/20 rounded w-32"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : topContributors.length > 0 ? (
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div
                      key={contributor._id || index}
                      className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors"
                    >
                      <div className="flex items-center justify-center w-8 text-lg font-bold">
                        {getRankBadge(index + 1)}
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center font-semibold overflow-hidden">
                        {contributor.photoURL ? (
                          <img src={contributor.photoURL} alt="" className="w-full h-full object-cover" />
                        ) : (
                          getInitials(contributor.name)
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{contributor.name}</h4>
                        <p className="text-white/70 text-sm">
                          {contributor.lessonsCount} lessons •{" "}
                          {contributor.totalLikes} likes
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-white/70">
                  <p>No contributors data yet.</p>
                </div>
              )}

              <Link
                to="/lessons"
                className="mt-6 inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium"
              >
                View all contributors
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            {/* Most Saved Lessons (Dynamic) */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Most Saved Lessons
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Community favorites
                  </p>
                </div>
                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🔖</span>
                </div>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-4 animate-pulse">
                      <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                      </div>
                      <div className="w-12 h-6 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : mostSavedLessons.length > 0 ? (
                <div className="space-y-4">
                  {mostSavedLessons.map((lesson, index) => (
                    <Link
                      key={lesson._id}
                      to={`/lessons/${lesson._id}`}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 font-semibold text-sm group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                          {lesson.title}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          by {lesson.author?.name || lesson.authorName} • {lesson.category}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-rose-500 font-medium">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                        </svg>
                        {lesson.favoritesCount || 0}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No saved lessons data yet.</p>
                </div>
              )}

              <Link
                to="/lessons?sort=saves"
                className="mt-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View all saved lessons
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your Story Could Change
            <span className="block mt-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Someone's Life
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join our community of learners and contributors. Share your wisdom,
            gain insights, and grow together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </Link>
            <Link
              to="/lessons"
              className="px-10 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
            >
              Browse Lessons
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
