import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import OrderPage from './Pages/OrderPage';
import Error from './Pages/Error';
import Dashboard from './Pages/DashBoard.jsx';
import Home from './Pages/Home';
import Canteen from './Components/SideBar/Canteen';
import Favorite from './Components/SideBar/Favorite';
import CanteenPage from './Pages/CanteenPage';
import Auth from './Components/Authenticate';
import Profile from './Components/SideBar/Profile';
import { useDispatch, useSelector } from 'react-redux';
import {
  setactiveMenu,
  setMerchantProfileOpen,
} from './Redux/Slices/pageSlice';
import { AppProvider } from './Context/AppContext.jsx';
import MerchantProfile from './Components/SideBar/MerchantProfile.jsx';
import Payment from './Components/Payment/Payment.jsx';
import { toast, Toaster } from 'react-hot-toast';
import { clearError, clearSuccess } from './Redux/Slices/UserSlice.jsx';

const App = () => {
  const dispatch = useDispatch();
  const activeMenu = useSelector((state) => state.page.activeMenu);
  const profileOpen = useSelector((state) => state.page.profileOpen);
  const merchantprofileOpen = useSelector(
    (state) => state.page.merchantprofileOpen
  );
  const location = useLocation();

  const { user, error, success, canteen, status } = useSelector(
    (state) => state.user
  );

  console.log(user);

  /*For All Pop up Box Close */
  const onClose = function () {
    if (location.pathname === '/dashboard') {
      dispatch(setactiveMenu('Dashboard'));
    } else dispatch(setactiveMenu('Track Order'));
  };

  useEffect(() => {
    if (location.pathname === '/OrderPage') {
      dispatch(setactiveMenu('Track Order'));
    } else {
      dispatch(setactiveMenu('Dashboard'));
    }
  }, [location]);

  useEffect(() => {
    if (error?.length > 0) {
      toast.error(error);
      setTimeout(() => dispatch(clearError()), 3000);
    }
    if (success?.length > 0) {
      toast.success(success);
      setTimeout(() => dispatch(clearSuccess()), 3000);
    }
  }, [error, success, dispatch]);

  console.log(activeMenu);
  return (
    <AppProvider>
      <Toaster />
      <div className='min-h-screen'>
        {activeMenu === 'Canteen' && <Canteen onClose={onClose} />}
        {activeMenu === 'Favorites' && <Favorite onClose={onClose} />}

        {status && profileOpen && <Profile />}
        {canteen && merchantprofileOpen && (
          <MerchantProfile
            onClose={(state) => dispatch(setMerchantProfileOpen(false))}
          />
        )}

        <Routes>
          <Route
            path='/'
            element={
              <Auth authentication={false}>
                <Home />
              </Auth>
            }
          />
          <Route
            path='/dashboard'
            element={
              <Auth authentication={true}>
                {user?.role === 'Canteen' ? <CanteenPage /> : <Dashboard />}
              </Auth>
            }
          />
          {user?.role === 'Student' && (
            <Route
              path='/OrderPage'
              element={
                <Auth authentication={true}>
                  <OrderPage />
                </Auth>
              }
            />
          )}

          {user?.role !== 'Canteen' && (
            <Route
              path='/paymentGateway'
              element={
                <Auth authentication={true}>
                  <Payment />
                </Auth>
              }
            />
          )}

          <Route path='/*' element={<Error />} />
        </Routes>
      </div>
    </AppProvider>
  );
};

export default App;
