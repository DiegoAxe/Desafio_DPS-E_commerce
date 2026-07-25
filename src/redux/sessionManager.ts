import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { Usuario } from "../types/Usuario";


/*Creamos un usuario por default */
const initialState: Usuario[] = [
    {
      name: "diego",
      email: "diegoarielmar@gmail.com",
      password: "123456"
    }
];

const sessionManagerSlice = createSlice({
  name: "session",

  initialState,

  reducers: {

    doLogin: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      const existingUser = state.find(
        item => item.email === action.payload.email && item.password === action.payload.password
      );

      if (existingUser) {
        alert("Usuario encontrado");
        return;
      } else {
        alert("Correo o contraseña incorrectos");
        return;
      }
    },

    doRegister: (
      state,
      action: PayloadAction<{ name: string; email: string; password: string }>
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
  doLogin,
  doRegister
} = sessionManagerSlice.actions;

export default sessionManagerSlice.reducer;