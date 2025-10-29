"use client";

import { motion } from "framer-motion";

const items = [
  {
    label: "Velvet Moon Cake 🍰",
    icon: "/icons/cake.png",
    desc: "Soft as starlight and sweet as her midnight laughter.",
  },
  {
    label: "Golden Spoon ✨",
    icon: "/icons/spoon.png",
    desc: "Everything she stirs turns a little more magical.",
  },
  {
    label: "Starry Palette 🎨",
    icon: "/icons/palette.png",
    desc: "Dreams poured in color — the art of her moonlit heart.",
  },
  {
    label: "Silver Whisk 🌙",
    icon: "/icons/whisk.png",
    desc: "Blending sugar and galaxies with quiet joy.",
  },
  {
    label: "Velvet Tea Cup 🍵",
    icon: "/icons/teacup.png",
    desc: "Elegant calm in every sip — she makes comfort fancy.",
  },
  {
    label: "Kind Heart 🌼",
    icon: "/icons/heart.png",
    desc: "A gentle gravity — pulling everyone toward her warmth.",
  },
];

export default function LunarPalette() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-24 sm:py-32">
      {/* Background shimmer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none" />

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center text-3xl sm:text-4xl font-serif text-yellow-200 mb-12 sm:mb-16"
      >
        Lunar Palette 🌕
      </motion.h2>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10 max-w-4xl mx-auto px-6 sm:px-0">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            viewport={{ once: true }}
            className="relative bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-5 sm:p-7 shadow-[0_0_15px_rgba(246,211,101,0.15)] hover:shadow-[0_0_25px_rgba(246,211,101,0.25)] transition-all duration-500"
          >
            {/* Floating animated icon */}
            <motion.img
              src={item.icon}
              alt={item.label}
              animate={{
                y: [0, -6, 0],
                rotate: [0, 1.5, -1.5, 0],
              }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 drop-shadow-[0_0_12px_rgba(246,211,101,0.25)]"
            />

            {/* Content */}
            <h3 className="text-center text-white/90 font-medium text-sm sm:text-base mb-2">
              {item.label}
            </h3>
            <p className="text-xs sm:text-sm text-white/70 text-center leading-relaxed">
              {item.desc}
            </p>

            {/* Subtle shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-200/5 via-transparent to-transparent rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-700" />
          </motion.div>
        ))}
      </div>

      {/* Bottom moon glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-[radial-gradient(circle_at_bottom,rgba(246,211,101,0.1),transparent_70%)] blur-3xl pointer-events-none" />
    </section>
  );
}
