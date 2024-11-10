import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import ItemCard from './ItemCard';
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [activeCart, setActiveCart] = useState(false);

  const cartItems = useSelector((state) => state.cart.cart);
  const totalQty = cartItems.reduce((totalQty, item) => totalQty + item.qty, 0);
  const totalPrice = cartItems
    .reduce((total, item) => total + item.qty * item.price, 0)
    .toFixed(2);

  const navigate = useNavigate();

  return (
    <>
      <div
        className={`fixed right-0 top-0 w-full h-full sm:w-[46vh] p-2 shadow-2xl bg-slate-100 text-gray-800 ${
          activeCart ? 'translate-x-0' : 'translate-x-full'
        } transition-all duration-500 z-50`}
      >
        {/* Header */}
        <div className="flex justify-between items-center py-4 px-3 border-b border-gray-300">
          <span className="font-bold text-2xl">My Order</span>
          <IoMdClose
            onClick={() => setActiveCart(!activeCart)}
            className="border-2 border-gray-400 hover:text-red-600 hover:border-red-600 cursor-pointer p-1 text-2xl rounded-md transition-transform duration-200 transform hover:scale-110"
          />
        </div>

        {/* Cart Items */}
        <div
          className="mt-4 overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 250px)' }} // To make the items scrollable within a fixed height
        >
          {cartItems.length > 0 ? (
            cartItems.map((food) => (
              <ItemCard
                key={food.id}
                id={food.id}
                name={food.name}
                price={food.price}
                img={food.img}
                qty={food.qty}
              />
            ))
          ) : (
            <h2 className="text-center text-xl font-bold">
              Your cart is empty
            </h2>
          )}
        </div>

        {/* Footer Section */}
        <div className="absolute bottom-0 w-full p-4 right-0 bg-white shadow-md border-t border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-700 text-lg font-semibold">Items:</h3>
            <span className="text-gray-800 font-bold text-xl">{totalQty}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-700 text-lg font-semibold">Total Amount:</h3>
            <span className="text-green-600 font-bold text-xl">₹{totalPrice}</span>
          </div>
          <hr className="my-2 border-gray-300" />
          <button
            onClick={() => navigate('/OrderPage')}
            className="font-bold px-4 py-2 rounded-lg w-full bg-green-500 text-white hover:bg-green-600 transition-all duration-200"
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Cart Icon */}
      <FaShoppingCart
        onClick={() => setActiveCart(!activeCart)}
        className={`rounded-full size-14 cursor-pointer bg-white shadow-md text-5xl text-slate-700 p-3 fixed bottom-4 right-4 ${
          totalQty > 0 && 'animate-bounce delay-500 transition-all'
        }`}
      />
    </>
  );
};

export default Cart;
