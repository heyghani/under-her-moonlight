"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function MoonlitMemories() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const y5 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const photos = [
    { id: 1, src: "/images/photo1.jpeg", y: y1, delay: 0 },
    { id: 2, src: "/images/photo1.jpeg", y: y2, delay: 0.2 },
    { id: 3, src: "/images/photo1.jpeg", y: y3, delay: 0.4 },
    { id: 4, src: "/images/photo1.jpeg", y: y4, delay: 0.6 },
    { id: 5, src: "/images/photo1.jpeg", y: y5, delay: 0.8 },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[160vh] sm:min-h-[200vh] flex flex-col items-center justify-center overflow-hidden p-14 sm:p-20"
    >
      {/* Background stars */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_70%)] pointer-events-none" />

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="text-center text-2xl sm:text-3xl font-serif text-yellow-200 mb-16 sm:mb-24"
      >
        Moonlit Memories ✨
      </motion.h2>

      {/* Zigzag layout */}
      <div className="relative w-full max-w-lg sm:max-w-3xl mx-auto flex flex-col gap-7">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            className={`relative w-full flex ${
              i % 2 === 0 ? "justify-start" : "justify-end"
            }`}
            style={{ y: photo.y }}
          >
            <motion.img
              src={photo.src}
              alt={`Memory ${photo.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1.4,
                delay: photo.delay,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              className="w-40 sm:w-60 rounded-3xl shadow-[0_0_25px_rgba(246,211,101,0.3)] border border-white/10 object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Subtle glow behind all */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[60%] bg-[radial-gradient(circle,rgba(246,211,101,0.1),transparent_70%)] blur-3xl pointer-events-none" />
    </section>
  );
}
