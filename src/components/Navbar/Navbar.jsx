import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useLocation } from "react-router";
import {
  FaChevronDown,
  FaUser,
  FaTableColumns,
  FaRightFromBracket,
  FaStar,
} from "react-icons/fa6";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const { user, logoutUser, isPremium } = useAuth();

  const publicLinks = [
    { path: "/", label: "Home" },
    { path: "/lessons", label: "Public Lessons" },
  ];

  const protectedLinks = [
    { path: "/dashboard/add-lesson", label: "Add Lesson" },
    { path: "/dashboard/my-lessons", label: "My Lessons" },
    ...(!isPremium ? [{ path: "/pricing", label: "Pricing" }] : []),
  ];

  const handleLogout = async () => {
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
    await logoutUser();
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const [hasImageError, setHasImageError] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getUserInitials = () => {
    if (user?.displayName) {
      return user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.charAt(0).toUpperCase() || "U";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">LL</span>
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:block">
              Life Lessons
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {publicLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {user &&
              protectedLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

            {user && isPremium && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-600 text-[11px] font-black uppercase tracking-wider rounded-lg border border-amber-200 ml-2 shadow-sm">
                <FaStar className="text-[10px]" /> Premium ⭐
              </span>
            )}

            {user ? (
              <div className="relative ml-3" ref={dropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  {user.photoURL && !hasImageError ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-cover border-2 border-gray-200"
                      onError={() => setHasImageError(true)}
                    />
                  ) : (
                    <div className="w-9 h-9 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {getUserInitials()}
                      </span>
                    </div>
                  )}
                  <FaChevronDown
                    className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${
                      isUserDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      to="/dashboard/profile"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <span className="flex items-center">
                        <FaUser className="w-4 h-4 mr-2" />
                        Profile
                      </span>
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <span className="flex items-center">
                        <FaTableColumns className="w-4 h-4 mr-2" />
                        Dashboard
                      </span>
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <span className="flex items-center">
                        <FaRightFromBracket className="w-4 h-4 mr-2" />
                        Logout
                      </span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-2">
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    isActive("/login")
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 relative">
              <span
                className={`absolute h-0.5 w-6 bg-gray-600 transform transition duration-300 ${
                  isMobileMenuOpen ? "rotate-45 top-3" : "top-1"
                }`}
              ></span>
              <span
                className={`absolute h-0.5 w-6 bg-gray-600 transform transition duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : "top-3"
                }`}
              ></span>
              <span
                className={`absolute h-0.5 w-6 bg-gray-600 transform transition duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 top-3" : "top-5"
                }`}
              ></span>
            </div>
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-[500px] pb-4" : "max-h-0"
          }`}
        >
          <div className="pt-2 space-y-1">
            {publicLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {user &&
              protectedLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

            {user ? (
              <>
                <hr className="my-2 border-gray-200" />
                <div className="px-4 py-2">
                  <p className="text-sm font-medium text-gray-800">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <Link
                  to="/dashboard/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    isActive("/dashboard/profile")
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  Profile
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    location.pathname === "/dashboard"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors duration-200 text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <hr className="my-2 border-gray-200" />
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    isActive("/login")
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block mt-2 px-4 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
