import React from 'react'

function Logo() {
  return (
    <div>
        <div className='font-bold text-3xl cursor-pointer flex items-center font-[Poppins] text-gray-800 dark:text-white'>
            <span className='text-4xl text-yellow-600 mr-1 pt-2'>
              <ion-icon name="fast-food-outline"></ion-icon>
            </span>
            Canteen Connect
          </div>
    </div>
  )
}

export default Logo