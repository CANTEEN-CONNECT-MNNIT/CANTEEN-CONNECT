import React, { useState } from 'react';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa'; // Import icons from react-icons
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/Slices/cartSlice';

const FoodCard = ({ id, name, price, desc, img, rating, handleToast, darkMode }) => {
  const [isLoved, setIsLoved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, price, rating, img, qty: 1 }));
    handleToast(name);
  };

  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = darkMode ? 'text-gray-200' : 'text-gray-800';
  const descColor = darkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div
      className={`${cardBg} rounded-xl shadow-md overflow-hidden transform transition-all duration-300 ${
        isHovered ? 'scale-105' : ''
      } max-w-xs`} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden group">
        <img
          src={img}
          alt={name}
          className="w-full h-40 object-cover transform transition-transform duration-700 group-hover:scale-110" // Adjusted height
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <button
          onClick={() => setIsLoved(!isLoved)}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
            isLoved 
              ? 'bg-red-500 text-white' 
              : 'bg-white/20 text-white hover:bg-white/40'
          }`}
        >
          <FaHeart
            className={`w-5 h-5 transition-transform duration-300 ${
              isLoved ? 'fill-current scale-110' : ''
            }`}
          />
        </button>

        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="px-3 py-1 rounded-full text-sm bg-white/20 backdrop-blur-md text-white">
            {Array.from({ length: 5 }, (_, index) => (
              <FaStar
                key={index}
                className={`w-4 h-4 inline ${index < rating ? 'fill-yellow-400' : 'fill-gray-400'}`} 
              />
            ))}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-md ${textColor}`}>
            ₹{price}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-5"> 
        <h3 className={`font-bold text-lg ${textColor} mb-1`}>{name}</h3>
        <p className={`text-sm ${descColor} line-clamp-2`}>
          {desc}
        </p>

        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2 rounded-xl transition-all duration-300 transform hover:shadow-lg"
        >
          <FaShoppingCart className="w-4 h-4" />
          <span className="font-medium">Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
