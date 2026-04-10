"use client";
import Imagecontainer from "@/components/Imagecontainer";
import Button from "@/components/ui/Button";
import StylishBar from "@/components/ui/StylishBar";
import {
  educationData,
  experience,
  techStack,
} from "../../../utils/dummyData.js";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import StylishBarSecond from "@/components/ui/StylishBarSecond.jsx";
import Link from "next/link.js";
import { useQuery } from "@tanstack/react-query";

gsap.registerPlugin(ScrollTrigger);
export default function About() {
  const expDescRef = useRef(null);
  const whatIDoRef = useRef(null);
  const myJourneyRef = useRef(null)
  const aboutHeroRef = useRef(null);

    const { data } = useQuery({
  queryKey: ["homepage"],
  queryFn: async () => {
    const res = await fetch("/api/home");
    return res.json();
  },
});

const AboutImage = data?.data?.aboutImage;

  useEffect(() => {
    gsap.fromTo(
      expDescRef.current,
      {
        opacity: 0,
        y: 40,
        filter: "blur(12px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: expDescRef.current,
          start: "top 85%",
          end: "top 60%",
          toggleActions: "play none none none",
        },
      }
    );
    gsap.fromTo(
      whatIDoRef.current,
      {
        opacity: 0,
        y: 40,
        filter: "blur(12px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: whatIDoRef.current,
          start: "top 85%",
          end: "top 60%",
          toggleActions: "play none none none",
        },
      }
    );
       gsap.fromTo(
     myJourneyRef.current,
      {
        opacity: 0,
        y: 40,
        filter: "blur(12px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger:  myJourneyRef.current,
          start: "top 85%",
          end: "top 60%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: "power4.out",
        duration: 1.5,   
      },
    });

    tl.from(
      aboutHeroRef.current.querySelector("h1"),
      {
        y: 120,
        opacity: 0,
        clipPath: "inset(100% 0% 0% 0%)",
      }
    )
      .from(
        aboutHeroRef.current.querySelector("p"),
        {
          y: 60,
          opacity: 0,
          clipPath: "inset(100% 0% 0% 0%)",
        },
        "-=0.8"
      )
      .from(
        aboutHeroRef.current.querySelector("button"),
        {
          y: 40,
          opacity: 0,
          scale: 0.9,
        },
        "-=0.6"
      )
      .from(
        aboutHeroRef.current.querySelector("img"),
        {
          scale: 1.2,
          opacity: 0,
          clipPath: "inset(0% 0% 100% 0%)",
        },
        "-=1"
      );
  });

  return () => ctx.revert();
}, []);

  return (
    <div className="w-full min-h-screen text-white mt-16 lg:mt-24 px-7">
      <div ref={aboutHeroRef} className="block lg:flex lg:items-start">          {/* this block needs to animated */}
        <div className="py-3 lg:w-1/2">
          <h1 className="text-[19vw] lg:text-[11vw] font-bold tracking-wide">
            ABOUT
          </h1>
          <p className="text-lg py-3 mb-3">
            {" "}
            I’m a Fullstack developer focused on crafting clean, modern, and
            meaningful web experiences. I enjoy building smooth, intuitive
            interfaces with attention to detail, performance, and subtle
            interactions. I believe good interfaces are felt more than they’re
            noticed.
          </p>
          <Link href={'/contact'}><Button text={"Say Hello !"} /></Link>
        </div>
        <div className="ml-auto mt-5 md:mt-0">
          <Imagecontainer Mepicture={AboutImage} width={580} height={100} />
        </div>
      </div>

      <div className="py-20 ">
        <p className="text-sm md:text-lg py-5 tracking-wide">WHAT I DO</p>
        <p
          ref={whatIDoRef}
          className="text-2xl md:text-5xl py-3 w-full font-semibold leading-10 lg:leading-16"
        >
          I build reliable and user focused web applications with a frontend
          focused approach, emphasizing clean, responsive, and intuitive
          interfaces. In addition to frontend work, I handle backend logic and
          integrations to ensure scalable, well structured, and reliable
          application behavior.
        </p>
      </div>

      <div className="md:mt-12">
        <p className="text-sm md:text-lg py-3 tracking-wide">TECH STACK</p>
        {techStack.map((item, index) => (
          <div key={index}>
            <StylishBar item={item} />
          </div>
        ))}
      </div>
      <div className="mt-16">
        <p className="text-sm md:text-lg py-5 tracking-wide">EXPERIENCE</p>
        <p ref={expDescRef} className="text-2xl md:text-5xl leading-12 md:leading-16">
          I’ve been gaining hands on experience through internship and freelance
          work, contributing to real world projects that strengthened my
          understanding of modern web development and user focused design.
        </p>
        <div className="mt-16">
          <p className="text-sm md:text-lg py-5 tracking-wide">WORK HISTORY</p>
          {experience.map((item, index) => (
            <div key={index}>
              <StylishBar item={item} exp={true} />
            </div>
          ))}
        </div>
 {/*         <div className="mt-16">
          <p>EDUCATION</p>
          {educationData.map((item, index) => (
            <div key={index}>
              <StylishBarSecond data={item} />
            </div>
          ))}
        </div>  */}
        <div className="py-12">
          <p className="text-lg md:text-2xl py-5 tracking-wide">{"</ >"}</p>
          <p
            ref={myJourneyRef}
            className="text-2xl md:text-5xl py-2 w-full leading-12 md:leading-16"
          >
            My journey is defined less by milestones and more by momentum. I
            learn by building, breaking, and refining. Each project represents a
            step forward in understanding not just how things work, but why they
            work.
          </p>
        </div>
      </div>
    </div>
  );
}
