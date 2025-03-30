import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { CiSquarePlus, CiSquareMinus } from 'react-icons/ci';
import { useDispatch } from 'react-redux';
import { setCart } from '../../Redux/Slices/cartSlice';
import { setError, setSuccess } from '../../Redux/Slices/UserSlice';
import cartService from '../../ApiService/cartService';

const ItemCard = ({
  _id,
  name,
  price,
  img,
  updateQuantity,
  canteen,
  availability,
}) => {
  const dispatch = useDispatch();
  const [requiredQty, setRequiredQty] = useState(
    availability !== 'out_of_stock' ? 1 : 0
  );

  useEffect(() => {
    console.log(requiredQty);

    updateQuantity(canteen, _id, requiredQty, price, name);
  }, [requiredQty]);

  const deleteItem = async () => {
    try {
      const res = await cartService.deleteCart({ _id });
      console.log(res);

      if (res) {
        updateQuantity(canteen, _id, 0, price);
        dispatch(setSuccess('Item Removed 👋'));
        dispatch(setCart(res));
      }
    } catch (error) {
      dispatch(setError(error.response?.data?.message));
    }
  };

  return (
    <div
      className={`relative flex items-center gap-4 shadow-md ${
        availability !== 'out_of_stock' ? 'bg-white' : 'bg-black/10'
      } mb-3 rounded-lg p-4 border border-gray-200`}
    >
      <MdDelete
        onClick={deleteItem}
        className='absolute size-5 top-4 right-3 cursor-pointer text-2xl text-red-300 hover:text-red-700 transition duration-200'
      />

      <img
        src={img}
        alt={name}
        className='w-[60px] h-[60px] rounded-md border border-gray-300 object-cover'
      />

      {/* Item Details */}
      <div className='flex-1'>
        <h2 className='text-gray-800 font-semibold text-lg'>{name}</h2>
        <div className='flex items-center justify-between mt-2'>
          <span className='text-slate-900 font-bold'>₹{price}</span>
          {availability !== 'out_of_stock' && (
            <div className='flex items-center gap-2'>
              {/* Decrement Button */}
              {requiredQty > 1 && (
                <CiSquareMinus
                  onClick={() => setRequiredQty((prev) => prev - 1)}
                  className='cursor-pointer text-xl p-1 size-8 rounded-md  text-black hover:bg-slate-200 transition-all duration-200'
                />
              )}
              <span className='text-gray-800 font-medium'>{requiredQty}</span>
              {/* Increment Button */}
              <CiSquarePlus
                onClick={() => setRequiredQty((prev) => prev + 1)}
                className='cursor-pointer text-xl p-1 size-8 rounded-md  text-black hover:bg-green-200 transition-all duration-200'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
