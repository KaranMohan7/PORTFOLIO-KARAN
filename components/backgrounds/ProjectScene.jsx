"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, ToneMapping } from "@react-three/postprocessing";
import Cylinder from "./Cylinder";

const ProjectScene = () => {


  return (
    <Canvas flat camera={{ fov: 25 }}>
    {/*   <OrbitControls /> */}
      <ambientLight />
      <Cylinder /> 
      <EffectComposer>
        <Bloom
         mipmapBlur
          intensity={1.21} // The bloom intensity.
          luminanceThreshold={0} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0} // smoothness of the luminance threshold. Range is [0, 1]
        />
       {/*  <ToneMapping adaptive /> */}
      </EffectComposer>
    </Canvas>
  );
};

export default ProjectScene;
