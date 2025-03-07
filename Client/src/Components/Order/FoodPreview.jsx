import { useEffect, useRef, useState } from 'react';
import { AiOutlineClose, AiOutlineClockCircle } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';


function FoodPreview({ onClose, order }) {
  if (!order) {
    onClose();
  }
  const modalRef = useRef(null);
  const { _id, createdAt, updatedAt, fooditems, status } = order;
  const canteen = order?.canteen?.name;

  
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
      <div ref={modalRef} className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
          <h3 className="text-lg font-semibold text-gray-900">Order Details</h3>
          <button
            onClick={onClose}
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
              <span className="text-sm font-medium text-gray-700">#{_id?.toString().slice(-8)} hello</span>
            </div>
            {fooditems && fooditems.length > 0 && <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 ">Items</span>
              <ol className="text-sm font-medium text-gray-700">
                {fooditems.map((item) => (
                  <li
                    key={item._id._id}
                  >{`${item._id.name} x ${item.quantity}`} = &#8377;{`${item.quantity * item.price}`}</li>
                ))}
              </ol>
            </div>}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Canteen</span>
              <span className="text-sm font-medium text-gray-700">{canteen}</span>
            </div>
            {createdAt && <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Date</span>
              <span className="text-sm font-medium text-gray-700">{new Date(createdAt).toDateString() !== new Date().toDateString()
                ? new Date(createdAt).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })
                : 'Today'}</span>
            </div>}
            {fooditems && fooditems.length > 0 && <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Amount</span>
              <span className="text-sm font-medium text-gray-700"> &#8377;{fooditems.reduce(
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
                    `Today, ${new Date(updatedAt).toLocaleTimeString('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}`
                  }
                </span>
              </div>
            )}
          </div>

          {/* <span className='px-3 py-1 rounded-full text-sm bg-white/20 backdrop-blur-md text-white'>
            {Array.from({ length: 5 }, (_, index) => (
              <FaStar
                key={index}
                className={`w-4 h-4 inline ${
                  index < rating ? 'fill-yellow-400' : 'fill-gray-400'
                }`}
              />
            ))}
          </span> */}

          {/* <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Order Timeline</h4>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-2 w-2 rounded-full bg-green-500"></div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Order Placed</p>
                  <p className="text-xs text-gray-500">March 14, 2024 10:00 AM</p>
                </div>
              </div>
              {order?.status !== 'Pending' && (
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-2 w-2 rounded-full bg-orange-500"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Preparing</p>
                    <p className="text-xs text-gray-500">March 14, 2024 10:05 AM</p>
                  </div>
                </div>
              )}
              {order?.status === 'Delivered' && (
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-2 w-2 rounded-full bg-green-500"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Delivered</p>
                    <p className="text-xs text-gray-500">March 14, 2024 10:15 AM</p>
                  </div>
                </div>
              )}
            </div>
          </div> */}
        </div>

        <div className="p-4 border-t sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="w-full bg-orange-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-orange-600"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodPreview;
