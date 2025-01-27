import React from 'react';
import { FaWallet, FaClock, FaUtensils, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileOpen } from '../../Redux/Slices/pageSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const profileOpen = useSelector((state) => state.page.profileOpen);
  const darkMode = useSelector((state) => state.theme.isDarkMode); 

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 animate-fadeIn`}>
      <div className={`relative w-full max-w-md p-6 rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} animate-slideIn`}>
        {/* Close Button */}
        <button 
          onClick={() => dispatch(setProfileOpen(false))}
          className="absolute right-4 top-4 text-gray-400 hover:text-orange-500 transition-colors"
        >
          <FaTimes size={20} />
        </button>

        {/* Profile Header */}
        <div className="flex flex-col items-center mb-6">
          <div className={`w-20 h-20 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-orange-100'} flex items-center justify-center mb-3`}>
            <FaUtensils className="w-10 h-10 text-orange-500" />
          </div>
          <div className="text-center text-xl">
            <h2 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Jeevan</h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Student ID: CS-12345</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email: johndoe@example.com</p>
          </div>
        </div>

        {/* Balance Card */}
        <div className={`rounded-lg p-4 mb-6 ${darkMode ? 'bg-gray-700' : 'bg-orange-50'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaWallet className="w-5 h-5 text-orange-500 mr-2" />
              <span className={`font-medium ${darkMode ? 'text-orange-300' : 'text-orange-700'}`}>Balance</span>
            </div>
            <span className={`text-xl font-bold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>₹500.00</span>
          </div>
        </div>

        {/* User Details */}
        <div className="space-y-3 mb-6">
          {['Department', 'Role', 'Meal Plan', 'Dietary Preferences'].map((label, index) => (
            <div key={index} className={`flex justify-between items-center py-2 border-b ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
              <span className={`text-gray-600 ${darkMode ? 'text-gray-400' : ''}`}>{label}</span>
              <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                {label === 'Department' ? 'Computer Science' : label === 'Role' ? 'Student' : label === 'Meal Plan' ? 'Standard Plan' : 'Vegetarian'}
              </span>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className={`bg-gray-50 p-3 rounded-lg text-center ${darkMode ? 'bg-gray-700' : ''}`}>
            <FaClock className="w-5 h-5 text-orange-500 mx-auto mb-1" />
            <div className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>2</div>
            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active Orders</div>
          </div>
          <div className={`bg-gray-50 p-3 rounded-lg text-center ${darkMode ? 'bg-gray-700' : ''}`}>
            <FaUtensils className="w-5 h-5 text-orange-500 mx-auto mb-1" />
            <div className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>15</div>
            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Orders This Month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
