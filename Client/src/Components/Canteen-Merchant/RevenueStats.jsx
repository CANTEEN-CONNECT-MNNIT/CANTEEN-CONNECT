import React, { useEffect, useState } from 'react';
import { GiCoffeeCup, GiMeal, GiChart, GiChefToque } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import canteenService from '../../ApiService/canteenService';
export default function RevenueStats() {
  const [data,setData]=useState(null);
  const fetchData=async()=>{
    try {
      const res=await canteenService.getCanteenData();
      console.log(res);
      if(res){
        setData(res);
      }
    } catch (error) {
      console.log(error);
    }
  }

    useEffect(()=>{
      fetchData();
    },[]);
    
    const darkMode = useSelector((state) => state.theme.isDarkMode);
  return (
    <div
      className={`mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 p-6 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-orange-50 rounded-3xl text-gray-800'
      }`}
    >
      {/* Today's Sales Card */}
      <div
        className={`${
          darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
        } shadow-lg rounded-lg p-4 flex flex-col items-center`}
      >
        <div className="flex items-center gap-2 mb-4">
          <GiCoffeeCup className="w-6 h-6 text-orange-500" />
          <p className="text-sm font-medium">Today's Sales</p>
        </div>
        <p className="text-xl font-semibold">₹{data?.orders?.day[0]?.totaldayrevenue || '0'}</p>
        {/* <p className="text-xs mt-2">75% of daily target reached</p> */}
      </div>

      {/* Peak Hour Orders Card */}
      <div
        className={`${
          darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
        } shadow-lg rounded-lg p-4 flex flex-col items-center`}
      >
        <div className="flex items-center gap-2 mb-4">
          <GiMeal className="w-6 h-6 text-orange-500" />
          <p className="text-sm font-medium">Peak Hour Orders</p>
        </div>
        <p className="text-xl font-semibold">{data?.orders?.peak_hour[0]?.ordercount}</p>
      <p className="text-xs mt-2">{data?.orders?.peak_hour[0]?._id || '11'} hr - {data?.orders?.peak_hour[0]?._id + 1 < 24 ? data?.orders?.peak_hour[0]?._id + 1 : '00' || '12'} hr rush</p>
      </div>

      {/* Active Meal Plans Card */}
      <div
        className={`${
          darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
        } shadow-lg rounded-lg p-4 flex flex-col items-center`}
      >
        <div className="flex items-center gap-2 mb-4">
          <GiChart className="w-6 h-6 text-orange-500" />
          <p className="text-sm font-medium">Active Meal Items</p>
        </div>
        <p className="text-xl font-semibold">{data?.num_fooditems || '0'}</p>
        {/* <p className="text-xs mt-2">65% student participation</p> */}
      </div>

      {/* View Detailed Analytics Button */}
      <div className="col-span-1 md:col-span-3 mt-6 flex justify-center">
        <button
          className={`${
            darkMode
              ? 'border-gray-500 text-white hover:bg-gray-600'
              : 'border-orange-500 text-orange-500 hover:bg-orange-50'
          } border-2 py-2 px-4 rounded-md flex items-center justify-center text-sm`}
        >
          <GiChefToque className="w-4 h-4 mr-2" />
          View Detailed Analytics
        </button>
      </div>
    </div>
  );
}
