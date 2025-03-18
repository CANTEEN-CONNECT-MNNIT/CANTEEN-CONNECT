import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { dateFormat } from '../../utility/dateFormat.js';
import { FaStar } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setError, setSuccess } from '../../Redux/Slices/UserSlice';
import ratingService from '../../ApiService/ratingService.js';

const CanteenModal = ({ onClose, canteen }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);
  const dispatch=useDispatch();

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('review:', { rating, feedback });
    if(!userReview || (userReview?.rating===rating && userReview?.review===review?.trim())) return;
    try {
      const res=await ratingService.updateReview({...userReview,rating:rating,review:review});
      if(res){
        dispatch(setSuccess('Updated Review!'));
      }
    } catch (error) {
      dispatch(setError(error?.response?.data?.message));
      console.error(error);
      
    }
  };

  const renderStars = (count) => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      return (
        <FaStar
          key={index}
          className={`w-5 h-5 ${
            starValue <= count ? 'text-orange-400' : 'text-gray-300'
          }`}
        />
      );
    });
  };

  const renderRatingInput = () => {
    return [...Array(5)].map((_, index) => 
        <button
          key={index}
          type='button'
          onClick={() => setRating(index+1)}
          onMouseEnter={() => setHoveredStar(index+1)}
          onMouseLeave={() => setHoveredStar(0)}
          className='focus:outline-none'
        >
          <FaStar
            className={`w-8 h-8 ${
              index < (hoveredStar || rating || 0)
                ? 'text-orange-400'
                : 'text-gray-300'
            } transition-colors duration-200`}
          />
        </button>
    );
  };

  const [allReviews, setAllReviews] = useState([]);
  const [userReview, setUserReview] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currPage, setCurrPage] = useState(1);
  const reviewListRef = useRef(null);

  const handleScroll = () => {
    if (!reviewListRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = reviewListRef.current;

    // Check if scrolled to bottom of the review container
    if (scrollTop + clientHeight >= scrollHeight - 10 && currPage < totalPages) {
        setCurrPage((prev) => prev + 1); // Load next page of reviews
    }
  };

  const fetchReviewData = async () => {
    try {
        const res = await ratingService.getAll({ _id: canteen?._id, page:currPage });
        if (res) {
            setTotalPages(res?.totalPages || 0);
            //res?.currentPage
            setUserReview(res?.userReview);
            if(res?.allReviews) setAllReviews((prev)=>[...prev,...res.allreviews]);
            setRating(userReview.rating);
            setReview(userReview.review);
        }
    } catch (error) {
        console.error(error);
    }
  }
  
  useEffect(() => {
      fetchReviewData();
  }, [currPage]);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white text-gray-800 rounded-lg shadow-xl m-4'>
        <button
          onClick={onClose}
          className='absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors'
        >
          <AiOutlineClose className='w-6 h-6' />
        </button>

        <div className='p-6'>
          {/* Canteen Information */}
          <div className='mb-4 flex flex-col items-center justify-center'>
            {canteen?.image && (
              <img
                src={canteen?.image}
                alt={canteen?.name}
                className='h-24 my-2 object-center object-cover rounded-full aspect-square'
              />
            )}
            <h2 className='text-3xl font-bold'>{canteen.name}</h2>
          </div>

          <div className='space-y-4 mb-8'>
            {canteen.address && (
              <div>
                <h3 className='text-lg font-semibold'>Location</h3>
                <p>{canteen.address}</p>
              </div>
            )}

            {canteen?.openTime && (
              <div>
                <h3 className='text-lg font-semibold'>Timings</h3>
                <p>{`${canteen?.openTime} ${
                  canteen?.closeTime && 'to ' + canteen?.closeTime
                }`}</p>
              </div>
            )}

            {canteen?.phone && (
              <div>
                <h3 className='text-lg font-semibold'>Contact</h3>
                <p>📞 {canteen.phone}</p>
              </div>
            )}

            {canteen?.description && (
              <div>
                <h3 className='text-lg font-semibold'>About</h3>
                <p>{canteen.description}</p>
              </div>
            )}
          </div>


          {/* Feedback Form */}
          {userReview && <div className='border-t border-gray-200 pt-6'>
            <h3 className='text-2xl font-bold text-orange-600 mb-4'>
              Your Review
            </h3>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-2'>Rating</label>
                <div className='flex gap-1'>{renderRatingInput()}</div>
              </div>

              <div>
                {/* <label
                  htmlFor='feedback'
                  className='block text-sm font-medium mb-2'
                >
                  Your Review
                </label> */}
                <textarea
                  id='review'
                  rows={4}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
                  placeholder='Share your experience...'
                />
              </div>

              <button
                type='submit'
                className='w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors duration-200'
              >
                Update Review
              </button>
            </form>
          </div> }

          
          {/* User Comments */}
          {allReviews?.length>0 &&<div className='border-t border-gray-200 pt-6 mb-8'>
            <h3 className='text-2xl font-bold text-orange-600 mb-4'>
              Customer Reviews
            </h3>
            <div className='space-y-4' ref={reviewListRef} onScroll={handleScroll}>
              {allReviews.map((comment) => (
                <div key={comment._id} className='bg-orange-50 p-4 rounded-lg'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='font-semibold'>{comment.user?.name}</span>
                    <span className='text-sm text-gray-500'>
                      {dateFormat(comment?.updatedAt)}
                    </span>
                  </div>
                  <div className='flex mb-2'>{renderStars(comment.rating)}</div>
                  <p className='mb-2'>{comment.review}</p>
                  {/* <div className='flex items-center text-gray-500'>
                    <FaThumbsUp className='w-4 h-4 mr-1' />
                    <span className='text-sm'>{comment.likes}</span>
                  </div> */}
                </div>
              ))}
            </div>
          </div>}

        </div>
      </div>
    </div>
  );
};

export default CanteenModal;
