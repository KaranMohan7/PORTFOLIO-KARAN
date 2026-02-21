import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react'
import * as THREE from "three";

const Cylinder = () => {
  
      let mainText = useTexture("./Pictures/imp2.png");
      let cylinder = useRef(null);
    
      useFrame((state, delta) => {
        cylinder.current.rotation.y += delta * 0.2;
      });

  return (
          <group rotation={[0, 1.4, 0.5]}>
            <mesh ref={cylinder}>
              <cylinderGeometry args={[1, 1, 1, 30, 30, true]} />
              <meshStandardMaterial
                map={mainText}
                transparent
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
  )
}

export default Cylinder