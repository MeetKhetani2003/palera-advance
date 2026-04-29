"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

export default function VideoSection() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userPlayed, setUserPlayed] = useState(false);

  // 👇 Scroll-based play/pause
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;

        if (entry.isIntersecting) {
          if (!userPlayed) {
            videoRef.current.play().catch(() => {});
            setIsPlaying(true);
          }
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 },
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [userPlayed]);

  const handlePlay = async () => {
    if (!videoRef.current) return;

    try {
      await videoRef.current.play();
      setIsPlaying(true);
      setUserPlayed(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto">
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-xl">
        {/* 🎥 VIDEO */}
        <video
          ref={videoRef}
          src="/computerview.mp4" // 👈 replace this
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 🎨 Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/30 to-transparent pointer-events-none" />

        {/* ▶ Play button */}
        {!isPlaying && (
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl hover:scale-105 transition">
              <Play className="text-black ml-1" />
            </div>
          </button>
        )}

        {/* 📄 Bottom info */}
        <div className="absolute bottom-0 w-full flex justify-between px-5 py-3 text-white text-xs opacity-80">
          <span>Palera_Design / showreel.mp4</span>
          <span>HD · 1080p</span>
        </div>
      </div>
    </div>
  );
}
