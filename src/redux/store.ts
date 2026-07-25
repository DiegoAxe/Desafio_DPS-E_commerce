import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import sessionManagerReducer from "./sessionManager";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    session: sessionManagerReducer,
  },
});

export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;

export default store;