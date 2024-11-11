import React from 'react';
import {
  LuLayoutDashboard,
  LuUtensils
} from "react-icons/lu";
import { FaRegArrowAltCircleLeft, FaWallet, FaCoins } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { MdHeadphones, MdFavoriteBorder } from "react-icons/md";
import { IoGiftOutline } from "react-icons/io5";
import userService from '../../ApiService/userApiService';
import { persistor } from '../../Redux/Store';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { logout } from '../../Redux/Slices/UserSlice';

const menuItems = [
  { icon: LuLayoutDashboard, label: 'Dashboard' },
  { icon: LuUtensils, label: 'Canteen' },
  { icon: SlLocationPin, label: 'Track Order' },
  { icon: MdFavoriteBorder, label: 'Favorites' },
  { icon: IoGiftOutline, label: 'Offers' },
  { icon: MdHeadphones, label: 'Contact Us' }
];


const scrollToFooter = () => {
  const footerElement = document.querySelector('footer');
  if (footerElement) {
    footerElement.scrollIntoView({ behavior: 'smooth' });
  }
};

const Sidebar = ({ isOpen, setOpen, darkMode, setCurrentPage }) => {

  // const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleLogOut = async () => {
    try {
      const res = await userService.logout();
      if(res){
        persistor.purge();
        console.log("want to navigate")
        navigate('/');
        console.log("want to navigate")
      }

    } catch (error) {
        alert(error?.response?.data?.message);
    }
  }
  

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full ${darkMode ? 'bg-slate-700' : 'bg-white'} shadow-lg z-50 transition-all duration-300 ease-in-out ${isOpen ? 'w-60' : 'w-0 overflow-hidden'}`}>
        <div className={`p-4 flex justify-between items-center border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Canteen Connect</h2>
          <button onClick={() => setOpen(!isOpen)} className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <FaRegArrowAltCircleLeft className={`size-5 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
          </button>
        </div>

        {/* Profile Section */}
        {isOpen && (
          <div className={`py-4 text-center border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex flex-col items-center">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-orange-500"
              />
              <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-800 '}`}>User</h3>
            </div>
          </div>
        )}

        {/* Wallet Section */}
        {isOpen && (
          <div className={`p-2 border-b ${darkMode ? 'bg-gray-500 border-gray-700' : 'bg-orange-50 border-gray-200'}`}>
            <div className="flex items-center gap-3 ml-4 mb-1">
              <span className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>My Wallet</span>
              <FaWallet className={`${darkMode ? 'text-orange-500' : 'text-gray-800'}`} />
            </div>
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Available Balance</p>
                  <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>2,500 coins</p>
                </div>
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <FaCoins className="text-orange-500 font-bold" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="p-4 flex flex-col items-center">
          {menuItems.map((item, index) => (
            <button
              onClick={() => {
                if (item.label == 'Contact Us') {
                  scrollToFooter();
                }
                setCurrentPage(item.label)
              }}
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-lg mb-1 transition-colors justify-center w-full text-left ${darkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-800'}`}
            >
              <item.icon className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-5 w-full px-4">
          {isOpen && (
            <button onClick={handleLogOut} className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg transition-colors mt-2 ${darkMode ? 'bg-red-500 text-white' : 'bg-slate-400 text-white'} hover:bg-red-600`}>
              <span>Sign Out</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
