import React from 'react';
import { Link } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Platform: [
      { label: 'Browse Lessons', path: '/lessons' },
      { label: 'Featured Stories', path: '/lessons?filter=featured' },
      { label: 'Categories', path: '/lessons#categories' },
      { label: 'Search', path: '/lessons?search=' },
    ],
    Community: [
      { label: 'Share Your Story', path: '/dashboard/add-lesson' },
      { label: 'Guidelines', path: '/guidelines' },
      { label: 'Community Forum', path: '/community' },
      { label: 'Success Stories', path: '/success-stories' },
    ],
    Company: [
      { label: 'About Us', path: '/about' },
      { label: 'Contact', path: '/contact' },
      { label: 'Careers', path: '/careers' },
      { label: 'Press', path: '/press' },
    ],
    Legal: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Cookie Policy', path: '/cookies' },
      { label: 'Code of Conduct', path: '/conduct' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">LL</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Life Lessons</h3>
                <p className="text-gray-400 mt-1">Wisdom from real experiences</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              A platform where people share life lessons, learn from others' experiences, 
              and grow together through authentic stories.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'facebook', 'linkedin', 'instagram'].map((social) => (
                <a
                  key={social}
                  href={`https://${social}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors duration-200"
                  aria-label={`Follow on ${social}`}
                >
                  <span className="text-lg">
                    {social === 'twitter' && '𝕏'}
                    {social === 'facebook' && 'f'}
                    {social === 'linkedin' && 'in'}
                    {social === 'instagram' && '📷'}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold text-lg mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-bold text-lg mb-2">Stay Updated</h4>
              <p className="text-gray-400">Get weekly inspiration and new lessons</p>
            </div>
            <form className="flex w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full md:w-64"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 font-semibold rounded-r-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-400 text-sm">
            © {currentYear} Life Lessons Platform. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <Link to="/sitemap" className="text-gray-400 hover:text-white transition-colors duration-200">
              Sitemap
            </Link>
            <Link to="/help" className="text-gray-400 hover:text-white transition-colors duration-200">
              Help Center
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;