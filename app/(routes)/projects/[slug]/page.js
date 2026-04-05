"use client"
import CurvedLoop from '@/components/CurvedLoop';
import { projectData } from '@/utils/dummyData'
import Image from 'next/image';
import { useParams } from 'next/navigation'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { IoMdArrowRoundDown } from "react-icons/io";
import { useRef } from "react";
import SinglepageButton from '@/components/SinglepageButton';
import gsap from 'gsap';
import { useQuery } from '@tanstack/react-query';
import { getSingleProject } from '@/utils/apiFunctions';
import Link from 'next/link';


const page = () => {

  const { slug } = useParams()
  const liveSectionRef = useRef(null)
  const [projectTitle, setProjectTitle] = useState("Loading Project...");
/*   const [isLightMode, setIsLightMode] = useState(false)
  const [isMobile, setIsMobile] = useState(false); */

  const introRef = useRef(null);
  const titleRef = useRef(null);
  const barRef = useRef(null);

  const { data, isLoading, isError } = useQuery({
  queryKey: ["project", slug],
  queryFn: () => getSingleProject(slug),
  enabled: !!slug, // slug aaye tab hi call hoga
});

/* useEffect(() => {
  if (!liveSectionRef.current || isMobile) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      setIsLightMode(entry.isIntersecting);
    },
    { threshold: 0.4 }
  );

  observer.observe(liveSectionRef.current);

  return () => observer.disconnect();
}, [isMobile]);
 */

 const singlePageData = data?.data || data || {};

  useLayoutEffect(() => {
      if (!titleRef.current) return;

    const ctx = gsap.context(() => {

      const tl = gsap.timeline();

      // Initial state
      gsap.set(titleRef.current, {
        y: "100%",
        scale: 1.15,
        filter: "blur(15px)",
        opacity: 0
      });

      gsap.set(introRef.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
      });

      tl.to(titleRef.current, {
        y: "0%",
        scale: 1,
        filter: "blur(0px)",
        opacity: 1,
        duration: 1.4,
        ease: "power4.out",
      })

        .to(barRef.current, {
          scaleX: 1,
          duration: 1.6,
          ease: "power2.out"
        }, 0)

        .to(introRef.current, {
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
          duration: 0.8,
          ease: "power2.inOut"
        })

        .to(introRef.current, {
          y: "-100%",
          duration: 1.2,
          ease: "power4.inOut",
        }, "-=0.4");

    });

    return () => ctx.revert();

  }, []);

  useEffect(() => {
  if (singlePageData?.name) {
    setProjectTitle(singlePageData.name);
  }
}, [singlePageData]);

/* useEffect(() => {
  const checkMobile = () => setIsMobile(window.innerWidth < 1024);
  checkMobile();
  window.addEventListener("resize", checkMobile);
  return () => window.removeEventListener("resize", checkMobile);
}, []); */

  if (isError) {
  return (
    <div className="text-red-500 text-center mt-40">
      Failed to load project ❌
    </div>
  );
}

  return (
    <div className={`w-full min-h-screen overflow-hidden transition-colors duration-800 ease-in-out mt-5 text-white bg-[#18181B]
  `}>

{/* Loader */}
<div
  ref={introRef}
  className="fixed inset-0 z-500 bg-black flex flex-col items-center justify-center"
>

  {/* Text Wrapper */}
  <div className="overflow-hidden text-center px-6">
    <h1
      ref={titleRef}
      className="text-white text-sm md:text-2xl font-medium uppercase tracking-[0.2em]"
    >
     {projectTitle}
    </h1>
  </div>

  {/* Loading Bar Wrapper */}
  <div className="mt-8 w-40 md:w-64 h-0.5 bg-white/20 rounded-full overflow-hidden">
    <div
      ref={barRef}
      className="h-full w-full bg-white scale-x-0 origin-left"
    ></div>
  </div>

</div>

      {/* Title */}
      <div className='mt-24 py-8 px-4 sm:px-8 lg:px-11 font-semibold'>
        <p className='text-3xl sm:text-4xl lg:text-5xl uppercase'>
          {singlePageData?.name}
        </p>
      </div>

      {/* Scroll Hint */}
      <div className='flex items-center gap-2 px-4 sm:px-8 lg:px-11 text-sm sm:text-base'>
        <IoMdArrowRoundDown size={22} /> Scroll To Explore
      </div>

      {/* Main Image */}
      <div className='w-full px-4 sm:px-8 lg:px-12 flex justify-center py-12 sm:py-20'>
        {singlePageData?.mainImage && (
          <Image
            src={singlePageData.mainImage}
            width={2000}
            height={2000}
            alt={singlePageData.shortName || "project image"}
            className='w-full max-w-8xl h-auto object-cover'
          />
        )}
      </div>

      <hr className={`my-6 border-white border-[1.5px]`} />

      {/* Description Section */}
      <div className='px-4 sm:px-8 lg:px-16 w-full py-6 flex flex-col lg:flex-row gap-10 justify-between'>

        {/* Left */}
        <div ref={liveSectionRef} className='w-full lg:w-1/2 space-y-6'>
          <p className='leading-7 sm:leading-8 text-sm sm:text-base'>
            {singlePageData?.description}
          </p>
{
  singlePageData.link && 
            <Link href={singlePageData.link} target='__blank'>
          <div>
            <SinglepageButton  text={"Live Website"} />
          </div>
          </Link>
}
        </div>

        {/* Right */}
        <div className='space-y-2 text-sm sm:text-base'>
          <p className='font-semibold'>{singlePageData?.type?.typeName}</p>
          <p>{singlePageData?.type?.typeCategory}</p>
          <p>{singlePageData?.type?.typeDateStack}</p>
        </div>

      </div>

      {/* Secondary Image */}
      <div className='w-full px-4 sm:px-8 lg:px-12 flex justify-center py-6'>
        {singlePageData?.images?.[0] && (
          <Image
            src={singlePageData.images[0]}
            width={2000}
            height={2000}
            alt={singlePageData.name || "project preview"}
            className='w-full max-w-8xl h-auto object-cover'
          />
        )}
      </div>

      {/* Tech Stack */}
      <div className='px-4 sm:px-8 lg:px-11 flex flex-col lg:flex-row items-start lg:items-center gap-6 py-10'>
        <div className='w-full lg:w-[90%]'>
          <h1 className='text-3xl sm:text-4xl lg:text-[4vw] font-semibold'>
            Tech Stack
          </h1>
          <p className='mt-3 text-sm sm:text-lg'>
            Technologies and tools used to bring this project to life
          </p>
        </div>

        <div className='flex flex-wrap gap-3'>
          {singlePageData?.techStack?.map((item, index) => (
            <button
              key={index}
              className='text-black bg-white px-3 py-2 rounded-full text-xs font-semibold'
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Project Overview */}
      <div className='px-4 sm:px-8 lg:px-11 py-14'>
        <p className='text-3xl sm:text-4xl lg:text-[4vw] font-semibold'>
          Project Overview
        </p>
        <ul className='list-disc px-5 sm:px-8 mt-4 text-sm sm:text-base'>
          {singlePageData?.detailDescription?.map((item, index) => (
            <li key={index} className='py-1'>{item}</li>
          ))}
        </ul>
      </div>

      {/* Curved Loop */}
      <div className='h-[30vh] sm:h-[45vh] relative'>
        <CurvedLoop
          marqueeText="Creative ✦ Code ✦ Projects ✦ Experiences ✦"
          speed={2}
          curveAmount={400}
          direction="right"
          interactive
          className="custom-text-style"
        />
      </div>

    </div>
  )
}

export default page
