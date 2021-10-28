import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { checkAutoLogin } from "../store/auth-actions";
import { authActions } from "../store/auth-slice";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useHistory } from "react-router";

const Home : React.FC<{}> = () => {
    const dispatch:AppDispatch = useDispatch()
    const history = useHistory()
    useEffect(()=>{
        checkAutoLogin(dispatch)
        dispatch(authActions.getUserToken())
    },[])

    const logoutHandler = () => {
        dispatch(authActions.logout())
        history.push("/login")
    }
    return (
        <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button onClick={logoutHandler} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    )
}

export default Home