import { configureStore } from '@reduxjs/toolkit';
import productReducer from '@/reducers/ProductSlice';
import filterReducer from '@/reducers/FilterSlice';
import cartReducer from '@/reducers/CartSlice';
import categoryReducer from '@/reducers/CategorySlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    filters: filterReducer,
    cart: cartReducer,
    categories: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
