import React from 'react';
import foodImage from '../../assets/FoodNavbar.jpg'

const Header = () => {
  return (
    <div className='relative mt-0  w-full '>
      <div><img src={foodImage} className='relative h-80 w-full '/></div>
      <div className='absolute align-center justify-center  -translate-y-6 flex flex-row w-full'>
    <input type='text' className='p-2 rounded-l-xl w-70 z-10' />
    <button className='p-2 bg-red-500 text-white rounded-r-xl'>Search</button>
  </div>
      </div>
  )
}

export default Header