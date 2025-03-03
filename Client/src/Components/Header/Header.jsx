import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useAppContext } from '../../Context/AppContext';
import toast, { Toaster } from 'react-hot-toast';
import { useSearchingItems } from '../../Data/SearchingFood';
import { v4 as uuidv4 } from 'uuid';
import { setSearch } from '../../Redux/Slices/SearchSlice';
import { setOpen } from '../../Redux/Slices/CartSlice';

const Header = () => {
  const { setLoc } = useAppContext();
  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const dispatch = useDispatch();

  /*Handle Search Functionality*/
  const [searchQuery, setSearchQuery] = useState(null);

  const { data: searchedData, isLoading: searching } =
    useSearchingItems(searchQuery);

  const getUniqueItemsByName = (data) => {
    const uniqueNames = new Map();
    data.forEach((item) => {
      if (item?.name && !uniqueNames.has(item.name)) {
        uniqueNames.set(item.name, item);
      }
    });
    return Array.from(uniqueNames.values());
  };

  const searchlist =
    searchedData?.length > 0
      ? getUniqueItemsByName(searchedData)?.slice(0, 3)
      : [];
  /*For Order Now Button on the Dashboard*/
  const { cart: cartItems, isOpen } = useSelector((state) => state.cart);
  const totalQty = (Array.isArray(cartItems) ? cartItems : []).reduce(
    (totalQty, item) => totalQty + (item.qty || 0),
    0
  );
  const handleLessToast = (text) => toast.error(text || `Cart is Empty `);

  const setSearchText = (txt) => {
    if (txt?.trim() !== '') dispatch(setSearch(txt));
    setSearchQuery(null);
  };

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
                value={searchQuery?.name || ''}
                onChange={(e) => setSearchQuery({ name: e.target.value })}
                placeholder='Search for meals...'
                className={`w-full px-8 py-4 rounded-full ${
                  darkMode
                    ? 'bg-slate-800 text-white'
                    : 'bg-white/15 backdrop-blur-sm text-white'
                } transition-all duration-300`}
              />
              <button
                className='absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-200 hover:text-orange-500 transition-colors'
                onClick={() => setSearchText(searchQuery?.name)}
              >
                <FiSearch size={24} />
              </button>

              {searchQuery && searchQuery?.name?.length > 3 && (
                <ul
                  className={`absolute z-50 top-full left-0 w-full ${
                    darkMode
                      ? 'bg-slate-700 text-white'
                      : 'bg-white/15 backdrop-blur-sm text-white'
                  } shadow-lg rounded-lg mt-2 max-h-60 overflow-y-auto`}
                >
                  {searching ? (
                    <li className='p-4 text-center text-gray-500'>
                      Loading...
                    </li>
                  ) : searchlist?.length > 0 ? (
                    searchlist.map((item) => (
                      <li
                        key={item?._id || uuidv4()}
                        className={
                          'p-4 hover:bg-orange-500 hover:text-white cursor-pointer transition-colors'
                        }
                        onClick={() => setSearchText(item?.name)}
                      >
                        {item?.name}
                      </li>
                    ))
                  ) : (
                    <li className='p-4 text-center text-gray-500'>
                      No results found.
                    </li>
                  )}
                </ul>
              )}
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
