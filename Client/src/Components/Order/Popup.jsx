import React from 'react';
import { useSelector } from 'react-redux';

const Popup = ({ isOpen, onClose, orderDetails }) => {
  if (!isOpen) return null;
  const darkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className={`p-6 rounded-lg shadow-lg max-w-md w-full ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Order Details</h2>
        <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-black'}`}>{orderDetails}</p>
        <button
          onClick={onClose}
          className={`mt-4 ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white px-4 py-2 rounded`}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
