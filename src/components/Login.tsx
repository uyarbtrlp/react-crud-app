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
import * as yup from "yup";
import { Formik, useFormik } from "formik";

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
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
});
const Login: FC<{}> = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState<boolean>(false);


  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const user: LoginUser = {
        username: values.email,
        password: values.password,
      };
      dispatch(sendLoginDataAction(user, history));
      history.push("/login");
    },
  });
  const handleClickShowPassword = () => {
    setShowPassword((x) => !x);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Card className={classes.center} sx={{ minWidth: 375 }}>
      <CardContent>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            id="email"
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
            name="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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
