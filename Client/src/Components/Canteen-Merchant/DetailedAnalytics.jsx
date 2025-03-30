import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { FaUsers, FaRupeeSign, FaUtensils, FaBox, FaCalendarAlt } from "react-icons/fa";
import canteenService from "../../ApiService/canteenService"; 
import { GiChefToque } from "react-icons/gi";
import { dateFormat } from "../../utility/dateFormat";

export const DetailedAnalytics = () => {
  const [allData,setAllData]=useState(null);
  const [todayData,setTodayData]=useState(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const darkMode = useSelector((state) => state.theme.isDarkMode); 
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  
  const fetchData = async () => {
    try {
      const res = await canteenService.getCanteenData();
      if(res) {
        setAllData(res);
        setTodayData(res?.orders?.day.find(item=>dateFormat(item._id)==='Today') || null)
      }
    } catch (error) {
      console.log(error);
      // setError(error?.response?.data?.message);
    }
  };

  
    useEffect(()=>{
      // setError(null);
      setLoading(true);
      fetchData();
      setLoading(false);
    },[]);
    
  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Error State
  // if (error) {
  //   return (
  //     <div className="flex items-center justify-center p-8">
  //       <p className={`text-red-500 ${darkMode ? "text-red-400" : ""}`}>{error}</p>
  //     </div>
  //   );
  // }

  
  if (!allData) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className={`text-gray-500 ${darkMode ? "text-gray-400" : ""}`}>No analytics data available.</p>
      </div>
    );
  }
  

  return (
    <AnimatePresence>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`overflow-hidden p-6 rounded-xl shadow-lg relative ${
            darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
          }`}
        >
          {/* Revenue Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon={FaRupeeSign} title="Today's Revenue" value={`₹${todayData?.totaldayrevenue?.toLocaleString() || '0'}`} darkMode={darkMode} />
            <StatCard icon={FaUsers} title="Student Rush Hour" value={`${allData?.orders?.peak_hour[0]?._id % 12 || 12} ${allData?.orders?.peak_hour[0]?._id < 12 ? "AM" : "PM"} - 
              ${(Number(allData?.orders?.peak_hour[0]?._id )+1) % 12 || 1} ${(Number(allData?.orders?.peak_hour[0]?._id )+ 1) < 12 ? "AM" : "PM"}`} darkMode={darkMode} />
            <StatCard icon={FaUtensils} title="Total Food Items" value={allData?.num_fooditems || '0'} darkMode={darkMode} />
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
      { isAnalyticsOpen && <>
          {/* Revenue Trends */}
          <div className={`rounded-xl p-6 shadow-md mt-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Revenue Trends</h3>
            <div className="h-[300px]">
              {allData?.orders && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={allData?.orders?.day || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#D1D5DB"} />
                    <XAxis dataKey="_id" 
                    tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280" }} 
                    tickFormatter={dateFormat}
                    />
                    <YAxis tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280" }} />
                    <Tooltip formatter={(value, name) => [`₹${value}`, "Revenue"]}
                      labelFormatter={(date)=>new Date(date).toLocaleDateString()}
                     contentStyle={{ backgroundColor: darkMode ? "#333" : "#fff", borderRadius: "8px", color: darkMode ? "#fff" : "#333" }} // Background & border styling
                   />
                    <Line type="monotone" dataKey="totaldayrevenue" stroke="#f97316" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Popular Items & Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Popular Items */}
            <div className={`rounded-xl p-6 shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h3 className={`text-xl font-semibold mb-4 flex items-center ${darkMode ? "text-white" : "text-gray-900"}`}>
                <FaBox className="mr-2 text-orange-500" /> Top Trending
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={allData?.trendingFoodItems || []} layout="vertical">
                  <XAxis type="number" stroke={darkMode ? "#D1D5DB" : "#374151"} />
                  <YAxis dataKey="name" type="category" width={100} stroke={darkMode ? "#D1D5DB" : "#374151"} />
                  <Tooltip formatter={(value, name) => [`${value} ⭐`, "Rating"]}
                  contentStyle={{ backgroundColor: darkMode ? "#333" : "#fff", borderRadius: "8px", color: darkMode ? "#fff" : "#333" }} // Background & border styling
                   />
                  <Bar dataKey="averageRating" fill="#f97316" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Summary Section */}
            <div className="space-y-6">
              <div className={`rounded-xl p-6 shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                <h3 className={`text-xl font-semibold flex items-center mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  <FaCalendarAlt className="mr-2 text-orange-500" /> Today's Summary
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SummaryCard title="Today's Revenue" value={`₹${todayData?.totaldayrevenue?.toLocaleString() || '0'}`} darkMode={darkMode} />
                  <SummaryCard 
                    title="Avg. Revenue per Order"
                    value={`₹${todayData?.totaldayrevenue && todayData?.totaldaysale
                      ? (todayData?.totaldayrevenue / todayData?.totaldaysale).toFixed(2) 
                      : 0}`} 
                    darkMode={darkMode}
                  />
                  <SummaryCard title="Total Orders" value={todayData?.totaldaysale || 0} darkMode={darkMode} />
                  <SummaryCard title="Total Items Sold" value={todayData?.totalfooditems || 0} darkMode={darkMode} />
                </div>
              </div>
            </div>
          </div>
          </>}
        </motion.div>
    </AnimatePresence>
  );
};

// Reusable Components
const StatCard = ({ icon: Icon, title, value, darkMode }) => (
  <div className={`rounded-xl p-5 shadow-md ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
    <div className="flex items-center gap-4">
      <Icon className="w-6 h-6 text-orange-600" />
      <div>
        <h3 className="text-sm">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);

const SummaryCard = ({ title, value, darkMode }) => (
  <div className={`p-5 rounded-lg shadow-sm ${darkMode ? "bg-orange-900/20 text-white" : "bg-orange-50 text-gray-900"}`}>
    <p className="text-sm">{title}</p>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);
