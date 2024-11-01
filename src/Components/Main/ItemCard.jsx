import React from 'react'
import { MdDelete } from "react-icons/md";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQty,
  decrementQty,
 
} from "../../Redux/Slices/CartSlice";
import { toast } from "react-hot-toast";


const ItemCard = ({id,name,qty,price,img}) => {

  const dispatch=useDispatch();
  return (
    <div className="flex gap-2 shadow-xl bg-slate-500 mb-3 rounded-lg p-2 ">
         <MdDelete 
         onClick={() => {
          dispatch(removeFromCart({ id, img, name, price, qty }))
          toast(`${name} Removed!`, {
            icon: "👋",
          });
        }}
         className='absolute right-7 cursor-pointer text-red-400'/>
        <img src={img} alt='' className='w-[50px] h-[45px]'/>
    <div className='leading-6'>
        <h2 className='text-green-100'>{name}</h2>
        <div className='flex justify-between'>
            <span className='text-green-500 font-bold'>₹{price}</span>
            <div className='flex justify-center items-center gap-2 absolute right-7'>
            <CiSquareMinus 
            onClick={() =>
              qty > 1 ? dispatch(decrementQty({ id })) : (qty = 0)
            }
            className=" bg-white hover:text-white hover:bg-green-500 hover:border-none rounded-md  text-xl transition-all ease-linear cursor-point" />
            <span> {qty} </span>
            <CiSquarePlus
            onClick={() =>
              qty >= 1 ? dispatch(incrementQty({ id })) : (qty = 0)
            } 
            className=" bg-white hover:text-white hover:bg-green-500 hover:border-none rounded-md  text-xl transition-all ease-linear cursor-point" />
            </div>
        </div>
    </div>
    </div>
  )
}

export default ItemCard