import React, { useState } from 'react';
import { FaStore, FaChevronRight, FaTimes, FaIdCard, FaPhone } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Canteen({ onClose }) {
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

    setErrors(newErrors);

      if (!formData.canteenName.trim()) {
        newErrors.canteenName = 'Canteen Name is required';
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handling Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/dashboard');
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
            {'Join Us'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-2 mt-4">
              {/* //Canteen SignUp Box */}
              <>
                {[
                  { label: 'Canteen Name', icon: FaStore, name: 'canteenName', placeholder: 'Enter canteen name' },
                  { label: 'GSTIN', icon: FaIdCard, name: 'gstID', placeholder: 'Enter 10-digit GSTIN' },
                  { label: 'Phone Number', icon: FaPhone, name: 'phone', placeholder: 'Enter phone number' },
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

            <button
              type="submit"
              className={`w-full bg-orange-500 text-white py-2 rounded-lg flex items-center justify-center space-x-2 ${darkMode ? 'hover:bg-orange-600' : 'hover:bg-orange-400'}`}
            >
              <span>Sign Up</span>
              <FaChevronRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
