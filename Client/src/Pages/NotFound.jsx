import React from 'react'
import Logo from '../Components/Logo'

function NotFound() {
  return (
    <div className='dark:bg-gray-950 flex text-black justify-center items-center min-h-screen dark:text-white'>
      <div className='flex flex-col justify-center items-center'>
        <Logo/>
        <div className="404 text-4xl font-black font-serif">
          OOps!
        </div>
        <div className="msg font-medium text-sm py-2 font-serif">
          Go BACK! Page not exist!
        </div>
      </div>
    </div>
  )
}

export default NotFound