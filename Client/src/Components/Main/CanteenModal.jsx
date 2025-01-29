//Modal Box for Canteen Info of the Dashboard
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaStar, FaThumbsUp } from 'react-icons/fa';

const CanteenModal = ({ isOpen, onClose, canteen }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', { rating, feedback });
    setRating(0);
    setFeedback('');
  };

  const renderStars = (count) => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      return (
        <FaStar
          key={index}
          className={`w-5 h-5 ${starValue <= count ? 'text-orange-400' : 'text-gray-300'}`}
        />
      );
    });
  };

  const renderRatingInput = () => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      return (
        <button
          key={index}
          type="button"
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoveredStar(starValue)}
          onMouseLeave={() => setHoveredStar(0)}
          className="focus:outline-none"
        >
          <FaStar
            className={`w-8 h-8 ${
              starValue <= (hoveredStar || rating) ? 'text-orange-400' : 'text-gray-300'
            } transition-colors duration-200`}
          />
        </button>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white text-gray-800 rounded-lg shadow-xl m-4">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <AiOutlineClose className="w-6 h-6" />
        </button>

        <div className="p-6">
          {/* Canteen Information */}
          <h2 className="text-3xl font-bold mb-4">{canteen.name}</h2>

          <div className="space-y-4 mb-8">
            <div>
              <h3 className="text-lg font-semibold">Location</h3>
              <p>{canteen.address}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Timings</h3>
              <p>{canteen.openingHours}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Contact</h3>
              <p>{canteen.contact}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">About</h3>
              <p>{canteen.description}</p>
            </div>
          </div>

          {/* User Comments */}
          <div className="border-t border-gray-200 pt-6 mb-8">
            <h3 className="text-2xl font-bold text-orange-600 mb-4">Customer Reviews</h3>
            <div className="space-y-4">
              {canteen.comments.map((comment) => (
                <div key={comment.id} className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{comment.user}</span>
                    <span className="text-sm text-gray-500">{comment.date}</span>
                  </div>
                  <div className="flex mb-2">{renderStars(comment.rating)}</div>
                  <p className="mb-2">{comment.text}</p>
                  <div className="flex items-center text-gray-500">
                    <FaThumbsUp className="w-4 h-4 mr-1" />
                    <span className="text-sm">{comment.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback Form */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-2xl font-bold text-orange-600 mb-4">Write a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex gap-1">{renderRatingInput()}</div>
              </div>

              <div>
                <label htmlFor="feedback" className="block text-sm font-medium mb-2">
                  Your Review
                </label>
                <textarea
                  id="feedback"
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Share your experience..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors duration-200"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanteenModal;
