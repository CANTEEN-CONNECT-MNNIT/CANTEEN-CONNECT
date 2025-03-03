import React, { useEffect, useState } from 'react';
import FoodItems from './FoodItems';
import TrendingFood from './Trending';
import { useDispatch, useSelector } from 'react-redux';
import { useAppContext } from '../../Context/AppContext';
import CanteenModal from './CanteenModal';
import CanteenData from '../../Data/canteenData';
import FoodData from '../../Data/FoodData.js';
import foodService from '../../ApiService/foodService';
import { setSearch } from '../../Redux/Slices/SearchSlice.jsx';

const MainContent = () => {
  const [selectedCanteen, setSelectedCanteen] = useState(null);

  const [foodList, setFoodList] = useState(null);

  const dispatch = useDispatch();

  // Handling View MENU,It will slide Page till Menu
  const { Loc, setLoc } = useAppContext();
  const handleViewMenuClick = () => {
    const targetArea = document.getElementById('menu');
    if (targetArea) {
      targetArea.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      setLoc('');
    }, 500);
  };
  if (Loc === 'menu') handleViewMenuClick();

  const isOpen = useSelector((state) => state.page.isOpen);
  const darkMode = useSelector((state) => state.theme.isDarkMode);

  const searchText = useSelector((state) => state.search.search);

  const getAllList = async (data) => {
    setFoodList(null);
    if (!data?.name?.trim()) return;
    try {
      const res = await foodService.getAll(data);
      console.log(res);

      if (res) {
        setFoodList(res);
        dispatch(setSearch(''));
      }
    } catch (error) {
      // Toaster(error?.response?.data?.message);
      console.log(error);
    }
  };

  console.log(foodList);

  useEffect(() => {
    if (searchText?.trim()) {
      getAllList({ name: searchText });
    }
  }, [searchText, dispatch]);

  return (
    <div
      className={`transition-all duration-500 ease-in-out w-full h-full ${
        isOpen ? 'pl-60' : 'pl-20'
      } ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-100 text-gray-800'}`}
    >
      <div
        className={`pl-20 pt-6 flex flex-row flex-wrap gap-4 justify-center absolute`}
      >
        <button
          className={`${
            darkMode
              ? 'bg-slate-100 text-black'
              : ' bg-slate-200 text-slate-900'
          } p-2 w-28 rounded-lg text-center relative`}
        >
          Filter
        </button>
        <button
          className={`hover:bg-slate-950 hover:shadow-lg ${
            darkMode ? 'bg-slate-100 text-black' : 'bg-slate-200 text-slate-900'
          } p-2 w-28 rounded-lg text-center relative`}
        >
          Sort By
        </button>
      </div>

      <div id='menu' className='relative flex flex-col gap-2'>
        {foodList && (
          <div className='mt-12 mb-20'>
            <div className='ml-24 flex flex-row justify-between mr-24 gap-4 mb-6'>
              <h2 className='text-2xl font-bold'>Results</h2>
            </div>
            <FoodItems FoodData={foodList} />
          </div>
        )}

        <div className={`relative top-24 text-2xl font-bold mb-6`}>
          <TrendingFood />
        </div>
        <div className='mt-12 mb-20'>
          <div className='ml-24 flex flex-row justify-between mr-24 gap-4 mb-6'>
            <h2 className='text-2xl font-bold'>Tirath Canteen</h2>
            <button
              onClick={() => setSelectedCanteen('tirath')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                darkMode
                  ? 'bg-orange-700 hover:bg-orange-600'
                  : 'bg-orange-600/60 hover:bg-orange-600'
              } text-white transition-colors duration-200`}
            >
              View Details
            </button>
          </div>
          <FoodItems FoodData={FoodData} />
        </div>
        <div className='mt-12 mb-20'>
          <div className='ml-24 flex flex-row justify-between mr-24 gap-4 mb-6'>
            <h2 className='text-2xl font-bold'>Ojha Canteen</h2>
            <button
              onClick={() => setSelectedCanteen('ojha')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                darkMode
                  ? 'bg-orange-700 hover:bg-orange-600'
                  : 'bg-orange-600/60 hover:bg-orange-600'
              } text-white transition-colors duration-200`}
            >
              View Details
            </button>
          </div>
          <FoodItems FoodData={FoodData} />
        </div>
      </div>

      {/* //Canteen Info */}
      {selectedCanteen && (
        <CanteenModal
          isOpen={true}
          onClose={() => setSelectedCanteen(null)}
          canteen={CanteenData[selectedCanteen]}
        />
      )}
    </div>
  );
};

export default MainContent;
