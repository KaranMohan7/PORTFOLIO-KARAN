"use client";
import React, { createContext, useState } from "react";

export const appAndAnimation = createContext();

const AnimationAndLogicProvider = ({ children }) => {
  const [hideLoader, setHideLoader] = useState(false);

  const datavalue = {
    hideLoader,
    setHideLoader,
  };

  return (
    <appAndAnimation.Provider value={datavalue}>
      {children}
    </appAndAnimation.Provider>
  );
};

export default AnimationAndLogicProvider;
