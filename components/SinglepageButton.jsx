import React from "react";
import { HiMiniLink } from "react-icons/hi2";
import Sexybutton from "./ui/Sexybutton";

const SinglepageButton = ({ text }) => {
  return (
    <div className="mt-2 flex items-center">
      <Sexybutton>
        <button className="text-black font-semibold bg-yellow-300 py-5 px-3 rounded-full w-1/5">
          {text}
        </button>
      </Sexybutton>
      <Sexybutton>
        <button className="text-black font-semibold bg-yellow-300 py-3 rounded-full w-[7%] flex justify-center">
          <HiMiniLink size={20} />
        </button>
      </Sexybutton>
    </div>
  );
};

export default SinglepageButton;
