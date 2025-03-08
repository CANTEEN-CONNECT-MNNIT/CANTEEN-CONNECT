import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { IoFlameSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';

const TrendingFood = ({ list }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const [currentIndex, setCurrentIndex] = useState(0);
  const trending = list?.filter((item) => item?.available !== 'out_of_stock') || [];

  if (trending.length < 3) return <></>;
  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 2) % trending.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 2 + trending.length) % trending.length);
  };


  const translateX = -(currentIndex * 50); // Adjusted to show two items per view

  return (
    <div className="mb-14">
      <div className="flex items-center relative p-2 ml-14 mb-6">
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
          {trending.map((item, idx) => (
            <div key={item?._id || idx} className="min-w-[50%] flex-shrink-0 px-2"> {/* Adjusted width to 50% to show two items */}
              <div className="relative w-full h-72 rounded-2xl overflow-hidden group">
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white text-xl font-bold mb-2">{item?.name}</h3>
                    <div className="flex justify-between items-center my-2">
                      {item.averageRating > 0 && <span className='px-3 py-1 rounded-full text-sm bg-white/20 backdrop-blur-md text-white'>
                        {Array.from({ length: 5 }, (_, index) => (
                          <FaStar
                            key={index}
                            className={`w-4 h-4 inline ${index < item.averageRating ? 'fill-yellow-400' : 'fill-gray-400'
                              }`}
                          />
                        ))}
                        {/* totalReview pending */}
                      </span>}

                      <span className={`px-3 py-1 rounded-full text-lg ml-auto ${darkMode ? 'bg-gray-800/90 text-gray-200' : 'bg-white/90 text-gray-800'
                        }`}>₹{item?.price}</span>
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
