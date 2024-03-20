import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../ProductItem/ProductItem";
import { setProductList } from "../../redux/productList/actions";
import { fetchData } from "../../api/api";
import { CiViewList } from "react-icons/ci";
import { MdGridView } from "react-icons/md";

const ProductList = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => Object.values(state.productList));

  // State variables to manage view mode and button text
  const [viewMode, setViewMode] = useState(true);
  // const [buttonText, setButtonText] = useState();

  // Function to switch between list and grid views
  const toggleViewMode = () => {
    // if (viewMode === "grid") {
    setViewMode(!viewMode);
    // }
  };

  // Fetch data for mobile items
  useEffect(() => {
    const fetchProductList = async () => {
      const data = await fetchData();
      dispatch(setProductList(data.MobileList));
    };

    fetchProductList();
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 md:px-0">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl my-3">Product List:</h2>
        {/* Button to toggle view mode */}
        <button className="text-2xl my-3" onClick={toggleViewMode}>
          {viewMode === true ? (
            <span>
              <CiViewList />
            </span>
          ) : (
            <span>
              <MdGridView />
            </span>
          )}
        </button>
      </div>
      {/* Conditionally render list or grid view based on view mode */}
      <div
        className={
          viewMode === true
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            : "grid-cols-1"
        }
      >
        {productList.map((product, index) => (
          <ProductItem key={index} product={product} viewMode={viewMode} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
