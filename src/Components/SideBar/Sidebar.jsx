import React from 'react';
import { 
  LuLayoutDashboard, 
  LuUtensils, 
} from "react-icons/lu";
import { FaRegArrowAltCircleLeft,FaMapMarkerAlt ,FaWallet,FaCoins  } from "react-icons/fa";
import { MdHeadphones, MdHistory } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { BiDonateHeart } from 'react-icons/bi';
import { FaBars } from "react-icons/fa6";

const menuItems = [
  { icon: LuLayoutDashboard, label: 'Dashboard' },
  { icon: LuUtensils, label: 'Food Order' },
  { icon: FaMapMarkerAlt, label: 'Track Order' },
  { icon: MdHistory, label: 'Order History' },
  { icon: IoSettingsOutline, label: 'Settings' },
  { icon: MdHeadphones, label: 'Contact Us' }
];

const Sidebar = ({ isOpen, setOpen }) => {
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
      <div
  className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50
     transition-all duration-500 ease-in-out ${isOpen ? 'w-60' : 'w-20'}`}
>

        <div className="p-4 flex justify-between items-center border-b">
          {isOpen ? (
            <h2 className="text-xl font-bold text-gray-800">Infinity Canteen</h2>
          ) : (
            <span className="text-xl font-bold text-gray-800">IC  </span>
          )}
          <button onClick={() => setOpen(!isOpen)} className="p-2 hover:bg-gray-100 rounded-full">
            {isOpen ? <FaRegArrowAltCircleLeft className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
          </button>
        </div>



          {/* Profile Section */}
        {isOpen ? (
          <div className="py-4 border-b text-center">
            <div className="flex flex-col items-center gap-1">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-orange-500"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-gray-800">John Doe</h3>
              </div>
            </div>
          </div>
        ):(
              <div className="pl-3 pt-3 realtive">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border-2 border-orange-500"
                />
              </div>
        )}

        {/* Wallet Section */}
        {isOpen && (
          <div className="p-2 border-b bg-orange-50">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <FaWallet className="h-5 w-5 text-orange-500" />
                <span className="font-medium text-gray-800">My Wallet</span>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Available Balance</p>
                  <p className="text-l font-bold text-gray-800">2,500 coins</p>
                </div>
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-500 font-bold"><FaCoins /></span>
                </div>
              </div>
            </div>
          </div>
        )}


        <nav className="p-4 flex flex-col items-center">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg mb-1 transition-colors
                ${isOpen ? 'justify-start' : 'justify-center'}
              `}
            >
              <item.icon className="h-5 w-5 text-gray-600" />
              {isOpen && <span className="text-gray-700">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-5 w-full px-4">
          {isOpen && (
            <>
              <button className="w-full flex items-center justify-center space-x-2 bg-slate-400 text-white py-3 px-4 rounded-lg hover:bg-red-500 transition-colors mt-2">
                <span>Sign Out</span>
              </button>
            </>
          ) }
        </div>
      </div>
    </>
  );
};

export default Sidebar;
