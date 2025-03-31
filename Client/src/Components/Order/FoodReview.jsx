import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import ratingService from '../../ApiService/ratingService';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from '../../Redux/Slices/UserSlice';
import FoodRating from './FoodRating';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import orderService from '../../ApiService/orderService';

const FoodReview = ({ foods, canteen, status, orderId, onClose }) => {
  const [userReview, setUserReview] = useState(null);
  const [canteenRating, setCanteenRating] = useState(userReview?.rating || 0);
  const [foodRatings, setFoodRatings] = useState({});
  const [hoverRating, setHoverRating] = useState(userReview?.rating || 0);
  const [review, setReview] = useState(userReview?.review || '');
  const [isloading, setIsloading] = useState(false);
  const [fetchingUserReview, setFetchingUserReview] = useState(true);
  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const dispatch = useDispatch();
  const queryClient=useQueryClient();
  
  useEffect(() => {
    fetchReviewData();
  }, []);

  const fetchReviewData = async () => {
    try {
      setFetchingUserReview(true);
      const res = await ratingService.getAll({ _id: canteen._id });
      if (res) {
        setUserReview(res?.userReview);
        setCanteenRating(res?.userReview?.rating);
        setReview(res?.userReview?.review);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFetchingUserReview(false);
    }
  };

  const mutation = useMutation({
    mutationFn: orderService.updateOrder, 
    onSuccess: () => {
      // Invalidate and refetch the "orders" query to keep data fresh
      queryClient.invalidateQueries(['allOrders']);
    },
    onError: (error) => {
      console.error('Error updating order status:', error?.response?.data?.message);
      //toOpt
    }
  });

  const handleUpdateStatus = () => {
    mutation.mutate({_id:orderId, status:'Success'});
  };

  const updateReview = async () => {
    if (canteenRating == 0) {
      dispatch(setError('Rating 🌟 is required!'));
      return;
    }
    if (review?.trim()?.length == 0) {
      dispatch(setError('Review is required!'));
      return;
    }
    setIsloading(true);
    try {
      if(!userReview || review !== userReview?.review ||
        canteenRating !== userReview?.rating){
        const res = userReview?._id
          ? await ratingService.updateReview({
              ...userReview,
              rating: canteenRating,
              review: review,
            })
          : await ratingService.addReview({
              _id: canteen._id,
              rating: canteenRating,
              review,
            });
        if (res) {
          console.log(res);
          setUserReview(res);
          setCanteenRating(res?.rating);
          setReview(res?.review);
        }
      }
      if (status === 'Delivered') {
        const fooditem_ratings = Object.keys(foodRatings).map((foodId) => ({
          _id: foodId, // Convert string to number (if necessary)
          rating: foodRatings[foodId], // Get the corresponding rating
        }));
        const ratingRes = await ratingService.foodRatings({ fooditem_ratings });
        if (ratingRes) {
          setFoodRatings({});
          handleUpdateStatus();
        }
      }
    } catch (error) {
      dispatch(setError('Try again later...'));
    }
    finally{
      setIsloading(false);
      onClose();
    }
  };

  console.log(userReview);

  const handleItemRating = (foodId, rating) => {
    setFoodRatings((prevRatings) => ({
      ...prevRatings,
      [foodId]: rating, // Update rating for the specific foodId
    }));
  };

  return (
    <div
      className={`p-2 max-w-lg mx-auto ${
        darkMode ? 'bg-slate-900 text-white' : 'bg-slate-200 text-gray-900'
      } rounded-lg shadow-md`}
    >
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-bold'>Leave Your Review</h2>
      </div>

      {/* List of Items with Star Ratings */}
      {!fetchingUserReview && status === 'Delivered' && (
        <div className='mb-4'>
          <h3 className='text-lg font-mediumm mb-2'>Items:</h3>
          {foods.map((item) => (
            <FoodRating
              key={item?._id?._id}
              food={item?._id}
              handleItemRating={handleItemRating}
            />
          ))}
        </div>
      )}

      {/* Canteen Review with Star Rating */}
      <div className='mb-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-medium'>Canteen Review:</h3>
          <div className='flex mb-2'>
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                className={`w-6 h-6 cursor-pointer ${
                  i < (hoverRating || canteenRating)
                    ? 'fill-yellow-400'
                    : 'fill-gray-400'
                }`}
                onClick={() => setCanteenRating(i + 1)}
                onMouseEnter={() => setHoverRating(i + 1)}
                onMouseLeave={() => setHoverRating(0)}
              />
            ))}
          </div>
        </div>

        {/* Editable review text */}
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder='Write your review...'
          className='w-full p-2 border rounded-md mb-4 text-black text-sm'
        />

        {(status==='Delivered' || !userReview ||
          review !== userReview?.review ||
          canteenRating !== userReview?.rating) && (
          <button
            onClick={() => updateReview()}
            className='w-full bg-orange-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-orange-600'
          >
            {!isloading
              ? userReview && status==='Success'
                ? 'Update Review'
                : 'Submit Review'
              : 'Loading...'}
          </button>
        )}
      </div>
    </div>
  );
};

export default FoodReview;
