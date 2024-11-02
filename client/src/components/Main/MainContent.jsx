import React from 'react'
import FoodItems from './FoodItems'
import Cart from './Cart'
import TrendingFood from './Trending'

const MainContent = ({isOpen}) => {
  return (
    <div className={`transition-all duration-500 ease-in-out w-full h-full bg-slate-300  ${
        isOpen ? 'pl-60' : 'pl-20'}`}>
      <div className='pl-20 pt-4 flex flex-row flex-wrap gap-4 justify-center absolute '>
        <button className='hover:bg-blue-200 hover:shadow-lg bg-slate-200 p-2 w-28 rounded-2xl text-center relative'>Filter</button>
        <button className='hover:bg-blue-200 hover:shadow-lg bg-slate-200 p-2 w-28 rounded-2xl text-center relative'>Sort By</button>
      </div>
    <div className="relative flex flex-col gap-2">
      <div className="relative top-20 text-2xl font-bold text-gray-800 mb-6">
              <TrendingFood/>
      </div>
      <div className="mt-12 mb-20 ">
              <h2 className="ml-16 text-2xl font-bold text-gray-800 mb-6">Tirath Canteen</h2>
              <FoodItems canteen="Tirath Canteen" />
      </div>
      <div className="mt-12 mb-20">
              <h2 className="ml-16 text-2xl font-bold text-gray-800 mb-6">Ojha Canteen</h2>
              <FoodItems canteen="Ojha Canteen" />
      </div>
    </div>
    <Cart/>
    </div>
  )
}

export default MainContent
