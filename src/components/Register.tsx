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
import { RegisterUser, sendRegisterDataAction } from "../store/auth-actions";
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
    .email("Enter a valid email.")
    .required("Email is required."),
  password: yup
    .string()
    .min(6, "Password should be of minimum 6 characters length.")
    .required("Password is required."),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'),null],'Password must match.')
    .required("Confirm password is required.")
});

const Register: FC<{}> = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword:""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const user: RegisterUser = {
        username: values.email,
        password: values.password,
      };
      dispatch(sendRegisterDataAction(user, history));
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
  const handleClickConfirmPassword = () => {
    setShowConfirmPassword((x) => !x);
  };
  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const classes = useStyles();
  return (
    <Card className={classes.center} sx={{ minWidth: 375 }}>
      <CardContent>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            id="email"
            label="Email"
            autoComplete="false"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
          <TextField
            sx={{
              marginBottom: "20px",
            }}
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Confirm Password"
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <Button disabled={!(formik.isValid && formik.dirty)} variant="contained" type="submit">
            Register
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Register;
