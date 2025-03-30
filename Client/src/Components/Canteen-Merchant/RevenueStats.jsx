import React, { useEffect, useState } from 'react';
import {  GiChefToque } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { DetailedAnalytics } from './DetailedAnalytics';
import canteenService from '../../ApiService/canteenService';
import { FaChartBar, FaClock, FaRupeeSign, FaUtensils } from 'react-icons/fa';


export default function RevenueStats() {
  const [data, setData] = useState(null);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false); 

  const fetchData = async () => {
    try {
      let res = await canteenService.getCanteenData();
      if(!res){
        res = await canteenService.getAnalyticsData(); 
      }
      if (res) setData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const darkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <>
      <div
        className={`mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 p-6 ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-orange-50 rounded-3xl text-gray-800'
        }`}
      >
        {/* Today's Sales Card */}
        <div className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} shadow-lg rounded-lg p-4 flex flex-col items-center`}>
          <div className="flex items-center gap-2 mb-2">
            <FaChartBar className="w-7 h-7 text-orange-500" />
            <p className="text-sm font-medium">Total Sales</p>
          </div>
          <p className="text-xl font-semibold">₹{data?.orders?.day[0]?.totaldayrevenue?.toLocaleString() || '0'}</p>
        </div>

        {/* Peak Hour Orders Card */}
          <div className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} shadow-lg rounded-lg p-4 flex flex-col items-center`}>
            <div className="flex items-center gap-2 mb-4">
              <FaClock className="w-6 h-6 text-orange-500" />
              <p className="text-sm font-medium">Peak Hour Orders</p>
            </div>
            <p className="text-xl font-semibold">{data?.orders?.peak_hour[0]?.ordercount || 0}</p>

            <p className="text-sm mt-2 text-gray-400">
              {data?.orders?.peak_hour[0]?._id % 12 || 12} {data?.orders?.peak_hour[0]?._id < 12 ? "AM" : "PM"} - 
              {(data?.orders?.peak_hour[0]?._id + 1) % 12 || 1} {(data?.orders?.peak_hour[0]?._id + 1) < 12 ? "AM" : "PM"} Rush
            </p>
          </div>


        {/* Active Meal Plans Card */}
        <div className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} shadow-lg rounded-lg p-4 flex flex-col items-center`}>
          <div className="flex items-center gap-2 mb-4">
            <FaUtensils className="w-6 h-6 text-orange-500" /> 
            <p className="text-sm font-medium">Active Meal Items</p>
          </div>
          <p className="text-xl font-semibold">{data?.num_fooditems || '0'}</p>
        </div>


        {/* View Detailed Analytics Button */}
        <div className="col-span-1 md:col-span-3 mt-6 flex justify-center">
          <button
            onClick={() => setIsAnalyticsOpen((prev) => !prev)}
            className={`${
              darkMode 
                ? isAnalyticsOpen 
                  ? 'bg-gray-600 text-white border-gray-500' 
                  : 'border-gray-500 text-white hover:bg-gray-600' 
                : isAnalyticsOpen 
                  ? 'bg-orange-500 text-white' 
                  : 'border-orange-500 text-orange-500 hover:bg-orange-50'
            } border-2 py-2 px-4 rounded-md flex items-center justify-center text-sm transition-all`}
          >
            <GiChefToque className="w-4 h-4 mr-2" />
            {isAnalyticsOpen ? "Close Detailed Analytics" : "View Detailed Analytics"}
          </button>
        </div>
      </div>

      {/* Detailed Analytics Modal */}
      {isAnalyticsOpen && <DetailedAnalytics isOpen={isAnalyticsOpen} onToggle={() => setIsAnalyticsOpen(false)} />}
    </>
  );
}
