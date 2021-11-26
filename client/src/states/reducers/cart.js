import * as CartActionTypes from "../action-types/cart";
import { productList } from "../../data/products";

const initialState = {
  productList,
  cart: [],
};

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      console.log(action.payload)
      const alreadyInCart = state.cart.some(
        (item) => item.id === action.payload.id
      );
      return {
        ...state,
        cart: alreadyInCart
          ? state.cart.map((item) => {
              return action.payload.id === item.id
                ? { ...item, qty: item.qty + 1 }
                : item;
            })
          : [...state.cart, { ...action.payload, qty: 1 }],
      };
    case CartActionTypes.UPDATE_ITEM:
      console.log(action.payload)
      return {
        ...state,
        cart: state.cart.map((item) => {
          return item.id == action.payload.productId
            ? { ...item, qty: action.payload.qty }
            : item;
        }),
      };

    case CartActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => {
          return item.id != action.payload;
        }),
      };

    case CartActionTypes.CLEAR_CART:
      console.log('object')
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};
