"use client"
import React from "react";
import Image from "next/image";

const Imagecontainer = ({ Mepicture, width, height }) => {
  return (
    <div className="w-full flex justify-center lg:block">
      <Image
        src={Mepicture}
        alt="My Image"
        width={width}
        height={height}
        className="
          object-cover
          w-full
          h-auto
          lg:w-auto
        "
      />
    </div>
  );
};

export default Imagecontainer;