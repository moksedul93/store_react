import { combineReducers } from "redux";
import productListReducer from "./productList/productListReducers";
import menuReducer from "./headerMenu/headerReducers";
import cartReducer from "./cart/cartReducers";
import cartItemCountReducer from "./cart/cartHeaderCountReducers";

const rootReducer = combineReducers({
  productList: productListReducer,
  cart: cartReducer,
  cartItemCount: cartItemCountReducer,
  menu: menuReducer,
});

export default rootReducer;
