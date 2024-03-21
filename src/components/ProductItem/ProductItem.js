import React from "react";
import { useDispatch } from "react-redux";

// Mapping image names to their respective imports
import iPhone1Image from "../../assets/iphone1.png";
import iPhone2Image from "../../assets/iphone2.jpg";
import iPhone3Image from "../../assets/iphone3.png";
import iPhone4Image from "../../assets/iphone4.webp";
import iPhone5Image from "../../assets/iphone5.jpg";
import iPhone6Image from "../../assets/iphone6.webp";
import iPhone7Image from "../../assets/iphone7.jpg";
import iPhone8Image from "../../assets/iphone8.webp";
import { cartItem } from "../../redux/cart/actions";
import { Link } from "react-router-dom";

const imageMap = {
  1: iPhone1Image,
  2: iPhone2Image,
  3: iPhone3Image,
  4: iPhone4Image,
  5: iPhone5Image,
  6: iPhone6Image,
  7: iPhone7Image,
  8: iPhone8Image,
};

const ProductItem = ({ product, viewMode }) => {
  const dispatch = useDispatch();

  const addToCart = () => {
    // Assuming the Title format is consistent and contains the product ID
    const productId = product.Title.split(" ")[1];
    const imageUrl = imageMap[productId];

    // Create productData object with necessary properties
    const productData = {
      id: productId, // Assuming the product ID is unique
      title: product.Title,
      year: product.Year,
      price: parseFloat(product.Price), // Convert price to number
      imageUrl: imageUrl,
    };
    // Dispatch action with the productData payload
    dispatch(cartItem(productData));
  };

  return (
    <>
      {viewMode === true ? (
        // grid view
        <div className="border p-4 hover:shadow-md hover:custom-hover-effect min-h-[300px] overflow-hidden">
          <Link href="#">
            <img
              src={imageMap[product.Title.split(" ")[1]]} // Assuming the Title format is consistent
              alt={product.Title}
              className={`w-full h-[200px] object-contain mb-2 imgHover scale-100 transition-all`}
            />

            <div className="w-[258px] mt-7">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {product.Title}{" "}
                  <small className="font-normal">({product.Year})</small>{" "}
                </h3>

                <p className="text-lg font-normal">${product.Price}</p>
              </div>
              <button
                onClick={addToCart}
                className="bg-[#a67c52] hover:bg-[#8e673f] transition-all w-full text-white px-4 py-2 rounded mt-4"
              >
                Add to Cart
              </button>
            </div>
          </Link>
        </div>
      ) : (
        // list view
        <div className="border p-4 hover:shadow-md hover:custom-hover-effect overflow-hidden">
          <Link href="#">
            <div className="flex items-center gap-5">
              <div>
                <img
                  src={imageMap[product.Title.split(" ")[1]]} // Assuming the Title format is consistent
                  alt={product.Title}
                  className={`h-[200px] object-contain mb-2 w-auto`}
                />
              </div>
              <div className="relative w-full">
                <div className="text-sm md:text-lg  text-end">
                  <span className="lg:font-semibold">
                    {product.Title} <small>({product.Year})</small>
                  </span>
                </div>
                <div className="text-sm lg:text-lg  text-end mt-2">
                  <span>${product.Price}</span>
                </div>
                <button
                  onClick={addToCart}
                  className="bg-[#a67c52] text-sm md:text-[16px] text-white px-4 py-2 rounded mt-4 float-end"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default ProductItem;
