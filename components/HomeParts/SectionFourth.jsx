import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

const Description = ({ text }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;

    gsap.to(contentRef.current, {
      height: open ? "auto" : 0,
      opacity: open ? 1 : 0,
      duration: open ? 0.5 : 0.4,
      ease: "circ.out",
    });
  }, [open]);

  return (
    <>
      {/* Desktop */}
      <p className="hidden md:block text-xs text-white/30 font-medium max-w-sm">
        {text}
      </p>

      {/* Mobile */}
      <div className="md:hidden mt-3">
        <button
          onClick={() => setOpen(!open)}
          className="text-white/60 text-sm"
        >
          {open ? "− Hide details" : "+ Show details"}
        </button>

        <div
          ref={contentRef}
          className="overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          <p className="text-xs text-white/40 font-medium mt-2 leading-relaxed max-w-xs">
            {text}
          </p>
        </div>
      </div>
    </>
  );
};

const SectionFourth = () => {
  const headingHover =
    "text-white/40 hover:text-white transition-colors duration-500 ease-in-out";

  const desc1 =
    "Engineering scalable React frontends with clarity, maintainability and performance in mind.";
  const desc2 =
    "Designing intuitive interfaces that balance aesthetics and usability across all devices.";
  const desc3 =
    "Crafting expressive UI through thoughtful layout, typography, and motion.";
  const desc4 =
    "Building meaningful interactions and micro animations that guide users and enhance feedback.";

  return (
    <div className="w-full min-h-screen py-24 md:py-32 text-white px-3 sm:px-4 mt-5">
      {/* 1 */}
      <div className="w-full border-t border-white/30 py-4 grid grid-cols-12 gap-y-4">
        <div className="col-span-12 md:col-span-9 flex gap-4 md:gap-20 items-center">
          <p className="text-white/30 font-semibold">[ 1 ]</p>
          <p
            className={`text-[13vw] sm:text-[11vw] md:text-[10vw] tracking-tight leading-none font-medium md:-mt-5 ${headingHover}`}
          >
            ENGINEERING
          </p>
        </div>
        <div className="col-span-12 md:col-span-3">
          <Description text={desc1} />
        </div>
      </div>

      {/* 2 */}
      <div className="w-full border-t border-white/30 py-4 grid grid-cols-12 gap-y-4">
        <div className="hidden md:block md:col-span-5" />

        <div className="col-span-12 md:col-span-5 flex gap-4 items-center">
          <p className="text-white/30 font-semibold">[ 2 ]</p>
          <p
            className={`text-[13vw] sm:text-[11vw] md:text-[10vw] tracking-tight leading-none font-medium md:-mt-5 ${headingHover}`}
          >
            DIGITAL
          </p>
        </div>

        <div className="col-span-12 md:col-span-2">
          <Description text={desc2} />
        </div>
      </div>

      {/* 3 */}
      <div className="w-full border-t border-white/30 py-4 grid grid-cols-12 gap-y-4">
        <div className="hidden md:block md:col-span-3" />

        <div className="col-span-12 md:col-span-6 flex gap-4 items-center">
          <p className="text-white/30 font-semibold">[ 3 ]</p>
          <p className="text-[13vw] sm:text-[11vw] md:text-[10vw] tracking-tight leading-none font-medium md:-mt-[18px]">
            CREATIVE
          </p>
        </div>

        <div className="col-span-12 md:col-span-2">
          <Description text={desc3} />
        </div>
      </div>

      {/* 4 */}
      <div className="w-full border-t border-white/30 py-4 grid grid-cols-12 gap-y-4 mf:px-3">
        <div className="col-span-12 md:col-span-3">
          <Description text={desc4} />
        </div>

        <div className="col-span-12 md:col-span-9 flex items-center justify-between md:ml-52">
          <p
            className={`text-[13vw] sm:text-[11vw] md:text-[10vw] tracking-tight leading-none font-medium md:-mt-[18px] ${headingHover}`}
          >
            MOTION
          </p>
          <p className="text-white/30 font-semibold">[ 4 ]</p>
        </div>
      </div>

      <div className="w-full border-t border-white/30" />
    </div>
  );
};

export default SectionFourth;
