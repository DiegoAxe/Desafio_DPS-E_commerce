import Swal from "sweetalert2";
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
        Swal.fire("Éxito", "Inicio de sesión exitoso", "success");
        return;
      } else {
        Swal.fire("Error", "Correo o contraseña incorrectos", "error");
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
        Swal.fire("Éxito", "Registro exitoso", "success");
      } else {
        Swal.fire("Error", "El correo ya está registrado", "error");
      }
    }

  }
});


export const {
  doLogin,
  doRegister
} = sessionManagerSlice.actions;

export default sessionManagerSlice.reducer;