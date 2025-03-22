import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  loginSuccess,
  setError,
  setSuccess,
} from '../../Redux/Slices/UserSlice';
import authService from '../../ApiService/authApiService';

export default function ForgotPassword() {
  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();
  const [isloading, setIsloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmpassword: '',
      resetToken: token || '',
    },
  });

  const dataSubmit = async (data) => {
    console.log(data);
    // Your reset password logic here
    try {
      setIsloading(true);
      const res = token
        ? await authService.userResetPassword(data)
        : await authService.userForgotPassword(data);
      if (res) {
        dispatch(
          setSuccess(
            token ? 'Reset Password Successfully!' : 'Check your email please!'
          )
        );
        if (token) dispatch(loginSuccess(res));
      } else dispatch(setError('Try again later...'));
      setIsloading(false);
    } catch (error) {
      console.error(error);
      dispatch(setError(error?.response?.data?.message));
      setIsloading(false);
    }
  };

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div className='flex min-h-screen items-center justify-center px-4'>
        <div
          className='fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300'
          onClick={() => navigate('/')}
        />

        <div
          className={`relative w-full max-w-md rounded-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } p-8 shadow-xl transform transition-all duration-300 ease-out`}
        >
          <button
            onClick={() => navigate('/')}
            className='text-2xl absolute right-4 top-4 text-gray-400 hover:text-red-500'
          >
            X
          </button>

          <h2
            className={`text-2xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {token ? 'Enter Credentials' : 'Reset Password'}
          </h2>

          <form onSubmit={handleSubmit(dataSubmit)} className='space-y-4'>
            {!token ? (
              <div>
                <label
                  htmlFor='email'
                  className={`block text-sm font-medium ${
                    darkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}
                >
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  placeholder='Enter your email...'
                  {...register('email', {
                    required: !token && 'Email is required!',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Invalid email address',
                    },
                  })}
                  className={`w-full mt-1 px-3 py-2 border rounded-md ${
                    darkMode
                      ? 'bg-gray-700 text-white'
                      : 'bg-white text-gray-900'
                  } border-gray-300 focus:ring-orange-400 focus:border-orange-400`}
                />
                {errors.email && (
                  <p className='text-red-500 text-center text-sm mt-2'>
                    {errors.email.message}
                  </p>
                )}
              </div>
            ) : (
              <div className='space-y-4'>
                <div>
                  <label
                    htmlFor='password'
                    className={`block text-sm font-medium ${
                      darkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}
                  >
                    New Password
                  </label>
                  <div className='relative'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id='password'
                      placeholder='Enter new password...'
                      {...register('password', {
                        required: token && 'Password is required',
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message:
                            'Password must be at least 8 characters, with uppercase, lowercase, number, and special character.',
                        },
                      })}
                      className={`w-full mt-1 px-3 py-2 border rounded-md ${
                        darkMode
                          ? 'bg-gray-700 text-white'
                          : 'bg-white text-gray-900'
                      } border-gray-300 focus:ring-orange-400 focus:border-orange-400`}
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className='text-red-500 text-sm text-center mt-2'>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor='confirmpassword'
                    className={`block text-sm font-medium ${
                      darkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}
                  >
                    Confirm Password
                  </label>
                  <div className='relative'>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id='confirmpassword'
                      placeholder='Confirm password...'
                      {...register('confirmpassword', {
                        required: token && 'Confirm Password is required',
                        validate: (value) =>
                          value === watch('password') ||
                          'Passwords do not match',
                      })}
                      className={`w-full mt-1 px-3 py-2 border rounded-md ${
                        darkMode
                          ? 'bg-gray-700 text-white'
                          : 'bg-white text-gray-900'
                      } border-gray-300 focus:ring-orange-400 focus:border-orange-400`}
                    />
                    <button
                      type='button'
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirmpassword && (
                    <p className='text-red-500 text-sm text-center mt-2'>
                      {errors.confirmpassword.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className='flex justify-center items-center'>
              <button
                type='submit'
                className={`w-full my-4  text-white ${
                  isloading
                    ? 'bg-green-500'
                    : darkMode
                    ? 'bg-gray-950 '
                    : 'bg-orange-500'
                } py-2 rounded-md text-md hover:bg-orange-700`}
              >
                {isloading
                  ? 'Loading...'
                  : token
                  ? 'Update Password'
                  : 'Reset Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
