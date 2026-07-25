import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { Usuario } from "../types/Usuario";

const initialState: Usuario[] = [];

const sessionManagerSlice = createSlice({
  name: "sessionManager",

  initialState,

  reducers: {

    doLogin: (
      state,
      action: PayloadAction<Usuario>
    ) => {
      const existingUser = state.find(
        item => item.email === action.payload.email && item.password === action.payload.password
      );
      
      if (existingUser) {
        alert("Si le acertaste XD");
        return;
      } else {
        alert("Correo o contraseña incorrectos");
        return;
      }
    },

    doRegister: (
      state,
      action: PayloadAction<Usuario>
    ) => {
      const existingUser = state.find(
        item => item.email === action.payload.email
      );

      if (!existingUser) {
        state.push(action.payload);
        alert("Usuario registrado exitosamente");
      } else {
        alert("El correo ya está registrado");
      }
    }

  }
});


export const {
  doLogin
} = sessionManagerSlice.actions;

export default sessionManagerSlice.reducer;