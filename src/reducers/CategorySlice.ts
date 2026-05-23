import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCategories = createAsyncThunk("categories/get", async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Category/get-categories`);
    const result = response.data;
    const items = Array.isArray(result) ? result : (result.data || []);

    return items.map((item: any) => ({
      ...item,
      // Если картинки нет, оставляем null, в компоненте подставим иконку
      categoryImage: item.categoryImage 
        ? `${API_BASE_URL}/uploads/${item.categoryImage}` 
        : null 
    }));
  } catch (error) {
    console.error("Ошибка загрузки категорий:", error);
    throw error;
  }
});

const categorySlice = createSlice({
  name: "categories",
  initialState: { items: [] as any[], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => { state.loading = true; })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getCategories.rejected, (state) => { state.loading = false; });
  },
});

export default categorySlice.reducer;