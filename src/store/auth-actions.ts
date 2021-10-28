
import { RouteComponentProps } from "react-router";
import { AppDispatch, RootState } from ".";
import authSlice, { authActions } from "./auth-slice";
import uiSlice, { uiActions } from "./ui-slice";
import { History } from 'history';
import { useSelector } from "react-redux";

export interface LoginUser {
  username: string;
  password: string;
}
export interface RegisterUser {
  username: string;
  password: string;
}
export const sendLoginDataAction = (user: LoginUser,history:History) => {
  return async (dispatch:AppDispatch) => {
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCbJeYviAwic7VRYcjLGl7CPJGx2iqxEIE", {
      method: "POST",
      body: JSON.stringify({
        email: user.username,
        password: user.password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      })
        .then((res) => {
          if (res.ok) {
            res.json().then(data=>{
              saveTokenInLocaleStorage(data)
              runLogoutTimer(dispatch,data.expiresIn*1000)
              dispatch(authActions.login(data.idToken))
              dispatch(uiActions.showNotification({
                type:"Success",
                message:"Login is successful."
              }))
              history.push("/home")
            })
          } else {
            return res.json().then((data) => {
              dispatch(uiActions.showNotification({
                type:"Error",
                message:"Login could not be done: "+data.error.message
              }))

            });
          }
        })
  };
}
export const sendRegisterDataAction = (user: RegisterUser,history:History) => {
  return async (dispatch:AppDispatch) => {
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCbJeYviAwic7VRYcjLGl7CPJGx2iqxEIE", {
        method: "POST",
        body: JSON.stringify({
          email: user.username,
          password: user.password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            dispatch(uiActions.showNotification({
              type:"Success",
              message:"Registration is successful."
            }))
            history.push("/login")
            return res.json()

          } else {
            return res.json().then((data) => {
              dispatch(uiActions.showNotification({
                type:"Error",
                message:"Registration could not be done: "+data.error.message
              }))

            });
          }
        })
  };
};
export function saveTokenInLocaleStorage(userDetails:any){
  userDetails.expireDate = new Date(new Date().getTime()+userDetails.expiresIn * 1000)
  localStorage.setItem("userDetails",JSON.stringify(userDetails))
}
export function runLogoutTimer(dispatch:AppDispatch,timer:number){
  setTimeout(()=>{
    dispatch(authActions.logout())
  },timer)
}

export function checkAutoLogin(dispatch:AppDispatch){
  const tokenDetailsString = localStorage.getItem("userDetails")
  let tokenDetails:any='';
  if(!tokenDetailsString){
    dispatch(authActions.logout())
    return;
  }
    tokenDetails = JSON.parse(tokenDetailsString)
    let expireDate = new Date(tokenDetails.expireDate)
    let todaysDate = new Date()
    if(todaysDate > expireDate) {
      dispatch(authActions.logout())
      return
    }
    const timer = expireDate.getTime() - todaysDate.getTime()
    runLogoutTimer(dispatch,timer)
}
