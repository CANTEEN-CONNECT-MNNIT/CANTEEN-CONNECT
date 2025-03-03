import React from 'react';
import FoodCard from './FoodCard';
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const FoodItems = ({FoodData}) => {
     const dispatch=useDispatch();
    const darkMode = useSelector((state) => state.theme.isDarkMode);
  const handleToast = (name) => toast.success(`Added ${name} `);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={`${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-800'} flex w-full flex-wrap gap-4 justify-center relative top-3`}>
        {FoodData?.map((food) => (
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
          />
        ))}
      </div>
    </>
  );
};

export default FoodItems;
