"use client";

import ReactLenis from "lenis/react";

export default function LenisProvider({ children }) {
  return (
    <ReactLenis
      root
      options={{
        smooth: true,
        lerp: 0.1,
      }}
    >
      {children}
    </ReactLenis>
  );
}
