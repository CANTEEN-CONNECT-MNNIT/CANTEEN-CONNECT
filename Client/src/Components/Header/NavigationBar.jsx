// NavigationBar.jsx
import React from 'react';
import { FiSun, FiMoon, FiBell, FiUser, FiMenu } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toggleTheme } from '../../Redux/Slices/themeSlice';
import { setOpen } from '../../Redux/Slices/pageSlice';
import { setProfileOpen } from '../../Redux/Slices/pageSlice';
const NavigationBar = () => {
  const isOpen=useSelector((state)=>state.page.isOpen);
  const location = useLocation();
  const dispatch=useDispatch();
  const darkMode = useSelector((state) => state.theme.isDarkMode);
  console.log(location)
  return (
    <div
      className={`absolute ${darkMode ? 'bg-transparent' : location.pathname === "/dashboard" ? '' : 'bg-stone-800 shadow-lg'} top-0 z-10 left-0 right-0 px-4`}
    >
      <div className="flex mt-0 items-center justify-between py-4">
       
        <div className="flex items-center gap-4 ml-4">
          
         { location.pathname !== "/canteen" && (
      <button
        onClick={() => dispatch(setOpen(true))}
        className="text-white hover:text-orange-400 transition-colors"
      >
        <FiMenu className="bg-slate-800 rounded-2xl p-1" size={30} />
      </button>
    )
  }

          <div
            className={`flex items-center gap-2 text-2xl md:text-3xl font-bold text-white tracking-tight transition-transform duration-300 `}
          >
            <span>Canteen</span>
            <span className="text-orange-500 hover:text-orange-400 transition-colors"> Connect</span>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8 lg:gap-12 p-3 mr-4 md:mr-10 lg:mr-20">
          <button
           onClick={() => dispatch(toggleTheme())}
            className={`p-2 rounded-full ${darkMode ? 'bg-yellow-500' : 'bg-slate-800'} text-white hover:bg-opacity-80 transition-colors`}
            aria-label="Toggle theme"
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          <button
            className="text-white hover:text-orange-400 transition-colors"
            aria-label="Open Profile"
          >
            <FiBell size={20} />
          </button>

          <button 
           onClick={ (state)=>dispatch( setProfileOpen(true))}
          className="text-white hover:text-orange-400 transition-colors">
            <FiUser size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
