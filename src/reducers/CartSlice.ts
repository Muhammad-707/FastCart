import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string; // Стало name
  price: number;
  quantity: number;
  image: string;
}

const loadCart = (): CartItem[] => {
  const saved = localStorage.getItem("cart");
  return saved ? JSON.parse(saved) : [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: loadCart() },
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find((i) => i.id === action.payload.id);
      
      if (existing) {
        // Увеличиваем количество
        existing.quantity += 1;
      } else {
        // Создаем новый массив с новым элементом
        state.items = [...state.items, { ...action.payload, quantity: 1 }];
      }
      
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
        // Принудительно обновляем массив, чтобы компоненты с useSelector перерисовались
        state.items = [...state.items]; 
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;