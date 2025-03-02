import React, { useState } from 'react';
import { FaStore, FaKey, FaChevronRight, FaTimes, FaIdCard, FaUser, FaPhone } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Canteen({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    canteenID: '',
    password: '',
    canteenName: '',
    contactPerson: '',
    gstID: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate Inputs
  const validate = () => {
    let newErrors = {};

    if (isLogin) {
      // Login validation

      if (!formData.canteenID.trim()) {
        newErrors.canteenID = 'Canteen ID is required';
      } else if (!/^[a-zA-Z0-9]+$/.test(formData.canteenID)) {
        newErrors.canteenID = 'Invalid Canteen ID (only letters and numbers allowed)';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    } else {
      
      // Signup validation
      if (!formData.canteenName.trim()) {
        newErrors.canteenName = 'Canteen Name is required';
      }

      if (!formData.contactPerson.trim()) {
        newErrors.contactPerson = 'Contact Person Name is required';
      }
      else if(!/^[a-zA-Z]+$/.test(formData.contactPerson)){
        newErrors.contactPerson='Name must contain only characters'
      }

      if (!formData.gstID.trim()) {
        newErrors.gstID = 'GSTIN is required';
      } else if (!/^[0-9A-Z]{10}$/.test(formData.gstID)) {
        newErrors.gstID = 'GSTIN must be 15 characters (letters & numbers)';
      }

      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Phone number must be 10 digits';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handling Form Submission
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
              
              //Canteen Login Box
              <>
                <div>
                  <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Canteen ID</label>
                  <div className="relative">
                    <FaStore className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="canteenID"
                      value={formData.canteenID}
                      onChange={handleChange}
                      className={`w-full pl-10 py-2 border rounded-lg ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'}`}
                      placeholder="Enter your canteen ID"
                    />
                  </div>
                  {errors.canteenID && <p className="text-red-500 text-sm">{errors.canteenID}</p>}
                </div>

                <div>
                  <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
                  <div className="relative">
                    <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-10 py-2 border rounded-lg ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'}`}
                      placeholder="Enter your password"
                    />
                  </div>
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
              </>
            ) : (

              //Canteen SignUp Box
              <>
                {[
                  { label: 'Canteen Name', icon: FaStore, name: 'canteenName', placeholder: 'Enter canteen name' },
                  { label: 'Contact Person Name', icon: FaUser, name: 'contactPerson', placeholder: 'Enter contact person name' },
                  { label: 'GSTIN', icon: FaIdCard, name: 'gstID', placeholder: 'Enter 10-digit GSTIN' },
                  { label: 'Phone Number', icon: FaPhone, name: 'phone', placeholder: 'Enter phone number' },
                  { label: 'Password', icon: FaKey, name: 'password', placeholder: 'Enter a password', type: 'password' }
                ].map(({ label, icon: Icon, name, placeholder, type = 'text' }) => (
                  <div key={name}>
                    <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>
                    <div className="relative">
                      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        className={`w-full pl-10 py-2 border rounded-lg ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'}`}
                        placeholder={placeholder}
                      />
                    </div>
                    {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
                  </div>
                ))}
              </>
            )}

            <button
              type="submit"
              className={`w-full bg-orange-500 text-white py-2 rounded-lg flex items-center justify-center space-x-2 ${darkMode ? 'hover:bg-orange-600' : 'hover:bg-orange-400'}`}
            >
              <span>{isLogin ? 'Log In' : 'Sign Up'}</span>
              <FaChevronRight className="w-4 h-4" />
            </button>
          </form>

            {/* For Changing to Login and Signup Box */}
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
