// Reducer for managing the total number of items in the cart
import {
  ADD_TO_CART,
  DECREASE_CART_ITEM_COUNT,
  INCREASE_CART_ITEM_COUNT,
} from "./actionTypes";

const initialState = localStorage.getItem("cartItemCount")
  ? parseInt(localStorage.getItem("cartItemCount"))
  : 0;

const cartItemCountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const updatedState = state + 1;
      localStorage.setItem("cartItemCount", updatedState);
      return updatedState;

    case INCREASE_CART_ITEM_COUNT:
      // Calculate the difference between the new count and the previous count
      const countDifferenceIncrease = action.payload + 1 - state;
      // Update the cart item count in local storage by adding the difference
      const newCountIncrease = parseInt(localStorage.getItem("cartItemCount")) + countDifferenceIncrease;
      localStorage.setItem("cartItemCount", newCountIncrease);
      // Return the new count to update the state
      return newCountIncrease;
    case DECREASE_CART_ITEM_COUNT:
      // Calculate the difference between the new count and the previous count
      const countDifferenceDecrease = action.payload - 1 - state;
      // Update the cart item count in local storage by adding the difference
      const newCountDecrease = parseInt(localStorage.getItem("cartItemCount")) + countDifferenceDecrease;
      localStorage.setItem("cartItemCount", newCountDecrease);
      // Return the new count to update the state
      return newCountDecrease;

    default:
      return state;
  }
};

export default cartItemCountReducer;
