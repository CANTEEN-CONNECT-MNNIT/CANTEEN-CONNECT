
import React from 'react'

const Button = ({className,children,...props}) => {
  return (
   <button className={`${className} dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 bg-blue-500 hover:bg-blue-600 duration-5001`} {...props}>
    {children}
   </button>
  )
}

export default Button
