"use client";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

export default function SparklesBackground({
  count = 140,
  size = 3,
  scale = 24,
  color = "#f6d365",
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      className="absolute inset-0 z-0 w-full h-full pointer-events-none"
    >
      <Sparkles
        size={size}
        scale={scale}
        count={count}
        speed={0.5}
        color={color}
      />
    </Canvas>
  );
}
