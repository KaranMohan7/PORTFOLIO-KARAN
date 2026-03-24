"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

function MetallicTorus({ scale, progress }) {
  const mesh = useRef();
  const base = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!mesh.current) return;

    base.current.y += 0.003;
    base.current.x += 0.002;

    const scrollY = progress.current * Math.PI * 2;
    const scrollX = progress.current * Math.PI * 0.4;

    mesh.current.rotation.y = base.current.y + scrollY;
    mesh.current.rotation.x = base.current.x + scrollX;
  });

  return (
    <mesh ref={mesh} scale={scale} position={[0, -2, 0]}>
      <torusGeometry args={[1, 0.4, 32, 100]} />
      <meshStandardMaterial
        color="#888"
        metalness={1}
        roughness={0.15}
        envMapIntensity={2}
      />
    </mesh>
  );
}

function MetallicCylinder({ position, scale, progress }) {
  const mesh = useRef();
  const base = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!mesh.current) return;

    base.current.y += 0.002;
    base.current.x += 0.001;

    const scrollY = progress.current * Math.PI * 1.4;
    const scrollX = progress.current * Math.PI * 0.3;

    mesh.current.rotation.y = base.current.y + scrollY;
    mesh.current.rotation.x = base.current.x + scrollX;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <cylinderGeometry args={[0.8, 0.8, 4, 64]} />
      <meshStandardMaterial
        color="#aaa"
        metalness={1.4}
        roughness={0.15}
        envMapIntensity={2}
      />
    </mesh>
  );
}

function MetallicCone({ position, scale, progress }) {
  const mesh = useRef();
  const base = useRef({ y: 0, z: 0, x: -Math.PI / 2 });

  useFrame(() => {
    if (!mesh.current) return;

    base.current.y += 0.0015;
    base.current.z += 0.001;

    const scrollY = progress.current * Math.PI;
    const scrollZ = progress.current * 0.5;

    mesh.current.rotation.y = base.current.y + scrollY;
    mesh.current.rotation.z = base.current.z + scrollZ;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <coneGeometry args={[1.2, 2.5, 64]} />
      <meshStandardMaterial
        color="#ccc"
        metalness={1}
        roughness={0.1}
        envMapIntensity={2}
      />
    </mesh>
  );
}

export default function Background() {
  const [screen, setScreen] = useState("desktop");
  const scrollProgress = useRef(0);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 640) setScreen("mobile");
      else if (w < 1024) setScreen("tablet");
      else setScreen("desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    gsap.to(scrollProgress, {
      current: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      },
    });
  }, []);

  const isMobile = screen === "mobile";
  const isTablet = screen === "tablet";

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{
          position: isMobile ? [0, 0, 9] : isTablet ? [0, 0, 10] : [0, 0, 8],
          fov: isMobile ? 65 : isTablet ? 50 : 45,
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, -3, -5]} intensity={0.6} />
        <Environment preset="city" />

        {/* CENTER */}
        <Float speed={0.4} floatIntensity={isMobile ? 0.3 : 0.2}>
          <MetallicTorus
            scale={isMobile ? 0.8 : isTablet ? 0.7 : 0.6}
            progress={scrollProgress}
          />
        </Float>

        {/* LEFT */}
        <Float speed={0.6} floatIntensity={isMobile ? 0.35 : 0.3}>
          <MetallicCylinder
            scale={isMobile ? 0.7 : 0.7}
            position={
              isMobile
                ? [-2.8, 3.2, -2] // ✅ visible + spaced
                : isTablet
                ? [-3.2, 2.7, -2]
                : [-7, 3, -2]
            }
            progress={scrollProgress}
          />
        </Float>

        {/* RIGHT */}
        <Float speed={0.5} floatIntensity={isMobile ? 0.3 : 0.25}>
          <MetallicCone
            scale={isMobile ? 0.8 : isTablet ? 0.75 : 0.8}
            position={
              isMobile
                ? [2.8, 2, -2] // ✅ visible + spaced
                : isTablet
                ? [3.2, 1.5, -2]
                : [7, 1.5, -2]
            }
            progress={scrollProgress}
          />
        </Float>
      </Canvas>
    </div>
  );
}