import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
const Popup = ({ isOpen,onClose, orderDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold">Order Details</h2>
        <p className="mt-2">{orderDetails}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
