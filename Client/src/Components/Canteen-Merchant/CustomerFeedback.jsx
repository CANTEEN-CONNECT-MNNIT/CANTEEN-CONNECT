import React from 'react';

const reviews = [
  {
    id: 1,
    name: 'Customer1',
    rating: 5,
    comment: 'Great food and quick service! The Masala Dosa was excellent.',
    time: '2 hours ago',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 2,
    name: 'Customer2',
    rating: 4,
    comment: 'Love the variety of snacks available. Could improve the waiting time.',
    time: '5 hours ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

export default function CustomerFeedback({ darkMode }) {
  return (
    <div
      className={`${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      } rounded-xl shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Customer Feedback</h3>
        <div className="flex items-center space-x-2">
          <span className="text-yellow-400">&#9733;</span> {/* Star icon */}
          <span className="font-medium">4.5</span>
          <span className="text-sm text-gray-500">(128 reviews)</span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
            <div className="flex items-start space-x-4">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{review.name}</h4>
                  <span className="text-sm text-gray-500">{review.time}</span>
                </div>
                <div className="flex items-center space-x-1 my-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${
                        i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      &#9733; {/* Star icon */}
                    </span>
                  ))}
                </div>
                <p className="text-sm">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className={`w-full mt-6 flex items-center justify-center space-x-2 border ${
          darkMode ? 'border-orange-500 text-orange-500' : 'border-orange-600 text-orange-600'
        } py-2 px-4 rounded-lg hover:bg-orange-50 transition-colors`}
      >
        <span>&#9993;</span> 
        <span>View All Reviews</span>
      </button>
    </div>
  );
}
