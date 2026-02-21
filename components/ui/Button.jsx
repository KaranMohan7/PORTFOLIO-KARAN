"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import Sexybutton from "../ui/Sexybutton"

const Button = ({ text, px="20" }) => {
  const btnRef = useRef(null);
  const fillRef = useRef(null);
  const textRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      tlRef.current = gsap.timeline({ paused: true })
        .to(fillRef.current, {
          scaleY: 1,
          duration: 0.6,
          ease: "power3.out",
        })
        .to(
          textRef.current,
          {
            color: "#000",
            duration: 0.3,
            ease: "power3.out",
          },
          0
        )
         .to(
        btnRef.current,
        {
          scale: 1.03,
          duration: 1,
          ease: "power3.out",
        },
        0
      );
    }, btnRef);

    return () => ctx.revert(); // ✅ cleanup
  }, []);

  return (
    <Sexybutton>
    <button
      ref={btnRef}
      onMouseEnter={() => tlRef.current.play()}
       onMouseLeave={() => tlRef.current.timeScale(1.4).reverse()}
      className={`relative overflow-hidden border border-white text-white rounded-full px-20 py-2 font-medium`}
    >
      <span
        ref={fillRef}
        className="absolute inset-0 bg-white rounded-full scale-y-0 origin-bottom"
      />
      <span ref={textRef} className="relative z-10">
        {text}
      </span>
    </button>
    </Sexybutton>
  );
};

export default Button;
