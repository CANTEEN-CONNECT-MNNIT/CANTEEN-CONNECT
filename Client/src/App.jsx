import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import OrderPage from "./Pages/OrderPage";
import Error from "./Pages/Error";
import Dashboard from "./Pages/DashBoard";
import Home from "./Pages/Home";
import Canteen from "./Components/SideBar/Canteen";
import Favorite from "./Components/SideBar/Favorite";
import CanteenPage from "./Pages/CanteenPage";
import Auth from "./components/Authenticate";


const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [CurrentPage, setCurrentPage] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentPage("Home");
    } else if (location.pathname === "/Dashboard") {
      setCurrentPage("Dashboard");
    } else if (location.pathname === "/OrderPage") {
      setCurrentPage("OrderPage");
    }
    else if (location.pathname === "/canteen") {
      setCurrentPage("CanteenPage");
    }
  }, [location]);

  const navigate=useNavigate();
  useEffect(() => {
    if (CurrentPage === 'Track Order') {
      navigate('/OrderPage');
    }
    if (CurrentPage === 'Dashboard') {
      navigate('/dashboard');
    }
  }, [CurrentPage, navigate]);  

  const onClose=function() {
    const path = location.pathname;
    const pageMapping = {
      '/dashboard': 'Dashboard',
      '/canteen': 'Canteen',
      '/Orderpage': 'Track Order',
    };
    setCurrentPage(pageMapping[path] || 'Dashboard'); 
  };

  return (
    <div>
      {CurrentPage === 'Canteen' && <Canteen onClose={onClose}/>}
      {CurrentPage === 'Favorites' && <Favorite onClose={onClose}/>}
      <Routes>
      <Route
        path="/"
        element={<Auth authentication={false}>
          <Home
            CurrentPage={CurrentPage}
            setCurrentPage={setCurrentPage}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            isOpen={isOpen}
            setOpen={setOpen}
          />
          </Auth>
        }
      />
      <Route
        path="/dashboard"
        element={
          <Auth authentication={true}>
          <Dashboard
            CurrentPage={CurrentPage}
            setCurrentPage={setCurrentPage}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            isOpen={isOpen}
            setOpen={setOpen}
          />
          </Auth>
        }
      />
      <Route
        path="/OrderPage"
        element={
          <Auth authentication={true}>
          <OrderPage
          setCurrentPage={setCurrentPage}
            CurrentPage={CurrentPage}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            isOpen={isOpen}
            setOpen={setOpen}
          />
          </Auth>
        }
      />
      <Route
        path="/canteen"
        element={
          <Auth authentication={true}>
          <CanteenPage
            CurrentPage={CurrentPage}
            setCurrentPage={setCurrentPage}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            isOpen={isOpen}
            setOpen={setOpen}
          />
          </Auth>
        }
      />
      <Route path="/*" element={<Error />} />
    </Routes>
    </div>
    
  );
};

export default App;
