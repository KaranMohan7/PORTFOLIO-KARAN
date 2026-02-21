"use client"
import React from 'react'
import Image from "next/image";


const Imagecontainer = ({Mepicture, width, height}) => {
  return (
    <div>
        <Image
        src={Mepicture}
        alt="My Image"
        width={width}
        height={height}
        className="object-cover"
      />
    </div>
  )
}

export default Imagecontainer