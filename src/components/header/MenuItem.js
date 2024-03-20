// MenuItem component

import React, { useState } from "react";
import Submenu from "../header/Submenu";
import { Link } from "react-router-dom";

function MenuItem({ label, items, index }) {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  // on mouse hover
  const handleMouseEnter = () => {
    setSubmenuOpen(true);
  };
  // on mouse leave
  const handleMouseLeave = () => {
    setSubmenuOpen(false);
  };

  return (
    <span
      className={`relative block  ${
        index === 2 && label === "Category" ? "inline-block" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to="#"
        className={`block my-2 md:mb-0 md:mt-4  lg:mt-0 text-white  hover:text-[#ddd] pr-4 ${
          index === 2 && label === "Category" ? "mt-0" : ""
        }`}
      >
        {label}
        {submenuOpen ? (
          <svg
            className="w-4 h-4 inline-block ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 inline-block ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </Link>
      <Submenu
        items={items}
        isOpen={submenuOpen}
        index={index}
        label={label}
        route="/category"
      />
    </span>
  );
}

export default MenuItem;
