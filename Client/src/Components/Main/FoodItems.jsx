import React, { useCallback, useMemo } from 'react';
import FoodCard from './FoodCard';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const FoodItems = ({ FoodData }) => {
  const dispatch = useDispatch();
  const userFavourite =
    useSelector((state) => state.user.user?.favourite) || [];

  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const handleToast = (name) => toast.success(`Added ${name} `);

  const updatedFoodData = useMemo(() => {
    return FoodData.map((item) => ({
      ...item,
      isFavourite: userFavourite?.includes(item?._id),
    }));
  }, [FoodData, userFavourite]);
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <div
        className={`${
          darkMode ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-800'
        } flex w-full flex-wrap gap-4 justify-center relative top-3`}
      >
        {updatedFoodData?.length > 0 &&
          updatedFoodData?.map((food) => (
            <FoodCard
              key={food._id}
              id={food._id}
              name={food.name}
              price={food.price}
              desc={food.description}
              // rating={food.rating}
              img={food.image}
              // nutrients={food.nutrients}
              handleToast={handleToast}
              favourite={food?.isFavourite || false}
            />
          ))}
      </div>
    </>
  );
};

export default FoodItems;
