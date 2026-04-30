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
      // REMOVED px-4 and pb-6 here so it docks to the edges perfectly
      className={`fixed inset-x-0 bottom-0 z-40 md:hidden transition-transform duration-500 ease-in-out ${
        isVisible ? "translate-y-0" : "translate-y-[120%]"
      }`}
    >
      <div
        className="relative shadow-2xl flex items-center gap-3"
        style={{
          // ADDED env(safe-area-inset-bottom) to handle iOS home bar padding gracefully
          padding: "20px 16px calc(12px + env(safe-area-inset-bottom)) 16px",
          background: "rgba(10, 22, 40, 0.98)",
          backdropFilter: "blur(12px)",
          // Changed to borderTop only for a cleaner full-width look
          borderTop: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "16px 16px 0 0",
        }}
      >
        {/* --- TYPEWRITER STRIP --- */}
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
          className="btn-primary flex-shrink-0 flex items-center gap-2"
          style={{
            padding: "10px 14px",
            fontSize: 13,
            textDecoration: "none",
            backgroundColor: "#D4AF37",
            color: "#0A1628",
            borderRadius: "6px",
            fontWeight: "bold",
          }}
        >
          Start trial
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
