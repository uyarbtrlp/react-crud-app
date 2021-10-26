import React, { Fragment } from "react";
import logo from "./logo.svg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Login from "./components/Login";
import classes from "./App.module.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Register from "./components/Register";
import { makeStyles } from "@mui/styles";
import Alert from "./components/UI/Alert";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import Home from "./components/Home";

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
  form:{
    display:"inline-flex",flexDirection:"column",width:"300px"
  }
});

function App() {
  const alertVisible = useSelector((state:RootState) => state.ui.alertVisible);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>
      <Alert></Alert>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login" exact>
          <div className={classes.Login}>
            <Login />
          </div>
        </Route>
        <Route path="/register" exact>
          <div className={classes.Login}>
            <Register />
          </div>
        </Route>
        <Route path="/home" exact>
          <div className={classes.Login}>
            <Home></Home>
          </div>
        </Route>
      </Switch>
      <Fragment></Fragment>
    </ThemeProvider>
  );
}

export default App;
