import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { FaUsers, FaRupeeSign, FaUtensils, FaBox, FaCalendarAlt } from "react-icons/fa";
import canteenService from "../../ApiService/canteenService"; 

export const DetailedAnalytics = ({ isOpen }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const darkMode = useSelector((state) => state.theme.isDarkMode); 

  
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let response = await canteenService.getAnalyticsData();
      if (!response) {
        console.warn("Falling back to mock analytics data...");
        response = await canteenService.getMockAnalyticsData();
      }
      setData(response);
      setError(null);
    } catch (err) {
      console.error("Error fetching analytics data:", err);
      setError("Failed to load analytics data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) fetchData();
  }, [isOpen, fetchData]);

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className={`text-red-500 ${darkMode ? "text-red-400" : ""}`}>{error}</p>
      </div>
    );
  }

  // No Data State
  if (!data) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className={`text-gray-500 ${darkMode ? "text-gray-400" : ""}`}>No analytics data available.</p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
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
            <StatCard icon={FaRupeeSign} title="Today's Revenue" value={`₹${data?.revenue?.today || 0}`} darkMode={darkMode} />
            <StatCard icon={FaUtensils} title="Orders Served" value={data?.orders?.totalOrders || 0} darkMode={darkMode} />
            <StatCard icon={FaUsers} title="Student Rush Hour" value="12:30 - 1:30 PM" darkMode={darkMode} />
          </div>

          {/* Revenue Trends */}
          <div className={`rounded-xl p-6 shadow-md mt-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Revenue Trends</h3>
            <div className="h-[300px]">
              {data?.revenue?.trends && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.revenue.trends}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#D1D5DB"} />
                    <XAxis dataKey="date" tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280" }} />
                    <YAxis tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280" }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="amount" stroke="#f97316" strokeWidth={3} />
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
                <FaBox className="mr-2 text-orange-500" /> Top Selling Items
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data?.orders?.popularItems || []} layout="vertical">
                  <XAxis type="number" stroke={darkMode ? "#D1D5DB" : "#374151"} />
                  <YAxis dataKey="name" type="category" width={100} stroke={darkMode ? "#D1D5DB" : "#374151"} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#f97316" barSize={20} />
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
                  <SummaryCard title="Total Items Sold" value={data?.orders?.totalItemsSold || 0} darkMode={darkMode} />
                  <SummaryCard title="New Customers" value={data?.customers?.newToday || 0} darkMode={darkMode} />
                  <SummaryCard 
                    title="Avg. Revenue per Order"
                    value={`₹${data?.orders?.totalRevenue && data?.orders?.totalOrders 
                      ? (data.orders.totalRevenue / data.orders.totalOrders).toFixed(2) 
                      : 0}`} 
                    darkMode={darkMode}
                  />
                  <SummaryCard title="Cancelled Orders" value={data?.orders?.cancelledOrders || 0} darkMode={darkMode} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
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
