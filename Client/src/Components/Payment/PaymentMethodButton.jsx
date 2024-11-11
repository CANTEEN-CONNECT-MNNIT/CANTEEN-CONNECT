import React from 'react';

export default function PaymentMethodButton({ selected, onClick, icon: Icon, label, darkMode }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 ${
        selected
          ? darkMode
            ? 'border-blue-500 bg-gray-800'
            : 'border-orange-300 bg-orange-50 text-gray-900'
          : darkMode
          ? 'border-gray-600 hover:border-blue-200 bg-gray-900 text-gray-200'
          : 'border-gray-200 hover:border-orange-200 bg-white text-gray-900'
      }`}
    >
      <Icon className={`w-6 h-6 mb-2 ${darkMode ? 'text-blue-300' : 'text-orange-500'}`} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
