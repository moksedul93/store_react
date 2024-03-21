import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CiShoppingCart from "../../assets/CiShoppingCart.png";
import MenuItem from "./MenuItem";
import { fetchData } from "../../api/api";
import { setMenu } from "../../redux/headerMenu/actions";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu);
  const cartItemCount = useSelector((state) => state.cartItemCount);

  // fetch data
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const data = await fetchData();
        dispatch(setMenu(data.menu));
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, [dispatch]);

  // Recursive function to render menu items
  const renderMenuItems = (menuData) => {
    return Object.entries(menuData).map(([key, value], index) => {
      if (typeof value === "object") {
        return (
          <MenuItem
            label={key}
            index={index}
            value={value}
            items={renderMenuItems(value)}
          />
        );
      } else {
        return (
          <li className="lg:inline-block">
            <Link
              key={key}
              to={`/${value.toLowerCase()}`}
              className="block my-2 md:my-0 md:mt-[2px] lg:inline-block  text-white  pr-4"
            >
              {value}
            </Link>
          </li>
        );
      }
    });
  };
  // toggle menu for mobile and tab
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleClickOutside = (event) => {
    if (
      isMobileMenuOpen &&
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target)
    ) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="bg-[#262626] p-4 md:px-5 py-2.5">
      <div className="container xl:container-xl mx-auto">
        <nav className="flex items-center justify-between flex-wrap">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <a href="/" className="font-semibold text-2xl tracking-tight">
              Store
            </a>
          </div>
          <div className="block lg:hidden">
            <div className="flex gap-3">
              <button
                ref={mobileMenuRef}
                onClick={toggleMobileMenu}
                className="flex items-center py-2 px-2.5 border rounded text-white border-white hover:text-white hover:border-white"
              >
                <svg
                  className="fill-current h-3 w-3"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
              <Link
                to="/cart"
                className="inline-block p-[6px] md:p-2.5 leading-none border rounded-full text-white border-white hover:border-[#ddd] hover:text-white relative"
              >
                <img
                  className="w-[18px]"
                  src={CiShoppingCart}
                  alt="CiShoppingCart"
                />
                {cartItemCount > 0 && (
                  <span className="bg-[#a67c52] text-white rounded-full w-6 h-6 text-center leading-6 absolute top-0 right-0 -mt-2 -mr-3">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
          <div
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } w-full flex-grow lg:flex lg:items-center lg:w-auto lg:mt-1`}
          >
            <div className="text-sm lg:flex-grow relative capitalize lg:text-left 2xl:text-center">
              {/* menu items  */}
              <ul>{menu && renderMenuItems(menu)}</ul>
            </div>
            <div>
              <Link
                to="/cart"
                className="hidden lg:inline-block text-xl p-2.5 leading-none border rounded-full text-white border-white hover:border-[#ddd] hover:text-white mt-4 lg:mt-0 relative"
              >
                <img
                  className="w-6"
                  src={CiShoppingCart}
                  alt="CiShoppingCart"
                />
                {cartItemCount > 0 && (
                  <span className="bg-[#a67c52] text-white rounded-full w-7 h-7 text-center leading-7 absolute top-0 right-0 -mt-2 -mr-2">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
