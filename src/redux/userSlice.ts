import Swal from "sweetalert2";
import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { loginUser } from "../types/loginUser";
import { Usuario } from "../types/Usuario";

/*Creamos un usuario por default */
const initialState: loginUser = {
    users: [
        {
          name: "diego",
          email: "diegoarielmar@gmail.com",
          password: "123456"
        }
    ],
    loginSuccess: false,
    userNow: null,
};

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {

    doRegister: (
      state,
      action: PayloadAction<Usuario>
    ) => {
      state.users.push(action.payload);
      state.loginSuccess = true;
    },

    createSession: (state, action: PayloadAction<Usuario>) => {
        state.userNow = action.payload;
        state.loginSuccess = true;
    },


    closeSession: (state) => {
        state.userNow = null;
        state.loginSuccess = false;
    }

  }
});


export const {
  doRegister,
  createSession,
  closeSession
} = userSlice.actions;

export default userSlice.reducer;