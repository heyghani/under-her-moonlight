"use client";
import dynamic from "next/dynamic";
import Hero from "../components/Hero";
import MusicPlayer from "../components/MusicPlayer";
import About from "../components/About";
import MoonlitMemories from "../components/MoonlitMemories";
import LunarPalette from "../components/LunarPalette";
import MidnightRecipes from "../components/MidnightRecipes";
import ConstellationOfTraits from "../components/ConstellationOfTraits";
import TinyLettersFromTheMoon from "../components/TinyLettersFromTheMoon";
import MoonlightSecretTap from "../components/MoonlightSecretTap";
import { useInView } from "framer-motion";
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
    setPlaying(true);
  };

  return (
    <main className="min-h-screen w-full relative overflow-hidden">
      <MusicPlayer audioRef={audioRef} toggle={toggle} playing={playing} />
      <div className="fixed inset-0 -z-10">
        <MoonScene />
      </div>

      <div className="relative z-10">
        <Hero name="HEROINEE" audioRef={audioRef} onExplore={scrollToMessage} />

        <About messageRef={messageRef} />
      </div>
      <MoonlitMemories />
      <LunarPalette />
      <MidnightRecipes />
      <ConstellationOfTraits />
      <TinyLettersFromTheMoon />
      <MoonlightSecretTap />
    </main>
  );
}
