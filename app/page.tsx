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
          className="flex items-center justify-center px-5 sm:px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="w-full max-w-md sm:max-w-2xl bg-linear-to-b from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-[0_0_40px_rgba(246,211,101,0.15)] border border-white/10"
          >
            <h3 className="text-2xl sm:text-3xl font-serif mb-4 text-gold text-center">
              Under Her Moonlight
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-center text-white/90 whitespace-pre-line">
              {`The moon must smile every night knowing someone like you exists.\n
You move through life with the gentleness of starlight — kind, warm, and quietly dazzling.\n
In your world, sugar turns into stories, and every dessert feels like a wish wrapped in cream.\n
You paint dreams the way you whisk butter — with patience, joy, and a sprinkle of wonder.\n
There’s something so effortlessly magical about you, HEROINEE —\nthe woman who turns moonlight into art, kindness into flavor, and every moment into something golden.`}
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
