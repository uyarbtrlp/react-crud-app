import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
import { useDispatch } from "react-redux";
import { AppDispatch } from ".";
interface AuthState {
  isAuthenticated: boolean;
  token:string;
}
const initialState: AuthState = {
  isAuthenticated: false,
  token:""
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login:(state,action)=>{
      state.token = action.payload.idToken
      state.isAuthenticated = true
    },
    logout:(state)=>{
      localStorage.removeItem("userDetails")
      state.token = ''
      state.isAuthenticated = false
    },
    isLogged:(state)=>{
      state.isAuthenticated = !!localStorage.getItem("userDetails")
    },
    getUserToken:(state,action)=>{
      state.token = action.payload.token
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice;
