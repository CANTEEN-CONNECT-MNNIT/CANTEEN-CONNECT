import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useSelector,useDispatch } from 'react-redux';

export default function LoginBox({setSuccess, onforgetPass, onClose,}) {
  const darkMode=useSelector((state)=> state.theme.isDarkMode)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
      setTimeout(setSuccess(true),400);
  };

  const handleGoogleSignin = () => {
    alert('Google Sign-In clicked');
  };

  const handleFacebookSignin = () => {
    alert('Facebook Sign-In clicked');
  };

  const handleLinkedinSignin = () => {
    alert('LinkedIn Sign-In clicked');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={onClose}
        />
        
        <div
          className={`relative w-full max-w-md rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 shadow-xl transform transition-all duration-300 ease-out`}
        >
          <button
            onClick={onClose}
            className="text-2xl absolute right-4 top-4 text-gray-400 hover:text-red-500"
          >
            X
          </button>

          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Log in
          </h2>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email address',
                  },
                })}
                className={`mt-1 block w-full rounded-md ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'} border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Enter your password"
                  {...register('password', { required: 'Password is required' })}
                  className={`mt-1 block w-full rounded-md ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'} border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300"
            >
              Login
            </button>

            {/* Forgot Password Link */}
            <button 
            onClick={onforgetPass}
            className={`w-full text-slate-300 hover:text-orange-400 item-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Forgot password?
            </button>
          </form>

          {/* Social Log-In Buttons */}
          <div className="flex flex-col items-center justify-center mt-6 space-y-4">
            <div className="text-md text-slate-500">Log in with</div>
            <div className="flex space-x-4">
              <button
                className="p-3 rounded-full text-white bg-red-500 hover:bg-red-600 transition-transform transform hover:scale-110"
                onClick={handleGoogleSignin}
              >
                <FaGoogle size={20} />
              </button>
              <button
                className="p-3 rounded-full text-white bg-blue-700 hover:bg-blue-800 transition-transform transform hover:scale-110"
                onClick={handleFacebookSignin}
              >
                <FaFacebook size={20} />
              </button>
              <button
                className="p-3 rounded-full text-white bg-blue-500 hover:bg-blue-600 transition-transform transform hover:scale-110"
                onClick={handleLinkedinSignin}
              >
                <FaLinkedin size={20} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
