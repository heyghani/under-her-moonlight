"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";

export default function MoonlightSecretTap() {
  const [tapCount, setTapCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  // Reset tap count if not completed in 2 seconds
  useEffect(() => {
    if (tapCount === 0) return;
    const timer = setTimeout(() => setTapCount(0), 2000);
    return () => clearTimeout(timer);
  }, [tapCount]);

  const handleTap = () => {
    if (tapCount + 1 === 3) {
      setShowSecret(true);
      setTapCount(0);
    } else {
      setTapCount(tapCount + 1);
    }
  };

  const closeSecret = () => setShowSecret(false);

  return (
    <>
      {/* Floating Moon */}
      <motion.div
        onClick={handleTap}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: [0, -10, 0],
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
        className="fixed bottom-10 left-8 sm:bottom-14 sm:right-14 z-40 cursor-pointer select-none"
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            filter: [
              "drop-shadow(0 0 6px rgba(246,211,101,0.6))",
              "drop-shadow(0 0 12px rgba(246,211,101,0.8))",
              "drop-shadow(0 0 6px rgba(246,211,101,0.6))",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-yellow-300 text-4xl sm:text-5xl"
        >
          <FaMoon />
        </motion.div>
      </motion.div>

      {/* Golden Dust when revealed */}
      <AnimatePresence>
        {showSecret && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              onClick={closeSecret}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-md rounded-t-3xl 
                bg-gradient-to-t from-black/70 via-black/40 to-transparent
                border-t border-yellow-300/30 backdrop-blur-md text-center text-white/90 p-8"
            >
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-serif text-yellow-200 mb-4"
              >
                🌙 You found the Moon’s Secret Recipe!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-sm sm:text-base leading-relaxed"
              >
                You found the Moon’s Secret Recipe — a blend of courage,
                kindness, and glow. Keep it safe, it shines only for the ones
                who notice.
              </motion.p>

              {/* Close Button */}
              <motion.button
                onClick={closeSecret}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 px-4 py-2 text-xs text-yellow-200 border border-yellow-200/40 rounded-full hover:bg-yellow-200/10 transition-all"
              >
                Close 🌕
              </motion.button>

              {/* Golden dust floating inside */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{
                      opacity: 0,
                      scale: 0.3,
                      x: 0,
                      y: 0,
                    }}
                    animate={{
                      opacity: [0.8, 0],
                      scale: [1, 0.6],
                      x: (Math.random() - 0.5) * 150,
                      y: -Math.random() * 200 - 50,
                    }}
                    transition={{
                      duration: 3 + Math.random() * 1,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: Math.random() * 2,
                    }}
                    className="absolute left-1/2 bottom-4 w-[3px] h-[3px] bg-yellow-300 rounded-full shadow-[0_0_6px_rgba(246,211,101,0.8)]"
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
