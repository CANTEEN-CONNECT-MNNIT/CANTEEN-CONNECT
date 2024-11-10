import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function SignUpBox({ setSuccess, setShowLoginModal, setShowSignUpModal, onClose, darkMode }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error,setError] = useState("");

  const handleSignUp = async (data) => {
    console.log("SignUpBox:", data);
    setSuccess(false);
    setError("");
    try {
      const res = await authService.signup(data);
      if (res) {
        setTimeout(() => {
          setSuccess(true);
        }, 500);
      }
    } catch (error) {
      console.log(error.response?.data?.message);
      setError(error.response?.data?.message);
    }
  };

  const handleGoogleSignin = () => {
    alert("Google Sign-In clicked!");
  };

  const handleFacebookSignin = () => {
    alert("Facebook Sign-In clicked!");
  };

  const handleLinkedinSignin = () => {
    alert("LinkedIn Sign-In clicked!");
  };

  const password = watch("password");

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
            Create an Account
          </h2>

          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name..."
                {...register('name', { required: 'Name is required' })}
                className={`w-full mt-1 px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border-gray-300 focus:ring-coral-500 focus:border-coral-500`}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email..."
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address',
                  },
                })}
                className={`w-full mt-1 px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border-gray-300 focus:ring-coral-500 focus:border-coral-500`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'} // Toggle between text and password
                  id="password"
                  placeholder="Your password..."
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.",
                    },
                  })}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}  {/* Show/Hide icon */}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'} // Toggle between text and password
                  id="confirmPassword"
                  placeholder="Confirm your password..."
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) => value === password || 'Passwords do not match',
                  })}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle confirm password visibility
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}  {/* Show/Hide icon */}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>
            <div>
              {error.length>0 && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
            <button
              type="submit"
              className="w-full rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
            </div>

            <div className="text-center text-gray-600 mt-4">
              Already have an account?
              <button className="hover:text-orange-800 text-orange-500" onClick={() => { setShowLoginModal(true); setShowSignUpModal(false); }}>
                Login
              </button>
            </div>
          </form>

          {/* Social Sign-In Buttons */}
          <div className="flex flex-col items-center justify-center mt-6 space-y-4">
            <div className="text-md text-slate-500">Sign in with</div>
            <div className="flex space-x-4">
              <button className="p-3 rounded-full text-white bg-red-500 hover:bg-red-600 transition-transform transform hover:scale-110" onClick={handleGoogleSignin}>
                <FaGoogle size={20} />
              </button>
              <button className="p-3 rounded-full text-white bg-blue-700 hover:bg-blue-800 transition-transform transform hover:scale-110" onClick={handleFacebookSignin}>
                <FaFacebook size={20} />
              </button>
              <button className="p-3 rounded-full text-white bg-blue-500 hover:bg-blue-600 transition-transform transform hover:scale-110" onClick={handleLinkedinSignin}>
                <FaLinkedin size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
