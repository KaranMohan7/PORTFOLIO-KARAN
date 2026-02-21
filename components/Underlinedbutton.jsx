import React from "react";

const Underlinedbutton = ({ children, classname = "" }) => {
  return (
    <span
      className={` relative inline-block cursor-pointer
    after:absolute after:left-0 after:-bottom-1
    after:h-px after:w-full after:bg-current
    after:origin-left after:scale-x-0
    after:transition-transform after:duration-300
    hover:after:scale-x-100 ${classname}`}
    >
      {children}
    </span>
  );
};

export default Underlinedbutton;
