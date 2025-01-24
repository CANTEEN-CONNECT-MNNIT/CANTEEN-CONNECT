import React from 'react';
import FoodItems from './FoodItems';
import Cart from './Cart';
import TrendingFood from './Trending';
import { useDispatch,useSelector } from 'react-redux';
import { setOpen,toggleOpen } from '../../Redux/Slices/pageSlice';

const MainContent = ({onCheckout}) => {
  const isOpen=useSelector((state)=> state.page.isOpen);
    const dispatch=useDispatch();
    const darkMode = useSelector((state) => state.theme.isDarkMode);
  return (
    <div
      className={`transition-all duration-500 ease-in-out w-full h-full ${
        isOpen ? 'pl-60' : 'pl-20'
      } ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-100 text-gray-800'}`}
    >
      <div className={`pl-20 pt-4 flex flex-row flex-wrap gap-4 justify-center absolute`}>
        <button className={`${darkMode ? 'bg-slate-100 text-black' : ' bg-slate-200 text-slate-900'} p-2 w-28 rounded-lg text-center relative`}>
          Filter
        </button>
        <button className={`hover:bg-slate-950 hover:shadow-lg ${darkMode ? 'bg-slate-100 text-black' : 'bg-slate-200 text-slate-900'} p-2 w-28 rounded-lg text-center relative`}>
          Sort By
        </button>
      </div>
      <div className="relative flex flex-col gap-2">
        <div className={`relative  top-20 text-2xl font-bold mb-6`}>
          <TrendingFood  />
        </div>
        <div className="mt-12 mb-20">
          <h2 className="ml-16 text-2xl font-bold mb-6">Tirath Canteen</h2>
          <FoodItems />
        </div>
        <div className="mt-12 mb-20">
          <h2 className="ml-16 text-2xl font-bold mb-6">Ojha Canteen</h2>
          <FoodItems  />
        </div>
      </div>
      <Cart onCheckout={onCheckout}/>
    </div>
  );
};

export default MainContent;
