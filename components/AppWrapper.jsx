"use client";

import { useContext } from "react";
import Loader from "@/components/Loader";
import { appAndAnimation } from "@/app/context/AnimationAndLogicProvider";

export default function AppWrapper({ children }) {
  const { hideLoader, setHideLoader } = useContext(appAndAnimation);

  return (
    <>
      {!hideLoader && <Loader onFinish={() => setHideLoader(true)} />}
      <div>{children}</div>
    </>
  );
}
