import { appcontext } from "@/app/context/CursorProvider";
import gsap from "gsap";
import React, { useContext, useEffect, useRef } from "react";

const HeroText = ({ startAnimation }) => {
  const { cursor } = useContext(appcontext);
  const textOneRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightPara1Ref = useRef(null);
  const rightPara2Ref = useRef(null);

  const animateHero = () => {
    const tl = gsap.timeline({ ease: "expo.out" });

    tl.fromTo(
      textOneRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "expo.out" }
    )
      .fromTo(
        leftTextRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6" // overlaps slightly with previous animation
      )
      .fromTo(
        rightPara1Ref.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.4"
      )
      .fromTo(
        rightPara2Ref.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.5"
      );
  };

  useEffect(() => {
    if (startAnimation) {
      animateHero();
    }
  }, [startAnimation]);

  return (
    <div className="text-white md:mt-24 px-3 md:px-0">
      {/* MAIN TITLE */}
      <p
        ref={textOneRef}
        style={{ opacity: 0 }}
        className="text-[3.5rem] md:text-7xl lg:text-8xl font-extrabold leading-tight text-nowrap"
      >
        I'm Karan <br /> Mohan Talwar
      </p>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center mt-14 md:mt-20 gap-10 lg:gap-14">
        {/* LEFT TEXT */}
        <p
          ref={leftTextRef}
          style={{ opacity: 0 }}
          onMouseEnter={() =>
            gsap.to(cursor.current, {
              scale: 9,
              duration: 0.4,
            })
          }
          onMouseLeave={() =>
            gsap.to(cursor.current, {
              scale: 1,
              duration: 0.4,
            })
          }
          className="text-2xl lg:text-4xl tracking-tight w-full md:w-3/4 lg:w-[90%] leading-snug"
        >
          I’m a self-taught full-stack developer crafting clean, functional, and
          beautifully simple web experiences.
        </p>

        {/* RIGHT TEXT */}
        <div className="font-light text-[16px] lg:mt-1 w-full lg:w-auto">
          <p ref={rightPara1Ref} style={{ opacity: 0 }}>
            I’m passionate about shaping modern web experiences crafting smooth,
            scalable applications that feel refined and purposeful.
          </p>
          <p
            ref={rightPara2Ref}
            style={{ opacity: 0 }}
            className="mt-4 md:mt-6"
          >
            From concept to execution, I turn ideas into immersive digital
            products, obsessing over the small details that make a big
            difference.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroText;
