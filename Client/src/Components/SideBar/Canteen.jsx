import React, { useState } from 'react';
import { FaStore, FaChevronRight, FaTimes, FaIdCard, FaPhone, FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import canteenService from '../../ApiService/canteenService';
import { loginFailure, loginStart, loginSuccess, setCanteen, setError } from '../../Redux/Slices/UserSlice';

export default function Canteen({ onClose }) {
  const initialState={
    canteenId: '',
    name: '',
    phone: '',
    description: '',
  };
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const navigate = useNavigate();
  const dispatch=useDispatch();

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate Inputs
  const validate = () => {
    let newErrors = {};
  
    if (formData.canteenName?.trim()==='') {
      newErrors.canteenName = 'Canteen Name is required';
    }
  
    if (formData.canteenId?.trim()==='') { // Fixed the key to match formData
      newErrors.canteenId = 'Canteen Id is required!';
    }
  
    if (formData.phone?.trim()==='') {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
  
    if (formData.description?.trim()==='') {
      newErrors.description = 'Description is required';
    }

    if (formData.address?.trim()==='') {
      newErrors.address = 'Address is required';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };
  

  // Handling Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    
    if (validate()) {
      try {
          dispatch(loginStart());
          console.log("here",formData);
          
          const res=await canteenService.addCanteen(formData);
          if(res){
            dispatch(setCanteen(res?.newcanteen));
            dispatch(loginSuccess(res?.updateduser));      
            navigate('/dashboard');
            onClose();
            setFormData(initialState);
          }
      } catch (error) {
        console.log("Canteen:",error);
        dispatch(loginFailure(error?.response?.data?.message));
      }
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
                { label: 'Canteen Name', icon: FaStore, name: 'name', placeholder: 'Enter canteen name' },
                { label: 'Canteen Id', icon: FaIdCard, name: 'canteenId', placeholder: 'Enter Canteen Id' },
                { label: 'Phone Number', icon: FaPhone, name: 'phone', placeholder: 'Enter phone number' },
                { label: 'Address', icon: FaPhone, name: 'address', placeholder: 'Enter address' },
                { label: 'Description', icon: FaEdit, name: 'description', placeholder: 'Enter canteen description', type: 'textarea' },
              ].map(({ label, icon: Icon, name, placeholder, type = 'text' }) => (
                <div key={name}>
                  <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>
                  <div className="relative">
                    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    {type === 'textarea' ? (
                      <textarea
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        className={`w-full pl-10 py-2 border rounded-lg resize-none ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'}`}
                        placeholder={placeholder}
                      />
                    ) : (
                      <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        className={`w-full pl-10 py-2 border rounded-lg ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'}`}
                        placeholder={placeholder}
                      />
                    )}
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
