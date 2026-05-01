"use client";

import React, { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";

export default function MobileCTA() {
  const [timeLeft, setTimeLeft] = useState("10:00");
  const [isVisible, setIsVisible] = useState(false);

  const professions = [
    "Dentists",
    "Dermatologists",
    "Gynecologists",
    "Physiotherapists",
    "Physicians",
    "Pathologists",
    "Pediatricians",
    "Orthopedics",
    "Cardiologists",
    "Ophthalmologists",
    "Ayurvedic Doctors",
    "ENT Specialists",
    "Neurologists",
    "Nutritionists",
    "Homeopaths",
    "Oncologists",
    "Nephrologists",
    "Radiologists",
    "Spine Surgeons",
  ];

  useEffect(() => {
    const KEY = "palera_offer_end";
    let end = parseInt(sessionStorage.getItem(KEY) || "0", 10);
    const now = Date.now();

    if (!end || end < now) {
      end = now + 10 * 60 * 1000;
      sessionStorage.setItem(KEY, end.toString());
    }

    const tick = () => {
      const ms = Math.max(0, end - Date.now());
      const m = Math.floor(ms / 60000);
      const s = Math.floor((ms % 60000) / 1000);

      setTimeLeft(
        `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`,
      );

      if (ms <= 0) clearInterval(timer);
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="mobcta"
      className={`fixed inset-x-0 bottom-0 z-40 md:w-1/2 md:left-[25%] transition-transform duration-500 ease-in-out ${
        isVisible ? "translate-y-0" : "translate-y-[120%]"
      }`}
    >
      <div
        className="relative shadow-2xl flex items-center gap-3"
        style={{
          padding: "20px 16px calc(12px + env(safe-area-inset-bottom)) 16px",
          background: "rgba(10, 22, 40, 0.98)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "16px 16px 0 0",
        }}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-4 flex items-center gap-1 bg-gold-400 text-navy-900 font-bold uppercase tracking-wider whitespace-nowrap"
          style={{
            padding: "4px 12px",
            fontSize: "10px",
            borderRadius: "4px",
            backgroundColor: "#D4AF37",
            color: "#0A1628",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          <span>Best Offer For</span>
          <Typewriter
            options={{
              strings: professions,
              autoStart: true,
              loop: true,
              delay: 75,
              deleteSpeed: 50,
              wrapperClassName: "typewriter-text",
            }}
          />
        </div>

        <div className="flex-1 leading-tight">
          <div
            className="font-display font-bold text-white"
            style={{ fontSize: 14 }}
          >
            ₹799 trial · 30 creatives + 3 reels
          </div>
          <div
            className="font-mono text-white/60"
            style={{ fontSize: 11, marginTop: 2 }}
          >
            Expires in{" "}
            <span className="font-semibold" style={{ color: "#D4AF37" }}>
              {timeLeft}
            </span>
          </div>
        </div>
        <a
          href="#trial"
          className="group relative inline-flex overflow-hidden transition-all hover:scale-[1.02] active:scale-95"
          style={{
            textDecoration: "none",
            padding: "1px", // Border thickness
            borderRadius: "9999px",
            backgroundColor: "#1e293b", // slate-800 base
          }}
        >
          {/* 1. The Sweeping Gold Light */}
          <span
            className="absolute animate-spin opacity-40 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              inset: "-100%",
              animationDuration: "3s",
              animationTimingFunction: "linear",
              background:
                "conic-gradient(from 0deg at 50% 50%, rgba(212,175,55,1) 0deg, transparent 60deg, transparent 300deg, rgba(212,175,55,1) 360deg)",
            }}
          />

          {/* 2. The Inner Content Wrapper */}
          <span
            className="relative flex items-center justify-center font-bold tracking-wide"
            style={{
              width: "100%",
              height: "100%",
              gap: "10px",
              borderRadius: "9999px",
              backgroundColor: "#0A1628", // Inner dark blue
              padding: "14px 32px",
              fontSize: "15px",
            }}
          >
            {/* 3. The Bottom Inner Gold Glow */}
            <span
              className="absolute opacity-50 transition-all duration-500 group-hover:h-[66%] group-hover:opacity-100"
              style={{
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                height: "33%",
                width: "80%",
                borderRadius: "9999px",
                backgroundColor: "#D4AF37", // Gold with 30% opacity
                filter: "blur(12px)",
              }}
            />

            {/* 4. Button Text */}
            <span
              className="relative z-10"
              style={{
                backgroundImage: "linear-gradient(to bottom, #e8cf7a, #D4AF37)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent", // Fallback
              }}
            >
              Start trial
            </span>

            {/* 5. Button Icon */}
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-[2px]"
              style={{ color: "#D4AF37" }}
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </span>
        </a>
      </div>
    </div>
  );
}
