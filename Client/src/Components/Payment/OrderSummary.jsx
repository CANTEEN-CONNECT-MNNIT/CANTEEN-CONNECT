import React from 'react';
import { FaLock, FaPhoneAlt } from 'react-icons/fa';
import { toggleTheme } from '../../Redux/Slices/themeSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function OrderSummary({
  items,
  subtotal,
  discount,
  total,
  expanded,
  onToggleExpand,
}) {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <div
      className={`${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      } rounded-xl shadow-md p-6`}
    >
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg font-semibold'>Order Summary</h2>
        <button
          onClick={onToggleExpand}
          className={`${
            darkMode ? 'text-orange-400' : 'text-orange-600'
          } text-sm font-medium`}
        >
          {expanded ? 'Hide details' : 'Show details'}
        </button>
      </div>

      {expanded && (
        <div className='space-y-3 mb-4 border-t pt-4'>
          {items.map(
            (item, index) =>
              item?.quantity > 0 && (
                <div
                  key={index}
                  className={`${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  } flex justify-between text-sm`}
                >
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              )
          )}
        </div>
      )}

      <div className='space-y-2'>
        {subtotal && (
          <div
            className={`${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            } flex justify-between text-sm`}
          >
            <span>Subtotal</span>
            <span>₹{Number(subtotal).toFixed(2)}</span>
          </div>
        )}
        {discount && (
          <div
            className={`${
              darkMode ? 'text-green-400' : 'text-green-600'
            } flex justify-between text-sm`}
          >
            <span>Discount</span>
            <span>-₹{Number(discount).toFixed(2)}</span>
          </div>
        )}
        <div
          className={`${
            darkMode ? 'text-white' : 'text-gray-900'
          } flex justify-between font-semibold pt-2 border-t`}
        >
          <span>Total</span>
          <span>₹{Number(total).toFixed(2)}</span>
        </div>
      </div>

      <div
        className={`${
          darkMode ? 'bg-gray-700' : 'bg-orange-50'
        } mt-6 rounded-xl p-4`}
      >
        <div className='flex items-center space-x-3'>
          <FaLock
            className={`${
              darkMode ? 'text-orange-400' : 'text-orange-600'
            } h-5 w-5`}
          />
          <div className='text-sm'>
            <p
              className={`${
                darkMode ? 'text-orange-200' : 'text-orange-800'
              } font-medium`}
            >
              Secure Transaction
            </p>
            <p
              className={`${darkMode ? 'text-orange-100' : 'text-orange-600'}`}
            >
              Your payment is protected
            </p>
          </div>
        </div>
      </div>

      <div
        className={`${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        } mt-4 text-center`}
      >
        <div className='flex items-center justify-center space-x-2 text-sm'>
          <FaPhoneAlt className='h-4 w-4' />
          <span>Need help? Call us at 1800-123-4567</span>
        </div>
      </div>
    </div>
  );
}
