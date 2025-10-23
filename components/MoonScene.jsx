"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function HalfMoon() {
  const ref = useRef();
  const light = useRef();
  const mask = new THREE.SphereGeometry(1.61, 64, 64);
  const material = new THREE.MeshStandardMaterial({
    color: "#f7e7b3",
    emissive: "#f6d365",
    emissiveIntensity: 0.8,
    metalness: 0.1,
    roughness: 0.6,
  });

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y += 0.0015;
      ref.current.position.y = Math.sin(clock.elapsedTime * 0.3) * 0.15;
    }
    if (light.current) {
      light.current.intensity = 1.2 + Math.sin(clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group>
      <mesh
        ref={ref}
        geometry={mask}
        material={material}
        position={[0, 1.2, 0]}
        scale={[1.05, 1.05, 1.05]}
      />
      <pointLight
        ref={light}
        position={[2, 1.5, 2]}
        intensity={1.3}
        color="#f6d365"
      />
    </group>
  );
}

export default function MoonScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.8, 8], fov: 40 }}
      className="fixed inset-0 -z-10 w-full h-full pointer-events-none"
    >
      <color attach="background" args={["#0b1020"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={0.7} color="#ffdca8" />

      <HalfMoon />
      <Sparkles size={5} scale={8} count={60} speed={0.3} color="#f6d365" />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.25}
      />
    </Canvas>
  );
}
