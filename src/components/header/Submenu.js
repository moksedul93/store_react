import React from "react";

function Submenu({ items, isOpen, index, label }) {
  return (
    <ul
      className={`list-none text-start absolute w-[130px] left-0 top-8 md:left-[117px] md:top-[-13px] z-10 border border-white ${
        isOpen ? "block" : "hidden"
      } ${
        index === 2 && label === "Category" ? "md:!left-0 md:!top-5 !top-7" : ""
      } `}
    >
      {items.map((item, index) => (
        <li
          key={index}
          className=" border-b border-white bg-[#a67c52] hover:bg-[#8e673f]"
        >
          <span className={`block ps-3 lg:mt-0 py-1 md:py-3`}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default Submenu;
