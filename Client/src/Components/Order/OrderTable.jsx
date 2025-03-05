import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { FaEye, FaClock } from 'react-icons/fa';
import FoodPreview from './FoodPreview';
import { useAllOrders } from '../../Data/OrderData';
import { useSelector } from 'react-redux';

function OrderTable({ filter, canteen }) {
  const { data: orders } = useAllOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const darkMode = useSelector((state) => state.theme.isDarkMode);

  const getStatusColor = (status) => {
    return (
      {
        Delivered: 'bg-green-100 text-green-800',
        Pending: 'bg-red-100 text-red-800',
        'In Progress': 'bg-orange-100 text-orange-800',
      }[status] || 'bg-gray-100 text-gray-800'
    );
  };

  const handlePreview = (order) => {
    setSelectedOrder(order);
    setIsPreviewOpen(true);
  };

  console.log(orders);

  const filteredOrders =
    orders?.filter((order) => {
      const statusMatch =
        filter === 'All Orders' ||
        (filter === 'Pending' && order.status === 'Pending') ||
        (filter === 'In Progress' && order.status === 'In Progress') ||
        (filter === 'Delivered' && order.status === 'Delivered');
      const canteenMatch =
        canteen === 'All Canteens' || order.location === canteen;
      return statusMatch && canteenMatch;
    }) || [];

  const noDataAvailable = filteredOrders.length === 0;

  return (
    <>
      <div
        className={`hidden md:block rounded-lg shadow overflow-hidden ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <tr>
              {[
                'Order ID',
                'Order Name',
                'Location',
                'Date',
                'Amount',
                'Status',
                'Waiting #',
                'Actions',
              ].map((header) => (
                <th
                  key={header}
                  className={`px-6 py-3 text-left text-xs font-medium ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  } uppercase`}
                >
                  <span className='flex items-center space-x-1'>
                    {header} <HiChevronDown size={12} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            className={`${
              darkMode
                ? 'bg-gray-800 divide-gray-600'
                : 'bg-white divide-gray-200'
            }`}
          >
            {noDataAvailable ? (
              <tr>
                <td
                  colSpan={8}
                  className={`px-6 py-4 text-sm text-center ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  No orders available.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className={`hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                >
                  <td
                    className={`px-6 py-4 text-sm font-medium ${
                      darkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}
                  >
                    {order._id}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {order.fooditems.map((item) => (
                      <div
                        key={item._id._id}
                      >{`${item._id.name} * ${item.quantity}`}</div>
                    ))}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {order.canteen.name}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {order.fooditems.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )}
                  </td>
                  <td className='px-6 py-4'>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  {/* <td
                    className={`px-6 py-4 text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {order.waitingNumber ? (
                      <span className='flex items-center text-orange-500'>
                        <FaClock size={14} className='mr-1' /> #
                        {order.waitingNumber}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td> */}
                  <td className='px-6 py-4'>
                    <button
                      onClick={() => handlePreview(order)}
                      className='text-orange-500 hover:text-orange-600'
                    >
                      <FaEye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:hidden'>
        {noDataAvailable ? (
          <div
            className={`bg-white p-4 rounded-lg shadow-sm border col-span-3 ${
              darkMode ? 'bg-gray-800' : ''
            }`}
          >
            <p
              className={`text-sm text-center ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              No orders available.
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className={`bg-white p-4 rounded-lg shadow-sm border ${
                darkMode ? 'bg-gray-800' : ''
              }`}
            >
              <div className='flex justify-between items-start mb-3'>
                <div>
                  <h3
                    className={`font-medium ${
                      darkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}
                  >
                    {order.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {order.id}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>
              <div
                className={`text-sm space-y-1 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <p>Location: {order.location}</p>
                <p>Date: {order.date}</p>
                <p>Amount: {order.amount}</p>
              </div>
              <button
                onClick={() => handlePreview(order)}
                className='mt-3 flex items-center text-sm text-orange-500'
              >
                <FaEye size={14} className='mr-1' /> View Details
              </button>
            </div>
          ))
        )}
      </div>

      {/* Order Preview */}
      <FoodPreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        order={selectedOrder}
      />
    </>
  );
}

export default OrderTable;
