"use client"
/* import ProjectScene from '@/components/backgrounds/ProjectScene' */
import FlowingMenu from '@/components/FlowingMenu';
import { projectData } from '@/utils/dummyData';
import React, { useState } from 'react'
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from 'next/image';
import Link from 'next/link';

const projects = () => {

  const [showMinimized, setShowMinimized] = useState(true)
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const projectRef = useRef(null)
    
useEffect(() => {
  gsap.fromTo(
    headerRef.current,
    { y: 120, opacity: 0, filter: "blur(20px)" },
    {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.4,
      ease: "power4.out",
      delay: 1.2,
    }
  );

  gsap.fromTo(
    menuRef.current,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      delay: 1.4, // header ke baad
    }
  );
}, []);


useEffect(() =>  {
    gsap.fromTo(
    projectRef.current,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.1, // header ke baad
    }
  );
},[showMinimized])


  return (
    <div className='w-full min-h-screen relative'>
      <div ref={headerRef} className='w-full lg:w-2/3 text-white mt-24 px-7 z-20'>  {/* this block has to be animated when we navigate  */}
        <p className='tracking-wide text-[7vw] font-semibold '>My Projects</p>
        <p className='tracking-widest mt-9'>Step into my world of projects where thoughtful design meets modern technology to create engaging and impactful digital experiences. Below are some of my standout works.</p>
      </div>
      {/* menu buttons*/}
      <div className='flex justify-end px-11 mt-11'>
        <div ref={menuRef} className='flex items-center gap-3'>
          <button onClick={() => setShowMinimized(true)} className={`${showMinimized ? "bg-white text-black" : "bg-zinc-800"} rounded-full w-8 h-8 flex  justify-center items-center transition-all duration-500 hover:bg-white hover:text-black`}>
            <BsFillMenuButtonWideFill />
          </button>
          <button onClick={() => setShowMinimized(false)} className={`${!showMinimized ? "bg-white text-black" : "bg-zinc-800"} rounded-full w-8 h-8 flex  justify-center items-center transition-all duration-500 hover:bg-white hover:text-black`}>
            <BiMenuAltRight size={20} />
          </button>
        </div>
      </div>


      {
        showMinimized && <div ref={projectRef} className="w-full mt-12 grid grid-cols-1 md:grid-cols-2 gap-16 px-10 py-16">
          {projectData.map((item, index) => (
            <Link href={`/projects/${item._id}`} key={index} className="group">
              <p className='text-white/40 py-2 capitalize'>{item?.name}</p>
              <div className="relative overflow-hidden rounded-xl aspect-16/10 bg-neutral-900">
                <Image
                  src={item.mainImage}
                  alt={item.title || "Project image"}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={index === 0}
                />
             {/*    <div className="absolute bottom-0 left-0 w-full p-6
                  translate-y-8 opacity-0
                  group-hover:translate-y-0 group-hover:opacity-100
                  transition-all duration-500 ease-out delay-100">
                  <p className="text-black text-2xl font-semibold capitalize">
                    {item.name}
                  </p>
                </div> */}
              </div>
            </Link>
          ))}
        </div>
      }

      {
        !showMinimized &&
        <div ref={projectRef} className='mt-20'>

          {projectData?.map((item, index) => {
            const RequiredItems = [
              { link: "", image: item.shortImage, text: item.shortName }
            ];

            return (
              <div className="border-white border-b-2 ">
              <Link href={`/projects/${item._id}`} key={index} >
                <FlowingMenu items={RequiredItems} />
              </Link>
              </div>
            );
          })}


        </div>
      }

      {/* <ProjectScene /> */}
    </div>
  )
}

export default projects