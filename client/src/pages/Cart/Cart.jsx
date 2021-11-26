import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import { CartItem } from "../../components/index";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { useCartAction } from "../../states/useActions/useCartAction";

const Cart = () => {
  const classes = useStyles();
  const { cart } = useSelector((state) => state.cart);
  const { clearCart, checkOut } = useCartAction();

  var totalPrice = 0;

  if (cart.length > 0) {
    totalPrice = cart.reduce((total, current) => {
      return total + current.price * current.qty;
    }, 0);
  }

  const renderEmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart,
      <Link className={classes.link} to="/">
        start adding some
      </Link>
    </Typography>
  );

  if (!cart) return "Loading";

  const renderCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.map((item, index) => (
          <Grid key={index} item xs={12} sm={4}>
            <CartItem {...item} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">Subtotal: {totalPrice}</Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={() => clearCart()}
          >
            Empty cart
          </Button>
          <Button
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
            onClick={()=>checkOut()}
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Container style={{ paddingBottom: "20px" }}>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.length ? renderEmptyCart() : renderCart()}
    </Container>
  );
};

export default Cart;
