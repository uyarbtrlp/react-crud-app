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
import { sendRegisterData } from "../store/auth-actions";
import { RegisterUser } from "../store/auth-slice";
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

const Register: FC<{}> = () => {
  const [usernameText, setUsernameText] = useState<string>("");
  const [usernameIsEmpty, setUsernameIsEmpty] = useState<boolean>(false);
  const [passwordText, setPasswordText] = useState<string>("");
  const [passwordIsEmpty, setPasswordIsEmpty] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory()

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const user: RegisterUser = {
      username: usernameText,
      password: passwordText,
    };
    dispatch(sendRegisterData(user,history));
    setUsernameText("");
    setPasswordText("");
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
            autoComplete="false"
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
            id="password"
            sx={{
              marginBottom: "20px",
            }}
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
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          {/* <TextField
            sx={{
              marginBottom: "20px",
            }}
            id="passwordAgain"
            type={values.showPasswordCheck ? "text" : "password"}
            value={values.passwordCheck}
            onChange={handlePasswordAgainChange}
            value={passwordAgainText}
            label="Password Check"
            error={passwordAgainIsEmpty}
            helperText={passwordAgainIsEmpty ? 'This field must not be empty!':''}
            onBlur={handlePasswordAgainFocusEvent}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPasswordCheck ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="standard"
          /> */}
          <Button variant="contained" type="submit">
            Register
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Register;
