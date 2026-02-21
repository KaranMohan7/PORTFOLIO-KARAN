"use client";
import React, { useContext, useEffect, useRef } from "react";
import Imagecontainer from "../Imagecontainer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/SplitText";
import Underlinedbutton from "../Underlinedbutton";
import { appcontext } from "@/app/context/CursorProvider";

gsap.registerPlugin(ScrollTrigger);

const SectionSecond = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const parallexTextRef = useRef(null);
  const aboutRef = useRef(null);
  const { cursor } = useContext(appcontext);
  const Mepicture = process.env.NEXT_PUBLIC_IMAGE_URL

  useEffect(() => {
    if (!sectionRef.current || !parallexTextRef.current) return;

    gsap.fromTo(
      parallexTextRef.current,
      { y: 90 },
      {
        y: -90,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1.2,
        },
      }
    );

    const split = new SplitText(
      parallexTextRef.current.querySelectorAll(".split"),
      {
        type: "lines",
        linesClass: "line-child",
      }
    );

    gsap.set(split.lines, {
      opacity: 0,
      y: 32,
      filter: "blur(10px)",
    });

    gsap.to(split.lines, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      ease: "none",
      stagger: { each: 0.15 },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "center 35%",
        scrub: 1.5,
      },
    });

    gsap.fromTo(
      aboutRef.current,
      { opacity: 0, filter: "blur(8px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        ease: "power3.out",
        duration: 1.2,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
  

  return (
    <div
      ref={sectionRef}
      className="w-full min-h-screen text-white relative"
    >
      {/* PARALLAX TEXT */}
      <div
        ref={parallexTextRef}
        className="
          z-50 absolute px-5 
          -top-24 
          sm:-top-20 
          md:-top-28
        "
      >
        <p
          ref={textRef}
          className="
            font-semibold split
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl
            leading-tight md:leading-[1.2]
          "
        >
          I create modern web experiences by combining clean design,
          performance-driven
        </p>

        {/* Child Headers */}
        <div className="mt-3 flex flex-col items-end">
          <p
            className="
              font-semibold split text-right
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl
              leading-tight md:leading-[1.2]
            "
          >
            development, helping ideas grow <br />
            into reliable digital products that <br />
            deliver value in a fast changing <br />
            digital landscape.
          </p>
        </div>

        {/* ABOUT */}
        <div
          ref={aboutRef}
          className="
            max-w-lg 
            mt-20 sm:mt-28 md:mt-36
            ml-0 sm:ml-10 md:ml-20
          "
        >
          <p
            onMouseEnter={() =>
              gsap.to(cursor.current, { scale: 7, duration: 0.4 })
            }
            onMouseLeave={() =>
              gsap.to(cursor.current, { scale: 1, duration: 0.4 })
            }
            className="
              text-base sm:text-lg md:text-xl
              leading-relaxed font-semibold
            "
          >
            My name is Karan. I’m a creative frontend-focused full stack
            developer who collaborates with companies to turn complex ideas into
            intuitive, scalable web experiences that deliver real value.
          </p>

          <Underlinedbutton classname="mt-8 md:mt-11 font-semibold text-lg md:text-xl">
            About Me
          </Underlinedbutton>
        </div>
        <div className="flex justify-end mt-7 md:-mt-12 lg:-mt-5 md:hidden lg:flex ">
          <p className="text-[17vw] font-bold">V1.0</p>
        </div>
      </div>

      {/* IMAGE */}
      <div className="mt-20 md:mt-48 relative">
        <Imagecontainer Mepicture={ Mepicture } width={580} height={550} />
      </div>
    </div>
  );
};

export default SectionSecond;
