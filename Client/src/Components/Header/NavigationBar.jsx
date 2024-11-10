import React from 'react'
import { FiSun, FiMoon, FiShoppingBag, FiUser, FiMenu } from 'react-icons/fi';

const NavigationBar = ({CurrentPage,isOpen,setOpen,darkMode,setDarkMode}) => {
  return (
        <div className={`absolute ${ darkMode ? 'bg-transparent' : (CurrentPage === "HomePage" ?'':'bg-stone-800 shadow-lg' )} top-0 left-0 right-0 z-10`}>
            <div className="container mx-auto px-6">
              <div className="flex items-center justify-between py-6">
                <button
                  onClick={() => setOpen(true)} 
                  className="text-white hover:text-orange-400 transition-colors fixed left-6">
                  <FiMenu className="bg-slate-800 rounded-2xl p-1 "size={30} />
                </button>

                {/* Logo */}
                <div className={`relative  left-10 text-3xl font-bold text-white tracking-tight  transition-transform  duration-300 ${isOpen ? 'translate-x-48' : ''}`}>
                  Canteen
                  <span className="text-orange-500  hover:text-orange-400 transition-colors"> Connect</span>
                </div>

                {/* User Actions */}
                <div className="flex items-center gap-6">
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
          </div>
  )
}

export default NavigationBar