import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import { loadCartFromStorage, saveCartToStorage } from "./localStorage";


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
  //Para mantener el carrito
  preloadedState: {
    cart: loadCartFromStorage(),
  },
});

store.subscribe(() => {
  saveCartToStorage(store.getState().cart);
});

export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;

export default store;