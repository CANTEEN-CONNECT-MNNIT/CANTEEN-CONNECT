import React, { useState } from "react";
import Header from "../Components/Header/Header";
import MainContent from "../Components/Main/MainContent";
import Sidebar from "../Components/SideBar/Sidebar";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen,setOpen]=useState(false);

  const toggleDarkMode=()=>{
    setDarkMode(!darkMode);
  }
  return (
    <div className={`h-full  flex font-serif bg-slate-300 ${darkMode && "dark"}`}>
      <Sidebar isOpen={isOpen} setOpen={setOpen}  />
      <div className='flex flex-col gap-7 h-full w-full'>
        <Header isOpen={isOpen}/>
        <MainContent isOpen={isOpen}/>
      </div>
    </div>
  )
};

export default Home
