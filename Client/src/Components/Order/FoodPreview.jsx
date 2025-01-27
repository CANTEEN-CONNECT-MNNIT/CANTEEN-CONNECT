import { useState } from 'react';
import { AiOutlineClose, AiOutlineClockCircle } from 'react-icons/ai';
import { useSelector,useDispatch } from 'react-redux';
function FoodPreview({isOpen,onClose, order }) {

  
  if (!isOpen) return null;
  const darkMode = useSelector((state) => state.theme.isDarkMode);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
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
          {order?.waitingNumber && (
            <div className="mb-4 bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center">
                <AiOutlineClockCircle className="h-5 w-5 text-orange-500 mr-2" />
                <div>
                  <p className="text-sm font-medium text-orange-800">Waiting Position</p>
                  <p className="text-lg font-bold text-orange-900">#{order.waitingNumber} in queue</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Order ID</span>
              <span className="text-sm font-medium">{order?.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Item</span>
              <span className="text-sm font-medium">{order?.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Location</span>
              <span className="text-sm font-medium">{order?.location}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Date</span>
              <span className="text-sm font-medium">{order?.date}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Amount</span>
              <span className="text-sm font-medium">{order?.amount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Status</span>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                order?.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                order?.status === 'Pending' ? 'bg-red-100 text-red-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {order?.status}
              </span>
            </div>
          </div>
          
          <div className="mt-6">
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
          </div>
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
