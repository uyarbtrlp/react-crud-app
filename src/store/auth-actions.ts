
import { RouteComponentProps } from "react-router";
import { AppDispatch, RootState } from ".";
import authSlice, { authActions, calculateRemaningTime, LoginUser, RegisterUser } from "./auth-slice";
import uiSlice, { uiActions } from "./ui-slice";
import { History } from 'history';
import { useSelector } from "react-redux";

export const sendLoginData = (user: LoginUser,history:History) => {
  return async (dispatch:AppDispatch) => {
    dispatch(authActions.sendLoginData(user))
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
              const expirationTime = new Date((new Date().getTime() + (+data.expiresIn*1000)))
              const idToken = data.idToken
              const expirationTimeString = expirationTime.toISOString()
              dispatch(authActions.login({idToken,expirationTimeString}))
              const logoutTimer = setTimeout(()=>dispatch(authActions.logout()),calculateRemaningTime(expirationTimeString))
              dispatch(authActions.setLogoutTimer({logoutTimer:logoutTimer}))
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
export const sendRegisterData = (user: RegisterUser,history:History) => {
  return async (dispatch:AppDispatch) => {
    dispatch(authActions.sendRegisterData(user))
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
