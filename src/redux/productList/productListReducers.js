// Reducer for managing the product list
import { SET_PRODUCT_LIST } from "./actionTypes";
const productListReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCT_LIST:
      return action.payload;
    default:
      return state;
  }
};
export default productListReducer;
