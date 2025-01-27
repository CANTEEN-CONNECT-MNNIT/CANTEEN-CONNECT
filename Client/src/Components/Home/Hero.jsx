import React from 'react';
import { FaArrowRight, FaClock, FaUtensils,  FaHamburger } from 'react-icons/fa';
import { useSelector} from 'react-redux';
import toast,{ Toaster } from "react-hot-toast";

export default function Hero() {
  const isDarkMode=useSelector((state)=> state.theme.isDarkMode)

  const handleViewMenuClick = () => {
    const targetArea = document.getElementById("menu");
    if (targetArea) {
      targetArea.scrollIntoView({ behavior: "smooth" }); 
    }
  }

  return (
    
    <div className={`relative min-h-[700px] overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="absolute inset-0">
        <img
          src="../../src/assets/bg.jpg" 
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${isDarkMode ? 'from-gray-400/10 via-gray-600/60 to-gray-700/30' : ''}`}></div>
        <div className={`absolute inset-0 bg-gradient-to-b ${isDarkMode ? 'from-gray-500/50 via-transparent to-gray-900/100' : ''}`}></div>
      </div>
      
      {/* Content */}
      <div className={`absolute max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16`}>
  <div className={`relative z-10 bg-orange-500/20 backdrop-blur-sm p-6 rounded-xl shadow-lg`}>
    <div className="flex flex-col items-start gap-12">
      <div className="relative z-10 w-full">
        <div className={`inline-flex items-center px-4 py-2 ${isDarkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-200 text-orange-600'} font-medium text-sm mb-4 rounded-full`}>
          <FaClock className="w-4 h-4 mr-2" /> Open Now - Order Fresh & Hot
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-50'} mb-4 leading-tight`}>
          Smart Campus
          <span className="text-orange-400 font-bold"> Dining</span>
        </h1>
        <p className={`text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-50'} mb-6 leading-relaxed`}>
          Experience hassle-free campus dining with our smart ordering system. Pre-order meals, skip queues, and enjoy fresh food at your convenience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={()=>toast('Please Login to Place!')}className="group bg-orange-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-orange-500/30 hover:scale-105">
            <span>Order Now</span>
            <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={handleViewMenuClick} className={`relative overflow-hidden ${isDarkMode ? 'bg-white/10 text-white border-white/30' : 'bg-orange-100 text-gray-800 border-gray-300'} px-6 py-3 rounded-full text-lg font-semibold hover:bg-orange-200 transition-all duration-300 flex items-center justify-center space-x-2 border-2`}>
            <span>View Menu</span>
          </button>
        </div>
      </div>

      <div className="flex flex-row items-start gap-4 w-full">
        <div className={`flex items-center space-x-3 p-3 rounded-xl ${isDarkMode ? 'bg-white/10' : 'bg-orange-50'} backdrop-blur-sm hover:bg-opacity-80 transition-colors shadow-sm hover:shadow-md border border-opacity-10 w-full`}>
          <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
            <FaClock className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Pre-order</p>
            <p className="text-sm text-gray-400">Skip the Queue</p>
          </div>
        </div>
        <div className={`flex items-center space-x-3 p-3 rounded-xl ${isDarkMode ? 'bg-white/10' : 'bg-orange-50'} backdrop-blur-sm hover:bg-opacity-80 transition-colors shadow-sm hover:shadow-md border border-opacity-10 w-full`}>
          <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
            <FaUtensils className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Fresh Menu</p>
            <p className="text-sm text-gray-400">Daily Specials</p>
          </div>
        </div>
        <div className={`flex items-center space-x-3 p-3 rounded-xl ${isDarkMode ? 'bg-white/10' : 'bg-orange-50'} backdrop-blur-sm hover:bg-opacity-80 transition-colors shadow-sm hover:shadow-md border border-opacity-10 w-full`}>
          <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
            <FaHamburger className="w-6 h-6 text-orange-500" />
          </div>
          <div id="menu" > 
            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Daily Specials</p>
            <p className="text-sm text-gray-400">Fresh Meals</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}
