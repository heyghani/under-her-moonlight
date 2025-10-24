"use client";
import dynamic from "next/dynamic";
import Hero from "../components/Hero";
import MusicPlayer from "../components/MusicPlayer";
import MoonlitMemories from "../components/MoonlitMemories";
import SparklesBackground from "../components/SparklesBackground";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const MoonScene = dynamic(() => import("../components/MoonScene"), {
  ssr: false,
});

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const messageRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { amount: 0.4 });
  const [playing, setPlaying] = useState(false);

  const [showMoon, setShowMoon] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setShowMoon(isHeroInView);
  }, [isHeroInView]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => setPlaying(false);
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  const toggle = async () => {
    if (!audioRef.current) return;
    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        await audioRef.current.play();
        setPlaying(true);
      }
    } catch (e) {}
  };

  const scrollToMessage = (offset = 24) => {
    if (!messageRef.current) return;
    // compute absolute top and apply offset so the section sits nicely below any fixed elements
    const top =
      messageRef.current.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen w-full relative overflow-hidden">
      <MusicPlayer audioRef={audioRef} toggle={toggle} playing={playing} />
      <div className="fixed inset-0 -z-10">
        <MoonScene />
      </div>

      <div className="relative z-10">
        <Hero name="HEROINEE" audioRef={audioRef} onExplore={scrollToMessage} />

        <section
          ref={messageRef}
          className="max-w-md sm:max-w-2xl mx-auto mt-24 px-5 sm:px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="bg-linear-to-b from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-[0_0_40px_rgba(246,211,101,0.15)] border border-white/10"
          >
            <h3 className="text-2xl sm:text-3xl font-serif mb-4 text-gold text-center">
              Under Her Moonlight
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-center text-white/90 whitespace-pre-line">
              {`Every moon has its light, and you are mine.\n
Tonight, the stars hum softly — they know your name.\n
You shine in quiet ways that only hearts can feel.\n
So here’s to you, HEROINEE — the girl who turns dreams into gold\nand makes the night a little softer.`}
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-6 text-center"
            >
              <span className="inline-block w-16 h-[2px] bg-linear-to-r from-transparent via-gold to-transparent rounded-full"></span>
            </motion.div>
          </motion.div>
        </section>
      </div>
      <MoonlitMemories />
    </main>
  );
}
