import React from "react";

const StylishBarSecond = ({ data }) => {
  return (
    <div className="py-2">
      <div className="group relative overflow-hidden">
        {/* black fill */}
        <div className="absolute inset-0 bg-black scale-y-0 origin-bottom transition-transform duration-700 ease-out group-hover:scale-y-100" />

        {/* content */}
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-3 items-center py-10 px-6 text-white">
          <p className="text-xl md:text-2xl font-medium">
            {data.institute}
          </p>

          <p className="text-xl md:text-2xl text-center">
            {data.degree}
          </p>

          <p className="text-xl md:text-2xl text-right">
            {data.duration}
          </p>
        </div>

        {/* border */}
        <div className="w-full h-px bg-[#343434]" />
      </div>
    </div>
  );
};

export default StylishBarSecond;
