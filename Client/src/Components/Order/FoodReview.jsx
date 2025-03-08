import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import ratingService from "../../ApiService/ratingService";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../Redux/Slices/UserSlice";

const FoodReview = ({ foodId }) => {
    const [userReview, setUserReview] = useState(null);
    const [rating, setRating] = useState(userReview?.rating || 0);
    const [hoverRating, setHoverRating] = useState(userReview?.rating || 0);
    const [review, setReview] = useState(userReview?.review || "");
    const [totalPages, setTotalPages] = useState(1);
    const [currPage, setCurrPage] = useState(1);
    const [allReviews, setAllReviews] = useState([]);
    const [isloading, setIsloading] = useState(false);
    const darkMode = useSelector((state) => state.theme.isDarkMode);
    const dispatch=useDispatch();

    const reviewListRef = useRef(null);

    useEffect(() => {
        fetchReviewData();
    }, [currPage]);


    const handleScroll = () => {
        if (!reviewListRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = reviewListRef.current;

        // Check if scrolled to bottom of the review container
        if (scrollTop + clientHeight >= scrollHeight - 10 && currPage < totalPages) {
            setCurrPage((prevPage) => prevPage + 1); // Load next page of reviews
        }
    };

    const fetchReviewData = async () => {
        try {
            const res = await ratingService.getAll({ _id: foodId, page:currPage });
            if (res) {
                setTotalPages(res?.totalPages || 0);
                //res?.currentPage
                setAllReviews(res?.allreviews);
                setUserReview(res?.userReview);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const updateReview = async () => {
        if(rating==0){
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
            if (res) {
                console.log(res);
                setUserReview(res);
            }
        } catch (error) {
            console.error(error);
        }
        setIsloading(false);
    }


    return (
        <div className={`p-2 max-w-lg mx-auto ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-200 text-gray-900'} rounded-lg shadow-md`}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold ">Leave Your Review</h2>

                {/* Editable star rating */}
                <div className="flex mb-2">
                    {Array.from({ length: 5 }, (_, index) => (
                        <FaStar
                            key={index}
                            className={`w-6 h-6 cursor-pointer ${index < (hoverRating || rating) ? "fill-yellow-400" : "fill-gray-400"
                                }`}
                            onClick={() => setRating(index + 1)}
                            onMouseEnter={() => setHoverRating(index + 1)}
                            onMouseLeave={() => setHoverRating(0)}
                        />
                    ))}
                </div>
            </div>

            {/* Editable review text */}
            <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review..."
                className="w-full p-2 border rounded-md mb-4 text-black text-sm"
            />

            {(review !== userReview?.review || rating !== userReview?.rating) && <button
                onClick={updateReview}
                className="w-full bg-orange-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-orange-600"
            >
                {!isloading ? userReview ? 'Update Review' : 'Review Done' : 'Loading...'}
            </button>}

            {/* Other users' reviews */}
            {allReviews && allReviews?.length>0 && 
            <>
            <h3 className="text-lg font-semibold mb-2">Other Reviews</h3>
            <div
                ref={reviewListRef}
                onScroll={handleScroll}
                className="max-h-80 overflow-y-auto border rounded-md p-2"
            >
                <ul className="space-y-3">
                    {allReviews.map((item) => {
                        item?.user?._id !== userReview?.user?._id &&
                        <li key={item?.user?._id} className="border-b pb-2">
                            <div className={`flex mb-1 ${darkMode
                                    ? 'bg-slate-800 border-slate-700'
                                    : 'bg-white border-gray-100'
                                }`}>
                                {Array.from({ length: 5 }, (_, index) => (
                                    <FaStar
                                        key={index}
                                        className={`w-4 h-4 ${index < item.rating ? "fill-yellow-400" : "fill-gray-400"
                                            }`}
                                    />
                                ))}
                            </div>
                            <p className={`text-sm font-medium opacity-75 ${darkMode ? 'text-gray-400' : 'text-gray-700'
                                }`}>{item.review}</p>
                        </li>
                    }
                    )}
                </ul>
                {currPage < totalPages && (
                    <p className="text-center text-sm text-gray-500 mt-4">
                        Loading more reviews...
                    </p>
                )}
            </div>
            </>}
        </div>
    );
};

export default FoodReview;
