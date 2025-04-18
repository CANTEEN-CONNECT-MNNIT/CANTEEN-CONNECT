import React, { useEffect, useRef, useState } from 'react';
import { FaCamera, FaEdit, FaTrashAlt, FaUtensils } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import foodService from '../../ApiService/foodService';
import { setError, setSuccess } from '../../Redux/Slices/UserSlice';
import { v4 as uuid } from 'uuid';

export default function MenuManagement() {
  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const [menuItems, setMenuItems] = useState([]);
  const [currPage,setCurrPage]=useState(1);
  const [totalPages,setTotalPages]=useState(1);
  const [editItem, setEditItem] = useState(null);
  const [image, setImage] = useState(null);
  const [currImage, setCurrImage] = useState(null);
  const [isloading,setIsLoading]=useState(false);
  const dispatch = useDispatch();
  const editItemRef=useRef(null);
  const menuRef=useRef(null);

  const { canteen } = useSelector((state) => state.user);

  const fetchItems = async () => {
    try {
      const res = await foodService.getAll({ canteen: canteen?._id ,page: currPage, limit:5});
      if (res) {
        setMenuItems((prev) => [...prev, ...res?.allitems]);
        setTotalPages(res?.totalPages);
      }
    } catch (error) {
      dispatch(setError(error?.response?.data.message));
      console.error(error);
    }
  };

  const handleScroll = () => {
    if (!menuRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = menuRef.current;

    // Check if scrolled to bottom of the container
    if (
      scrollTop + clientHeight >= scrollHeight - 10 &&
      currPage < totalPages
    ) {
      setCurrPage((prev) => prev + 1); // Load more
    }
  };

  useEffect(() => {
    fetchItems();
  }, [currPage]);

  const handleEdit = (item) => {
    setEditItem(item);
    setCurrImage(item?.image || null);
  };

  const handleDelete = async (id) => {
    try {
      const res = await foodService.deleteitem({ _id: id });
      if (res) {
        fetchItems();
      }
    } catch (error) {
      dispatch(setError(error?.response?.data.message));
      console.error(error);
    }
  };

  const imageUpdate = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCurrImage(imageUrl);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!editItem) return;
    if (!image && editItem?.image?.length === 0) {
      dispatch(setError('Item image is required!'));
      return;
    }

    setIsLoading(true);

    try {
      const res = editItem?._id
        ? await foodService.updateitem({
            ...editItem,
            image: image || editItem.image,
          })
        : await foodService.additem(
            { ...editItem, image: image },
            canteen?._id
          );
      if (res) {
        dispatch(
          setSuccess(`${editItem._id ? 'Item updated!' : 'Item Added!'}`)
        );
        setEditItem(null);
        fetchItems();
        setIsLoading(false);
      }
    } catch (error) {
      dispatch(setError(error.response.data.message));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (editItemRef.current && !editItemRef.current.contains(e.target)) {
        setEditItem(null);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
      } rounded-xl shadow-lg border ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      } p-6`}
    >
      <div className='flex justify-between items-center mb-6'>
        <h3 className='text-lg font-semibold'>Menu Management</h3>
        <button
          onClick={() => {
            setCurrImage(null);
            setImage(null);
            setEditItem({
              name: '',
              price: 1,
              description: '',
              available: 'in_stock',
              image: '',
            });
          }}
          className={`${
            darkMode ? 'bg-orange-600' : 'bg-orange-500'
          } text-white px-4 py-2 rounded-lg hover:${
            darkMode ? 'bg-orange-700' : 'bg-orange-600'
          }`}
        >
          + Add Item
        </button>
      </div>

      {editItem && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
          <div
            className={`rounded-lg p-6 w-full max-w-md ${
              darkMode ? 'bg-slate-800' : 'bg-white'
            }`}
            ref={editItemRef}
          >
            <div className='flex justify-between items-center mb-4'>
              <h4
                className={`text-lg font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}
              >
                {editItem?._id ? 'Edit Item' : 'Add New Item'}
              </h4>
              <button
                onClick={() => {
                  setEditItem(null);
                }}
                className={`text-gray-500 hover:text-gray-700 ${
                  darkMode ? 'text-gray-400 hover:text-gray-300' : ''
                }`}
              >
                X
              </button>
            </div>
            <form onSubmit={handleSave} className='space-y-4'>
              <label
                htmlFor='imageInput'
                className={`w-20 h-20 mx-auto rounded-full ${
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
              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Name
                </label>
                <input
                  type='text'
                  value={editItem.name}
                  onChange={(e) =>
                    setEditItem({ ...editItem, name: e.target.value })
                  }
                  className={`mt-1 block w-full rounded-md border ${
                    darkMode
                      ? 'border-gray-600 bg-gray-700 text-white'
                      : 'border-gray-300'
                  } px-3 py-2 focus:border-orange-500 focus:ring-orange-500`}
                  required
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Price (&#8377;)
                </label>
                <input
                  type='text'
                  value={editItem.price}
                  onChange={(e) =>
                    setEditItem({ ...editItem, price: e.target.value })
                  }
                  className={`mt-1 block w-full rounded-md border ${
                    darkMode
                      ? 'border-gray-600 bg-gray-700 text-white'
                      : 'border-gray-300'
                  } px-3 py-2 focus:border-orange-500 focus:ring-orange-500`}
                  required
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Description
                </label>
                <input
                  type='text'
                  value={editItem.description}
                  onChange={(e) =>
                    setEditItem({ ...editItem, description: e.target.value })
                  }
                  className={`mt-1 block w-full rounded-md border ${
                    darkMode
                      ? 'border-gray-600 bg-gray-700 text-white'
                      : 'border-gray-300'
                  } px-3 py-2`}
                  required
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Availability
                </label>
                <select
                  value={editItem.available || 'in_stock'}
                  onChange={(e) =>
                    setEditItem({ ...editItem, available: e.target.value })
                  }
                  className={`mt-1 block w-full rounded-md border ${
                    darkMode
                      ? 'border-gray-600 bg-gray-700 text-white'
                      : 'border-gray-300'
                  } px-3 py-2`}
                >
                  <option value='in_stock'>In Stock</option>
                  <option value='limited_stock'>Low Stock</option>
                  <option value='out_of_stock'>Out of Stock</option>
                </select>
              </div>
              <div className='flex justify-end space-x-3'>
                <button
                  type='button'
                  onClick={() => setEditItem(null)}
                  className={`px-4 py-2 border rounded-lg ${
                    darkMode
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className={`px-4 py-2 ${
                    isloading?
                    darkMode
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-green-500 hover:bg-green-600'
                    :
                    darkMode
                      ? 'bg-orange-600 hover:bg-orange-700'
                      : 'bg-orange-500 hover:bg-orange-600'
                  } text-white rounded-lg`}
                >
                  {editItem?._id ? 
                  isloading? 'Updating'  :'Update' 
                  :
                  isloading? 'Saving' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className='overflow-x-auto'>
          <div>
              <ul className=' grid grid-cols-5 text-left border-b border-gray-200'>
              <li className='pb-3 text-sm font-medium'>Item Name</li>
              <li className='pb-3 text-sm font-medium'>Price (&#8377;)</li>
              <li className='pb-3 text-sm font-medium'>Description</li>
              <li className='pb-3 text-sm font-medium'>available</li>
              <li className='pb-3 text-sm font-medium'>Actions</li>
            </ul>
          </div>
          <div 
          className='max-h-56 overflow-y-scroll hide-scrollbar'
          ref={menuRef}
          onScroll={handleScroll}>
          <ul
          >
            {menuItems.length > 0 ? (
              menuItems.map((item) => (
                <li 
                key={uuid()}>
                <ul
                  className=' grid grid-cols-5 border-b border-gray-100 last:border-0'
                >
                  <li className='py-4'>{item.name}</li>
                  <li className='py-4'>₹{item.price}</li>
                  <li className='py-4'>{item.description}</li>
                  <li className='py-4'>
                    <span
                      className={`px-2 py-1 rounded-full ${
                        item.available === 'in_stock'
                          ? 'bg-green-50 text-green-600'
                          : item.available === 'limited_stock'
                          ? 'bg-yellow-50 text-yellow-600'
                          : 'bg-red-50 text-red-600'
                      }`}
                    >
                      {item.available?.toUpperCase()}
                    </span>
                  </li>
                  <li className='text-center py-4 space-x-2'>
                    <button
                      onClick={() => handleEdit(item)}
                      className='text-orange-500 hover:text-orange-600'
                    >
                      <FaEdit className='inline-block w-5 h-5' />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className='text-red-500 hover:text-red-600'
                    >
                      <FaTrashAlt className='inline-block w-5 h-5' />
                    </button>
                  </li>
                  </ul>
                </li>
              ))
            ) : (
              <li>
                <p className='py-4 text-center'>
                  No Items to show!
                </p>
              </li>
            )}
          </ul>
          </div>
      </div>
    </div>
  );
}
