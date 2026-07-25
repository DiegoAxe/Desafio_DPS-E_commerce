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
    /* Para el filtro de categorias */
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

    plusOneCart: (
      state,
      action: PayloadAction<number>
    ) => {
      return state.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },

    minusOneCart: (
      state,
      action: PayloadAction<number>
    ) => {
      return state.map((item) => {
        if (item.id === action.payload && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    },

    clearCart: () => [],
  },
});


export const {
  addToCart,
  removeFromCart,
  clearCart,
  plusOneCart,
  minusOneCart,
  setSelectedCategory
} = cartSlice.actions;

export default cartSlice.reducer;