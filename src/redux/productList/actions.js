import { SET_PRODUCT_LIST } from "./actionTypes";
export const setProductList = (productList) => ({
  type: SET_PRODUCT_LIST,
  payload: productList,
});
