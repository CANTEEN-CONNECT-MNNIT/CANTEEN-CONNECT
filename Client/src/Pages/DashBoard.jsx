import React, { useRef, useState } from 'react';
import Sidebar from '../Components/SideBar/Sidebar';
import NavigationBar from '../Components/Header/NavigationBar';
import Header from '../Components/Header/Header';
import MainContent from '../Components/Main/MainContent';
import { Footer } from '../Components/Home/Footer';
import Payment from '../Components/Payment/Payment';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const isOpen = useSelector((state) => state.page.isOpen);
  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const footerRef = useRef(null);
  const [showPayment, setShowPayment] = useState(false);

  // handleCheckout of Cart
  const handleCheckout = () => {
    setShowPayment(true);
  };

  return (
    <div
      className={`h-full font-serif ${
        darkMode ? 'bg-slate-800' : 'bg-slate-100'
      }`}
    >
      <div
        className={`fixed top-0 left-0 h-full z-50 shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {' '}
        <Sidebar />
      </div>
      <NavigationBar />
      <div className='flex flex-col -z-10  h-full w-full'>
        {showPayment ? (
          <Payment showPayment={showPayment} setShowPayment={setShowPayment} />
        ) : (
          <div className='flex flex-col h-full w-full'>
            <Header onCheckout={handleCheckout} />
            <MainContent onCheckout={handleCheckout} />
          </div>
        )}
      </div>
      <Footer ref={footerRef} />
    </div>
  );
};

export default Dashboard;
