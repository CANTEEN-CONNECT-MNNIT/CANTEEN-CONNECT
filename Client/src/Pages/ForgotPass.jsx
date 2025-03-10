import React, { useState } from 'react'
import Loading from '../Components/Loading';
import { useSelector } from 'react-redux';
import ForgotPassword from '../Components/Home/ForgotPass';
import { FaBars, FaMoon, FaSun, FaTimes } from 'react-icons/fa';


function ForgotPass() {
    
  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (
        <div
            className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}
        >
                    <nav className='fixed top-0 w-full z-50 bg-orange-50 dark:bg-gray-800 shadow-lg'>
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
                                        className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700'
                                    >
                                        {darkMode ? (
                                            <FaSun className='h-7 w-7 text-orange-500' />
                                        ) : (
                                            <FaMoon className='h-5 w-5 text-orange-500' />
                                        )}
                                    </button>
                                    <button
                                        className='px-4 py-2 text-xl font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors'
                                    >
                                        Login
                                    </button>
                                    <button
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
                            className={`md:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                                } overflow-hidden`}
                        >
                            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                                <button
                                    className='w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                                >
                                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                                </button>
                                <button
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                    }}
                                    className='w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                    }}
                                    className='w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-orange-500 hover:bg-orange-600 transition-colors'
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </nav>
                        <ForgotPassword />
        </div>
    )
}

export default ForgotPass