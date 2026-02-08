import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const HeroSlides = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      title: "Learn from Real Life Experiences",
      subtitle: "Discover lesson from people who've walked the path before you",
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
        "Be part of a supportive community where lesson is shared, questions are answered, and everyone grows together.",
      cta: "Join Community",
      ctaLink: "/register",
      bgGradient: "from-emerald-600 via-teal-600 to-cyan-600",
      image: "🌱",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  return (
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
                    <FaArrowRight className="w-5 h-5" />
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

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all z-10"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all z-10"
        aria-label="Next slide"
      >
        <FaChevronRight className="w-6 h-6" />
      </button>

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
  );
};

export default HeroSlides;
