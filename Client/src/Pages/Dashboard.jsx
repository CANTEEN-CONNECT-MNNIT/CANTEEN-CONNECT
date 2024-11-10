import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Components/SideBar/Sidebar";
import NavigationBar from "../Components/Header/NavigationBar";
import Header from "../Components/Header/Header";
import MainContent from "../Components/Main/MainContent";
import Footer  from "../Components/Home/Footer";


const Dashboard = ({CurrentPage,setCurrentPage,darkMode,setDarkMode,isOpen,setOpen}) => {
  const footerRef = useRef(null);

  return (
    <div className={`h-full font-serif ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}>
      <Sidebar isOpen={isOpen} setOpen={setOpen} darkMode={darkMode} setCurrentPage={setCurrentPage} />
      <NavigationBar CurrentPage={CurrentPage} isOpen={isOpen} setOpen={setOpen} darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className='flex flex-col gap-7 -z-10 h-full w-full '>
          <div className='flex flex-col gap-7 h-full w-full '>
              <Header setCurrentPage={setCurrentPage} isOpen={isOpen} setOpen={setOpen} darkMode={darkMode} setDarkMode={setDarkMode} />
              <MainContent setCurrentPage={setCurrentPage} isOpen={isOpen} darkMode={darkMode}/>;
           </div>
      </div>
      <Footer ref={footerRef}/>
    </div>
  );
};

export default Dashboard;
