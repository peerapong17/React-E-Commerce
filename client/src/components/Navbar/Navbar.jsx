import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
  Paper,
  InputBase,
} from "@material-ui/core";
import { ShoppingCart, AccountCircle } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

import logo from "../../assets/commerce.png";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuthAction } from "../../states/useActions/useAuthAction";

const PrimarySearchAppBar = () => {
  const history = useHistory();
  const { logout } = useAuthAction();
  const [searchInput, setSearchInput] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const classes = useStyles();
  const { cart } = useSelector((state) => state.cart);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    logout(history);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          component={Link}
          to="/cart"
          aria-label="Show cart items"
          color="inherit"
        >
          <Badge badgeContent={cart.length} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
    </Menu>
  );

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            <img
              src={logo}
              alt="commerce.js"
              height="25px"
              className={classes.image}
            />
            Commerce.js
          </Typography>
          <div className={classes.grow} />
          <Paper
            component="form"
            className={classes.root}
            style={{ height: "50px", marginRight: "17px", display: "flex" }}
          >
            <IconButton className={classes.iconButton} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <InputBase
              className={classes.input}
              placeholder="Search Product"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <IconButton type="button" className={classes.iconButton}>
              <SearchIcon />
            </IconButton>
          </Paper>
          <IconButton
            component={Link}
            to="/cart"
            aria-label="Show cart items"
            color="inherit"
          >
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingCart style={{ color: "white" }} />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle style={{ color: "white" }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem component={Link} to="/login" onClick={handleClose}>
              Log out
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </React.Fragment>
  );
};

export default PrimarySearchAppBar;
