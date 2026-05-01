"use client";

import { useState, useEffect, useRef } from "react";
import { Play, X } from "lucide-react";

export default function VideoSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalVideoRef = useRef(null);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  // Force play when the modal opens
  useEffect(() => {
    if (isModalOpen && modalVideoRef.current) {
      // Explicitly trigger play.
      // This works reliably because opening the modal was triggered by a user click.
      modalVideoRef.current.play().catch((error) => {
        console.error("Browser blocked autoplay:", error);
      });
    }
  }, [isModalOpen]);

  return (
    <>
      {/* --- THUMBNAIL / TRIGGER SECTION --- */}
      <div className="relative max-w-5xl mx-auto">
        <div
          className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-xl group cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          {/* Silent Preview Video (Acts as a thumbnail) */}
          <video
            // Hack: #t=0.001 forces iOS/Safari and Chrome to load the first frame
            src="/computerview.mp4#t=0.001"
            // Best Practice: Add a static image path here to show instantly
            poster="/your-thumbnail-image.jpg"
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />

          {/* Centered Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="pointer-events-none flex items-center justify-center w-20 h-20 bg-white/20 group-hover:bg-white/30 backdrop-blur-md border border-white/30 text-white rounded-full transition-all duration-300 shadow-2xl group-hover:scale-110">
              <Play size={32} fill="currentColor" className="ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* --- VIDEO MODAL --- */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8"
          onClick={() => setIsModalOpen(false)} // Close when clicking the backdrop
        >
          {/* Modal Container */}
          <div
            className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Prevent clicks on the video from closing the modal
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/80 text-white/80 hover:text-white rounded-full backdrop-blur-md transition-all"
            >
              <X size={24} />
            </button>

            {/* Active Video Player */}
            <video
              ref={modalVideoRef} // Attach the ref here
              src="/computerview.mp4"
              controls
              autoPlay
              className="w-full h-full object-contain outline-none"
            />
          </div>
        </div>
      )}
    </>
  );
}
