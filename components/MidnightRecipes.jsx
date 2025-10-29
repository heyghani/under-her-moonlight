"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { Sparkles, Heart, Moon, Star } from "lucide-react";

export default function MidnightRecipes() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const recipes = [
    {
      id: 1,
      title: "Lunar Cheesecake of Kindness",
      lines: [
        "1 full moon of gentle care,",
        "2 spoons of stardust smiles,",
        "and a crust made of pure warmth.",
      ],
      icon: <Heart className="text-pink-300" />,
      y: y1,
      delay: 0,
    },
    {
      id: 2,
      title: "Celestial Cupcake of Creativity",
      lines: [
        "Whipped with a swirl of artful dreams,",
        "a drizzle of golden giggles,",
        "and topped with tiny nebula sprinkles.",
      ],
      icon: <Sparkles className="text-yellow-200" />,
      y: y2,
      delay: 0.2,
    },
    {
      id: 3,
      title: "Moonlit Tart of Grace",
      lines: [
        "Baked under soft lunar glow,",
        "filled with kindness crème,",
        "and dusted with serene confidence.",
      ],
      icon: <Moon className="text-indigo-200" />,
      y: y3,
      delay: 0.4,
    },
    {
      id: 4,
      title: "Starlit Soufflé of Adorableness",
      lines: [
        "A dash of charm, a cup of laughter,",
        "rises softly in moonlight,",
        "and melts hearts without trying.",
      ],
      icon: <Star className="text-amber-200" />,
      y: y4,
      delay: 0.6,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[150vh] flex flex-col items-center justify-center overflow-hidden py-28 px-8 sm:px-16 "
    >
      {/* Subtle star background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none" />

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="text-center text-2xl sm:text-3xl font-serif text-yellow-100 mb-16 sm:mb-24"
      >
        Midnight Recipes — <span className="italic">A Taste of Her Glow</span>{" "}
        🍰
      </motion.h2>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 z-10">
        {recipes.map((recipe) => (
          <motion.div
            key={recipe.id}
            style={{ y: recipe.y }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: recipe.delay,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 25px rgba(255,255,255,0.2)",
            }}
            className="relative bg-linear-to-br from-[#0b0b1a]/60 via-[#1a1440]/40 to-[#0b0b1a]/20 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-8 text-white/90 max-w-sm sm:max-w-md mx-auto"
          >
            {/* Floating icon */}
            <motion.div
              animate={{
                y: [0, -6, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-5 -right-5 bg-white/10 p-3 rounded-full shadow-inner"
            >
              {recipe.icon}
            </motion.div>

            <h3 className="text-lg sm:text-xl font-semibold text-yellow-100 mb-4 font-serif">
              {recipe.title}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {recipe.lines.join("\n")}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Ambient moonlight glow */}
      <div className="absolute top-1/2 left-1/2 w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_70%)] blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    </section>
  );
}
