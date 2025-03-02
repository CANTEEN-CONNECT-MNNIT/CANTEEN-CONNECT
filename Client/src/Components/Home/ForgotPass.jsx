import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useSelector} from 'react-redux';

export default function ForgotPassword({ onClose }) {
  const darkMode=useSelector((state)=> state.theme.isDarkMode)
  const [error, setError] = useState("");
  const [emailfind, setEmailFind] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, getValues, watch, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmpassword: "",
      otp: "",
    }
  });

  const dataSubmit = async (data) => {
    console.log(data);
    // Your reset password logic here
  }

  const getOtp = async () => {
    const email = getValues('email');
    if (email.length) {
      // Your OTP fetching logic here (send request to API for OTP)
      setEmailFind(true);
    } else {
      setError('Please enter a valid email.');
    }
  }


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
            Reset Password
          </h2>

          <form onSubmit={handleSubmit(dataSubmit)} className="space-y-4">
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
                placeholder="Enter your email..."
                {...register("email", {
                  required: "Email is required!",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full mt-1 px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border-gray-300 focus:ring-orange-400 focus:border-orange-400`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="flex justify-center items-center">
              <button
                onClick={getOtp}
                type="button"
                className={`w-full my-4 ${darkMode ? 'bg-gray-950 text-white' : 'bg-orange-500 text-white'} py-2 rounded-md text-md hover:bg-orange-700`}
              >
                Send OTP
              </button>
            </div>

            {emailfind && (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="password"
                    className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      placeholder="Enter new password..."
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message: "Password must be at least 8 characters, with uppercase, lowercase, number, and special character.",
                        },
                      })}
                      className={`w-full mt-1 px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border-gray-300 focus:ring-orange-400 focus:border-orange-400`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <div>
                  <label
                    htmlFor="confirmpassword"
                    className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmpassword"
                    placeholder="Confirm password..."
                    {...register("confirmpassword", {
                      required: "Confirm Password is required",
                      validate: (value) => value === watch("password") || "Passwords do not match",
                    })}
                    className={`w-full mt-1 px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border-gray-300 focus:ring-orange-400 focus:border-orange-400`}
                  />
                  {errors.confirmpassword && <p className="text-red-500 text-sm">{errors.confirmpassword.message}</p>}
                </div>

                <div>
                  <label
                    htmlFor="otp"
                    className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                  >
                    OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    placeholder="Enter OTP..."
                    {...register("otp", {
                      required: "OTP is required!",
                    })}
                    className={`w-full mt-1 px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border-gray-300 focus:ring-orange-400 focus:border-orange-400`}
                  />
                  {errors.otp && <p className="text-red-500 text-sm">{errors.otp.message}</p>}
                </div>

                <div className="flex justify-center items-center">
                  <button
                    type="submit"
                    className={`w-full my-4 ${darkMode ? 'bg-gray-950 text-white' : 'bg-orange-500 text-white'} py-2 rounded-md text-md hover:bg-orange-700`}
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            )}

            {error && <p className="text-red-500 text-center">{error}</p>}

          </form>
        </div>
      </div>
    </div>
  );
}
