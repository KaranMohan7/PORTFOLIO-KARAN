"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { appcontext } from "@/app/context/CursorProvider";
import Link from "next/link";
import { PiReadCvLogo } from "react-icons/pi";
import { useRouter } from "next/navigation";

const Nav = () => {
  const navRef = useRef(null);
  const navContentRef = useRef(null);
  const { cursor } = useContext(appcontext);
  const router = useRouter();

  const line1 = useRef(null);
  const line2 = useRef(null);

  const textRefs = useRef([]);
  const socialRef = useRef(null);

  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  
  const navTimeline = useRef(null);

  useEffect(() => {
    gsap.set(navRef.current, { y: "-100%" });

    navTimeline.current = gsap.timeline({ paused: true });

    navTimeline.current
      .to(navRef.current, {
        y: 0,
        duration: 1.1,
        ease: "expo.out",
      })
      .from(
        navContentRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "expo.out",
        },
        "-=0.6"
      )
      .from(
        textRefs.current,
        {
          y: 60,
          opacity: 0,
          duration: 0.7,
          ease: "expo.out",
          stagger: 0.08,
        },
        "-=0.3"
      )
      .from(
        socialRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: "expo.out",
        },
        "-=0.4"
      );
  }, []);

  const animateHamburger = (state) => {
    if (state) {
      gsap.to(line1.current, {
        y: 6,
        rotate: 45,
        duration: 0.55,
        ease: "expo.inOut",
      });

      gsap.to(line2.current, {
        y: -6,
        rotate: -45,
        duration: 0.55,
        ease: "expo.inOut",
      });
    } else {
      gsap.to([line1.current, line2.current], {
        y: 0,
        rotate: 0,
        duration: 0.55,
        ease: "expo.inOut",
      });
    }
  };

  useEffect(() => {
    textRefs.current.forEach((el) => {
      if (!el) return;

      const fillLayer = el.querySelector(".fill-layer");

      gsap.set(fillLayer, { clipPath: "inset(0 100% 0 0)" });

      const tl = gsap.timeline({ paused: true });

      tl.to(fillLayer, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.2,
        ease: "expo.out",
      });

      el.addEventListener("mouseenter", () => tl.play());
      el.addEventListener("mouseleave", () => tl.reverse());
    });
  }, []);

  useEffect(() => {
    animateHamburger(open);
    open ? navTimeline.current.play() : navTimeline.current.reverse();
  }, [open]);

  const navItems = [
    { name: "Home", route: "/" },
    { name: "Projects", route: "/projects" },
    { name: "About", route: "/about" },
    { name: "Contact", route: "/contact" },
  ];

  return (
    <>
      {/* HAMBURGER BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() =>
          gsap.to(cursor.current, {
            scale: 4,
            duration: 0.4,
          })
        }
        onMouseLeave={() =>
          gsap.to(cursor.current, {
            scale: 1,
            duration: 0.4,
          })
        }
        className="
          fixed flex flex-col gap-3 z-100
          mt-8 sm:mt-10 md:mt-12 
          px-6 sm:px-10 md:px-16
        "
      >
        <span ref={line1} className="block w-12 md:w-16 h-0.5 bg-white"></span>
        <span
          ref={line2}
          className="block w-12 md:w-16 h-[2.4px] bg-white"
        ></span>
      </button>

      {/* NAV MENU */}
      <div
        ref={navRef}
        style={{ transform: "translateY(-100%)" }}
        className="z-70 w-full h-screen bg-[#111111] fixed top-0 left-0 overflow-hidden py-7 md:py-1"
      >
        <div
          ref={navContentRef}
          className="
            flex flex-col md:flex-row
            justify-between items-start
            h-full
            px-6 md:px-8
            py-10 sm:py-16 md:py-20
            gap-14 md:gap-0
          "
        >
          {/* RIGHT COLUMN (MENU LINKS) */}
          <div className="flex flex-col items-start justify-center space-y-6 pt-5 md:pt-0">
            {navItems.map((item, index) => (
              <div
                key={index}
                ref={(el) => (textRefs.current[index] = el)}
                className="relative cursor-pointer overflow-hidden inline-flex items-start w-fit"
              >
                <div
                  className={`
                    font-black 
                    text-6xl sm:text-7xl md:text-8xl lg:text-9xl
                     transition-colors duration-500
                    ${pathname === item.route ? "text-white" : "text-zinc-800"}
                  `}
                  onClick={() => {
                    if (pathname === item.route) {
                      setOpen(false);
                      return;
                    }

                    router.push(item.route);

                    // 2️⃣ Close the menu animation (reveals new page when done)
                    setOpen(false);

                    // 3️⃣ After animation finishes, simply remove callback
                    navTimeline.current.eventCallback(
                      "onReverseComplete",
                      () => {
                        navTimeline.current.eventCallback(
                          "onReverseComplete",
                          null
                        );
                      }
                    );
                  }}
                >
                  {item.name}

                  {/* FILL LAYER */}
                  <span
                    className="
                      absolute top-0 left-0 font-black
                      text-6xl sm:text-7xl md:text-8xl lg:text-9xl
                      text-white fill-layer
                    "
                  >
                    {item.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-end h-full mt-40 md:mt-16 lg:mt-16 text-white pb-5 md:pb-0">
            {/* SOCIAL ICONS */}
            <div
              ref={socialRef}
              className="flex flex-col space-y-5 text-sm md:text-lg"
            >
                                          <Link
                href={
                  "https://drive.google.com/file/d/1nAgebWAYJVSsl0tmiwHe5Rl-O3xisTnb/view?usp=sharing"
                }
                 target="__blank"
                className="flex items-center gap-3"
              >
                <div className="bg-zinc-800 rounded-full w-8 h-8 flex justify-center items-center transition-all duration-500 hover:bg-white hover:text-black">
                  <PiReadCvLogo />
                </div>
                <p>Resume</p>
              </Link>
              <Link
                href={"https://github.com/KaranMohan7"}
                target="__blank"
                className="flex items-center gap-3"
              >
                <div className="bg-zinc-800 rounded-full w-8 h-8 flex justify-center items-center transition-all duration-500 hover:bg-white hover:text-black">
                  <FaGithub />
                </div>
                <p>Github</p>
              </Link>

              <Link
                href={
                  "https://www.linkedin.com/in/karan-mohan-talwar-aaa731295/"
                }
                 target="__blank"
                className="flex items-center gap-3"
              >
                <div className="bg-zinc-800 rounded-full w-8 h-8 flex justify-center items-center transition-all duration-500 hover:bg-white hover:text-black">
                  <FaLinkedin />
                </div>
                <p>LinkedIn</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
