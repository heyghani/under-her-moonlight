"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function MoonlitMemories() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Different parallax offsets for each image
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y5 = useTransform(scrollYProgress, [0, 1], [0, -40]);

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
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 sm:py-32"
    >
      {/* Subtle starry background layer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none" />

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="text-center text-2xl sm:text-3xl font-serif text-yellow-200 mb-8 sm:mb-12"
      >
        Moonlit Memories ✨
      </motion.h2>

      <div className="relative w-full max-w-md sm:max-w-3xl h-[500px] sm:h-[600px] mx-auto">
        {photos.map((photo, i) => (
          <motion.img
            key={photo.id}
            src={photo.src}
            alt={`Memory ${photo.id}`}
            style={{ y: photo.y }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.5,
              delay: photo.delay,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            className={`absolute rounded-2xl shadow-[0_0_25px_rgba(246,211,101,0.3)] border border-white/10 object-cover
              ${
                [
                  "top-0 left-[10%] w-36 sm:w-56",
                  "top-[20%] right-[5%] w-40 sm:w-60",
                  "top-[45%] left-[15%] w-32 sm:w-52",
                  "bottom-[10%] right-[20%] w-36 sm:w-56",
                  "bottom-0 left-[30%] w-40 sm:w-60",
                ][i]
              }`}
          />
        ))}
      </div>
    </section>
  );
}
