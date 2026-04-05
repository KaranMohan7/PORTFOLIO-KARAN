"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { socials } from "@/utils/dummyData";
import HeaderServices from "../ui/HeaderServices";
import Marquee from "../ui/Marquee";

const Footer = () => {
  const text = `Got a question, how or project Idea?
    I’D love to hear from you and discuss further!`;
  const items = [
    "CODE WITH PURPOSE !",
    "CODE WITH PURPOSE !",
    "CODE WITH PURPOSE !",
    "CODE WITH PURPOSE !",
    "CODE WITH PURPOSE !",
  ];
/*   useGSAP(() => {
    gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".social-link",
        once: true
      },
    });
  }, []); */
  
  return (
    <section
      id="contact"
      className="flex flex-col justify-between min-h-screen bg-black relative z-9999"
    >
      <div>
        <HeaderServices
          subTitle={"You Dream It, I Code it"}
          title={"Contact"}
          text={text}
          textColor={"text-white"}

        />
        <div className="flex px-10 font-light text-white uppercase lg:text-[32px] text-[26px] leading-none mb-8">
          <div className="flex flex-col w-full gap-10">
            <div className="social-link">
              <h2>E-mail</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl">
                karanmohan44@gmail.com
              </p>
            </div>
            <div className="social-link">
              <h2>Phone</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="text-xl lowercase md:text-2xl lg:text-3xl">
                +91 9873206322
              </p>
            </div>
            <div className="social-link">
              <h2>Social Media</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <div className="flex flex-wrap gap-2 mt-3">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    target="__blank"
                    href={social.href}
                    className="text-xs leading-loose tracking-wides uppercase md:text-sm hover:text-white/80 transition-colors duration-200"
                  >
                    {"{ "}
                    {social.name}
                    {" }"}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
                 {/*  <Marquee items={items} className="text-white bg-transparent text-4xl" /> */}
    </section>
  );
};

export default Footer;