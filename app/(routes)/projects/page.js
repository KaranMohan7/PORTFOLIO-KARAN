"use client"
/* import ProjectScene from '@/components/backgrounds/ProjectScene' */
import FlowingMenu from '@/components/FlowingMenu';
/* import { projectData } from '@/utils/dummyData'; */
import React, { useState } from 'react'
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from 'next/image';
import Link from 'next/link';
import { getAllProjects } from '@/utils/apiFunctions';
import { useQuery } from '@tanstack/react-query';


const projects = () => {

  const [showMinimized, setShowMinimized] = useState(true)
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const projectRef = useRef(null)

      const { data, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });

    const projectData =  data?.data || []; 
    
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
      delay: 1.1,
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


  if (isError) {
  return (
    <div className="text-red-500 text-center mt-40">
      Failed to load projects ❌
    </div>
  );
}

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
  showMinimized && (
    isLoading ? (
      <GridSkeleton />
    ) : (
      <div ref={projectRef} className="w-full mt-10 grid grid-cols-1 md:grid-cols-2 gap-16 px-10 py-16">
        {projectData.map((item, index) => (
          <Link href={`/projects/${item._id}`} key={item._id} className="group">
            <p className='text-white/40 py-2 capitalize'>{item?.name}</p>

            <div className="relative overflow-hidden rounded-xl aspect-16/10 bg-neutral-900">
              <Image
                src={item.mainImage}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority={index === 0}
              />
            </div>
          </Link>
        ))}
      </div>
    )
  )
}

      {
  !showMinimized && (
    isLoading ? (
      <ListSkeleton />
    ) : (
      <div ref={projectRef} className='mt-20'>
        {projectData.map((item) => {
          const RequiredItems = [
            { link: "", image: item.shortImage, text: item.shortName }
          ];

          return (
            <div key={item._id} className="border-white border-b-2">
              <Link href={`/projects/${item._id}`}>
                <FlowingMenu items={RequiredItems} />
              </Link>
            </div>
          );
        })}
      </div>
    )
  )
}
      {/* <ProjectScene /> */}
    </div>
  )
}

const GridSkeleton = () => {
  return (
    <div className="w-full mt-12 grid grid-cols-1 md:grid-cols-2 gap-16 px-10 py-16 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i}>
          <div className="h-4 w-32 bg-zinc-700 rounded mb-4"></div>
          <div className="w-full aspect-16/10 bg-zinc-800 rounded-xl"></div>
        </div>
      ))}
    </div>
  );
};

const ListSkeleton = () => {
  return (
    <div className="mt-20 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="border-b border-zinc-700 py-6 px-10 flex items-center gap-4">
          <div className="w-16 h-16 bg-zinc-700 rounded-md"></div>
          <div className="h-4 w-40 bg-zinc-700 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default projects