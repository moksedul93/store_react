import React from "react";
import { Link } from "react-router-dom";

function Submenu({ items, isOpen, index, label, route }) {
  return (
    <ul
      className={`bg-[#2c3840] list-none absolute w-[165px] left-0 top-8 md:left-[150px] md:top-[-13px] z-10 border border-white ${
        isOpen ? "block" : "hidden"
      } ${
        index === 2 && label === "Category" ? "md:!left-0 md:!top-5 !top-7" : ""
      } `}
    >
      {items.map((item, index) => (
        <li key={index} className=" border-b border-white">
          <Link
            // to={`${route}/${item.toString().toLowerCase()}`} // Convert item to string before calling toLowerCase()
            to={
              item.props.to
                ? `${route}${item.props.to}`
                : `${item.props.label.toString().toLowerCase()}`
            } // Check if 'route' is defined before concatenating
            className={`block ps-3 lg:mt-0 text-white  hover:text-[#ddd] py-1 md:py-3`}
          >
            {item}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Submenu;
