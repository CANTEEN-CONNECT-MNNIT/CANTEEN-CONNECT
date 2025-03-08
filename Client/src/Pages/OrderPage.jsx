import { useEffect, useMemo, useRef, useState } from 'react';
import { FaPlus, FaCheckCircle, FaHourglassHalf, FaBell, FaThumbsUp, FaFire } from 'react-icons/fa';
import OrderTable from '../Components/Order/OrderTable';
import CanteenFilter from '../Components/Order/CanteenFilter';
import StatusFilter from '../Components/Order/StatusFilter';
import Sidebar from '../Components/SideBar/Sidebar';
import NavigationBar from '../Components/Header/NavigationBar';
import Popup from '../Components/Order/Popup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setactiveMenu, setOpen, toggleOpen } from '../Redux/Slices/pageSlice';
import { setOpen as setCartOpen } from '../Redux/Slices/CartSlice';
import { Footer } from '../Components/Home/Footer';
import { useAllOrders } from '../Data/OrderData';

function Orderpage() {
  const { data: orders } = useAllOrders();
  const isOpen = useSelector((state) => state.page.isOpen);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const [activeFilter, setActiveFilter] = useState('All Orders');
  const [selectedCanteen, setSelectedCanteen] = useState('All Canteens');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [orderDetails,setOrderDetails]=useState('');

  const statusCounts = useMemo(() => {
    if (!orders) return {};
    console.log('orders');
    
    return orders.reduce((counts, order) => {
      counts[order.status] = (counts[order.status] || 0) + 1;
      return counts;
    }, {});
  }, [orders]);
  
  

  //All Ready Orders data
  const stats = [
    {
      name: 'Ready for pickup',
      icon: FaBell,
      color: 'text-orange-500',
    },
    {
      name: 'Pending',
      value: 'Pending',
      icon: FaHourglassHalf,
      color: 'text-gray-500',
    },
    {
      name: 'Delivered',
      icon: FaCheckCircle,
      color: 'text-green-500',
    },
    {
      name: 'Success',
      icon: FaThumbsUp,
      color: 'text-blue-500',
    },
    {
      name: 'Preparing',
      value: 'Preparing',
      icon: FaFire,
      color: 'text-yellow-500',
    },
  ];

  const footerRef = useRef(null);
  const navigate = useNavigate();

  console.log(statusCounts);
  
  return (
    <div
      className={`flex flex-col min-h-screen ${
        darkMode ? 'bg-slate-900 text-white' : 'bg-slate-200 text-gray-900'
      }`}
    >
      <div
        className={`fixed top-0 left-0 h-full z-50 shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {' '}
        <Sidebar />
      </div>
      <div
        className={`transition-all duration-300 ${
          isOpen ? 'ml-64' : 'ml-20'
        } flex-1 px-4 md:px-8 lg:px-12 pb-8`}
      >
        <NavigationBar />
        <div className='pt-32 space-y-8'>
          <header className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
            <div>
              <h1 className='text-2xl font-bold'>Your Orders</h1>
              <p className='text-sm opacity-75'>
                Track and manage your food orders
              </p>
            </div>
            <button
              onClick={() => {
                navigate('/dashboard');
                dispatch(setactiveMenu('Dashboard'));
                dispatch(setOpen(false));
                dispatch(setCartOpen(true));
              }}
              className='w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors'
            >
              <FaPlus className='h-5 w-5' />
              <span>Place New Order</span>
            </button>
          </header>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Object.keys(statusCounts)?.length} gap-4`}>
            {stats.map(({ name, icon: Icon, color }) => (
              statusCounts[name]>0 && <div
                key={name}
                className={`p-4 rounded-xl shadow-lg border flex items-center cursor-pointer 
              ${
                darkMode
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-white border-gray-100'
              }`}
                onClick={() => setOrderDetails(`${statusCounts[name]} Orders are ${name?.toLocaleLowerCase()}`)}
              >
                <div className={`p-3 rounded-full ${color} bg-opacity-10 mr-4`}>
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <div>
                  <p
                    className={`text-sm font-medium opacity-75 ${
                      darkMode ? 'text-gray-400' : 'text-gray-700'
                    }`}
                  >
                    {name}
                  </p>
                  <p
                    className={`text-2xl font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {statusCounts[name] || 0}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <CanteenFilter
              selectedCanteen={selectedCanteen}
              setSelectedCanteen={setSelectedCanteen}
            />
            <StatusFilter
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
          </div>

          <OrderTable filter={activeFilter} canteen={selectedCanteen} />
        </div>
      </div>

      {/* Popup of Ready Orders */}
      {orderDetails?.trim()?.length >0 &&
      <Popup
        onClose={() => setOrderDetails('')}
        orderDetails={orderDetails}
      />}
      <Footer ref={footerRef} />
    </div>
  );
}

export default Orderpage;
