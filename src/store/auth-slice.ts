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
    getUserToken:(state)=>{
      const userDetailString:string | null = localStorage.getItem("userDetails")
      const userDetail = JSON.parse(userDetailString as string)
      state.token = userDetail?.idToken
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice;
