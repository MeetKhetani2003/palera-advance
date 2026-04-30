"use client";

import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

export default function VideoSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = (e) => {
    e?.stopPropagation(); // Prevent duplicate clicks from the container

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        // Automatically unmute before playing
        videoRef.current.muted = false;
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative max-w-5xl mx-auto">
      {/* "group" class here allows the button to reappear on hover */}
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-xl group">
        {/* Clickable Video */}
        <video
          ref={videoRef}
          src="/computerview.mp4"
          loop
          playsInline
          onClick={togglePlay}
          className="absolute inset-0 w-full h-full object-cover cursor-pointer"
        />

        {/* Centered, Frosted-Glass Play/Pause Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <button
            onClick={togglePlay}
            className={`pointer-events-auto flex items-center justify-center w-20 h-20 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white rounded-full transition-all duration-300 shadow-2xl
              ${isPlaying ? "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100" : "opacity-100 scale-100"}
            `}
          >
            {isPlaying ? (
              <Pause size={32} fill="currentColor" />
            ) : (
              // ml-1 optically centers the play triangle inside the circle
              <Play size={32} fill="currentColor" className="ml-1" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
