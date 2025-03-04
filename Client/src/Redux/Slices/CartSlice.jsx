import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  isOpen: false,
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
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
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    toggleOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    paymentDone: () => initialState,
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCart,
  toggleOpen,
  setOpen,
  setCart,
  paymentDone,
} = CartSlice.actions;
export default CartSlice.reducer;
