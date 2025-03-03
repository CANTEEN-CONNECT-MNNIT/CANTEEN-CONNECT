import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    isOpen: false,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload._id);
    },
    updateCart: (state, action) => {
      state.cart = state.cart.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    },
    toggleOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, updateCart, toggleOpen, setOpen } =
  CartSlice.actions;
export default CartSlice.reducer;
