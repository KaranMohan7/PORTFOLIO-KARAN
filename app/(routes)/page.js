"use client";
import Background from "@/components/backgrounds/Background";
import HeroText from "@/components/HeroText";
import React, { useContext, useState } from "react";
import { appAndAnimation } from "../context/AnimationAndLogicProvider";
import SectionSecond from "@/components/HomeParts/SectionSecond";
import SectionThird from "@/components/HomeParts/SectionThird";
import SectionFourth from "@/components/HomeParts/SectionFourth";
import ServicesSection from "@/components/ServicesSection";



const page = () => {
  const { hideLoader } = useContext(appAndAnimation);

  return (
    <>
      <div className="relative w-full min-h-screen ">
        <Background />
        {/* HERO SECTION */}
        <div
          className="
    flex flex-col justify-center 
    w-full min-h-screen `
    px-4 sm:px-8 md:px-16 lg:px-24 xl:px-28
  "
        >
          <HeroText startAnimation={hideLoader} />
          
        </div>
        <SectionSecond />
        <SectionFourth />
        <SectionThird />
        <div className="mt-16">
          <ServicesSection />
        </div>
      </div>
    </>
  );
};

export default page;
