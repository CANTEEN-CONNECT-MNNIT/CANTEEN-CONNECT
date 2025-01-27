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
import { useDispatch,useSelector } from "react-redux";
import { navigateTo } from "./Redux/Slices/pageSlice";
import { setCurrentPage } from "./Redux/Slices/pageSlice";
import { setProfileOpen } from "./Redux/Slices/pageSlice";
const App = () => {
  const dispatch=useDispatch();
  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const isOpen = useSelector((state) => state.page.isOpen);

  const CurrentPage=useSelector((state)=>state.page.currentPage);
  const profileOpen=useSelector((state)=>state.page.profileOpen)

  const location = useLocation();
  useEffect(() => {
    dispatch(navigateTo(location.pathname));
  }, [location, dispatch]);

  const navigate = useNavigate();
  const onClose = function() {
    const path = location.pathname;
    const pageMapping = {
      '/dashboard': 'Dashboard',
      '/canteen': 'Canteen',
      '/OrderPage': 'Track Order',
    };
    dispatch(setCurrentPage(pageMapping[path] || 'Dashboard')); 
  };
  
  return (
    <div>
      {CurrentPage === 'Canteen' && <Canteen onClose={onClose} />}
      {CurrentPage === 'Favorites' && <Favorite onClose={onClose} />}

      {profileOpen && (
        <Profile onClose={(state) => dispatch(setProfileOpen(false))} />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Home/>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard/>
          }
        />
        <Route
          path="/OrderPage"
          element={
            <OrderPage />
          }
        />
        <Route
          path="/canteen"
          element={
            <CanteenPage/>
          }
        />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
