import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// ЭКСПОРТ ИНТЕРФЕЙСА (именованный)
export interface FilterState {
  minPrice: number;
  maxPrice: number;
  rating: number | null;
  brandIds: number[];
  category: string;
}

// ... остальной код (createSlice и т.д.)
const initialState: FilterState = {
  minPrice: 0,
  maxPrice: 999999,
  rating: null,
  brandIds: [],
  category: 'All',
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPriceRange(state, action: PayloadAction<[number, number]>) {
      state.minPrice = action.payload[0];
      state.maxPrice = action.payload[1];
    },
  },
});

export const { setPriceRange } = filterSlice.actions;
export default filterSlice.reducer;