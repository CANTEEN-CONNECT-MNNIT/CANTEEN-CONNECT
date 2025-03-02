import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import CanteenInfo from '../Components/Home/CanteenInfo';
import LoginBox from '../Components/Home/LoginBox';
import SignUpBox from '../Components/Home/SignUpBox';
import FoodCarousel from '../Components/Home/FoodCarousel';
import ForgotPassword from './ForgotPass';
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Home/Loading';
import Hero from '../Components/Home/Hero';
import { Footer } from '../Components/Home/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../Redux/Slices/themeSlice';
import { setactiveMenu, setOpen } from '../Redux/Slices/pageSlice';

function Home() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.isDarkMode);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // success determines the login of user
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate('/dashboard');
        dispatch(setactiveMenu('Dashboard'));
        dispatch(setOpen(false));
      }, 2000);
    }
  }, [success]);

  return (
    <div
      className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}
    >
      {success ? (
        <Loading />
      ) : (
        <>
          <nav className='fixed w-full z-50 bg-orange-50 dark:bg-gray-800 shadow-lg'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='flex justify-between h-20'>
                <div className='left-0 flex-shrink-0 flex items-center'>
                  <h1 className='text-3xl font-bold text-orange-600 dark:text-orange-400'>
                    Canteen{' '}
                    <span className='text-slate-600 dark:text-white font-bold'>
                      Connect
                    </span>
                  </h1>
                </div>

                <div className='hidden md:flex items-center space-x-5'>
                  <button
                    onClick={() => dispatch(toggleTheme())}
                    className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700'
                  >
                    {darkMode ? (
                      <FaSun className='h-7 w-7 text-orange-500' />
                    ) : (
                      <FaMoon className='h-5 w-5 text-orange-500' />
                    )}
                  </button>
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className='px-4 py-2 text-xl font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors'
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowSignUpModal(true)}
                    className='px-4 py-2 text-xl font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-lg'
                  >
                    Sign Up
                  </button>
                </div>

                <div className='md:hidden flex items-center'>
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className='p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                  >
                    {mobileMenuOpen ? (
                      <FaTimes className='h-6 w-6' />
                    ) : (
                      <FaBars className='h-6 w-6' />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`md:hidden transition-all duration-300 ease-in-out ${
                mobileMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden`}
            >
              <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                <button
                  onClick={() => dispatch(toggleTheme())}
                  className='w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                >
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className='w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setShowSignUpModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className='w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-orange-500 hover:bg-orange-600 transition-colors'
                >
                  Sign Up
                </button>
              </div>
            </div>
          </nav>

          <main className='pt-20'>
            <Hero />

            <div className='text-center mt-8 mb-6'>
              <h2 className='text-4xl font-bold text-gray-700 dark:text-white'>
                Today's Special
              </h2>
            </div>

            <FoodCarousel />

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
              <CanteenInfo />
            </div>
            <Footer />
          </main>

          {showLoginModal && (
            <LoginBox
              setSuccess={setSuccess}
              setShowLoginModal={setShowLoginModal}
              setShowSignUpModal={setShowSignUpModal}
              onforgetPass={() => {
                setShowForgotPasswordModal(true);
                setShowLoginModal(false);
              }}
              onClose={() => setShowLoginModal(false)}
            />
          )}
          {showSignUpModal && (
            <SignUpBox
              setSuccess={setSuccess}
              setShowLoginModal={setShowLoginModal}
              setShowSignUpModal={setShowSignUpModal}
              onClose={() => setShowSignUpModal(false)}
            />
          )}
          {showForgotPasswordModal && (
            <ForgotPassword onClose={() => setShowForgotPasswordModal(false)} />
          )}
        </>
      )}
    </div>
  );
}

export default Home;
