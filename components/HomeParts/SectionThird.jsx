"use client";
import { appcontext } from "@/app/context/CursorProvider";
import gsap from "gsap";
import Image from "next/image";
import React, { useContext, useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import Button from "../ui/Button";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);
const SectionThird = () => {
 

  const descRef = useRef(null);
  const imageRef = useRef(null);

const headingRef = useRef(null);

  const { cursor } = useContext(appcontext);

 

  useEffect(() => {
  // DESCRIPTION BLUR REVEAL
  gsap.fromTo(
    descRef.current,
    { opacity: 0, y: 30, filter: "blur(10px)" },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      ease: "none",
      scrollTrigger: {
        trigger: descRef.current,
        start: "top 85%",
        end: "top 65%",
        scrub: 1.2,
      },
    }
  );

  // HEADING BLUR REVEAL
  gsap.fromTo(
    headingRef.current,
    { opacity: 0, y: 40, filter: "blur(12px)" },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      ease: "none",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        end: "top 45%",
        scrub: 1.4,
      },
    }
  );

// IMAGE PARALLAX + FADE (NO BLUR, EARLY START)
gsap.fromTo(
  imageRef.current,
  {
    y: 40,
    opacity: 0,
    scale: 1.03,
  },
  {
    y: -20,
    opacity: 1,
    scale: 1,
    ease: "none",
    scrollTrigger: {
      trigger: imageRef.current,
      start: "top 95%",   // 👈 starts MUCH earlier
      end: "top 55%",
      scrub: 1,
    },
  }
);

  return () => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}, []);

  return (
    <div className="w-full h-[75vh] mt-24  px-4">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* IMAGE + TEXT WRAPPER */}
        <div className="w-full max-w-[1170px]">
          <Image
           ref={imageRef}
            src="https://res.cloudinary.com/djxinb7ul/image/upload/v1765992772/Comp_1_00000_mgeygy.jpg"
            width={1170}
            height={300}
            className="rounded-lg w-full h-auto"
            alt="Project Poster"
          />

          {/* DESCRIPTION */}
          <p   ref={descRef} className="mt-7 text-white font-medium text-sm sm:text-base">
            An end-to-end Doctor Management System built to make healthcare
            workflows effortless appointments, consultations, and admin
            controls, all powered by a clean UI and a robust backend.{" "}
            <span className="font-semibold">Sounds smooth? It is.</span>
          </p>
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div   ref={headingRef} className="space-y-5 text-center lg:text-left">
          <p
            onMouseEnter={() =>
              gsap.to(cursor.current, { scale: 7, duration: 0.4 })
            }
            onMouseLeave={() =>
              gsap.to(cursor.current, { scale: 1, duration: 0.4 })
            }
            className="text-white text-2xl sm:text-3xl lg:text-5xl leading-tighter"
          >
            SOME
            <br />
            FEATURED
            <br />
            <span className="font-bold">PROJECTS</span>
          </p>
<Link href={'/projects'}>
    <Button text={"Projects Page"} />
    </Link>
        </div>
      </div>
    </div>
  );
};

export default SectionThird;
