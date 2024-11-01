import React, { useState } from 'react'
import {IoMdClose} from "react-icons/io";
import ItemCard from './ItemCard';
import {useSelector} from "react-redux"
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {

  const [activeCart,setActiveCart] = useState(false);

  const cartItems = useSelector((state)=>state.cart.cart);
  const totalQty = cartItems.reduce((totalQty, item) => totalQty + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );

  const navigate = useNavigate();

  return (
    <>
        <div
         className={`fixed right-0 top-0 w-full h-full sm:w-[40vh] p-3 bg-slate-100 ${
          activeCart ? "translate-x-0" : "translate-x-full"
        } transition-all duration-500 z-50`}> 
            <div className="flex justify-between items-center my-3">
                <span className='font-bold text-slate-900'>My Order</span>
                <IoMdClose 
                onClick={() => setActiveCart(!activeCart)}
                className='border-2 border-x-blue-950 hover:text-red-600 hover:border-red-600 cursor-pointer  font-bold p-1 text-xl  rounded-md'/>            
            </div>

            {cartItems.length > 0 ? (
          cartItems.map((food) => {
            return (
              <ItemCard
                key={food.id}
                id={food.id}
                name={food.name}
                price={food.price}
                img={food.img}
                qty={food.qty}
              />
            );
          })
        ) : (
          <h2 className="text-center text-xl font-bold text-gray-800">
            Your cart is empty
          </h2>
        )}

            <div className='absolute bottom-0'>
               <h3 className="font-semibold text-gray-800">Items : {totalQty}</h3>
              <h3 className="font-semibold text-gray-800">Total Amount : {totalPrice} </h3>
                <hr className='md:w-[90vw] w-[18vw]'/>
                <button onClick={() => navigate("/order")} className='bg-green-500 font-bold px-3 text-white py-2 rounded-lg  w-[29vw] md:w-[15vw] mb-5'>Checkout</button>
            </div>
        </div>

        <FaShoppingCart
        onClick={() => setActiveCart(!activeCart)}
        className={`rounded-full bg-white shadow-md text-5xl p-3 fixed bottom-4 right-4 ${totalQty > 0 && "animate-bounce delay-500 transition-all"} `}/>
    </>
    
  )
}

export default Cart