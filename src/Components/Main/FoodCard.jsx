import React from 'react'
import {AiFillStar} from "react-icons/ai"
import { useDispatch } from 'react-redux'
import {addToCart} from "../../Redux/Slices/CartSlice"


const FoodCard = ({id,name,price,desc,img,rating,handleToast}) => {
  const dispatch = useDispatch();
  
  return (

    <div className='font-bold w-[250px] bg-white p-5 flex gap-2 flex-col rounded-xl'>
        <img src={img} className='w-auto rounded-3xl h-[130px] hover:scale-110 cursor-grab transition-all duration-500 ease-in-out'/>
        <div className='text-sm flex justify-around'>
            <h2>{name}</h2>
            <span>₹{price}</span>
        </div>
        <p className='text-sm font-normal'>{desc ? desc.slice(0, 60) : ''}...</p>
        <div className="flex justify-between ">
        <span className="flex justify-center items-center">
          <AiFillStar className="mr-1 text-yellow-400" /> {rating}
        </span>
            <button onClick={()=>{
              dispatch(addToCart({id,name,price,rating,price,img,qty:1}));
            handleToast(name);
            }}
            className='p-1 text-white bg-orange-500 hover:bg-yellow-600 rounded-lg '>Add to cart</button>
        </div>
    </div>
  )
}

export default FoodCard