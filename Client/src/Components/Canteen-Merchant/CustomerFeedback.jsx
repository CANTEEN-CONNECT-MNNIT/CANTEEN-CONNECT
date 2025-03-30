import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ratingService from '../../ApiService/ratingService';
import { timeFormat } from '../../utility/timeFormat.js';

export default function CustomerFeedback() {
  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const [allReviews, setAllReviews] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currPage, setCurrPage] = useState(1);

  const reviewListRef = useRef(null);

  const handleScroll = () => {
    if (!reviewListRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = reviewListRef.current;

    // Check if scrolled to bottom of the container
    if (
      scrollTop + clientHeight >= scrollHeight - 10 &&
      currPage < totalPages
    ) {
      setCurrPage((prev) => prev + 1); // Load more
    }
  };

  const canteen = useSelector((state) => state.user.canteen);

  const fetchReviewData = async () => {
    try {
      const res = await ratingService.getAll({
        _id: canteen?._id,
        page: currPage,
      });
      if (res) {
        setTotalPages(res?.totalPages || 0);
        //res?.currentPage
        if (res?.allreviews) {
          setAllReviews((prev) => [...prev, ...res.allreviews]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReviewData();
  }, [currPage]);

  return (
    <div
      className={`${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      } rounded-xl shadow-sm border ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      } p-6`}
    >
      <div className='flex justify-between items-center mb-6'>
        <h3 className='text-lg font-semibold'>Customer Feedback</h3>
        <div className='flex items-center space-x-2'>
          <span className='text-yellow-400'>&#9733;</span> {/* Star icon */}
          <span className='font-medium'>{canteen?.averageRating || '-'}</span>
          <span className='text-sm text-gray-500'>
            ({canteen?.totalRatings} reviews)
          </span>
        </div>
      </div>

      <div
        className='space-y-4 max-h-80 overflow-y-scroll hide-scrollbar'
        ref={reviewListRef}
        onScroll={handleScroll}
      >
        {allReviews?.length > 0
          ? allReviews.map((review) => (
              <div
                key={review._id}
                className={`p-4 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                } rounded-lg`}
              >
                <div className='flex items-start space-x-4'>
                  <img
                    src={review?.user?.image}
                    alt={review?.user?.name}
                    className='w-10 h-10 rounded-full'
                  />
                  <div className='flex-1'>
                    <div className='flex items-center justify-between'>
                      <h4 className='font-medium'>{review?.user?.name}</h4>
                      <span className='text-sm text-gray-500'>
                        {timeFormat(review?.updatedAt)}
                      </span>
                    </div>
                    <div className='flex items-center space-x-1 my-1'>
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < review.rating
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        >
                          &#9733; {/* Star icon */}
                        </span>
                      ))}
                    </div>
                    <p className='text-sm'>{review?.review}</p>
                  </div>
                </div>
              </div>
            ))
          : 'No Feedbacks to show!'}
      </div>

      {/* <button
        className={`w-full mt-6 flex items-center justify-center space-x-2 border ${
          darkMode ? 'border-orange-500 text-orange-500' : 'border-orange-600 text-orange-600'
        } py-2 px-4 rounded-lg hover:bg-orange-50 transition-colors`}
      >
        <span>&#9993;</span> 
        <span>View All Reviews</span>
      </button> */}
    </div>
  );
}
