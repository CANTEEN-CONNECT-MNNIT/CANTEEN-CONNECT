import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../Components/SideBar/Sidebar';
import NavigationBar from '../Components/Header/NavigationBar';
import Header from '../Components/Header/Header';
import MainContent from '../Components/Main/MainContent';
import { Footer } from '../Components/Home/Footer';
import { useDispatch, useSelector } from 'react-redux';
import Cart from '../Components/Main/Cart';
import cartService from '../ApiService/cartService';
import { setCart } from '../Redux/Slices/cartSlice';

const Dashboard = () => {
  const isOpen = useSelector((state) => state.page.isOpen);
  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const footerRef = useRef(null);
  const dispatch = useDispatch();

  const fetchCart = async () => {
    try {
      const res = await cartService.get();
      if (res) {
        dispatch(setCart(res));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

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
        <div className='flex flex-col h-full w-full'>
          <Header />
          <MainContent />
        </div>
      </div>
      <Cart />
      <Footer ref={footerRef} />
    </div>
  );
};

export default Dashboard;
