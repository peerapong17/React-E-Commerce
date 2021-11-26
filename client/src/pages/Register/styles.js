import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    textAlign: "center",
    margin: "1rem 0",
  },
  contentWrapper: {
    width: "100%",
    maxWidth: "400px",
  },
  forgetPassword: {
    textAlign: "end",
    marginTop: "0.75rem",
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "1rem",
  },
  textField: {
    margin: "0.75rem 0",
  },
  btn: {
    margin: "0.75rem 0"
  },
  login: {
    display: "flex",
    alignItems: "center",
    margin: "0.75rem 0",
    fontSize: "1rem",
  },
  loginLink: {
    margin: "0 0.5rem",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
}));
