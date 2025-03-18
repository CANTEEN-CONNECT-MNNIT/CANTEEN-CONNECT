import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import ratingService from "../../ApiService/ratingService";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../Redux/Slices/UserSlice";
import FoodRating from "./FoodRating";

const FoodReview = ({ foods, canteen }) => {
    const [userReview, setUserReview] = useState(null);
    const [canteenRating, setCanteenRating] = useState(userReview?.rating || 0);
    const [foodRatings, setFoodRatings] = useState({});
    const [hoverRating, setHoverRating] = useState(userReview?.rating || 0);
    const [review, setReview] = useState(userReview?.review || "");
    const [isloading, setIsloading] = useState(false);
    const [fetchingUserReview, setFetchingUserReview] = useState(true);
    const darkMode = useSelector((state) => state.theme.isDarkMode);
    const dispatch=useDispatch();

    useEffect(() => {
        fetchReviewData();
    }, []);

    const fetchReviewData = async () => {
        try {
            setFetchingUserReview(true);
            const res = await ratingService.getAll({ _id: canteen._id});
            if (res) {
                setUserReview(res?.userReview);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setFetchingUserReview(false);
        }
    }

    const updateReview = async () => {
        if(canteenRating==0){
            dispatch(setError('Rating 🌟 is required!'));
            return;
        }
        if(review?.trim()?.length==0){
            dispatch(setError('Review is required!'));
            return;
        }
        setIsloading(true);
        try {
            const res = userReview?._id?await ratingService.updateReview({ ...userReview, rating: rating, review: review })
            :
            await ratingService.addReview({_id:foodId,rating,review});
            if(!userReview){
                const fooditem_ratings = Object.keys(foodRatings).map((foodId) => ({
                    _id: foodId, // Convert string to number (if necessary)
                    rating: foodRatings[foodId], // Get the corresponding rating
                  }));
                const ratingRes=await ratingService.foodRatings({fooditem_ratings});
                if(ratingRes){
                    setFoodRatings({});
                }
            }
            if (res) {
                console.log(res);
                setUserReview(res);
            }
        } catch (error) {
            console.error(error);
        }
        setIsloading(false);
    }

    const handleItemRating = (foodId, rating) => {
        setFoodRatings((prevRatings) => ({
          ...prevRatings,
          [foodId]: rating,  // Update rating for the specific foodId
        }));
      };


    return (
        <div className={`p-2 max-w-lg mx-auto ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-200 text-gray-900'} rounded-lg shadow-md`}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Leave Your Review</h2>
            </div>

            {/* List of Items with Star Ratings */}
            {!fetchingUserReview && !userReview && <div className="mb-4">
                <h3 className="text-lg font-medium">Items:</h3>
                {foods.map((item) => <FoodRating food={item} handleItemRating={handleItemRating}/>)}
            </div>}

            {/* Canteen Review with Star Rating */}
            <div className="mb-4">
                <h3 className="text-lg font-medium">Canteen Review:</h3>
                <div className="flex mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                        <FaStar
                            key={i}
                            className={`w-6 h-6 cursor-pointer ${i < (hoverRating || canteenRating) ? 'fill-yellow-400' : 'fill-gray-400'}`}
                            onClick={() => setCanteenRating(i + 1)}
                            onMouseEnter={() => setHoverRating(i + 1)}
                            onMouseLeave={() => setHoverRating(0)}
                        />
                    ))}
                </div>

                {/* Editable review text */}
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your review..."
                    className="w-full p-2 border rounded-md mb-4 text-black text-sm"
                />

                {(review !== userReview?.review || canteenRating !== userReview?.rating) && (
                    <button
                        onClick={() => updateReview({ ratings, canteenRating, review })}
                        className="w-full bg-orange-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-orange-600"
                    >
                        {!isloading ? userReview ? 'Update Review' : 'Submit Review' : 'Loading...'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default FoodReview;
