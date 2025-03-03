import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useAppContext } from '../../Context/AppContext';
import toast, { Toaster } from 'react-hot-toast';
import { setOpen } from '../../Redux/Slices/CartSlice';

const Header = () => {
  const { setLoc } = useAppContext();
  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const dispatch = useDispatch();

  /*Handle Search Functionality*/
  const [searchQuery, setSearchQuery] = useState('');

  /*For Order Now Button on the Dashboard*/
  const { cart: cartItems, isOpen } = useSelector((state) => state.cart);
  const totalQty = cartItems.reduce((totalQty, item) => totalQty + item.qty, 0);
  const handleLessToast = () => toast.error(`Cart is Empty `);

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <header
        className={`relative w-full ${
          darkMode ? 'bg-slate-800' : 'bg-white'
        } transition-all duration-300`}
      >
        <div className='relative h-[600px] w-full overflow-hidden'>
          <img
            src='./src/assets/Foodnavbar.jpg'
            alt='Canteen Banner'
            className='absolute inset-0 w-full h-full object-cover brightness-75'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70' />

          <div className='absolute inset-0 flex flex-col items-center justify-center px-6'>
            <h1 className='text-5xl md:text-7xl font-bold text-white mb-6 text-center leading-tight'>
              Discover the Art of
              <span className='block text-orange-500'>Fine Dining</span>
            </h1>

            <p className='text-xl text-gray-200 mb-12 max-w-2xl text-center'>
              Experience culinary excellence with our handcrafted dishes made
              from the finest ingredients.
            </p>

            {/* Search Bar */}
            <div className='w-full max-w-2xl relative group'>
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search for meals...'
                className={`w-full px-8 py-4 rounded-full ${
                  darkMode
                    ? 'bg-slate-800 text-white'
                    : 'bg-white/15 backdrop-blur-sm text-white'
                } transition-all duration-300`}
              />
              <button className='absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-200 hover:text-orange-500 transition-colors'>
                <FiSearch size={24} />
              </button>
            </div>

            <div className='mt-12 flex gap-6'>
              <button
                className='px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg transition-all duration-300'
                onClick={() => {
                  totalQty > 0 ? dispatch(setOpen(true)) : handleLessToast();
                }}
                disabled={isOpen}
              >
                Order Now
              </button>
              <button
                onClick={() => setLoc('menu')}
                className='px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full shadow-lg backdrop-blur-md transition-all duration-300 border-2 border-white/30 hover:border-white/50'
              >
                View Menu
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
