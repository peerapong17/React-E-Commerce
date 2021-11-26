import * as CartActionTypes from "../action-types/cart";
import axios from "axios";

export const addToCart = (product) => ({
  type: CartActionTypes.ADD_TO_CART,
  payload: product,
});

export const updateItem = (productId, qty) => ({
  type: CartActionTypes.UPDATE_ITEM,
  payload: {
    productId,
    qty,
  },
});

export const removeFromCart = (productId) => ({
  type: CartActionTypes.REMOVE_FROM_CART,
  payload: productId,
});

export const clearCart = () => ({
  type: CartActionTypes.CLEAR_CART,
});

export const checkOut = () => async (dispatch, getState) => {
  try {
    const { cart } = getState().cart;

    const { data } = await axios.post(
      "http://localhost:4000/payment/session",
      { cart },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    window.location.href = data.url
  } catch (error) {
    console.log(error.response)
    // dispatch({
    //   type: AuthActionTypes.ERROR,
    //   payload: error.response.data.message,
    // });
  }
};
