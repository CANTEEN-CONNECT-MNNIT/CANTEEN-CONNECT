// App.jsx
import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import OrderPage from "./Pages/OrderPage";
import Error from "./Pages/Error";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Canteen from "./Components/SideBar/Canteen";
import Favorite from "./Components/SideBar/Favorite";
import CanteenPage from "./Pages/CanteenPage";
import Profile from "./Components/SideBar/Profile";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [CurrentPage, setCurrentPage] = useState("Home");
  const [profileOpen, setprofileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentPage("Home");
    } else if (location.pathname === "/dashboard") {
      setCurrentPage("Dashboard");
    } else if (location.pathname === "/OrderPage") {
      setCurrentPage("OrderPage");
    } else if (location.pathname === "/canteen") {
      setCurrentPage("CanteenPage");
    }
  }, [location]);

  const navigate = useNavigate();
  useEffect(() => {
    if (CurrentPage === 'Track Order') {
      navigate('/OrderPage');
    }
    if (CurrentPage === 'Dashboard') {
      navigate('/dashboard');
    }
  }, [CurrentPage, navigate]);

  const onClose = function() {
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
      {CurrentPage === 'Canteen' && <Canteen onClose={onClose} />}
      {CurrentPage === 'Favorites' && <Favorite onClose={onClose} />}

      {profileOpen && (
        <Profile setprofileOpen={setprofileOpen} onClose={() => setprofileOpen(false)} />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              CurrentPage={CurrentPage}
              setCurrentPage={setCurrentPage}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              isOpen={isOpen}
              setOpen={setOpen}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              CurrentPage={CurrentPage}
              setCurrentPage={setCurrentPage}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              isOpen={isOpen}
              setOpen={setOpen}
              setprofileOpen={setprofileOpen}
            />
          }
        />
        <Route
          path="/OrderPage"
          element={
            <OrderPage
              setCurrentPage={setCurrentPage}
              CurrentPage={CurrentPage}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              isOpen={isOpen}
              setOpen={setOpen}
              setprofileOpen={setprofileOpen}
            />
          }
        />
        <Route
          path="/canteen"
          element={
            <CanteenPage
              CurrentPage={CurrentPage}
              setCurrentPage={setCurrentPage}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              isOpen={isOpen}
              setOpen={setOpen}
            />
          }
        />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
