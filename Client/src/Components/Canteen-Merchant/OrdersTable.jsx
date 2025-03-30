import React, { useEffect, useRef, useState } from 'react';
import { FaSearch, FaCoffee } from 'react-icons/fa';
import OrderCard from './OrderCard';
import OrderDetailsModal from './OrderDetailsModal';
import { useDispatch, useSelector } from 'react-redux';
import { useAllOrders } from '../../Data/OrderData';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setError, setSuccess } from '../../Redux/Slices/UserSlice';
import orderService from '../../ApiService/orderService';
import { v4 as uuid} from 'uuid';

function OrdersTable() {

  const [currPage,setCurrPage]=useState(1);
  const limit=10;
  const ordersRef=useRef(null);
  const { data: fetchedData }= useAllOrders(1,currPage*limit);// always same 1st page but varying limit;
  const totalOrders=fetchedData?.totalOrders || 1;
  const allOrders=fetchedData?.allorders || [];
  const queryClient=useQueryClient();
  const dispatch=useDispatch();
  

  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filteredOrders,setFilteredOrders]=useState([]);

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

  const handleUpdateStatus = (orderId, newStatus) => {
    mutation.mutate({_id:orderId, status:newStatus});
  };

  useEffect(()=>{
    if(!allOrders || allOrders?.length<1) return;
    setFilteredOrders(allOrders?.filter(order => {
      const matchesSearch =
        searchTerm?.length>2 ?
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order?.user?._id?.toLowerCase().includes(searchTerm.toLowerCase())
        :
        true;
      const matchesStatus = selectedStatus === 'All' || order?.status === selectedStatus;
      return matchesSearch && matchesStatus;
    }) || []);
    
  },[searchTerm,allOrders,selectedStatus]);

  const handleScroll = () => {
    if (!ordersRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = ordersRef.current;

    // Check if scrolled to bottom of the container
    if (
      scrollTop + clientHeight >= scrollHeight - 10 &&
      currPage < Math.ceil(totalOrders/limit)
    ) {
      setCurrPage((prev) => prev + 1); // Load more
    }
  };

  return (
    <div
      className={`rounded-xl shadow-sm ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }`}
    >
      <div
        className={`p-6 border-b border-gray-200 ${
          darkMode ? 'border-gray-700' : ''
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <FaCoffee className="h-6 w-6 text-orange-600" />
            <h2 className="text-xl font-semibold"> All Orders</h2>
            {/* Today's Orders*/}
          </div>
          <select
          className={`border border-gray-200 rounded-lg pl-3 pr-10 py-2 text-sm 
            ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-200'} `}
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value={'All'} className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}>All</option>
          <option value={'Pending'} className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}>Pending</option>
          <option value={'Preparing'} className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}>Preparing</option>
          <option value={'Ready for pickup'} className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}>Ready</option>
          <option value={'Delivered'} className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}>Delivered</option>
          <option value={'Success'} className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}>Success</option>
        </select>

        </div>

        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order ID or student details..."
            className={`w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm ${
              darkMode ? 'bg-gray-700 text-white' : ''
            }`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
          <div>
            <ul
              className={`grid grid-cols-5 ${
                darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-500'
              }`}
            >
              <li className="px-6 py-3 text-left text-xs font-medium">Order</li>
              <li className="px-6 py-3 text-left text-xs font-medium">Student</li>
              <li className="px-6 py-3 text-left text-xs font-medium">Details</li>
              <li className="px-6 py-3 text-left text-xs font-medium">Status</li>
              <li className="px-6 py-3 text-left text-xs font-medium">Actions</li>
            </ul>
          </div>
          <div 
          className='max-h-96 overflow-y-scroll divide-y divide-gray-200 hide-scrollbar'
          ref={ordersRef}
          onScroll={handleScroll}>
          <ul
          >
            {filteredOrders.length > 0 ? filteredOrders.map((order) => (
              <li key={uuid()}>
              <OrderCard
                key={order._id}
                order={order}
                onUpdateStatus={(newStatus) => handleUpdateStatus(order._id, newStatus)}
                onViewDetails={() => setSelectedOrder(order)}
                darkMode={darkMode} 
              />
              </li>
            )):
            <li>
                <p className='py-4 text-center'>
                  No Orders to show!
                </p>
              </li>
            }
            </ul>
          </div>
      </div>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          darkMode={darkMode} 
        />
      )}
    </div>
  );
}

export default OrdersTable;
