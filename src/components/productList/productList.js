// ProductList.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../ProductItem/ProductItem";
import { setProductList } from "../../redux/productList/actions"; // Import the action to set product list
import { fetchData } from "../../api/api"; // Import the fetchData function

const ProductList = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => Object.values(state.productList));

  // fetch data for mobile items
  useEffect(() => {
    const fetchProductList = async () => {
      const data = await fetchData();
      dispatch(setProductList(data.MobileList));
    };

    fetchProductList();
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 md:px-0">
      <h2 className="text-2xl my-3">Product List:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {productList.map((product, index) => (
          <ProductItem key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
