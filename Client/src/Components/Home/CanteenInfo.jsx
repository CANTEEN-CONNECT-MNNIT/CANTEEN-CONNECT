import React from 'react';
import { FaClock, FaCoffee, FaMapPin, FaPhone } from 'react-icons/fa';

const timings = [
  { day: 'Monday - Friday', hours: '9:30 AM - 1:30 PM' },
  { day: 'Saturday', hours: '9:00 AM - 2:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
];

const locations = [
  {
    name: 'Ojha Canteen',
    timings: '9:30 AM - 2:00 AM',
    specialties: ['South Indian', 'North Indian', 'Chaat Corner'],
  },
  {
    name: 'Tirath Canteen',
    timings: '9:30 AM - 2:00 AM',
    specialties: ['Fast Food', 'Beverages', 'Snacks'],
  },
];

export default function CanteenInfo() {
  return (
    <div className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
      <div className="grid md:grid-cols-2 gap-6 p-6">
        {/* Timings Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-orange-500 dark:text-orange-400">
            <FaClock className="h-5 w-5" />
            <h3 className="text-2xl font-semibold">Canteen Timings</h3>
          </div>
          <div className="space-y-2">
            {timings.map((timing, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-orange-300 dark:border-orange-500 last:border-0"
              >
                <span className="font-medium text-gray-700 dark:text-gray-200">{timing.day}</span>
                <span className="text-gray-600 dark:text-gray-400">{timing.hours}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Locations Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-orange-500 dark:text-orange-400">
            <FaMapPin className="h-5 w-5" />
            <h3 className="text-2xl font-semibold">Locations</h3>
          </div>
          <div className="space-y-4">
            {locations.map((location, index) => (
              <div
                key={index}
                className="p-4 bg-orange-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
              >
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  {location.name}
                </h4>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <FaClock className="h-4 w-4 mr-2" />
                  {location.timings}
                </div>
                <div className="flex flex-wrap gap-2">
                  {location.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-medium bg-orange-200 dark:bg-orange-900 text-orange-800 dark:text-orange-300 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-orange-100 dark:bg-gray-700 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <FaPhone className="h-5 w-5 text-orange-500 dark:text-orange-400" />
            <span className="text-gray-700 dark:text-gray-300">Contact: +91 98765 43210</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaCoffee className="h-5 w-5 text-orange-500 dark:text-orange-400" />
            <span className="text-gray-700 dark:text-gray-300">Special Tiffin Service Available!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
