import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

function FoodRating({ food, handleItemRating }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  console.log(food);

  return (
    <div key={food?._id} className='flex justify-between items-center mb-2'>
      <span className='text-md font-bold text-gray-400'>{food?.name}</span>
      <div className='flex'>
        {Array.from({ length: 5 }, (_, i) => (
          <FaStar
            key={i}
            className={`w-6 h-6 cursor-pointer ${
              i < (hoverRating || rating) ? 'fill-yellow-400' : 'fill-gray-400'
            }`}
            onClick={() => {
              handleItemRating(food?._id, i + 1);
              setRating(i + 1);
            }}
            onMouseEnter={() => setHoverRating(i + 1)}
            onMouseLeave={() => setHoverRating(0)}
          />
        ))}
      </div>
    </div>
  );
}

export default FoodRating;
