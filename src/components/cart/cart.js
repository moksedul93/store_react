import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  increaseCartItemCount,
  decreaseCartItemCount,
} from "../../redux/cart/actions";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => Object.values(state.cart));
  const dispatch = useDispatch();

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
    // Dispatch action to update cart item count in the header
    dispatch(increaseCartItemCount(getTotalCartItemCount()));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
    // Dispatch action to update cart item count in the header
    dispatch(decreaseCartItemCount(getTotalCartItemCount()));
  };

  // Function to calculate total items in the cart
  const getTotalCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="container mx-auto">
      {cart.length === 0 ? (
        <div className="flex justify-center flex-col items-center w-full h-screen text-2xl">
          <span>No product in cart</span>
          <span className="text-lg underline text-[#4ab866] mt-5">
            <Link to="/mobile">Return to shop</Link>
          </span>
        </div>
      ) : (
        <div className="px-4 md:px-0">
          <h2 className="text-2xl text-center my-10 md:my-20">
            Shopping Cart:
          </h2>
          <ul>
            {/* cart header  */}
            <li className="border-b py-5 border-[#dee2e6]">
              <div className="flex justify-between items-center">
                <div className="w-[20%] md:w-[10%]">
                  <span className="font-bold text-sm lg:text-[16px] w-[50px] md:w-auto text-ellipsis overflow-hidden whitespace-nowrap block">
                    Thumbnail
                  </span>
                </div>
                <div className="w-full md:w-[60%]">
                  <span className="ps-4 md:ps-2 font-bold text-sm lg:text-[16px]">
                    Title
                  </span>{" "}
                </div>
                <div className="w-full md:w-[10%] text-start">
                  <span className="ml-2 font-bold text-sm lg:text-[16px]">
                    Price
                  </span>{" "}
                </div>
                <div className="w-full md:w-[10%] flex justify-evenly items-center text-center">
                  <span className="font-bold text-sm lg:text-[16px]">
                    Quantity
                  </span>
                </div>
                <div className="w-full md:w-[10%] text-end">
                  <span className="ml-2 font-bold text-sm lg:text-[16px]">
                    SubTotal
                  </span>
                </div>
              </div>
            </li>
            {/* cart list  */}
            {cart.map((item) => (
              <li className="py-4 border-b border-[#dee2e6]" key={item.id}>
                <div className="flex justify-between items-center">
                  <div className="w-[40%] md:w-[10%]">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="md:w-12 h-full mr-2"
                    />
                  </div>
                  <div className="w-full md:w-[60%] text-ellipsis overflow-hidden whitespace-nowrap">
                    <span className="ps-2 ">{item.title}</span>{" "}
                  </div>
                  <div className="w-full md:w-[10%] text-start">
                    <span className="ml-2">${item.price}</span>{" "}
                  </div>
                  <div className="w-full md:w-[10%] flex justify-evenly items-center border border-[#e5e5e5] p-2 text-end">
                    <button
                      className="text-black text-2xl mr-2"
                      onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      +
                    </button>
                    <div className="mr-2 mt-1">{item.quantity}</div>
                    <button
                      className="text-black text-4xl mr-2"
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      -
                    </button>
                  </div>

                  <div className="w-full md:w-[10%] text-end">
                    <span className="ml-2">${item.totalPrice}</span>{" "}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Cart;
