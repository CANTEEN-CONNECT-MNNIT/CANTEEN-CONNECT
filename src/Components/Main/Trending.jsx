import React, { useState, useEffect } from 'react';
import { IoFlameSharp } from "react-icons/io5";

const trendingItems = [
  { id: 't1', name: 'Supreme Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=500', price: 19.99, orders: 250 },
  { id: 't2', name: 'Deluxe Burger', image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=500', price: 15.99, orders: 180 },
  { id: 't3', name: 'Sushi Platter', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=500', price: 24.99, orders: 150 },
  { id: 't4', name: 'Pasta Carbonara', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=80&w=500', price: 17.99, orders: 220 },
  { id: 't5', name: 'Tacos', image: 'https://images.unsplash.com/photo-1604147706283-ec292055ff15?auto=format&fit=crop&q=80&w=500', price: 10.99, orders: 190 },
];

const TrendingFood = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); 
    return () => clearInterval(interval); 
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + trendingItems.length) % trendingItems.length);
  };

  const translateX = -(currentIndex * 100);

  return (
    <div className="mb-14">
      <div className="flex items-center relative ml-14 mb-6">
        <IoFlameSharp className="h-6 w-6 text-orange-500" />
        <h2 className="text-2xl font-bold text-gray-800">Trending Now</h2>
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
            <div key={index} className="min-w-[25%] flex-shrink-0 px-2">
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
                      <span className="text-white text-lg">${item.price}</span>
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
