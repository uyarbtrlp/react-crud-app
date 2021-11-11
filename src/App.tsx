import React, { Fragment, useEffect } from "react";
import logo from "./logo.svg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Login from "./components/Login";
import classes from "./App.module.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Register from "./components/Register";
import { makeStyles } from "@mui/styles";
import Alert from "./components/UI/Alert";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import Home from "./components/Home";
import { authActions } from "./store/auth-slice";
import Layout from "./components/UI/Layout";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4a536b",
    },
    secondary: {
      main: "#ff9a8d",
    },
    background: {
      default: "#aed6dc",
    },
  },
});
const useStyles = makeStyles({
  center: {
    textAlign: "center",
  },
  form: {
    display: "inline-flex",
    flexDirection: "column",
    width: "300px",
  },
});

function App() {
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  useEffect(() => {
    dispatch(authActions.isLogged());
  }, [isAuthenticated]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>
      <Alert></Alert>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login">
          {isAuthenticated&& <Redirect to="/home" />}
          {!isAuthenticated&& 
            <div className={classes.Login}>
              <Login />
            </div>
          }   
        </Route>
        <Route path="/register">
        {isAuthenticated&& <Redirect to="/home" />}
          {!isAuthenticated&& 
            <div className={classes.Login}>
              <Register />
            </div>
          }  
        </Route>
        <Route path="/home">
        {!isAuthenticated&& <Redirect to="/login" />}
          {isAuthenticated&& 
          <Layout>
              <Home></Home>
          </Layout>
              
          } 
            
        </Route>
        <Route path="*">
          <Redirect to="/"></Redirect>
        </Route>
      </Switch>
      <Fragment></Fragment>
    </ThemeProvider>
  );
}

export default App;
