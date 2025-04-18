//Navigation Bar have website title ,profile ,darkmode btn
import React from 'react';
import { FiSun, FiMoon, FiUser, FiMenu } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toggleTheme } from '../../Redux/Slices/themeSlice';
import { setMerchantProfileOpen, setOpen } from '../../Redux/Slices/pageSlice';
import { setProfileOpen } from '../../Redux/Slices/pageSlice';
import SignoutButton from './SignoutButton';
import { logout, setError } from '../../Redux/Slices/UserSlice';
import userService from '../../ApiService/userApiService';
const NavigationBar = () => {
  const isOpen = useSelector((state) => state.page.isOpen);
  const location = useLocation();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.isDarkMode);
  console.log(location);
  const navigate = useNavigate();
  const { user }= useSelector((state)=>state.user);

  //This is Signout from Canteen Route
  const onSignOut = async() => {
    /* Logic for Sign Out */
    try {
      dispatch(setError(''));
      const res=await userService.logout();
      if(res){
        dispatch(logout());
        dispatch(setOpen(false));
      }
    } catch (error) {
      dispatch(setError(error?.response?.data?.message));
      console.log(error);
      
    }
  };

  console.log(location.pathname)
  return (
    <div
      className={`absolute ${
        darkMode 
          ? user?.role==='Canteen'
            ? 'bg-slate-100/20'
            : 'bg-transparent'
          : user?.role==='Student'
          ? !darkMode && location.pathname === '/OrderPage' ?  'bg-stone-800 shadow-lg':''
          : 'bg-stone-800 shadow-lg'
      } top-0 z-10 left-0 right-0 px-4`}
    >
      <div className='flex mt-0 items-center justify-between py-4 '>
        <div className={` flex items-center gap-4 ml-4`}>
          {(location.pathname !== '/dashboard' || user?.role!=='Canteen') && (
            <button
              onClick={() => dispatch(setOpen(true))}
              className='text-white hover:text-orange-400 hover:bg-gray-800 hover:rounded-3xl transition-colors'
            >
              <FiMenu className='rounded-2xl p-1' size={30} />
            </button>
          )}
          {(!isOpen || (location.pathname === '/dashboard' && user?.role==='Canteen')) && (
            <div
              className={`flex items-center gap-2 text-2xl md:text-3xl font-bold text-white tracking-tight transition-transform duration-300`}
            >
              <span>Canteen</span>
              <span className='text-orange-500 hover:text-orange-400 transition-colors'>
                Connect
              </span>
            </div>
          )}
        </div>

        <div className='flex items-center gap-4 md:gap-8 lg:gap-16 p-3 mr-4 md:mr-10 lg:mr-20'>
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`p-2 rounded-full ${
              darkMode ? 'bg-yellow-500' : ''
            } text-white hover:bg-opacity-80 transition-colors`}
            aria-label='Toggle theme'
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          <button
            onClick={(state) => {
              if (location.pathname === '/dashboard' && user?.role==='Canteen')
                dispatch(setMerchantProfileOpen(true));
              else dispatch(setProfileOpen(true));
            }}
            className='text-white hover:text-orange-400 transition-colors'
          >
            <FiUser size={20} />
          </button>

          {(location.pathname === '/dashboard' && user?.role==='Canteen') && (
            <SignoutButton onSignOut={onSignOut} />
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
