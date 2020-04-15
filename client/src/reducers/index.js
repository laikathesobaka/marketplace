import { combineReducers } from "redux";
import products from "./products";
import cart from "./cart";
import user from "./user";

export default combineReducers({
  products,
  cart,
  user,
});
