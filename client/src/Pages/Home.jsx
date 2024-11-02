import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isvisible, setIsvisible] = useState(false);
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const login = async () => {
    setError("")
    if (!validateEmail(email)) {
      setError("Enter Valid email address!");
    }
  }

  return (
    <>
      <div className="min-h-screen w-full flex flex-col sm:flex-row justify-center  items-center">
        <div className="sm:w-2/3 hidden w-full md:flex justify-center">
          <img
            src="src\assets\darkImg.png"
            alt="Canteen Management"
            className='w-4/5   rounded-lg object-contain'
          />
        </div>
        <div className="sm:w-2/5 flex flex-col justify-center items-center w-full">
          <div className='border bg-slate-50 dark:bg-gray-950 border-neutral-900 dark:border-slate-500 pb-16 pt-10 px-16 sm:mb-12 rounded-md'>
            <div className="">
              <h1 className="text-center mr-2 dark:bg-gradient-to-b dark:from-white dark:to-slate-300 dark:bg-clip-text dark:text-transparent text-6xl font-bold my-2 sm:mb-16">Welcome</h1>
            </div>
            <p className=" mb-2 md:mx-1 text-sm text-center font-semibold text-slate-500">Please enter your email and password</p>
            <div className='rounded-md border-gray-400 flex flex-col justify-center items-center gap-4'>
              <input className="dark:text-gray-400 text-md px-4 py-2 mt-2 border border-solid border-gray-300 rounded outline-none dark:bg-gray-800 dark:border-slate-400" type="text" placeholder="Email Address" />
              <div className='relative border border-solid border-gray-300 rounded outline-none dark:bg-gray-800 dark:border-slate-400'>
                <input className="dark:text-gray-400 text-md px-4 py-2 rounded outline-none dark:bg-gray-800 dark:border-slate-400" type={`${!isvisible ? "password" : "text"}`} placeholder="Password" />
                <span className='dark:text-white px-2 absolute right-1 bottom-2.5 cursor-pointer' onClick={() => setIsvisible((p) => !p)}>{isvisible ? <IoMdEyeOff /> : <FaEye />}</span>
              </div>
              <div className="mt-1 w-full flex flex-col items-center font-semibold text-sm">
                <button className="w-fit font-extrabold bg-blue-600 text-[16px] hover:bg-blue-700 px-3 py-2 text-left text-white rounded tracking-wider" onClick={login}>Login</button>
                {error.length>0 && <p className='text-center text-xs pt-1 text-red-500'>{error}</p>}
              </div>
              <div>
                <Link className="text-sm text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-2" to="/forgot-password">Forgot Password?</Link>
                <div className="font-semibold text-sm text-slate-500 text-center md:text-left">
                  Don't have an account?
                  <Link className="text-red-600 hover:underline hover:underline-offset-4" to={"/signup"}> Register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home