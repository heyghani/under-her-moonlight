"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";

export default function TinyLettersFromTheMoon() {
  const [opened, setOpened] = useState(false);
  const [showDust, setShowDust] = useState(false);
  const [showSeal, setShowSeal] = useState(false);

  const letterLines = [
    "Dear Heroinee,",
    "",
    "The moon has watched you quietly —",
    "the way your kindness stirs the air,",
    "the way you turn sugar into sunlight,",
    "and dreams into dessert.",
    "",
    "You walk through nights with laughter,",
    "soft as stardust, bright as gold.",
    "Even the stars pause to listen.",
    "",
    "Stay glowing, little lunar chef.",
    "The world tastes sweeter because of you.",
    "",
    "— From the Moon, with Light 🌙",
  ];

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setShowDust(true);
    setTimeout(() => setShowDust(false), 2800);
    setTimeout(() => setShowSeal(true), 1800);
  };

  const handleReplay = () => {
    setOpened(false);
    setShowSeal(false);
    setTimeout(() => handleOpen(), 500);
  };

  return (
    <section className="relative w-full min-h-[100vh] flex flex-col items-center justify-center overflow-hidden py-20 sm:py-32">
      {/* Soft cosmic background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(246,211,101,0.06),transparent_80%)] pointer-events-none" />

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-serif text-yellow-200 text-center mb-12"
      >
        Tiny Letters from the Moon 💌
      </motion.h2>

      {/* Envelope */}
      <AnimatePresence>
        {!opened && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: [0, -8, 0],
              scale: 1,
              transition: {
                opacity: { duration: 1.2, ease: "easeInOut" },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              },
            }}
            exit={{
              opacity: 0,
              y: -40,
              scale: 0.95,
              transition: { duration: 1.2, ease: "easeInOut" },
            }}
            className="relative z-30 text-[7rem] sm:text-[8rem] text-yellow-300 cursor-pointer drop-shadow-[0_0_15px_rgba(246,211,101,0.7)] select-none"
            onClick={handleOpen}
          >
            <FaEnvelope />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Golden dust */}
      <AnimatePresence>
        {showDust && (
          <motion.div
            key="dust"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none overflow-hidden z-20"
          >
            {[...Array(25)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.3, x: 0, y: 0 }}
                animate={{
                  opacity: [0.8, 0],
                  scale: [1, 0.6],
                  x: (Math.random() - 0.5) * 200,
                  y: -Math.random() * 300 - 50,
                }}
                transition={{
                  duration: 2.5 + Math.random() * 0.5,
                  ease: "easeOut",
                }}
                className="absolute left-1/2 bottom-[40%] w-[4px] h-[4px] bg-yellow-300 rounded-full shadow-[0_0_8px_rgba(246,211,101,0.8)]"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Letter Reveal */}
      <AnimatePresence>
        {opened && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="relative z-10 mt-6 w-[90%] sm:w-[600px] bg-white/10 border border-yellow-200/20 backdrop-blur-md 
              rounded-3xl shadow-[0_0_40px_rgba(246,211,101,0.15)] p-8 sm:p-10 text-white/90 font-light overflow-hidden"
          >
            <div className="space-y-3 text-center font-serif">
              {letterLines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.5 + i * 0.2,
                    duration: 0.7,
                    ease: "easeInOut",
                  }}
                  className="text-base sm:text-lg leading-relaxed"
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* Moon Seal */}
            <AnimatePresence>
              {showSeal && (
                <motion.div
                  key="seal"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: 1,
                    scale: [1, 1.05, 1],
                    transition: {
                      opacity: { duration: 1.4, ease: "easeInOut" },
                      scale: {
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                      },
                    },
                  }}
                  exit={{ opacity: 0 }}
                  onClick={handleReplay}
                  className="absolute top-4 right-4 z-40 flex items-center justify-center cursor-pointer"
                >
                  <div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400/80 to-yellow-200/40 
                    backdrop-blur-sm shadow-[0_0_20px_rgba(246,211,101,0.4)] border border-yellow-200/40 flex items-center justify-center"
                  >
                    <span className="text-white/90 text-lg font-serif">🌙</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient background glow */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[60%] bg-[radial-gradient(circle,rgba(246,211,101,0.12),transparent_70%)] blur-3xl pointer-events-none" />
    </section>
  );
}
