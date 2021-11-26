import { combineReducers } from "redux";
import { auth } from "./auth";
import { cart } from "./cart";

const reducers = combineReducers({
  auth,
  cart,
});

export default reducers;
