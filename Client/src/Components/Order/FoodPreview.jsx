import { useEffect, useRef, useState } from 'react';
import { AiOutlineClose, AiOutlineClockCircle } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import FoodReview from './FoodReview';
import { dateFormat } from '../../utility/dateFormat.js';
import { timeFormat } from '../../utility/timeFormat.js';


function FoodPreview({ onClose, order }) {
  if (!order) return;
  console.log(order);

  const modalRef = useRef(null);
  const { _id, createdAt, updatedAt, fooditems, status } = order;
  const canteen = order?.canteen;

  function handleClickOutside(event) {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  }

  useEffect(() => {

    if (order) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [order]);


  const darkMode = useSelector((state) => state.theme.isDarkMode);
  return (
    <div className="fixed inset-0 bg-black/50 min-h-screen  z-50 flex items-center justify-center p-4 m-0">
      <div ref={modalRef} className={`rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-200 text-gray-900'
        }`}>
        <div className="flex justify-between items-center p-4 border-b sticky top-0 py-4">
          <h3 className="text-lg font-semibold">Order Details</h3>
          <button
            onClick={() => onClose(null)}
            className="text-gray-400 hover:text-gray-500"
          >
            <AiOutlineClose className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4">
          {/* {order?.waitingNumber && (
            <div className="mb-4 bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center">
                <AiOutlineClockCircle className="h-5 w-5 text-orange-500 mr-2" />
                <div>
                  <p className="text-sm font-medium text-orange-800">Waiting Position</p>
                  <p className="text-lg font-bold text-orange-900">#{order.waitingNumber} in queue</p>
                </div>
              </div>
            </div>
          )} */}

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Order ID</span>
              <span className="text-sm font-medium text-gray-500">#{_id?.toString().slice(-8)} hello</span>
            </div>
            {fooditems && fooditems.length > 0 && <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 ">Items</span>
              <ol className="text-sm font-medium text-gray-500">
                {fooditems.map((item) => (
                  <li
                    key={item._id._id}
                  >{`${item._id.name} x ${item.quantity}`} = &#8377;{`${item.quantity * item.price}`}</li>
                ))}
              </ol>
            </div>}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Canteen</span>
              <span className="text-sm font-medium text-gray-500">{canteen?.name}</span>
            </div>
            {createdAt && <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Date</span>
              <span className="text-sm font-medium text-gray-500">{dateFormat(createdAt)}</span>
            </div>}
            {fooditems && fooditems.length > 0 && <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Amount</span>
              <span className="text-sm font-medium text-gray-500"> &#8377;{fooditems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}</span>
            </div>}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Status</span>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${status === 'Delivered' ? 'bg-green-100 text-green-800' :
                status === 'Pending' ? 'bg-red-100 text-red-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                {status}
              </span>
            </div>
            {updatedAt && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Last update</span>
                <span className="text-sm font-medium text-green-500">
                  {new Date(updatedAt).toDateString() !== new Date().toDateString()
                    ? new Date(updatedAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })
                    :
                    `Today, ${timeFormat(updatedAt)}`
                  }
                </span>
              </div>
            )}
          </div>
        </div>
        {/* when got delivered then show review */}
        {(status === 'Delivered' || status ===
          'Success') && <div className="p-4 border-t ">
            <FoodReview foods={fooditems} canteen={canteen} />
          </div>
        }
      </div>
    </div>
  );
}

export default FoodPreview;
