"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const traits = [
  "Kindness",
  "Creativity",
  "Playfulness",
  "Ambition",
  "Elegance",
  "Curiosity",
  "Warmth",
  "Fancy",
];

export default function ConstellationOfTraits() {
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrameId;

    const stars = traits.map((label, i) => ({
      label,
      x: width / 2 + Math.cos((i * Math.PI * 2) / traits.length) * 180,
      y: height / 2 + Math.sin((i * Math.PI * 2) / traits.length) * 120,
      radius: 4,
      angle: Math.random() * Math.PI * 2,
      speed: 0.003 + Math.random() * 0.002,
    }));

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#f6d365");
    gradient.addColorStop(1, "#fda085");

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw trails
      ctx.beginPath();
      ctx.strokeStyle = "rgba(246,211,101,0.4)";
      ctx.lineWidth = 1.2;
      for (let i = 0; i < stars.length; i++) {
        const s1 = stars[i];
        for (let j = i + 1; j < stars.length; j++) {
          const s2 = stars[j];
          const dist = Math.hypot(s1.x - s2.x, s1.y - s2.y);
          if (dist < 200) {
            ctx.globalAlpha = 1 - dist / 200;
            ctx.beginPath();
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // Draw stars
      stars.forEach((s) => {
        s.angle += s.speed;
        s.x += Math.cos(s.angle) * 0.3;
        s.y += Math.sin(s.angle) * 0.3;

        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 12);
        glow.addColorStop(0, "#fff6e0");
        glow.addColorStop(1, "rgba(246,211,101,0)");

        ctx.beginPath();
        ctx.fillStyle = glow;
        ctx.arc(s.x, s.y, s.radius * 2, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.font = "14px 'Quicksand', sans-serif";
        ctx.fillStyle = "#fff6e0";
        ctx.fillText(s.label, s.x + 10, s.y + 4);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.section
      style={{ y: translateY }}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="z-10 text-center">
        <h2 className="text-2xl sm:text-3xl font-serif text-yellow-200 mb-6">
          Constellation of Traits ✨
        </h2>
        <p className="text-white/80 max-w-md mx-auto text-sm sm:text-base">
          Each star whispers a little truth about her — glowing softly,
          connected by invisible threads of grace, curiosity, and golden light.
        </p>
      </div>
    </motion.section>
  );
}
