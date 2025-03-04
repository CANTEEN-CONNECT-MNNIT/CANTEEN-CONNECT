import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import ItemCard from './ItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { setOpen, toggleOpen } from '../../Redux/Slices/CartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart: cartItems, isOpen: activeCart } = useSelector(
    (state) => state.cart
  );

  const [canteenOrders, setCanteenOrders] = useState(new Map());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Function to add or update an item in a canteen order
  const addOrUpdateItem = (canteenId, itemId, quantity, price, name) => {
    setCanteenOrders((prevOrders) => {
      const updatedOrders = new Map(prevOrders); // Clone the Map
      const items = updatedOrders.get(canteenId) || []; // Get existing or create new array

      const existingItem = items.find((item) => item._id === itemId);

      if (existingItem) {
        const quantityDiff = quantity - existingItem.quantity;
        setTotalPrice((prev) => prev + quantityDiff * price);
        setTotalItems((prev) => prev + quantityDiff);
        existingItem.quantity = quantity; // Update quantity
      } else {
        items.push({ _id: itemId, quantity, price, name }); // Add new item
        setTotalItems((prev) => prev + quantity);
        setTotalPrice((prev) => prev + quantity * price);
      }

      updatedOrders.set(canteenId, items);
      return updatedOrders; // React state update
    });
  };

  console.log(canteenOrders);

  const handleLessToast = () => toast.error(`Cart is Empty `);

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <div
        className={`fixed right-0 top-0 w-full h-full sm:w-[46vh] p-2 shadow-2xl bg-slate-100 text-gray-800 ${
          activeCart ? 'translate-x-0' : 'translate-x-full'
        } transition-all duration-500 z-50`}
      >
        {/* Header */}
        <div className='flex justify-between items-center py-4 px-3 border-b border-gray-300'>
          <span className='font-bold text-2xl'>My Order</span>
          <IoMdClose
            onClick={() => dispatch(toggleOpen())}
            className='border-2 border-gray-400 hover:text-red-600 hover:border-red-600 cursor-pointer p-1 text-2xl rounded-md transition-transform duration-200 transform hover:scale-110'
          />
        </div>

        {/* Cart Items */}
        <div
          className='mt-4 overflow-y-auto'
          style={{ maxHeight: 'calc(100vh - 250px)' }}
        >
          {cartItems.length > 0 ? (
            cartItems.map((food) => (
              <ItemCard
                key={food._id}
                _id={food._id}
                name={food.name}
                price={food.price}
                img={food.image}
                // qty={food.qty}
                canteen={food.canteen}
                updateQuantity={addOrUpdateItem}
              />
            ))
          ) : (
            <h2 className='text-center text-xl font-bold'>
              Your cart is empty
            </h2>
          )}
        </div>

        {/* Footer Section */}
        <div className='absolute bottom-0 w-full p-4 right-0 bg-white shadow-md border-t border-gray-200'>
          <div className='flex justify-between items-center mb-2'>
            <h3 className='text-gray-700 text-lg font-semibold'>Items:</h3>
            <span className='text-gray-800 font-bold text-xl'>
              {totalItems}
            </span>
          </div>
          <div className='flex justify-between items-center mb-2'>
            <h3 className='text-gray-700 text-lg font-semibold'>
              Total Amount:
            </h3>
            <span className='text-green-600 font-bold text-xl'>
              ₹{totalPrice}
            </span>
          </div>
          <hr className='my-2 border-gray-300' />
          <button
            onClick={() => {
              dispatch(setOpen(false));
              navigate('/paymentGateway', {
                state: { totalItems, totalPrice, canteenOrders },
              });
            }}
            className='font-bold px-4 py-2 rounded-lg w-full bg-green-500 text-white hover:bg-green-600 transition-all duration-200'
            disabled={totalItems === 0}
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Cart Icon */}
      <FaShoppingCart
        onClick={() => dispatch(toggleOpen())}
        className={`rounded-full size-14 cursor-pointer bg-white shadow-md text-5xl text-slate-700 p-3 fixed bottom-4 right-4 ${
          cartItems?.length > 0 && 'animate-bounce delay-500 transition-all'
        }`}
      />
    </>
  );
};

export default Cart;
