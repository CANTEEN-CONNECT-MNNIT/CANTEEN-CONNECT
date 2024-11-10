import React from 'react';
import FoodCard from './FoodCard.jsx';
import FoodData from '../../Data/FoodData.js';
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const FoodItems = ({darkMode}) => {
  const category = useSelector((state) => state.category.category);
  const search = useSelector((state) => state.search.search);
  const handleToast = (name) => toast.success(`Added ${name} `);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={`${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-800'} flex w-full flex-wrap gap-4 justify-center relative top-3`}>
        {FoodData.slice(0,8).map((food) => (
          <FoodCard 
          key={food.id}
          id={food.id}
          name={food.name}
          price={food.price}
          desc={food.desc}
          rating={food.rating}
          img={food.img}
          nutrients={food.nutrients}  
          handleToast={handleToast} 
          darkMode={darkMode}
          />
        ))}
      </div>
    </>
  );
};

export default FoodItems;
