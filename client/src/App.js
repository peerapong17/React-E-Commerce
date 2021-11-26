/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Products, Cart, Login, Register } from "./pages/index";
import { Navbar } from "./components/index";
import PrivatedRoute from "./routes/PrivatedRoute";
import { useAuthAction } from "./states/useActions/useAuthAction";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const App = () => {
  const { getUserProfile } = useAuthAction();
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    getUserProfile();

    if (!user) {
      history.push("/")
    }
  }, []);

  return (
    <Router>
      <div style={{ display: "flex" }}>
        <CssBaseline />
        <Navbar handleDrawerToggle={handleDrawerToggle} />
        <Switch>
          <PrivatedRoute exact path="/" component={Products} />
          <PrivatedRoute exact path="/cart" component={Cart} />
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
