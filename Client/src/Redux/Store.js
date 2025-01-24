import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';  // defaults to localStorage
import CartSlice from "./Slices/cartSlice";
import CategorySlice from "./Slices/CategorySlice";
import SearchSlice from "./Slices/SearchSlice";
import themeReducer from "./Slices/themeSlice";
import PageReducer from "./Slices/pageSlice"


// Configuration for redux-persist
const persistConfig = {
  key: 'root',  // Key for persistence
  storage,  // Use localStorage by default
};

// Wrap your rootReducer with redux-persist
const rootReducer = combineReducers({
    cart: CartSlice,
    category: CategorySlice,
    search: SearchSlice,
    theme:themeReducer,
    page:PageReducer
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