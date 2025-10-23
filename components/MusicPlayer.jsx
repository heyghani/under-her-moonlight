"use client";

export default function MusicPlayer({ audioRef, toggle, playing }) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        loop
        preload="auto"
        playsInline
        src="/music/moonlight_remix.mp3"
      />
      <button
        onClick={toggle}
        className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm text-sm"
      >
        {playing ? "Pause" : "Play"}
      </button>
    </div>
  );
}
