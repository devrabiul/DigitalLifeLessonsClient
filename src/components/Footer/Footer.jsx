import { Link } from "react-router";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaXTwitter,
  FaChevronRight,
  FaLocationDot,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "Public Lessons", path: "/lessons" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const legalLinks = [
    { label: "Terms & Conditions", path: "/terms" },
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Cookie Policy", path: "/cookies" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: <FaFacebookF className="w-5 h-5" />,
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: <FaXTwitter className="w-5 h-5" />,
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: <FaInstagram className="w-5 h-5" />,
    },
    {
      name: "YouTube",
      href: "https://youtube.com",
      icon: <FaYoutube className="w-5 h-5" />,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: <FaLinkedinIn className="w-5 h-5" />,
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">LL</span>
              </div>
              <span className="text-xl font-bold text-white">Life Lessons</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Learn from real stories, share lesson, and grow together. Your
              journey to a better life starts here.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <FaChevronRight className="w-3 h-3 mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <FaChevronRight className="w-3 h-3 mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaLocationDot className="w-5 h-5 mr-3 text-blue-500 mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">
                  123 Life Street, Dhaka 1205, Bangladesh
                </span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="w-5 h-5 mr-3 text-blue-500 shrink-0" />
                <a
                  href="mailto:support@lifelessons.com"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  support@lifelessons.com
                </a>
              </li>
              <li className="flex items-center">
                <FaPhone className="w-5 h-5 mr-3 text-blue-500 shrink-0" />
                <a
                  href="tel:+8801234567890"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  +880 1234-567890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              © {currentYear} Life Lessons. All rights reserved.
            </div>

            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
