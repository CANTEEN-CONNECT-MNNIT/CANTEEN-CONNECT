import React, { useCallback, useEffect, useMemo, useState } from 'react';
import FoodCard from './FoodCard';
// import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setSuccess } from '../../Redux/Slices/UserSlice';

const FoodItems = ({ FoodData }) => {
  const dispatch = useDispatch();
  const userFavourite =
    useSelector((state) => state.user.user?.favourite) || [];

  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const handleToast = (name) => dispatch(setSuccess(`Added ${name} `));

  const [updatedFoodData, setUpdatedFooddata] = useState([]);

  const modifyFoodData = () => {
    setUpdatedFooddata(
      FoodData.map((item) => ({
        ...item,
        isFavourite: userFavourite?.includes(item?._id),
      }))
    );
  };

  useEffect(() => {
    modifyFoodData();
  }, [FoodData, userFavourite]);
  return (
    <>
      {/* <Toaster position='top-center' reverseOrder={false} /> */}
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
              rating={food?.averageRating}
              img={food?.image}
              // nutrients={food.nutrients}
              totalReview={food?.totalRatings}
              handleToast={handleToast}
              favourite={food?.isFavourite || false}
              availability={food?.available || 'out_of_stock'}
            />
          ))}
      </div>
    </>
  );
};

export default FoodItems;
