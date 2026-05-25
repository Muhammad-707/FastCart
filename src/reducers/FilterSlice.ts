import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  categoryId?: number | null;
  subCategory?: string | null;
  brandId?: number | null;
  minPrice?: number;
  maxPrice?: number;
  productName?: string;
  search?: string;
  rating?: number | null;
  condition?: string;
}

const initialState: FilterState = {
  categoryId: null,
  subCategory: null,
  brandId: null,
  minPrice: 0,
  maxPrice: 10000,
  productName: '',
  search: '',
  rating: null,
  condition: 'Any',
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<number | null>) {
      state.categoryId = action.payload;
      state.subCategory = null;
    },
    setSubCategory(state, action: PayloadAction<string | null>) {
      state.subCategory = action.payload;
    },
    setBrand(state, action: PayloadAction<number | null>) {
      state.brandId = action.payload;
    },
    setPriceRange(state, action: PayloadAction<[number, number]>) {
      state.minPrice = action.payload[0];
      state.maxPrice = action.payload[1];
    },
    setProductName(state, action: PayloadAction<string>) {
      state.productName = action.payload;
      state.search = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.productName = action.payload;
    },
    setRating(state, action: PayloadAction<number | null>) {
      state.rating = action.payload;
    },
    setCondition(state, action: PayloadAction<string>) {
      state.condition = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterState>) {
      return { ...state, ...action.payload };
    },
    resetFilters() {
      return initialState;
    }
  },
});

export const {
  setCategory,
  setSubCategory,
  setBrand,
  setPriceRange,
  setProductName,
  setSearch,
  setRating,
  setCondition,
  setFilters,
  resetFilters
} = filterSlice.actions;

export default filterSlice.reducer;