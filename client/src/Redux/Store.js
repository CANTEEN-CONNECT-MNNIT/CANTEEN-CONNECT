import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./Slices/CartSlice";
import CategorySlice from "./Slices/CategorySlice";
import SearchSlice from "./Slices/SearchSlice";
import UserSlice from "./Slices/UserSlice";

const Store = configureStore({
  reducer: {
    user: UserSlice,
    cart: CartSlice,
    category: CategorySlice,
    search: SearchSlice,
  },
});
export default Store;