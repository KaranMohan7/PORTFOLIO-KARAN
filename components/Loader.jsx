"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const greetings = [
  "Hello",
  "नमस्ते",
  "やあ",
  "Hola",
  "Bonjour",
  "안녕",
  "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
];

export default function Loader({ onFinish }) {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: finishLoader,
    });

    // initial set (once only)
    gsap.set(textRef.current, { opacity: 0, y: 0 });

    // first greeting
    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out",
    }).to({}, { duration: 0.4 });

    // rest greetings (optimized loop)
    greetings.slice(1).forEach((_, i) => {
      tl.call(() => {
      
        setIndex(i + 1);
      });
      tl.to({}, { duration: 0.15 });
    });

    return () => {
      tl.kill(); // cleanup (important for mobile perf)
    };
  }, []);

  const finishLoader = () => {
    gsap.to(containerRef.current, {
      y: "-100%",
      duration: 1.1,
      ease: "expo.out",
      delay: 0.5,
      onComplete: onFinish,
      willChange: "transform", // 🔥 perf boost
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 bg-[#111111] flex items-center justify-center overflow-hidden will-change-transform"
    >
      <p
        ref={textRef}
        className="text-5xl md:text-6xl font-semibold text-white opacity-0"
      >
        {greetings[index]}
      </p>
    </div>
  );
}