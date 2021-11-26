import React, { useState } from "react";
import {
  Button,
  Card,
  Container,
  TextField,
  Typography,
  Snackbar,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { CLEAR } from "../../states/action-types/auth";
import { useAuthAction } from "../../states/useActions/useAuthAction";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Register = () => {
  const classes = useStyles();
  const { isLoading, success, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { register } = useAuthAction();
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  React.useEffect(() => {
    return () => {
      dispatch({
        type: CLEAR,
      });
    };
  }, []);

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ email: input.email, password: input.password });
  };

  const handleClose = () => {
    dispatch({
      type: CLEAR,
    });
  };

  return (
    <Container className={classes.container}>
      <div className={classes.toolbar} />
      <div className={classes.contentWrapper}>
        <Card>
          <form onSubmit={handleSubmit} className={classes.form}>
            <Typography variant="h4" className={classes.title}>
              Register
            </Typography>
            <TextField
              className={classes.textField}
              label="Email"
              variant="outlined"
              name="email"
              value={input.email}
              onChange={handleOnchange}
            />
            <TextField
              className={classes.textField}
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              value={input.password}
              onChange={handleOnchange}
            />
            <TextField
              className={classes.textField}
              label="Confirm-Password"
              variant="outlined"
              type="password"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={handleOnchange}
            />
            <Button
              type="submit"
              className={classes.btn}
              variant="contained"
              color="secondary"
              disabled={isLoading ? true : false}
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </form>
        </Card>
        <div className={classes.login}>
          You already have an account?
          <Typography
            component={Link}
            to="/login"
            className={classes.loginLink}
          >
            Login
          </Typography>
        </div>
      </div>
      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
      {success && (
        <Snackbar
          open={!!success}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            {success}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default Register;
