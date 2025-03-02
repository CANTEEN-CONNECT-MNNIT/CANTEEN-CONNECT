import React, { useState } from 'react';
import { FaSearch, FaCoffee } from 'react-icons/fa';
import OrderCard from './OrderCard';
import OrderDetailsModal from './OrderDetailsModal';
import { useSelector } from 'react-redux';

function OrdersTable() {
  const [orders, setOrders] = useState([
    {
      id: 'CNT001',
      student: 'Jeevan',
      studentId: 'ST2024001',
      items: [
        { name: 'Masala Dosa', quantity: 1, price: 60 },
        { name: 'Chai', quantity: 1, price: 15 }
      ],
      total: 75,
      status: 'Pending',
      time: '10:30 AM',
      counter: 'South Indian'
    },
    {
      id: 'CNT002',
      student: 'Daksh',
      studentId: 'ST2024015',
      items: [
        { name: 'Vada Pav', quantity: 2, price: 30 },
        { name: 'Samosa', quantity: 1, price: 15 },
        { name: 'Lassi', quantity: 1, price: 40 }
      ],
      total: 85,
      status: 'Preparing',
      time: '10:45 AM',
      counter: 'Snacks'
    }
  ]);

  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

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
            <h2 className="text-xl font-semibold">Today's Orders</h2>
          </div>
          <select
          className={`border border-gray-200 rounded-lg pl-3 pr-10 py-2 text-sm 
            ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-200'} `}
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}>All</option>
          <option className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}>Pending</option>
          <option className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}>Preparing</option>
          <option className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}>Ready</option>
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
        <table className="w-full">
          <thead>
            <tr
              className={`${
                darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-500'
              }`}
            >
              <th className="px-6 py-3 text-left text-xs font-medium">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onUpdateStatus={(newStatus) => handleUpdateStatus(order.id, newStatus)}
                onViewDetails={() => setSelectedOrder(order)}
                darkMode={darkMode} 
              />
            ))}
          </tbody>
        </table>
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
