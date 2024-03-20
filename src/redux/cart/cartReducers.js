// export default cartReducer;
import {
  ADD_TO_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
} from "./actionTypes";
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state[action.payload.id];
      if (existingItem) {
        // If item already exists in cart, increment quantity
        return {
          ...state,
          [action.payload.id]: {
            ...existingItem,
            quantity: existingItem.quantity + 1,
            totalPrice: (existingItem.quantity + 1) * existingItem.price,
          },
        };
      } else {
        // If item is new, add it to the cart
        return {
          ...state,
          [action.payload.id]: {
            ...action.payload,
            quantity: 1,
            totalPrice: action.payload.price,
          },
        };
      }
    case INCREASE_QUANTITY:
      return {
        ...state,
        [action.payload.productId]: {
          ...state[action.payload.productId],
          quantity: state[action.payload.productId].quantity + 1,
          totalPrice:
            (state[action.payload.productId].quantity + 1) *
            state[action.payload.productId].price,
        },
      };
    case DECREASE_QUANTITY:
      const updatedQuantity = state[action.payload.productId].quantity - 1;
      if (updatedQuantity <= 0) {
        // If quantity becomes zero or negative, remove the item from the cart
        const { [action.payload.productId]: removedItem, ...rest } = state;
        return rest;
      } else {
        return {
          ...state,
          [action.payload.productId]: {
            ...state[action.payload.productId],
            quantity: updatedQuantity,
            totalPrice: updatedQuantity * state[action.payload.productId].price,
          },
        };
      }
    default:
      return state;
  }
};

export default cartReducer;
