import React, { useState, useEffect } from 'react';
import { IoFlameSharp } from "react-icons/io5";
import { useDispatch,useSelector } from 'react-redux';

const trendingItems = [
  {
    id: 't1',
    name: 'Butter Chicken',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=500',
    price: 120,
    orders: 280
  },
  {
    id: 't2',
    name: 'Biryani',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=500',
    price: 100,
    orders: 310
  },
  {
    id: 't3',
    name: 'Paneer Tikka',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=500',
    price: 50,
    orders: 220
  },
  {
    id: 't4',
    name: 'Masala Dosa',
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&q=80&w=500',
    price: 70,
    orders: 245
  },
  {
    id: 't5',
    name: 'Thali Special',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=500',
    price: 150,
    orders: 190
  }
];

const TrendingFood = () => {
    const dispatch=useDispatch();
    const darkMode = useSelector((state) => state.theme.isDarkMode);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); 
    return () => clearInterval(interval); 
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 2) % trendingItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 2 + trendingItems.length) % trendingItems.length);
  };

  const translateX = -(currentIndex * 50); // Adjusted to show two items per view

  return (
    <div className="mb-14">
      <div className="flex items-center relative ml-14 mb-6">
        <IoFlameSharp className="h-6 w-6 text-orange-500" />
        <h2 className={`${darkMode ? 'text-white' : 'text-slate-800'} text-2xl font-bold`}>Trending Now</h2>
      </div>

      <div className="relative max-w-screen-lg mx-auto overflow-hidden">
        <button onClick={handlePrev} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 z-10">
          ❮
        </button>

        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${translateX}%)` }}
        >
          {[...trendingItems, ...trendingItems].map((item, index) => (
            <div key={index} className="min-w-[50%] flex-shrink-0 px-2"> {/* Adjusted width to 50% to show two items */}
              <div className="relative w-full h-72 rounded-2xl overflow-hidden group">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white text-xl font-bold mb-2">{item.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-white text-lg">₹{item.price}</span>
                      <span className="text-orange-400 text-xs">{item.orders}+ orders today</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={handleNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 z-10">
          ❯
        </button>
      </div>
    </div>
  );
};

export default TrendingFood;
