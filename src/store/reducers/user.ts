
import { createSlice } from "@reduxjs/toolkit";


interface AuthState {
  isAuth: boolean,
}
const initialState: AuthState = {
  isAuth: false,
}

export const AuthSlice = createSlice({
	name: "AuthSlice",
	initialState: initialState as AuthState,
	reducers: {
    SET_IS_AUTH(state,{payload}:{payload:boolean}){
      state.isAuth = payload
    },
	},
});