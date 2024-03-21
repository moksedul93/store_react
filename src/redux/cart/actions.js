// define all action payloads
import {
  ADD_TO_CART,
  DECREASE_CART_ITEM_COUNT,
  DECREASE_QUANTITY,
  INCREASE_CART_ITEM_COUNT,
  INCREASE_QUANTITY,
} from "./actionTypes";

export const cartItem = (productData) => ({
  type: ADD_TO_CART,
  payload: productData,
});
export const increaseQuantity = (productId) => ({
  type: INCREASE_QUANTITY,
  payload: { productId },
});

export const decreaseQuantity = (productId) => ({
  type: DECREASE_QUANTITY,
  payload: { productId },
});
export const increaseCartItemCount = (count) => ({
  type: INCREASE_CART_ITEM_COUNT,
  payload: count,
});
export const decreaseCartItemCount = (count) => ({
  type: DECREASE_CART_ITEM_COUNT,
  payload: count,
});
