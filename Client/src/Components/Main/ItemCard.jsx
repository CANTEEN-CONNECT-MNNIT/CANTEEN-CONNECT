import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { CiSquarePlus, CiSquareMinus } from 'react-icons/ci';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCart } from '../../Redux/Slices/CartSlice';
import { toast } from 'react-hot-toast';
import { setError } from '../../Redux/Slices/UserSlice';
import cartService from '../../ApiService/cartService';

const ItemCard = (item) => {
  const dispatch = useDispatch();
  const { _id, name, qty, price, img } = item;
  const [requiredQty, setRequiredQty] = useState(qty ? qty : 0);

  useEffect(() => {
    dispatch(updateCart({ ...item, qty: requiredQty }));
  }, [requiredQty]);

  const deleteItem = async () => {
    try {
      if (await cartService.deleteCart(item)) {
        dispatch(removeFromCart({ _id, img, name, price, qty }));
        toast(`${name} Removed!`, { icon: '👋' });
      }
    } catch (error) {
      dispatch(setError(error.response?.data?.message));
    }
  };

  return (
    <div className='relative flex items-center gap-4 shadow-md bg-white mb-3 rounded-lg p-4 border border-gray-200'>
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
          <div className='flex items-center gap-2'>
            {/* Decrement Button */}
            <CiSquareMinus
              onClick={() =>
                requiredQty > 0 && setRequiredQty((prev) => prev - 1)
              }
              className='cursor-pointer text-xl p-1 size-8 rounded-md  text-black hover:bg-slate-200 transition-all duration-200'
            />
            <span className='text-gray-800 font-medium'>{qty}</span>
            {/* Increment Button */}
            <CiSquarePlus
              onClick={requiredQty < qty && setRequiredQty((prev) => prev + 1)}
              className='cursor-pointer text-xl p-1 size-8 rounded-md  text-black hover:bg-green-200 transition-all duration-200'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
