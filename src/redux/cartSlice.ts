/* REVISAR ESTO */

import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { Product } from "../types/Product";

const initialState: Product[] = [];

let selectedCategory = "Todos"; // Valor predeterminado para mostrar todos los productos


const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    /* */
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      selectedCategory = action.payload;
      state = state.filter(
        product => action.payload === "Todos" || product.category === action.payload
      );
    },

    addToCart: (
      state,
      action: PayloadAction<Product>
    ) => {
      const existingProduct = state.find(
        item => item.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.push({
          ...action.payload
        });
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<number>
    ) => {
      return state.filter(
        item => item.id !== action.payload
      );
    },

    clearCart: () => [],
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;