import React from 'react';
import { FaWallet, FaClock, FaUtensils, FaTimes } from 'react-icons/fa';

const Profile = ({ setprofileOpen }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl animate-slideIn">
        {/* Close Button */}
        <button 
          onClick={() => setprofileOpen(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-orange-500 transition-colors"
        >
          <FaTimes size={20} />
        </button>

        {/* Profile Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mb-3">
            <FaUtensils className="w-10 h-10 text-orange-500" />
          </div>
          <div className="text-center text-xl">
            <h2 className="text-xl font-semibold text-gray-800">Jeevan</h2>
            <p className="text-sm text-gray-500 mb-1">Student ID: CS-12345</p>
            <p className="text-sm text-gray-500">Email: johndoe@example.com</p>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-orange-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaWallet className="w-5 h-5 text-orange-500 mr-2" />
              <span className="text-orange-700 font-medium">Balance</span>
            </div>
            <span className="text-xl font-bold text-orange-600">₹500.00</span>
          </div>
        </div>

        {/* User Details */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Department</span>
            <span className="text-gray-800 font-medium">Computer Science</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Role</span>
            <span className="text-gray-800 font-medium">Student</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Meal Plan</span>
            <span className="text-gray-800 font-medium">Standard Plan</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Dietary Preferences</span>
            <span className="text-gray-800 font-medium">Vegetarian</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <FaClock className="w-5 h-5 text-orange-500 mx-auto mb-1" />
            <div className="text-lg font-semibold text-gray-800">2</div>
            <div className="text-xs text-gray-600">Active Orders</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <FaUtensils className="w-5 h-5 text-orange-500 mx-auto mb-1" />
            <div className="text-lg font-semibold text-gray-800">15</div>
            <div className="text-xs text-gray-600">Orders This Month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
