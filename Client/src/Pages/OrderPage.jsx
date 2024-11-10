import { useState } from 'react';
import { FaPlus, FaCheckCircle } from 'react-icons/fa';
import OrderTable from '../Components/Order/OrderTable';
import CanteenFilter from '../Components/Order/CanteenFilter';
import StatusFilter from '../Components/Order/StatusFilter';
import Sidebar from '../Components/SideBar/Sidebar';
import NavigationBar from '../Components/Header/NavigationBar';
import Popup from '../Components/Order/Popup';
import {  useNavigate } from 'react-router-dom';

function Orderpage({ setCurrentPage,CurrentPage, darkMode, setDarkMode, isOpen, setOpen }) {
  const [activeFilter, setActiveFilter] = useState('All Orders');
  const [selectedCanteen, setSelectedCanteen] = useState('All Canteens');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const orderDetails = 'Your order is ready for pickup!';

  const stats = [
    { name: 'Ready for Pickup', value: '5', icon: FaCheckCircle, color: 'text-green-500' },
  ];

  const navigate=useNavigate();
  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-200 text-gray-900'}`}>
      <Sidebar isOpen={isOpen} setOpen={setOpen} darkMode={darkMode} setCurrentPage={setCurrentPage} />
      <div className={`transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'} flex-1 px-4 md:px-8 lg:px-12 pb-8`}>
        <NavigationBar CurrentPage={CurrentPage} isOpen={isOpen} setOpen={setOpen} darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="pt-32 space-y-8">
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Your Orders</h1>
              <p className="text-sm opacity-75">Track and manage your food orders</p>
            </div>
            <button 
            onClick={()=>{navigate('/dashboard')}} className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <FaPlus className="h-5 w-5" />
              <span>Place New Order</span>
            </button>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {stats.map(({ name, value, icon: Icon, color }) => (
              <div
                key={name}
                className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 flex items-center cursor-pointer"
                onClick={() => setIsPopupOpen(true)} // Open popup on click
              >
                <div className={`p-3 rounded-full ${color} bg-opacity-10 mr-4`}>
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium opacity-75">{name}</p>
                  <p className="text-2xl font-semibold">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CanteenFilter selectedCanteen={selectedCanteen} setSelectedCanteen={setSelectedCanteen} />
            <StatusFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          </div>

          <OrderTable filter={activeFilter} canteen={selectedCanteen} />
        </div>
      </div>

      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} orderDetails={orderDetails} />
    </div>
  );
}

export default Orderpage;
