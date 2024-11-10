import React, { useState } from 'react';
import { FaTimes, FaHeart } from 'react-icons/fa';

const initialFoodData = [
  { id: 1, name: 'Masala Dosa', price: 60, category: 'South Indian', isFavorite: true },
  { id: 2, name: 'Veg Biryani', price: 120, category: 'Main Course', isFavorite: false },
  { id: 3, name: 'Samosa', price: 15, category: 'Snacks', isFavorite: true },
  { id: 4, name: 'Cold Coffee', price: 40, category: 'Beverages', isFavorite: false },
  { id: 5, name: 'Paneer Roll', price: 50, category: 'Snacks', isFavorite: true },
  { id: 6, name: 'Vada Pav', price: 20, category: 'Snacks', isFavorite: false },
];

export default function Favorite({ onClose }) {
  const [foodData, setFoodData] = useState(initialFoodData);

  const toggleFavorite = (id) => {
    setFoodData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const favoriteItems = foodData.filter(item => item.isFavorite);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-none flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Favorite Foods</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <FaTimes className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {favoriteItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No favorite items yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {favoriteItems.map((food) => (
                <div
                  key={food.id}
                  className="flex items-center justify-between p-3 bg-orange-50/50 rounded-lg hover:bg-orange-50 transition-all transform"
                >
                  <div>
                    <h3 className="font-medium text-gray-800">{food.name}</h3>
                    <p className="text-sm text-gray-500">{food.category}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-orange-600 font-medium">₹{food.price}</span>
                    <button onClick={() => toggleFavorite(food.id)} className="p-2 hover:bg-orange-100 rounded-full transition-colors">
                      <FaHeart className={`w-5 h-5 ${food.isFavorite ? 'text-orange-500' : 'text-gray-300'}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 text-center">
            Click the heart icon to remove items from your favorites
          </p>
        </div>
      </div>
    </div>
  );
}
