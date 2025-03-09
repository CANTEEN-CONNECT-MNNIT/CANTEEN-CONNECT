import React, { useState } from 'react';
import { FaHeart, FaShoppingCart, FaStar, FaInfoCircle } from 'react-icons/fa'; // Import icons from react-icons
import { useSelector, useDispatch } from 'react-redux';
import userService from '../../ApiService/userApiService';
import { setError, setSuccess } from '../../Redux/Slices/UserSlice';
import cartService from '../../ApiService/cartService';
import { setCart } from '../../Redux/Slices/CartSlice';

const FoodCard = ({
  id,
  name,
  price,
  desc,
  img,
  rating,
  nutrients,
  handleToast,
  favourite,
  totalReview,
}) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.isDarkMode);

  
  const [isFavourite, setisFavourite] = useState(favourite);
  const [isHovered, setIsHovered] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleAddToCart = async () => {
    try {
      const res = await cartService.updateCart({ _id: id });
      if (res) {
        dispatch(setCart(res?.cart));
        dispatch(setSuccess('Added to Cart!'));
      }
    } catch (error) {
      dispatch(setError(error?.response?.data?.message));
      console.error(error);
    }
  };

  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = darkMode ? 'text-gray-200' : 'text-gray-800';
  const descColor = darkMode ? 'text-gray-400' : 'text-gray-600';

  const handleFavourite = async () => {
    const res = isFavourite
      ? await userService.removeFavourite({ _id: id })
      : await userService.addFavourite({ _id: id });
    if (res) {
      setisFavourite(!isFavourite);
    }
  };

  return (
    <div
      className={`${cardBg} rounded-xl shadow-md overflow-hidden transform transition-all duration-300 ${
        isHovered ? 'scale-105' : ''
      } min-w-fit`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='relative overflow-hidden group'>
        <img
          src={img}
          alt={name}
          className='w-full h-40 object-cover transform transition-transform duration-700 group-hover:scale-110'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

        <button
          onClick={handleFavourite}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
            isFavourite
              ? 'bg-red-500 text-white'
              : 'bg-white/20 text-white hover:bg-white/40'
          }`}
        >
          <FaHeart
            className={`w-5 h-5 transition-transform duration-300 ${
              isFavourite ? 'fill-current scale-110' : ''
            }`}
          />
        </button>

        <button
          onClick={() => setShowInfo(true)}
          className='absolute top-3 left-3 p-2.5 rounded-full backdrop-blur-md bg-white/20 text-white hover:bg-white/40'
        >
          <FaInfoCircle className='w-5 h-5' />
        </button>

        <div className='absolute bottom-3 left-3 right-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          {rating>0 && <span className='px-3 py-1 rounded-full text-sm bg-white/20 backdrop-blur-md text-white'>
            {Array.from({ length: 5 }, (_, index) => (
              <FaStar
                key={index}
                className={`w-4 h-4 inline ${
                  index < rating ? 'fill-yellow-400' : 'fill-gray-400'
                }`}
              />
            ))}
            {/* totalReview pending */}
          </span>}
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              darkMode ? 'bg-gray-800/90' : 'bg-white/90'
            } backdrop-blur-md ${textColor} ml-auto` }
          >
            ₹{price}
          </span>
        </div>
      </div>

      <div className='flex flex-col gap-3 p-5'>
        <h3 className={`font-bold text-lg ${textColor} mb-1`}>{name}</h3>
        <p className={`text-sm ${descColor} line-clamp-2`}>{desc}</p>

        <button
          onClick={handleAddToCart}
          className='w-full flex items-center px-6 justify-center gap-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2 rounded-xl transition-all duration-300 transform hover:shadow-lg'
        >
          <FaShoppingCart className='w-4 h-4' />
          <span className='font-medium'>Add to Cart</span>
        </button>
      </div>

      {showInfo && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50'>
          <div className='bg-white text-gray-700  dark:bg-gray-800 rounded-lg p-6 max-w-md w-full'>
            <h2 className='text-xl font-semibold mb-4'>More about {name}</h2>
            <div className='mb-4'>
              <p className='text-gray-700 dark:text-gray-300 mb-2'>{desc}</p>
              {nutrients && (
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  <strong>Nutrients:</strong>
                  <p>{nutrients}</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowInfo(false)}
              className='mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodCard;
