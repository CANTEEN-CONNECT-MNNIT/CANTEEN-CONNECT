import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Canteen Connect Description */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Canteen Connect</h3>
            <p className="text-sm">Fresh meals, pre-order & skip the lines!</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/menu" className="hover:text-orange-500 transition-colors">Menu</a></li>
              <li><a href="/orders" className="hover:text-orange-500 transition-colors">Orders</a></li>
              <li><a href="/contact" className="hover:text-orange-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <FaMapMarkerAlt className="w-4 h-4" />
                <span>MNNIT College Campus</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhoneAlt className="w-4 h-4" />
                <span>+91 1234567890</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope className="w-4 h-4" />
                <span>canteenconnect@email.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a  className="hover:text-orange-500 transition-colors">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a  className="hover:text-orange-500 transition-colors">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a  className="hover:text-orange-500 transition-colors">
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Canteen Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
