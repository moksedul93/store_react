import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CiShoppingCart } from "react-icons/ci";
import { GiSelfLove } from "react-icons/gi";
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
          <Link
            key={key}
            to={`/${value.toLowerCase()}`}
            className="block my-2 md:my-0 md:mt-[2px] lg:inline-block  text-white  hover:text-[#ddd] pr-4"
          >
            {value}
          </Link>
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
    <div className="mx-auto">
      <nav className="flex items-center justify-between flex-wrap bg-[#262626] p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <a href="/" className="font-semibold text-xl tracking-tight">
            Store
          </a>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white"
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
        </div>
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } w-full flex-grow lg:flex lg:items-center lg:w-auto lg:mt-1`}
          ref={mobileMenuRef}
        >
          <div className="text-sm lg:flex-grow relative capitalize">
            {/* menu items  */}
            {menu && renderMenuItems(menu)}
          </div>
          <div>
            <Link
              to="#"
              className="inline-block text-xl px-4 py-2 mr-3 leading-none border rounded text-white border-white hover:border-[#ddd] hover:text-white mt-4 lg:mt-0"
            >
              <GiSelfLove />
            </Link>
            <Link
              to="/cart"
              className="inline-block text-xl px-4 py-2 leading-none border rounded text-white border-white hover:border-[#ddd] hover:text-white mt-4 lg:mt-0 relative"
            >
              <CiShoppingCart />
              {cartItemCount > 0 && (
                <span className="bg-red-500 text-white rounded-full px-2 py-1 absolute top-0 right-0 -mt-1 -mr-1">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
