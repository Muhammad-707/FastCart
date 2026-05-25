import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { type FilterState } from './FilterSlice';

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
  discountPrice?: number;
  hasDiscount?: boolean;
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

export const getProductById = createAsyncThunk<
  Product, 
  string, 
  { state: { products: ProductState }; rejectValue: string }
>(
  'products/getProductById',
  async (id, { getState, rejectWithValue }) => {
    const { items } = getState().products;
    const foundProduct = items.find((item) => String(item.id) === id);

    if (foundProduct) {
      return foundProduct;
    }

    try {
      const response = await axios.get(`https://fastcard-1-o23z.onrender.com/api/Product/get-product/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Ошибка загрузки товара: товар не найден');
    }
  }
);

export const fetchProducts = createAsyncThunk<
  Product[], 
  FilterState, 
  { rejectValue: string }
>(
  'products/fetchProducts',
  async (filters, { rejectWithValue }) => {
    try {
      const params: Record<string, any> = {
        PageNumber: 1,
        PageSize: 100,
      };
      
      if (filters.minPrice && filters.minPrice > 0) {
        params.MinPrice = filters.minPrice;
      }
      if (filters.maxPrice && filters.maxPrice < 999999) {
        params.MaxPrice = filters.maxPrice;
      }
      
      if (filters.categoryId) params.CategoryId = filters.categoryId;
      if (filters.brandId) params.BrandId = filters.brandId;
      
      const searchWord = filters.search || filters.productName || '';
      if (searchWord.trim()) params.ProductName = searchWord;
      
      if (filters.subCategory) params.SubcategoryId = filters.subCategory; 

      const response = await axios.get('https://fastcard-1-o23z.onrender.com/api/Product/get-products', { params });
      return response.data.data.products;
    } catch (error) {
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
      .addCase(fetchProducts.pending, (state) => { 
        state.loading = true; 
        state.error = undefined; 
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProductById.pending, (state) => { 
        state.loading = true; 
        state.error = undefined; 
      })
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