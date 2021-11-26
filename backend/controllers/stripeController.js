import User from "../models/user.js";
import { stripe } from "../utils/stripe.js";

const getProducts = async (req, res) => {
  const products = await stripe.products.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  });

  const prices = await stripe.prices.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  });
  var productList = [];

  products.data.map((item) => {
    if (item.images.length > 0) {
      productList.push({
        id: item.id,
        name: item.name,
        desc: item.description,
        image: item.images[0],
        qty: 1,
      });
    }
  });

  prices.data.map((price) => {
    if (price.type == "one_time") {
      productList = productList.map((product) => {
        if (price.product == product.id) {
          return {
            ...product,
            price: price.unit_amount / 100,
            priceId: price.id,
          };
        } else {
          return product;
        }
      });
    }
  });

  return res.status(200).json(productList);
};

const createSession = async (req, res) => {
  const { cart } = req.body;
  const user = await User.findById(req.user);
  var lineItems = [];
  console.log(cart);

  if (cart.length) {
    cart.map((item) => {
      lineItems.push({ price: item.priceId, quantity: item.qty });
    });
  }

  const session = await stripe.checkout.sessions.create(
    {
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: "http://localhost:3000",
      cancel_url: "http://localhost:3000",
      customer: user.stripeCustomerId,
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );

  return res.status(200).json(session);
};

export { getProducts, createSession };
