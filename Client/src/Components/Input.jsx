import React, { useState } from 'react';
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";

const Input = React.forwardRef(({ label, placeholder, type = "text",
    className='',
    ...props }, ref) => {
        const [isvisible,setIsvisible]=useState(false);
    return (
        <div className='mb-2 w-full flex justify-between items-end'>
            <div><label htmlFor={label} className="block mx-2 text-gray-900 dark:text-gray-400 text-md font-bold mb-2 text-nowrap">
                {label}:
            </label>
            </div>
            <div className='relative flex justify-center items-center shadow text-black dark:text-gray-200 dark:bg-gray-950  dark:border-neutral-800 border border-gray-300 rounded '>
            <input 
                ref={ref} 
                className={` py-2 px-3 text-black dark:text-gray-200 dark:bg-gray-950 leading-tight outline-none ${className}`}
                id={label} 
                type={`${type==='password' && isvisible ?"text":type}`}
                placeholder={placeholder} 
                {...props}
            />
            {type==="password" && <span className='px-2 absolute right-1 cursor-pointer' onClick={()=>setIsvisible((p)=>!p)}>{isvisible?<IoMdEyeOff />:<FaEye />}</span>}
            </div>
        </div>
    );
});

export default Input;
