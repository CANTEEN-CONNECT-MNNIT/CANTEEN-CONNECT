import { useEffect, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { FaEye, FaClock } from 'react-icons/fa';
import FoodPreview from './FoodPreview';
import { useAllOrders } from '../../Data/OrderData';
import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import orderService from '../../ApiService/orderService';

function OrderTable({ filter, canteen }) {
  const { data: orders } = useAllOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const queryClient = useQueryClient();

  const getStatusColor = (status) => {
    return (
      {
        Delivered: 'bg-green-100 text-green-800',
        Pending: 'bg-red-100 text-red-800',
        'In Progress': 'bg-orange-100 text-orange-800',
      }[status] || 'bg-gray-100 text-gray-800'
    );
  };


  const mutation = useMutation({
    mutationFn: orderService.updateOrder,
    onSuccess: () => {
      // Invalidate and refetch the "orders" query to keep data fresh
      queryClient.invalidateQueries(['allOrders']);
      dispatch(setSuccess('Updated Status!'));
    },
    onError: (error) => {
      console.error('Error updating order:', error.response.data.message);
      dispatch(setError(error.response.data.message));
    }
  });

  const handleConfirmDelivery = (order) => {
    mutation.mutate({ _id: order?._id, status: 'Delivered' });
    setSelectedOrder(order);
  }

  console.log(filteredOrders);

  const filterTheOrders = () =>
    setFilteredOrders(orders?.filter((order) => {
      const statusMatch =
        filter === 'All Orders' ||
        (filter === 'Pending' && order.status === 'Pending') ||
        (filter === order.status);
      (filter === 'Ready' && order.status === 'Ready for pickup');
      const canteenMatch =
        canteen === 'All Canteens' || order?.canteen?.name === canteen;
      return statusMatch && canteenMatch;
    }) || []);

  useEffect(() => {
    filterTheOrders();
  }, [orders, filter, canteen])

  const noDataAvailable = filteredOrders.length === 0;

  return (
    <>
      <div
        className={`hidden md:block rounded-lg shadow overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
      >
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <tr>
              {[
                'Order ID',
                'Details',
                'Canteen',
                'Date',
                'Amount',
                'Status',
                'Actions',
              ].map((header) => (
                <th
                  key={header}
                  className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'
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
            className={`${darkMode
              ? 'bg-gray-800 divide-gray-600'
              : 'bg-white divide-gray-200'
              }`}
          >
            {noDataAvailable ? (
              <tr>
                <td
                  colSpan={8}
                  className={`px-6 py-4 text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'
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
                    className={`px-6 py-4 text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'
                      }`}
                  >
                    #{order._id?.toString().slice(-8)}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                  >
                    {order.fooditems.map((item) => (
                      <div
                        key={item._id._id}
                      >{`${item._id.name} x ${item.quantity}`} = &#8377;{`${item.quantity * item.price}`}</div>
                    ))}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                  >
                    {order.canteen.name}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                  >
                    {order?.createdAt && new Date(order.createdAt).toDateString() !== new Date().toDateString()
                      ? new Date(order.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })
                      : 'Today'}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                  >
                    &#8377;{order.fooditems.reduce(
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
                      {order.status === "Ready for pickup" ? "🟢 Ready" : order.status}
                    </span>
                  </td>
                  <td className={`px-6 py-4 ${order.status === "Ready for pickup" && "flex items-center gap-4"}`}>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className='text-orange-500 hover:text-orange-600'
                    >
                      <FaEye size={18} />
                    </button>
                    {order.status === "Ready for pickup" && (
                      <button
                        onClick={() => handleConfirmDelivery(order)}
                        className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded flex items-center gap-1"
                      >
                        ✅ Received ?
                      </button>
                    )}
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
            className={`p-4 rounded-lg shadow-sm border col-span-3 ${darkMode ? 'bg-gray-800' : 'bg-white '
              }`}
          >
            <p
              className={`text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
            >
              No orders available.
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order._id}
              className={`p-4 rounded-lg shadow-sm border ${darkMode ? 'bg-gray-800' : 'bg-white '
                }`}
            >
              <div className='flex justify-between items-start mb-3'>
                <div>
                  <h3
                    className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'
                      }`}
                  >
                    Id:
                    <span
                      className={` mx-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                    >
                      #{order._id?.toString().slice(-8)}
                    </span>
                  </h3>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status === "Ready for pickup" ? "🟢 Ready" : order.status}
                </span>
              </div>
              <div
                className={`text-sm space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
              >
                <p>Canteen: {order.canteen.name}</p>
                <p>Date: {order?.createdAt && new Date(order.createdAt).toDateString() !== new Date().toDateString()
                  ? new Date(order.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })
                  : 'Today'}</p>
                <p>Amount:  &#8377;{order.fooditems.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}</p>
              </div>
              <div className={`${order.status === "Ready for pickup" && "flex justify-between items-center gap-4"}`}>
                <button
                  onClick={() => setSelectedOrder(order)}
                  className='mt-3 flex items-center text-sm text-orange-500'
                >
                  <FaEye size={14} className='mr-1' /> View Details
                </button>
                {order.status === "Ready for pickup" && (
                  <button
                    onClick={() => handleConfirmDelivery(order)}
                    className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded flex items-center gap-1"
                  >
                    ✅ Received ?
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order Preview */}
      {selectedOrder && <FoodPreview
        onClose={setSelectedOrder}
        order={selectedOrder}
      />}
    </>
  );
}

export default OrderTable;
