import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../ProductItem/ProductItem";
import { setProductList } from "../../redux/productList/actions";
import { fetchData } from "../../api/api";
import { MdGridView } from "react-icons/md";
import { FaListUl } from "react-icons/fa";

import LoaderDualBall from "../common/LoaderDualBall";

const ProductList = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => Object.values(state.productList));

  // State variables to manage view mode and loading status
  const [viewMode, setViewMode] = useState(true);
  const [loading, setLoading] = useState(true);

  // Function to switch to list view
  const switchToListView = () => {
    setViewMode(true);
  };

  // Function to switch to grid view
  const switchToGridView = () => {
    setViewMode(false);
  };

  // Fetch data for mobile items
  useEffect(() => {
    const fetchProductList = async () => {
      const data = await fetchData();
      dispatch(setProductList(data.MobileList));
      setLoading(false); // Set loading to false when data is fetched
    };

    fetchProductList();
  }, [dispatch]);

  return (
    <div className="container xl:container-xl mx-auto px-4 pb-10 md:px-0">
      {loading === true ? (
        <LoaderDualBall />
      ) : (
        <>
          <div className="flex justify-between items-center">
            {/* Display loader while data is loading */}
            <h2 className="text-xl md:text-2xl my-3">Product List:</h2>

            {/* Button to toggle view mode */}
            <div>
              {/* Buttons to switch between list and grid view */}
              <div>
                <button
                  className={` text-xl md:text-3xl my-3 text-[#260d0d] ${
                    viewMode ? "text-[#a67c52]" : ""
                  }`}
                  onClick={switchToListView}
                >
                  <span>
                    <MdGridView />
                  </span>
                </button>
                <button
                  className={`text-xl md:text-3xl ml-2 my-3 text-[#260d0d] ${
                    !viewMode ? "text-[#a67c52]" : ""
                  }`}
                  onClick={switchToGridView}
                >
                  <span>
                    <FaListUl />
                  </span>
                </button>
              </div>
            </div>
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
        </>
      )}
    </div>
  );
};

export default ProductList;
