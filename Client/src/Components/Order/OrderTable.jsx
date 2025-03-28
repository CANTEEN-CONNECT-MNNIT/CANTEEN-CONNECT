import { useEffect, useRef, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { FaEye, FaClock } from 'react-icons/fa';
import FoodPreview from './FoodPreview';
import { useAllOrders } from '../../Data/OrderData';
import { useSelector } from 'react-redux';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import orderService from '../../ApiService/orderService';
import { dateFormat } from '../../utility/dateFormat.js';
import { v4 as uuid } from 'uuid';

function OrderTable({ filter, canteen }) {
  const orderRef=useRef(null);
  const mobileRef=useRef(null);
  const [currPage,setCurrPage]=useState(1);
  const [allOrders, setAllOrders] = useState([]);
  const { data: orders } = useAllOrders(currPage,10);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const [filteredOrders, setFilteredOrders] = useState([]);
  // const queryClient = useQueryClient();
  const totalPages=orders?.totalPages || 1;

  console.log(orders);

  const getStatusColor = (status) => {
    return (
      {
        Delivered: 'bg-green-100 text-green-800',
        Pending: 'bg-red-100 text-red-800',
        'In Progress': 'bg-orange-100 text-orange-800',
      }[status] || 'bg-gray-100 text-gray-800'
    );
  };

  // const mutation = useMutation({
  //   mutationFn: orderService.updateOrder,
  //   onSuccess: () => {
  //     // Invalidate and refetch the "orders" query to keep data fresh
  //     queryClient.invalidateQueries(['allOrders']);
  //     dispatch(setSuccess('Updated Status!'));
  //   },
  //   onError: (error) => {
  //     console.error('Error updating order:', error.response.data.message);
  //     dispatch(setError(error.response.data.message));
  //   },
  // });

  // const handleConfirmDelivery = (order) => {
  //   mutation.mutate({ _id: order?._id, status: 'Delivered' });
  //   setSelectedOrder(order);
  // };

  console.log(filteredOrders);
  console.log(orders);
  

  useEffect(() => {
    setFilteredOrders(
      allOrders.filter((order) => {
        const statusMatch =
          filter === 'All Orders' ||
          (filter === 'Pending' && order.status === 'Pending') ||
          filter === order.status;
        filter === 'Ready' && order.status === 'Ready for pickup';
        const canteenMatch =
          canteen === 'All Canteens' || order?.canteen?.name === canteen;
        return statusMatch && canteenMatch;
      }) || []
    );
  }, [allOrders, filter, canteen]);

  useEffect(() => {
    if(!orders || orders?.allorders?.length==0) return;
    setAllOrders((prev)=>[...prev,...orders.allorders]);
  }, [orders]);
  
  const handleScroll = () => {
    if (!orderRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = orderRef.current;
    const { scrollTop:mobileTop, scrollHeight:mobileHeight, clientHeight:mobileClientHeight } = mobileRef.current;

    // Check if scrolled to bottom of the container
    if (
      (scrollTop + clientHeight >= scrollHeight - 10 &&
      currPage < totalPages) || (mobileTop + mobileClientHeight >= mobileHeight - 10 &&
        currPage < totalPages)
    ) {
      setCurrPage((prev) => prev + 1); // Load more
    }
  };

  const noDataAvailable = filteredOrders.length === 0;

  return (
    <>
      <div
        className={`hidden md:block rounded-lg shadow overflow-hidden ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className='min-w-full divide-y divide-gray-200'>
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <ul className='grid grid-cols-7'>
              {[
                'Order ID',
                'Details',
                'Canteen',
                'Date',
                'Amount',
                'Status',
                'Actions',
              ].map((header) => (
                <li
                  key={header}
                  className={`px-6 py-3 text-left text-xs font-medium ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  } uppercase`}
                >
                  <span className='flex items-center space-x-1'>
                    {header} <HiChevronDown size={12} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`max-h-96 overflow-y-auto
              hide-scrollbar
              ${
              darkMode
                ? 'bg-gray-800 divide-gray-600'
                : 'bg-white divide-gray-200'
            }`}
            ref={orderRef}
            onScroll={handleScroll}
          >
            {noDataAvailable ? (
              <ul>
                <li
                  className={`px-6 py-4 text-sm text-center ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  No orders available.
                </li>
              </ul>
            ) : (
              filteredOrders.map((order) => (
                <ul
                  key={order._id || uuid()}
                  className={`hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'} grid grid-cols-7`}
                >
                  <li
                    className={`px-6 py-4 text-sm font-medium ${
                      darkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}
                  >
                    #{order._id?.toString().slice(-8)}
                  </li>
                  <li
                    className={`px-6 py-4 text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {order.fooditems.map((item) => (
                      <div key={item._id?._id+uuid()}>
                        {`${item._id?.name || '-'} x ${item.quantity}`} = &#8377;
                        {`${item.quantity * item.price}`}
                      </div>
                    ))}
                  </li>
                  <li
                    className={`px-6 py-4 text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {order.canteen.name}
                  </li>
                  <li
                    className={`px-6 py-4 text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {order?.createdAt && dateFormat(order.createdAt)}
                  </li>
                  <li
                    className={`px-6 py-4 text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    &#8377;
                    {order.fooditems.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )}
                  </li>
                  <li className='px-6 py-4'>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status === 'Ready for pickup'
                        ? '🟢 Ready'
                        : order.status}
                    </span>
                  </li>
                  <li
                    className={`px-6 py-4 ${
                      order.status === 'Ready for pickup' &&
                      'flex items-center gap-4'
                    }`}
                  >
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className='text-orange-500 hover:text-orange-600'
                    >
                      <FaEye size={18} />
                    </button>
                  </li>
                </ul>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className='hide-scrollbar max-h-96 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:hidden' 
          ref={mobileRef}
          onScroll={handleScroll}>
        {noDataAvailable ? (
          <div
            className={`p-4 rounded-lg shadow-sm border col-span-3 ${
              darkMode ? 'bg-gray-800' : 'bg-white '
            }`
          }
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
              key={order._id}
              className={`p-4 rounded-lg shadow-sm border ${
                darkMode ? 'bg-gray-800' : 'bg-white '
              }`}
            >
              <div className='flex justify-between items-start mb-3'>
                <div>
                  <h3
                    className={`font-medium ${
                      darkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}
                  >
                    Id:
                    <span
                      className={` mx-2 text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
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
                  {order.status === 'Ready for pickup'
                    ? '🟢 Ready'
                    : order.status}
                </span>
              </div>
              <div
                className={`text-sm space-y-1 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <p>Canteen: {order.canteen.name}</p>
                <p>Date: {order?.createdAt && dateFormat(order.createdAt)}</p>
                <p>
                  Amount: &#8377;
                  {order.fooditems.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}
                </p>
              </div>
              <div
                className={`${
                  order.status === 'Ready for pickup' &&
                  'flex justify-between items-center gap-4'
                }`}
              >
                <button
                  onClick={() => setSelectedOrder(order)}
                  className='mt-3 flex items-center text-sm text-orange-500'
                >
                  <FaEye size={14} className='mr-1' /> View Details
                </button>
                {/* {order.status === 'Ready for pickup' && (
                  <button
                    onClick={() => handleConfirmDelivery(order)}
                    className='bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded flex items-center gap-1'
                  >
                    ✅ Received ?
                  </button>
                )} */}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order Preview */}
      {selectedOrder && (
        <FoodPreview onClose={setSelectedOrder} order={selectedOrder} />
      )}
    </>
  );
}

export default OrderTable;
