import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';  // defaults to localStorage
import CartSlice from "./Slices/CartSlice";
import CategorySlice from "./Slices/CategorySlice";
import SearchSlice from "./Slices/SearchSlice";
import UserSlice from "./Slices/UserSlice"


// Configuration for redux-persist
const persistConfig = {
  key: 'root',  // Key for persistence
  storage,  // Use localStorage by default
};

// Wrap your rootReducer with redux-persist
const rootReducer = combineReducers({
    user: UserSlice,
    cart: CartSlice,
    category: CategorySlice,
    search: SearchSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/FLUSH', 'persist/PAUSE', 'persist/PURGE', 'persist/REGISTER'],
        },
    }),
});

const persistor = persistStore(Store); 


export { Store, persistor };