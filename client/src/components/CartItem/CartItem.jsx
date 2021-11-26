import React from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";

import useStyles from "./styles";

import { useCartAction } from "../../states/useActions/useCartAction";

const CartItem = ({ id, name, price, image, qty }) => {
  const classes = useStyles();
  const { updateItem, removeFromCart } = useCartAction();

  const handleUpdateCartQty = (updatedQuantity) => {
    if (updatedQuantity < 1) {
      if (window.confirm("Are you sure?")) removeFromCart(id);
    } else {
      updateItem(id, updatedQuantity);
    }
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  return (
    <Card className="cart-item">
      <CardMedia image={image} alt={name} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{name}</Typography>
        <Typography variant="h5">{price}</Typography>
      </CardContent>
      <CardActions className={classes.root}>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            onClick={() => handleUpdateCartQty(qty + 1)}
          >
            <Add fontSize="small" />
          </Button>
          <Typography variant="h5">&nbsp;{qty}&nbsp;</Typography>
          <Button
            variant="contained"
            onClick={() => handleUpdateCartQty(qty - 1)}
          >
            <Remove fontSize="small" />
          </Button>
        </div>
        <Button
          variant="text"
          color="secondary"
          onClick={() => handleRemoveFromCart()}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
