"use client";
import { createContext } from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const appcontext = createContext();

const CursorProvider = ({ children }) => {
  const cursor = useRef();

  const Cursorfollower = (e) => {
    gsap.to(cursor.current, {
      x: e.clientX - 12,
      y: e.clientY - 12,
      duration: 1.12,
      ease: "power3.out",
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", Cursorfollower);
    return () => window.removeEventListener("mousemove", Cursorfollower);
  }, []);

  const datavalue = {
    cursor,
  };

  return (
    <appcontext.Provider value={datavalue}>
      <div
        ref={cursor}
        className="w-4 h-4 z-900 bg-white hidden lg:block rounded-full fixed top-0 left-0 pointer-events-none mix-blend-difference "
      />
      {children}
    </appcontext.Provider>
  );
};

export default CursorProvider;