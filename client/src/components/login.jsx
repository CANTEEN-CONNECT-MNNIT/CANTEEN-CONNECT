import React, { useState } from 'react';
import Button from './button';

const Login = () => {
  const Links = [
    { name: "Light Mode", link: "/" },
    { name: "LOGIN", link: "/" },
    // { name: "SIGN UP", link: "/" },
  ];
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='shadow-md w-full fixed top-0 left-0 z-10'>
        <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
          <div className='font-bold text-3xl cursor-pointer flex items-center font-[Poppins] text-gray-800'>
            <span className='text-4xl text-yellow-600 mr-1 pt-2'>
              <ion-icon name="fast-food-outline"></ion-icon>
            </span>
            Canteen Connect
          </div>
          <div onClick={() => setOpen(!open)} className="md:hidden text-3xl absolute right-8 top-6 cursor-pointer">
            <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
          </div>
          <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20' : 'top-[-490px]'}`}>
            {Links.map((Link) => (
              <li key={Link.name} className='md:ml-8 text-xl md:my-0 my-7'>
                <a href={Link.link} className='text-gray-800 hover:text-gray-400 duration-500'>{Link.name}</a>
              </li>
            ))}
            <Button>
              SIGN UP
            </Button>
          </ul>
        </div>
      </div>

      <div className="max-h-[600p] flex flex-col mt-[100px] md:mt-[300px] md:flex-row justify-end md:mr-[28px] space-y-8 md:space-y-0 md:space-x-14 items-center my-0 mx-5 md:mx-0 md:my-0 ">
        <div className="mr-0 ml-[35px] max-w-[400px] md:max-w-[300px] md:ml-[40px]">
          <img
            src="https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_500,h_285/https://savvyhrms.com/wp-content/uploads/2023/05/Canteen-Management.png"
            alt="Canteen Management"
          />
        </div>
        <div className="md:w-1/3 max-w-sm">
          <div className="text-center text-4xl font-bold md:text-left">
            <label style={{ fontFamily: '"Goudy Bookletter 1911", serif' }} className="font-goudy mr-1">Welcome Back..</label>
          </div>
          <div className="my-5 flex">
            <p className="mx-12 mb-1 md:mx-1 text-[15px] text-center font-semibold text-slate-500">Please enter your email and password</p>
          </div>
          <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" type="text" placeholder="Email Address" />
          <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" type="password" placeholder="Password" />
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <button className="mt-2 font-extrabold bg-blue-600 text-[16px] hover:bg-blue-700 px-6 py-3 text-left text-white rounded tracking-wider" type="submit">Login</button>
            <a className="text-blue-600 mt-6 hover:text-blue-700 hover:underline hover:underline-offset-4" href="">Forgot Password?</a>
          </div>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            Don't have an account? <a className="text-red-600 hover:underline hover:underline-offset-4" href="">Register</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
