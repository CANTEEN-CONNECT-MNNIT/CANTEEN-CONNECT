import React from 'react';
import { FaTimes, FaClock, FaUserAlt } from 'react-icons/fa';
import { useSelector} from 'react-redux';
import { dateFormat } from '../../utility/dateFormat.js';

function OrderDetailsModal({ order, onClose }) {
    console.log(order);
    
  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const createTime = order?.createdAt 
  ? (order.createdAt).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  : '-';

const createDate = dateFormat(order?.createdAt);

  const total = order?.fooditems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${darkMode ? 'bg-opacity-80' : 'bg-opacity-50'}`}>
      <div className={`rounded-lg w-full max-w-md mx-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <div className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
          <h3 className="text-lg font-semibold">Order Details</h3>
          <button 
            onClick={onClose} 
            className={`text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full p-1 ${darkMode ? 'hover:text-gray-200 hover:bg-gray-700' : ''}`}
            aria-label="Close Order Details"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>
        
        <div className={`p-4 space-y-4 ${darkMode ? 'bg-gray-700' : ''}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaClock className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{createTime}, {createDate}</span>
            </div>
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>orderId: {order?._id?.toString().slice(-8)}</span>
          </div>

          <div className="flex items-center space-x-3 py-3 border-b">
            <div className={`bg-blue-100 p-2 rounded-full ${darkMode ? 'bg-blue-600' : 'bg-blue-100'}`}>
              <FaUserAlt className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{order.user?.name}</h4>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{order.user?._id?.toString().slice(-8)}</p>
            </div>
          </div>

          <div>
          <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            Order Summary
          </h4>
          <div className={`rounded-lg p-3 space-y-2 ${darkMode ? 'text-slate-50 bg-gray-800' : 'bg-gray-50'}`}>
            {order.fooditems?.map((item, idx) => (
              <div key={item?._id+idx} className={`flex justify-between text-sm`}>
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                  {item?.quantity}× {item?._id?.name}
                </span>
                <span className={`text-gray-100 ${darkMode ? 'text-gray-100' : 'text-gray-600'}`}>
                  ₹{item.price}
                </span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className={`flex justify-between font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <span>Total Amount</span>
                <span className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  ₹{total}
                </span>
              </div>
            </div>
          </div>
        </div>



          {/* <div className={`bg-blue-50 rounded-lg p-3 ${darkMode ? 'bg-blue-600' : ''}`}>
            <h4 className={`text-sm font-medium ${darkMode ? 'text-blue-100' : 'text-blue-900'} mb-1`}>Counter Information</h4>
            <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-500'}`}>{order.counter}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsModal;
