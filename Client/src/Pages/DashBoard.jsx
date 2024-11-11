import React, { useRef, useState } from "react";
import Sidebar from "../Components/SideBar/Sidebar";
import NavigationBar from "../Components/Header/NavigationBar";
import Header from "../Components/Header/Header";
import MainContent from "../Components/Main/MainContent";
import { Footer } from "../Components/Home/Footer";
import Payment from "../Components/Payment/Payment"; 

const Dashboard = ({ CurrentPage, setCurrentPage, darkMode, setDarkMode, isOpen, setOpen,setprofileOpen }) => {
  const footerRef = useRef(null);
  const [showPayment, setShowPayment] = useState(false); 
  const handleCheckout = () => {
    setShowPayment(true); 
  };

  return (
    <div className={`h-full font-serif ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}>
      <Sidebar isOpen={isOpen} setOpen={setOpen} darkMode={darkMode} setCurrentPage={setCurrentPage} />
      <NavigationBar CurrentPage={CurrentPage} isOpen={isOpen} setOpen={setOpen} darkMode={darkMode} setDarkMode={setDarkMode} setprofileOpen={setprofileOpen} />
      
      <div className="flex flex-col -z-10 gap-7 h-full w-full">
        {showPayment ? (
          <Payment showPayment={showPayment} setShowPayment={setShowPayment} darkMode={darkMode} setCurrentPage={setCurrentPage}/>
        ) : (
          <div className="flex flex-col gap-7 h-full w-full">
            <Header setCurrentPage={setCurrentPage} isOpen={isOpen} setOpen={setOpen} darkMode={darkMode} setDarkMode={setDarkMode} />
            <MainContent 
              setCurrentPage={setCurrentPage} 
              isOpen={isOpen} 
              darkMode={darkMode} 
              onCheckout={handleCheckout} 
            />
          </div>
        )}
      </div>

      <Footer ref={footerRef} />
    </div>
  );
};

export default Dashboard;
