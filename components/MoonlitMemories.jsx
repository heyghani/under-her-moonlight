"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star, Heart, Moon, Cloud, Sparkles } from "lucide-react";

export default function MoonlitMemories() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const photos = [
    {
      id: 1,
      src: "/images/photo1.jpeg",
      delay: 0,
      caption: "Moon’s favorite human 🌙",
    },
    {
      id: 2,
      src: "/images/photo2.jpeg",
      delay: 0.2,
      caption: "Goddess energy wrapped in a laugh ✨",
    },
    {
      id: 3,
      src: "/images/photo3.jpeg",
      delay: 0.4,
      caption: "Caught being effortlessly magical 💫",
    },
    {
      id: 4,
      src: "/images/photo4.jpeg",
      delay: 0.6,
      caption: "Too glam to give a damn ✨",
    },
    {
      id: 5,
      src: "/images/photo5.jpeg",
      delay: 0.8,
      caption: "Her smile? Probably what constellations dream of ✨",
    },
  ];

  const icons = [Star, Heart, Moon, Cloud, Sparkles];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-24 sm:py-32"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none" />

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="text-center text-2xl sm:text-3xl font-serif text-yellow-200 mb-16 sm:mb-24"
      >
        Moonlit Memories ✨
      </motion.h2>

      {/* Side-by-side floating layout */}
      <motion.div
        style={{ y }}
        className="relative flex flex-wrap sm:flex-nowrap justify-center items-center gap-10 sm:gap-16 px-6 sm:px-12 max-w-6xl mx-auto"
      >
        {photos.map((photo, i) => {
          const Sticker1 = icons[i % icons.length];
          const Sticker2 = icons[(i + 2) % icons.length];

          return (
            <motion.div
              key={photo.id}
              className="relative bg-white rounded-sm p-2 sm:p-3 shadow-xl w-40 sm:w-56 flex-shrink-0 transform-gpu"
              initial={{ rotate: i % 2 === 0 ? -3 : 3, opacity: 0 }}
              whileInView={{ rotate: i % 2 === 0 ? -2 : 2, opacity: 1 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              transition={{
                duration: 1.2,
                delay: photo.delay,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            >
              {/* Photo */}
              <div className="relative overflow-hidden rounded-[2px]">
                <img
                  src={photo.src}
                  alt={`Memory ${photo.id}`}
                  className="w-full h-48 sm:h-64 object-cover rounded-[2px]"
                />
              </div>

              {/* Stickers pinned on frame corners */}
              <motion.div
                className="absolute -top-2 -left-2 text-yellow-300"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sticker1 className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]" />
              </motion.div>

              <motion.div
                className="absolute -bottom-3 -right-2 text-yellow-300"
                animate={{ rotate: [0, -6, 6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sticker2 className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
              </motion.div>

              {/* Caption */}
              <div className="mt-2 text-center text-gray-700 text-xs italic font-handwriting">
                {photo.caption}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Ambient Glow */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[60%] bg-[radial-gradient(circle,rgba(246,211,101,0.1),transparent_70%)] blur-3xl pointer-events-none" />
    </section>
  );
}
