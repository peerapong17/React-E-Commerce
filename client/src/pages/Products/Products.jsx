import React from "react";
import Grid from "@material-ui/core/Grid";

import { Product } from "../../components/index";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import axios from "axios";

const Products = () => {
  const classes = useStyles();
  const [productList, setProductList] = React.useState([]);

  React.useEffect(() => {
    (async function () {
      const { data } = await axios.get(
        "http://localhost:4000/payment/products",
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setProductList(data);
    })();

    console.log(productList)
  }, []);

  if (!productList.length) return <p>Loading...</p>;

  console.log(productList)

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} /> 
      <Grid container spacing={4}>
        {productList.length && productList.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Product {...product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
