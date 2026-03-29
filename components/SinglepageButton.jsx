import React from "react";
import { HiMiniLink } from "react-icons/hi2";
import Sexybutton from "./ui/Sexybutton";

const SinglepageButton = ({ text }) => {
  return (
    <div className="mt-2 flex items-center">
      <Sexybutton>
        <button className="text-black font-semibold bg-yellow-300 py-5 px-3 rounded-full w-1/3 md:w-1/5 lg:w-1/5 text-center text-sm md:text-[16px]">
          {text}
        </button>
      </Sexybutton>
      <Sexybutton>
        <button className="text-black font-semibold bg-yellow-300 py-3 rounded-full flex justify-center w-[10%] md:w-[8%] lg:w-[7%]">
          <HiMiniLink size={20} />
        </button>
      </Sexybutton>
    </div>
  );
};

export default SinglepageButton;
