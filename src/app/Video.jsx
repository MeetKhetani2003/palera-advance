"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function VideoSection() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // Scroll-based play/pause (MUST BE MUTED TO WORK)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;

        if (entry.isIntersecting) {
          // Play automatically, but it will be muted
          videoRef.current.play().catch(() => console.log("Autoplay blocked"));
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.6 },
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto">
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-xl group">
        <video
          ref={videoRef}
          src="/computerview.mp4"
          muted={isMuted} // Controlled by React state now
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Floating Unmute Button */}
        <button
          onClick={toggleMute}
          className="absolute bottom-6 right-6 z-10 flex items-center gap-2 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-full transition-all"
        >
          {isMuted ? (
            <>
              <VolumeX size={18} />
              <span className="text-sm font-medium">Tap for Sound</span>
            </>
          ) : (
            <>
              <Volume2 size={18} />
              <span className="text-sm font-medium">Sound On</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
