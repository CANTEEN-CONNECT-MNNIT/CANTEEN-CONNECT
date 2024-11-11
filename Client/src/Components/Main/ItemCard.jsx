import React from 'react';
import { MdDelete } from 'react-icons/md';
import { CiSquarePlus, CiSquareMinus } from 'react-icons/ci';
import { useDispatch } from 'react-redux';
import { removeFromCart, incrementQty, decrementQty } from '../../Redux/Slices/cartSlice';
import { toast } from 'react-hot-toast';

const ItemCard = ({ id, name, qty, price, img }) => {
  const dispatch = useDispatch();

  return (
    <div className="relative flex items-center gap-4 shadow-md bg-white mb-3 rounded-lg p-4 border border-gray-200">
      <MdDelete
        onClick={() => {
          dispatch(removeFromCart({ id, img, name, price, qty }));
          toast(`${name} Removed!`, { icon: '👋' });
        }}
        className="absolute size-5 top-4 right-3 cursor-pointer text-2xl text-red-300 hover:text-red-700 transition duration-200"
      />

      <img
        src={img}
        alt={name}
        className="w-[60px] h-[60px] rounded-md border border-gray-300 object-cover"
      />

      {/* Item Details */}
      <div className="flex-1">
        <h2 className="text-gray-800 font-semibold text-lg">{name}</h2>
        <div className="flex items-center justify-between mt-2">
          <span className="text-slate-900 font-bold">₹{price}</span>
          <div className="flex items-center gap-2">
            {/* Decrement Button */}
            <CiSquareMinus
              onClick={() => qty > 1 ? dispatch(decrementQty({ id })) : null}
              className="cursor-pointer text-xl p-1 size-8 rounded-md  text-black hover:bg-slate-200 transition-all duration-200"
            />
            <span className="text-gray-800 font-medium">{qty}</span>
            {/* Increment Button */}
            <CiSquarePlus
              onClick={() => dispatch(incrementQty({ id }))}
              className="cursor-pointer text-xl p-1 size-8 rounded-md  text-black hover:bg-green-200 transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
