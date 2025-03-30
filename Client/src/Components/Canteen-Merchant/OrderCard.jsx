import React from 'react';
import { FaClock, FaUserAlt, FaInfoCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { dateFormat } from '../../utility/dateFormat.js';
import { timeFormat } from '../../utility/timeFormat.js';

function OrderCard({ order, onUpdateStatus, onViewDetails }) {
  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const createTime = timeFormat(order.createdAt );

  const createDate = dateFormat(order?.createdAt);

  const getStatusStyle = (status) => {
    const styles = {
      Pending: 'bg-orange-100 text-orange-800',
      Preparing: 'bg-yellow-100 text-yellow-800',
      'Ready for pickup': 'bg-green-100 text-green-800',
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <ul
      className={`grid grid-cols-5 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <li
        className={`px-6 py-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
      >
        <div className='flex flex-col'>
          <span className='text-sm font-medium'>
            orderId: #{order._id?.toString().slice(-8)}
          </span>
          <div className='flex items-center text-sm mt-1'>
            <FaClock
              className={`h-4 w-4 mr-1 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            />
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
              {createTime}, {createDate}
            </span>
          </div>
        </div>
      </li>
      <li
        className={`px-6 py-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
      >
        <div className='flex items-center'>
          <div
            className={`h-8 w-8 ${
              darkMode ? 'bg-blue-900' : 'bg-blue-100'
            } rounded-full p-1.5 text-blue-600 mr-3 sm:flex justify-center items-center hidden`}
          >
            <FaUserAlt className='h-6 w-6' />
          </div>
          <div>
            <div
              className={`text-sm font-medium ${
                darkMode ? ' text-gray-100' : 'text-gray-900'
              }`}
            >
              {order.user?.name}
            </div>
            <div
              className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              } `}
            >
              #{order.user?._id?.toString().slice(-8)}
            </div>
          </div>
        </div>
      </li>
      <li
        className={`px-4 py-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
      >
        <div className='flex items-center justify-between'>
          <div>
            {/* <div className={`text-xs font-medium ${darkMode ? 'bg-slate-700 text-blue-100' : 'text-blue-600'} bg-blue-50 inline-block px-2 py-1 rounded mb-2`}>
              {order.counter}
            </div> */}

            {/* Display all item details */}
            <div className='mt-2'>
              <h5
                className={`text-sm font-medium ${
                  darkMode ? 'text-gray-100' : 'text-gray-900'
                }`}
              >
                Items:
              </h5>
              <ul
                className={`text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {order?.fooditems?.map((item, idx) => (
                  <li
                    key={item?._id + idx}
                    className='flex justify-between gap-3'
                  >
                    <span>
                      {item?.quantity} × {item?._id?.name}
                    </span>
                    <span> ₹{item?.price * item?.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button
            onClick={onViewDetails}
            className={`p-1.5 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full ${
              darkMode ? 'hover:text-gray-100 hover:bg-gray-700' : ''
            }`}
          >
            <FaInfoCircle className='h-5 w-5' />
          </button>
        </div>
      </li>
      <li
        className={`px-6 py-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
      >
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(
            order?.status
          )} ${darkMode ? 'bg-opacity-100' : ''}`}
        >
          {order?.status}
        </span>
      </li>
      <li
        className={`px-6 py-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
      >
        {order.status === 'Pending' && (
          <button
            onClick={() => onUpdateStatus('Preparing')}
            className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 ${
              darkMode ? 'bg-orange-600 hover:bg-orange-700' : ''
            }`}
          >
            Start Preparing
          </button>
        )}
        {order.status === 'Preparing' && (
          <button
            onClick={() => onUpdateStatus('Ready for pickup')}
            className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-700 ${
              darkMode ? 'bg-green-600 hover:bg-green-700' : ''
            }`}
          >
            Mark Ready
          </button>
        )}
        {order.status === 'Ready for pickup' && (
          <button
            onClick={() => onUpdateStatus('Delivered')}
            className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-gray-500 rounded-lg hover:bg-gray-700 ${
              darkMode ? 'bg-gray-600 hover:bg-gray-700' : ''
            }`}
          >
            Delivered ?
          </button>
        )}
      </li>
    </ul>
  );
}

export default OrderCard;
