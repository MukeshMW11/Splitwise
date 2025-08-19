import Link from 'next/link';
import { Twitter, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link href="/">
              <h4 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 mb-4 tracking-tight">
                SplitEasy
              </h4>
            </Link>
            <p className="text-gray-300 leading-relaxed text-sm">
              Simplify group expenses with SplitEasy. Track, split, and settle bills effortlessly with friends, roommates, or family.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-100 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-green-500 transition-all duration-300 flex items-center text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-green-500 transition-all duration-300 flex items-center text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-green-500 transition-all duration-300 flex items-center text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-300 hover:text-green-500 transition-all duration-300 flex items-center text-sm"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-100 mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/help"
                  className="text-gray-300 hover:text-green-500 transition-all duration-300 flex items-center text-sm"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-300 hover:text-green-500 transition-all duration-300 flex items-center text-sm"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/feedback"
                  className="text-gray-300 hover:text-green-500 transition-all duration-300 flex items-center text-sm"
                >
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h4 className="text-lg font-semibold text-gray-100 mb-4">Connect With Us</h4>
            <div className="flex space-x-6">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-green-500 transition-all duration-300 transform hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-green-500 transition-all duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-green-500 transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-300 text-sm">
          &copy; {new Date().getFullYear()} SplitEasy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;