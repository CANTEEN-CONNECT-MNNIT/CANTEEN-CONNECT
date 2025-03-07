import React, { useState } from 'react';
import {
  FaWallet,
  FaClock,
  FaUtensils,
  FaTimes,
  FaPhone,
  FaCamera,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import canteenService from '../../ApiService/canteenService';
import { setCanteen, setError, setSuccess } from '../../Redux/Slices/UserSlice';
import { setMerchantProfileOpen } from '../../Redux/Slices/pageSlice';

const MerchantProfile = ({ onClose }) => {
  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const { user, canteen } = useSelector((state) => state.user);
  const [name, setName] = useState(canteen.name);
  const [image, setImage] = useState(null);
  const [currImage, setCurrImage] = useState(canteen.image);
  const [edited, setEdited] = useState(false);
  const [isloading,setIsLoading]=useState(false);
  const dispatch = useDispatch();

  const imageUpdate = (e) => {
    const file = e.target.files[0];
    setEdited(true);
    setImage(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCurrImage(imageUrl);
    }
  };

  const validateData = () => {
    if (name.trim() === '') {
      dispatch(setError('Canteen Name is required!'));
      return false;
    } else if (canteenData?.address.trim() === '') {
      dispatch(setError('Address is required!'));
      return false;
    } else if (currImage?.toString()?.trim() === '') {
      dispatch(setError('Image is required!'));
      return false;
    } else if (canteenData?.openingtime?.toString().trim() === '') {
      dispatch(setError('Open time is required!'));
      return false;
    } else if (canteenData?.closingtime?.toString().trim() === '') {
      dispatch(setError('Close time is required!'));
      return false;
    } else if (
      isNaN(canteenData?.phone) ||
      canteenData?.phone?.trim()?.length !== 10
    ) {
      dispatch(setError('Valid contact number required!'));
      return false;
    }
    return true;
  };

  const submitData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!validateData()) return;
    console.log('Updated Canteen:', {
      name,
      image,
      address,
      ...canteenData,
      _id: canteen._id,
    });
    try {
      const res = await canteenService.updateCanteen({
        name,
        image,
        address,
        ...canteenData,
        _id: canteen._id,
      });
      if (res) {
        dispatch(setCanteen(res));
        dispatch(setSuccess('Canteen Updated!'));
        dispatch(setMerchantProfileOpen(false));
        setIsLoading(false);
      }
    } catch (error) {
      dispatch(setError(error.response.data.message));
      setIsLoading(false);
    }
  };

  const [canteenData, setCanteenData] = useState({
    address: canteen?.address || '',
    openingtime: canteen?.openTime || '',
    closingtime: canteen?.closeTime || '',
    phone: canteen?.phone || '',
  });

  const handleCanteenChange = (e) => {
    const { name, value } = e.target;
    if (value.trim() === canteenData[name]) return;
    setEdited(true);
    setCanteenData((prev) => ({ ...prev, [name]: value }));
  };

  {
    /* Merchant Details */
  }
  {
    /*
        Canteen Merchant Name
        Canteen Name
        canteen Email
        canteen phone no
        canteen earning 
        canteen location
        canteen hours
        canteen status
        canteen orders in each day
        canteen orders per month*/
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 animate-fadeIn`}
    >
      <div
        className={`relative w-full max-w-md p-6 rounded-2xl shadow-xl ${
          darkMode ? 'bg-slate-800 text-white' : 'bg-white text-gray-800'
        } animate-slideIn`}
      >
        {/* Close Button */}
        <button
          onClick={() => onClose()}
          className='absolute right-4 top-4 text-gray-400 hover:text-orange-500 transition-colors'
        >
          <FaTimes size={20} />
        </button>

        {/* Profile Header */}
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
              onChange={(e) => {
                if (e.target.value?.trim() !== canteen.name) {
                  setName(e.target.value?.trim());
                  setEdited(true);
                }
              }}
              value={canteen?.name}
              className={`font-semibold bg-transparent border-b w-full text-center outline-none ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}
            />
            <p
              className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              } mb-1`}
            >
              Owner: {user?.name}
            </p>
            <p
              className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Email: {user?.email}
            </p>
          </div>
        </div>

        {/* Earnings Card */}
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
                Total Earnings
              </span>
            </div>
            <span
              className={`text-xl font-bold ${
                darkMode ? 'text-orange-400' : 'text-orange-600'
              }`}
            >
              ₹12,500
            </span>
          </div>
        </div> */}

        <div className='space-y-3 mb-6'>
          <div className='mb-6 flex justify-center items-center'>
            <label
              htmlFor='address'
              className={`block text-sm text-nowrap font-medium ${
                darkMode ? 'text-white' : 'text-gray-600'
              }`}
            >
              Canteen Location:
            </label>
            <input
              id='address'
              name='address'
              type='text'
              placeholder='Enter canteen location'
              onChange={handleCanteenChange}
              value={canteenData.address || ''}
              className={`font-semibold text-sm bg-transparent border-b w-full p-2 text-end outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                darkMode ? 'text-white border-gray-600' : 'text-gray-800'
              }`}
            />
          </div>
          <div className='mb-6 flex justify-center items-center'>
            <label
              htmlFor='address'
              className={`block text-sm text-nowrap font-medium ${
                darkMode ? 'text-white' : 'text-gray-600'
              }`}
            >
              Contact No.:
            </label>
            <input
              id='phone'
              name='phone'
              type='text'
              placeholder='Enter contact number'
              onChange={handleCanteenChange}
              value={canteenData.phone || ''}
              className={`font-semibold text-sm bg-transparent border-b w-full p-2 text-end outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                darkMode ? 'text-white border-gray-600' : 'text-gray-800'
              }`}
            />
          </div>

          <div className='mb-6 grid grid-cols-2 gap-2'>
            <label
              htmlFor='timing'
              className={`block py-2 text-sm text-nowrap font-medium ${
                darkMode ? 'text-white' : 'text-gray-600'
              }`}
            >
              Canteen Timing:
            </label>
            <div id='timing' className='flex justify-center items-center '>
              <input
                id='openingtime'
                name='openingtime'
                type='time'
                onChange={handleCanteenChange}
                value={canteenData.openingtime || '-'}
                className={`font-semibold text-sm bg-transparent border-b w-full p-2 text-center outline-none focus:ring-2 rounded-md focus:ring-orange-500 transition-all ${
                  darkMode ? 'text-white border-gray-600' : 'text-gray-800'
                }`}
              />
              <p className='mx-2'> - </p>
              <input
                id='closingtime'
                name='closingtime'
                type='time'
                onChange={handleCanteenChange}
                value={canteenData.closingtime || '-'}
                className={`font-semibold text-sm bg-transparent border-b w-full p-2 text-center outline-none focus:ring-2 rounded-md focus:ring-orange-500 transition-all ${
                  darkMode ? 'text-white border-gray-600' : 'text-gray-800'
                }`}
              />
            </div>
          </div>
        </div>

        {edited && (
          <button
            onClick={!isloading && submitData}
            className={`mb-4 w-full ${isloading?'bg-green-500':'bg-orange-500 hover:bg-orange-600 '} text-white py-2 rounded-lg transition-colors`}
          >
            {isloading?'Updating...':'Save Changes'}
          </button>
        )}

        {/* Quick Stats */}
        <div className='grid grid-cols-2 gap-4 mb-6'>
          <div
            className={`bg-gray-50 p-3 rounded-lg text-center ${
              darkMode ? 'bg-gray-700' : ''
            }`}
          >
            <FaClock className='w-5 h-5 text-orange-500 mx-auto mb-1' />
            <div
              className={`text-lg font-semibold ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}
            >
              30
            </div>
            <div
              className={`text-xs ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Orders Today
            </div>
          </div>
          <div
            className={`bg-gray-50 p-3 rounded-lg text-center ${
              darkMode ? 'bg-gray-700' : ''
            }`}
          >
            <FaUtensils className='w-5 h-5 text-orange-500 mx-auto mb-1' />
            <div
              className={`text-lg font-semibold ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}
            >
              200
            </div>
            <div
              className={`text-xs ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Orders This Month
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantProfile;
