import React, { useState } from 'react';
import {
  FaWallet,
  FaClock,
  FaUtensils,
  FaTimes,
  FaCamera,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileOpen } from '../../Redux/Slices/pageSlice';
import userService from '../../ApiService/userApiService';
import {
  loginSuccess,
  setError,
  setSuccess,
} from '../../Redux/Slices/UserSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const initialState = useSelector((state) => state.user.user);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(initialState.name);
  const [currImage, setCurrImage] = useState(initialState.image);
  const [edited, setEdited] = useState(false);

  const submitData = async (e) => {
    e.preventDefault();
    console.log('Updated Profile:', { name, image });
    try {
      const res = await userService.update({
        name,
        image,
        email: initialState.email,
      });
      if (res) {
        console.log(res);

        dispatch(loginSuccess(res));
        dispatch(setSuccess('Profile Updated!'));
      }
    } catch (error) {
      dispatch(setError(error.response.data.message));
    }
    dispatch(setProfileOpen(false));
  };

  const imageUpdate = (e) => {
    const file = e.target.files[0];
    setEdited(true);
    setImage(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCurrImage(imageUrl);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 animate-fadeIn`}
    >
      <form
        onSubmit={submitData}
        className={`relative w-full max-w-md p-6 rounded-2xl shadow-xl ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        } animate-slideIn`}
      >
        <button
          type='button'
          onClick={() => dispatch(setProfileOpen(false))}
          className='absolute right-4 top-4 text-gray-400 hover:text-orange-500 transition-colors'
        >
          <FaTimes size={20} />
        </button>

        <div className='flex flex-col items-center mb-6'>
          <label
            htmlFor='imageInput'
            className={`w-20 h-20 rounded-full ${
              darkMode ? 'bg-gray-700' : 'bg-orange-100'
            } flex items-center justify-center mb-3 cursor-pointer relative`}
          >
            {currImage ? (
              <img
                src={currImage}
                alt='Profile'
                className='w-full h-full object-cover rounded-full'
              />
            ) : (
              <FaUtensils className='w-10 h-10 text-orange-500' />
            )}
            <div className='absolute bottom-0 right-0 bg-black bg-opacity-50 p-1 rounded-full'>
              <FaCamera className='text-white text-xs' />
            </div>
          </label>
          <input
            type='file'
            id='imageInput'
            onChange={imageUpdate}
            className='hidden'
          />
          <div className='text-center text-xl'>
            <input
              onChange={(e) => setName(e.target.value?.trim())}
              value={name}
              className={`font-semibold bg-transparent border-b w-full text-center outline-none ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}
            />
            <p
              className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {initialState.email}
            </p>
          </div>
        </div>

        {/* <div
          className={`rounded-lg p-4 mb-6 ${
            darkMode ? 'bg-gray-700' : 'bg-orange-50'
          }`}
        >
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <FaWallet className='w-5 h-5 text-orange-500 mr-2' />
              <span
                className={`font-medium ${
                  darkMode ? 'text-orange-300' : 'text-orange-700'
                }`}
              >
                Balance
              </span>
            </div>
            <span
              className={`text-xl font-bold ${
                darkMode ? 'text-orange-400' : 'text-orange-600'
              }`}
            >
              ₹{initialState.balance || 0}
            </span>
          </div>
        </div> */}

        {/* <div className="space-y-3 mb-6">
          {['Department', 'Role', 'Meal Preference'].map((label) => (
            <div key={label} className={`flex justify-between items-center py-2 border-b ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
              <span className={`text-gray-600 ${darkMode ? 'text-gray-400' : ''}`}>{label}</span>
              <input className={`font-medium bg-transparent border-b ${darkMode ? 'text-gray-300' : 'text-gray-800'}`} />
            </div>
          ))}
        </div> */}

        <div className='grid grid-cols-2 gap-4 mb-6'>
          <div
            className={`bg-gray-50 p-3 rounded-lg text-center ${
              darkMode ? 'bg-gray-700' : ''
            }`}
          >
            {initialState.activeOrders ? (
              <div
                className={`text-lg font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}
              >
                {initialState.activeOrders}
              </div>
            ) : (
              <FaClock className='w-5 h-5 text-orange-500 mx-auto mb-1' />
            )}
            <div
              className={`text-xs ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Active Orders
            </div>
          </div>
          <div
            className={`bg-gray-50 p-3 rounded-lg text-center ${
              darkMode ? 'bg-gray-700' : ''
            }`}
          >
            {initialState.ordersThisMonth ? (
              <div
                className={`text-lg font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}
              >
                {initialState.ordersThisMonth}
              </div>
            ) : (
              <FaUtensils className='w-5 h-5 text-orange-500 mx-auto mb-1' />
            )}
            <div
              className={`text-xs ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Orders This Month
            </div>
          </div>
        </div>

        {(edited || name !== initialState.name) && (
          <button
            type='submit'
            className='w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors'
          >
            Save Changes
          </button>
        )}
      </form>
    </div>
  );
};

export default Profile;
