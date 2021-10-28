import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  InputLabel,
  Input,
  IconButton,
  FormControl,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { LoginUser, sendLoginDataAction } from "../store/auth-actions";
import { authActions } from "../store/auth-slice";
import { useHistory } from "react-router";

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
const Login: FC<{}> = () => {
  const [usernameText, setUsernameText] = useState<string>("");
  const [usernameIsEmpty, setUsernameIsEmpty] = useState<boolean>(false);
  // const [usernameIsValid,setUsernameIsValid] = useState<boolean>(false)
  const [passwordText, setPasswordText] = useState<string>("");
  const [passwordIsEmpty, setPasswordIsEmpty] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const user: LoginUser = {
      username: usernameText,
      password: passwordText,
    };
    dispatch(sendLoginDataAction(user, history));
    setUsernameText("");
    setPasswordText("");
    history.push("/login")
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameText(event.target.value);
    if (event.target.value === "") {
      setUsernameIsEmpty(true);
    } else {
      setUsernameIsEmpty(false);
    }
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordText(event.target.value);
    if (event.target.value === "") {
      setPasswordIsEmpty(true);
    } else {
      setPasswordIsEmpty(false);
    }
  };
  const handleUsernameFocusEvent = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    if (event.target.value === "") {
      setUsernameIsEmpty(true);
    }
  };
  const handlePasswordFocusEvent = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    if (event.target.value === "") {
      setPasswordIsEmpty(true);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((x) => !x);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const classes = useStyles();
  return (
    <Card className={classes.center} sx={{ minWidth: 375 }}>
      <CardContent>
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <TextField
            id="username"
            label="Username or Email"
            onChange={handleUsernameChange}
            value={usernameText}
            error={usernameIsEmpty}
            helperText={usernameIsEmpty ? "This field must not be empty!" : ""}
            onBlur={handleUsernameFocusEvent}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />

          <TextField
            sx={{
              marginBottom: "20px",
            }}
            id="password"
            type={showPassword ? "text" : "password"}
            onChange={handlePasswordChange}
            value={passwordText}
            error={passwordIsEmpty}
            onBlur={handlePasswordFocusEvent}
            helperText={passwordIsEmpty ? "This field must not be empty!" : ""}
            label="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {/* {values.showPassword ? <VisibilityOff /> : <Visibility />} */}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </form>
        <p>
          If you do not have an account, register{" "}
          <NavLink to="/register">here.</NavLink>
        </p>
      </CardContent>
    </Card>
  );
};

export default Login;
