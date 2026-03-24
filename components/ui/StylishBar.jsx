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
    <div className="py-3 sm:py-4">
      {/* divider */}
      <div className="w-full h-px bg-[#343434]" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4">
        
        {/* LEFT : animated text */}
        <div ref={wrapperRef} className="overflow-hidden w-full sm:w-[65%]">
          <p
            ref={textRef}
            className="
              text-[9vw] 
              sm:text-[7vw] 
              md:text-[5vw] 
              lg:text-[4vw] 
              leading-[1.1]
              wrap-break-word
            "
          >
            {item.text}
          </p>
        </div>

        {/* RIGHT : tags */}
        {exp && (
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3">
            <span className="border border-zinc-600 text-white/80 rounded-full px-3 sm:px-4 py-1 text-[10px] sm:text-xs tracking-wide">
              {item.profile}
            </span>
            <span className="border border-zinc-600 text-white/60 rounded-full px-3 sm:px-4 py-1 text-[10px] sm:text-xs tracking-wide">
              {item.duration}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StylishBar;