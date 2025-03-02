import React, { useState } from 'react';
import { FaTimes, FaHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';

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
  const darkMode = useSelector((state) => state.theme.isDarkMode); 

  const toggleFavorite = (id) => {
    setFoodData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const favoriteItems = foodData.filter(item => item.isFavorite);

  return (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-none flex items-center justify-center p-4 z-50`}>
      <div className={`rounded-xl shadow-lg w-full max-w-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'} flex justify-between items-center`}>
          <h2 className="text-xl font-semibold">Favorite Foods</h2>
          <button onClick={onClose} className={`p-1 hover:${darkMode ? 'bg-gray-600' : 'bg-slate-100'} rounded-full transition-colors`}>
            <FaTimes className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-500'}`} />
          </button>
        </div>

        <div className={`p-4 max-h-[60vh] overflow-y-auto ${darkMode ? 'bg-gray-900' : ''}`}>
          {favoriteItems.length === 0 ? (
            <div className="text-center py-8">
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No favorite items yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {favoriteItems.map((food) => (
                <div
                  key={food.id}
                  className={`flex items-center justify-between p-3 rounded-lg hover:${darkMode ? 'bg-gray-600' : 'bg-slate-100'} transition-all transform ${darkMode ? 'bg-gray-800' : 'bg-orange-50/50'}`}
                >
                  <div>
                    <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{food.name}</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{food.category}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-orange-600 font-medium">₹{food.price}</span>
                    <button onClick={() => toggleFavorite(food.id)} className="p-2 hover:bg-orange-100 rounded-full transition-colors">
                      <FaHeart className={`w-5 h-5 ${food.isFavorite ? 'text-orange-500' : (darkMode ? 'text-gray-300' : 'text-gray-300')}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-center`}>
            Click the heart icon to remove items from your favorites
          </p>
        </div>
      </div>
    </div>
  );
}
