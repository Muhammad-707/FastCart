import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
  id: number;
  productName: string;
  price: number;
  image: string;
  images?: string[];
  rating: number;
  categoryName: string;
  description: string;
  brand?: { brandName: string };
  color?: { colorName: string };
  quantity: number;
}

interface ProductState {
  items: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error?: string;
}

const initialState: ProductState = {
  items: [],
  currentProduct: null,
  loading: false,
};

// Thunk для получения одного товара
export const getProductById = createAsyncThunk<
  Product, 
  string, 
  { state: { products: ProductState }; rejectValue: string }
>(
  'products/getProductById',
  async (id, { getState, rejectWithValue }) => {
    // 1. Пытаемся найти товар в уже загруженном списке
    const { items } = getState().products;
    const foundProduct = items.find((item) => String(item.id) === id);

    if (foundProduct) {
      return foundProduct;
    }

    // 2. Если не нашли, делаем запрос к API
    try {
      const response = await axios.get(`https://fastcard-1-o23z.onrender.com/api/Product/get-product/${id}`);
      return response.data.data;
    } catch (e: any) {
      return rejectWithValue('Ошибка загрузки товара: товар не найден');
    }
  }
);

// Thunk для получения списка товаров
export const fetchProducts = createAsyncThunk<
  Product[], 
  any, 
  { rejectValue: string }
>(
  'products/fetchProducts',
  async (filters, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (filters?.minPrice) params.append("MinPrice", filters.minPrice.toString());
      if (filters?.maxPrice) params.append("MaxPrice", filters.maxPrice.toString());
      
      const response = await axios.get(`https://fastcard-1-o23z.onrender.com/api/Product/get-products?${params.toString()}`);
      return response.data.data.products;
    } catch (e: any) {
      return rejectWithValue('Ошибка загрузки списка товаров');
    }
  }
);

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurrentProduct: (state, action: PayloadAction<Product>) => {
      state.currentProduct = action.payload;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка fetchProducts
      .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = undefined; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Обработка getProductById
      .addCase(getProductById.pending, (state) => { state.loading = true; state.error = undefined; })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentProduct, setCurrentProduct } = productSlice.actions;
export default productSlice.reducer;