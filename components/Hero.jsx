"use client";
import { motion } from "framer-motion";

export default function Hero({ name = "HEROINEE", audioRef, onExplore }) {
  const handleExplore = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        console.log("Playback prevented until user interacts again.");
      });
    }
  };
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-visible">
      <div className="absolute inset-0 bg-linear-to-b from-[#030417] via-[#0b1020]" />

      {/* <div className="absolute bottom-[-10%] w-[160%] h-[80%] rounded-[50%] bg-linear-to-t from-[#f6d365]/80 to-transparent blur-3xl opacity-60" /> */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative px-5 max-w-sm sm:max-w-md"
      >
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-3xl sm:text-5xl font-serif tracking-wide text-white/95 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
        >
          Happy Birthday
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-2xl sm:text-4xl mt-3 font-extrabold bg-linear-to-r from-[#f6d365] via-[#f9e2ae] to-[#f6d365] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(246,211,101,0.3)]"
        >
          {name}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-5 text-base sm:text-lg leading-relaxed text-white/90 drop-shadow-[0_0_6px_rgba(0,0,0,0.4)]"
        >
          To the girl who loves the moon and all its magic — step into this
          little world made just for you.
        </motion.p>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            animate={{
              boxShadow: [
                "0 0 10px rgba(246,211,101,0.4)",
                "0 0 20px rgba(246,211,101,0.8)",
                "0 0 10px rgba(246,211,101,0.4)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="relative inline-flex items-center gap-2 px-6 py-2 rounded-full bg-linear-to-r from-yellow-300 via-pink-300 to-pink-500 text-black font-semibold shadow-md"
            onClick={() => {
              onExplore?.();
              handleExplore();
            }}
          >
            Explore
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
