import React, { useState } from "react";
import {
  Button,
  Card,
  Container,
  TextField,
  Typography,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { CLEAR } from "../../states/action-types/auth";
import { useAuthAction } from "../../states/useActions/useAuthAction";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { login } = useAuthAction();
  const history = useHistory();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [input, setInput] = useState({
    email: "",
    password: "",
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
    login({ email: input.email, password: input.password }, history);
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
              Login
            </Typography>
            <TextField
              className={classes.textField}
              label="Email"
              variant="outlined"
              name="email"
              onChange={handleOnchange}
            />
            <TextField
              className={classes.textField}
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              onChange={handleOnchange}
            />
            <Typography className={classes.forgetPassword}>
              Forget Password?
            </Typography>
            <Button
              type="submit"
              className={classes.btn}
              variant="contained"
              color="primary"
              disabled={isLoading ? true : false}
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </form>
        </Card>
        <div className={classes.register}>
          You don't any account yet?
          <Typography
            component={Link}
            to="/register"
            className={classes.registerLink}
          >
            Register
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
    </Container>
  );
};

export default Login;
