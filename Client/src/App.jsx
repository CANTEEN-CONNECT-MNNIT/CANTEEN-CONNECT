import React  from "react";
import {  Route, Routes, useLocation, useNavigate } from "react-router-dom";
import OrderPage from "./Pages/OrderPage";
import Error from "./Pages/Error";
import Dashboard from "./Pages/DashBoard.jsx";
import Home from "./Pages/Home";
import Canteen from "./Components/SideBar/Canteen";
import Favorite from "./Components/SideBar/Favorite";
import CanteenPage from "./Pages/CanteenPage";
import Profile from "./Components/SideBar/Profile";
import { useDispatch,useSelector } from "react-redux";
import { setactiveMenu, setMerchantProfileOpen } from "./Redux/Slices/pageSlice";
import { setProfileOpen } from "./Redux/Slices/pageSlice";
import { AppProvider } from "./Context/AppContext.jsx";
import MerchantProfile from "./Components/SideBar/MerchantProfile.jsx";


const App = () => {
  const dispatch=useDispatch();
  const activeMenu = useSelector((state) => state.page.activeMenu);
  const profileOpen=useSelector((state)=>state.page.profileOpen);
  const merchantprofileOpen=useSelector((state)=>state.page.merchantprofileOpen);
 const location=useLocation();
  
  /*For All Pop up Box Close */
  const onClose = function() {
    if(location.pathname==='/dashboard'){dispatch(setactiveMenu("Dashboard"));}
    else dispatch(setactiveMenu("Track Order"));
  };

  console.log(activeMenu)
  return (
    <AppProvider> 
      <div>
      {activeMenu === 'Canteen' && <Canteen onClose={onClose} />} 
      {activeMenu === 'Favorites' && <Favorite onClose={onClose} />}

      {profileOpen && (
        <Profile onClose={(state) => dispatch(setProfileOpen(false))} />
      )}
      {merchantprofileOpen && (
        <MerchantProfile onClose={(state) => dispatch(setMerchantProfileOpen(false))} />
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
    </AppProvider>
    
  );
};

export default App;