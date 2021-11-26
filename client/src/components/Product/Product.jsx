import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";

import useStyles from "./styles";

import { useDispatch } from "react-redux";
import { useCartAction } from "../../states/useActions/useCartAction";

const Product = ({ id, name, price, desc, image, priceId }) => {
  const classes = useStyles();
  const { addToCart } = useCartAction();

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      desc,
      price,
      image,
      priceId,
    });
  };

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={image} title={name} />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            ${price}
          </Typography>
        </div>
        <Typography variant="body2" color="textSecondary" component="p">
          {desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
