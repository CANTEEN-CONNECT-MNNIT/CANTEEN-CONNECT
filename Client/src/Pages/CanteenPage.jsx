import React, { useRef } from "react";
import Sidebar from "../Components/SideBar/Sidebar";
import NavigationBar from "../Components/Header/NavigationBar";
import Footer from "../Components/Home/Footer";
import OrdersDetails from "../Components/Canteen-Merchant/OrdersTable";
import RevenueStats from "../Components/Canteen-Merchant/RevenueStats";
import MenuManagement from "../Components/Canteen-Merchant/MenuMangement";
import CustomerFeedback from "../Components/Canteen-Merchant/CustomerFeedback";

const CanteenPage = ({ CurrentPage, setCurrentPage, darkMode, setDarkMode, isOpen, setOpen }) => {
  const footerRef = useRef(null);

  return (
    <div className={`h-full font-serif transition-all ${darkMode ? "bg-slate-800 text-white" : "bg-slate-100 text-gray-800"}`}>
      <Sidebar isOpen={isOpen} setOpen={setOpen} darkMode={darkMode} setCurrentPage={setCurrentPage} />
      <NavigationBar CurrentPage={CurrentPage} isOpen={isOpen} setOpen={setOpen} darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="relative top-24 ml-auto mr-auto flex flex-col gap-8 h-full w-full px-4  sm:px-6 lg:px-12">
          <div className={`mx-auto mt-10 p-0 text-5xl font-bold ${darkMode?" text-white":"text-orange-800"} `}>Welcome to Your Canteen!</div>
        
        {/* Main Content Sections */}
        <div className='flex flex-col gap-8 h-full w-full'>
          <RevenueStats darkMode={darkMode} />
          <OrdersDetails darkMode={darkMode} />
          <MenuManagement darkMode={darkMode} />
          <CustomerFeedback darkMode={darkMode} />
        </div>
      </div>

      <Footer ref={footerRef} />
    </div>
  );
};

export default CanteenPage;
