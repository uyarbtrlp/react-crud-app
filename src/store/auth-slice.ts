import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
import { useDispatch } from "react-redux";
import { AppDispatch } from ".";
export interface LoginUser {
  username: string;
  password: string;
}
export interface RegisterUser {
  username: string;
  password: string;
}
interface AuthState {
  loginUser: LoginUser;
  registerUser: RegisterUser;
  isLogged: boolean;
  token: string | null;
  logoutTimer:any,
  tokenDuration:number,
}
const initialState: AuthState = {
  loginUser: {
    username: "",
    password: "",
  },
  isLogged: false,
  token: "",
  registerUser: {
    username: "",
    password: "",
  },
  logoutTimer:null,
  tokenDuration:0,
};
export const calculateRemaningTime = (expirationTime: any) => {
  const currenTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remaningTime = adjExpirationTime - currenTime;

  return remaningTime;
};
const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExiprationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemaningTime(storedExiprationDate);

  if (remainingTime<=60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    sendLoginData: (state, action) => {
      state.registerUser.username = action.payload.username;
      state.registerUser.password = action.payload.password;
    },
    sendRegisterData: (state, action) => {
      state.registerUser.username = action.payload.username;
      state.registerUser.password = action.payload.password;
    },
    login: (state, action) => {
      state.token = action.payload.idToken;
      localStorage.setItem("token", action.payload.idToken);
      localStorage.setItem("expirationTime", action.payload.expirationTimeString);
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      if (state.logoutTimer) {
        clearTimeout(state.logoutTimer);
      }
    },
    getStoredToken: (state) => {
      const tokenData = retrieveStoredToken();
      if (tokenData) {
        state.token = tokenData.token;
        state.tokenDuration = tokenData.duration
        console.log(state.tokenDuration)
      }
    },
    setIsLogged:(state) => {
        state.isLogged = !!state.token
    },
    setLogoutTimer:(state,action)=>{
        state.logoutTimer = action.payload.logoutTimer
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice;
