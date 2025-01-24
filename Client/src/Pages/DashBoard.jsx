import React, { useRef, useState } from "react";
import Sidebar from "../Components/SideBar/Sidebar";
import NavigationBar from "../Components/Header/NavigationBar";
import Header from "../Components/Header/Header";
import MainContent from "../Components/Main/MainContent";
import { Footer } from "../Components/Home/Footer";
import Payment from "../Components/Payment/Payment"; 
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Redux/Slices/themeSlice";
import { setProfileOpen } from "../Redux/Slices/pageSlice";

const Dashboard = () => {

  const profileOpen=useSelector((state)=>state.page.profileOpen)
  const CurrentPage=useSelector((state)=>state.page.currentPage)
  const isOpen=useSelector((state)=>state.page.isOpen)
  const dispatch=useDispatch;
 const darkMode = useSelector((state) => state.theme.isDarkMode);
  const footerRef = useRef(null);
  const [showPayment, setShowPayment] = useState(false); 
  const handleCheckout = () => {
    setShowPayment(true);
  };

  return (
    <div className={`h-full font-serif ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}>
      <Sidebar/>
      <NavigationBar/>
      <div className="flex flex-col -z-10  h-full w-full">
        {showPayment ? (
          <Payment showPayment={showPayment} setShowPayment={setShowPayment}/>
        ) : (
          <div className="flex flex-col h-full w-full">
            <Header/>
            <MainContent 
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
