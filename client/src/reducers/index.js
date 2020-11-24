import { combineReducers } from "redux";
import products from "./products";
import cart from "./cart";
import user from "./user";
import vendors from "./vendors";
import search from "./search";
import marketplace from "./marketplace";
import categories from "./categories";

export default combineReducers({
  marketplace,
  categories,
  products,
  cart,
  user,
  vendors,
  search,
});
