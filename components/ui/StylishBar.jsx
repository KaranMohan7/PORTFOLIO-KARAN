"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const StylishBar = ({ item, exp = false }) => {
  const textRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { y: "120%" },
      {
        y: "0%",
        ease: "circ.out",
        duration: 1.3,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <div className="py-2">
      {/* divider */}
      <div className="w-full h-px bg-[#343434]" /> 

      <div className="flex flex-wrap items-center justify-between pt-4">
        {/* LEFT : animated text */}
        <div ref={wrapperRef} className="overflow-hidden w-[70%]">
          <p
            ref={textRef}
            className="text-[8vw] md:text-[6vw] whitespace-nowrap"
          >
            {item.text}
          </p>
        </div>

        {/* RIGHT : static tags */}
        {exp && (
          <div className="flex items-center gap-3 shrink-0">
            <span className="border border-zinc-600 text-white/80 rounded-full px-4 py-1 text-xs tracking-wide">
              {item.profile}
            </span>
            <span className="border border-zinc-600 text-white/60 rounded-full px-4 py-1 text-xs tracking-wide">
              {item.duration}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StylishBar;
