import React from 'react';
import { FiSun, FiMoon, FiShoppingBag, FiUser, FiMenu } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

const NavigationBar = ({  isOpen, setOpen, darkMode, setDarkMode }) => {
  const location = useLocation();
  return (
    <div
      className={`absolute ${darkMode? '': location.pathname === "/dashboard"? '' : 'bg-stone-800 shadow-lg'
      } top-0 left-0 right-0 z-55 px-4`}
    >
      <div className="flex items-center justify-between py-4">
       
        <div className="flex items-center gap-4 ml-4">
          <button
            onClick={() => setOpen(true)}
            className="text-white hover:text-orange-400 transition-colors"
          >
            <FiMenu className="bg-slate-800 rounded-2xl p-1" size={30} />
          </button>

          {/* Logo */}
          <div
            className={`flex items-center gap-2 text-2xl md:text-3xl font-bold text-white tracking-tight transition-transform duration-300 ${
              isOpen ? 'translate-x-48' : ''
            }`}
          >
            <span>Canteen</span>
            <span className="text-orange-500 hover:text-orange-400 transition-colors"> Connect</span>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8 lg:gap-12 p-3 mr-4 md:mr-10 lg:mr-20">
          <button
            onClick={() => setDarkMode(prev => !prev)}
            className={`p-2 rounded-full ${darkMode ? 'bg-yellow-500' : 'bg-slate-800'} text-white hover:bg-opacity-80 transition-colors`}
            aria-label="Toggle theme"
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          <button className="text-white hover:text-orange-400 transition-colors">
            <FiShoppingBag size={20} />
          </button>

          <button className="text-white hover:text-orange-400 transition-colors">
            <FiUser size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
