import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import CartSlice from './Slices/cartSlice';
import CategorySlice from './Slices/CategorySlice';
import SearchSlice from './Slices/SearchSlice';
import themeReducer from './Slices/themeSlice';
import PageReducer from './Slices/pageSlice';
import UserSlice from './Slices/UserSlice';

const persistConfig = {
  key: 'CCroot',
  storage,
};

const rootReducer = combineReducers({
  cart: CartSlice,
  category: CategorySlice,
  search: SearchSlice,
  theme: themeReducer,
  page: PageReducer,
  user: UserSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/FLUSH',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }),
});

const persistor = persistStore(Store);

export { Store, persistor };
