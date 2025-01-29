import React, { useState } from 'react';
import { FaStore, FaPhone, FaMapPin, FaUser, FaKey, FaChevronRight, FaTimes, FaIdCard } from 'react-icons/fa'; 
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Canteen({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [canteenID, setCanteenID] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const navigate = useNavigate();

  // Validate Inputs
  const validate = () => {
    let newErrors = {};

    if (!canteenID.trim()) {
      newErrors.canteenID = 'Canteen ID is required';
    } else if (!/^[a-zA-Z0-9]+$/.test(canteenID)) {
      newErrors.canteenID = 'Invalid Canteen ID (only letters and numbers allowed)';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handling login
  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (validate()) {
      navigate('/canteen');
      onClose();
    }
  };

  return (
    <div className={`fixed inset-0 ${darkMode ? 'bg-black/70' : 'bg-black/50'} flex items-center justify-center p-4 z-50`}>
      <div className={`rounded-xl w-full max-w-md relative ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <button onClick={onClose} className="absolute right-4 top-4 p-1">
          <FaTimes className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        </button>

        <div className="p-3"> 
          <h2 className={`text-2xl font-bold text-center ${darkMode ? 'text-white' : 'text-black'}`}>
            {isLogin ? 'Welcome Back!' : 'Join Our Platform'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-2 mt-4">
            {isLogin ? (
              <>
                <div>
                  <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Canteen ID</label>
                  <div className="relative">
                    <FaStore className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400`} />
                    <input
                      type="text"
                      value={canteenID}
                      onChange={(e) => setCanteenID(e.target.value)}
                      className={`w-full pl-10 py-2 border rounded-lg ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'}`}
                      placeholder="Enter your canteen ID"
                    />
                  </div>
                  {errors.canteenID && <p className="text-red-500 text-sm">{errors.canteenID}</p>}
                </div>

                <div>
                  <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
                  <div className="relative">
                    <FaKey className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400`} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full pl-10 py-2 border rounded-lg ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'}`}
                      placeholder="Enter your password"
                    />
                  </div>
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
              </>
            ) : null}

            <button
              type="submit"
              className={`w-full bg-orange-500 text-white py-2 rounded-lg flex items-center justify-center space-x-2 ${darkMode ? 'hover:bg-orange-600' : 'hover:bg-orange-400'}`}
            >
              <span>{isLogin ? 'Log In' : 'Sign Up'}</span>
              <FaChevronRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button onClick={() => setIsLogin(!isLogin)} className="ml-1 text-orange-600 hover:text-orange-700">
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
