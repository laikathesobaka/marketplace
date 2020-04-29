import { combineReducers } from "redux";
import products from "./products";
import cart from "./cart";
import user from "./user";
import vendors from "./vendors";
import search from "./search";
export default combineReducers({
  products,
  cart,
  user,
  vendors,
  search,
});
