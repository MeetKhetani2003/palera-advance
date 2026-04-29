"use client";

import { useEffect, useRef, useState } from "react";

export default function TestimonialSection({ testimonialsData }) {
  const carouselRef = useRef(null);
  const autoScrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const hasInteracted = useRef(false);
  /* 🔁 Scroll to index */
  const scrollToIndex = (index) => {
    if (!carouselRef.current) return;

    const container = carouselRef.current;
    const card = container.children[index];

    if (!card) return;

    const left =
      card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2;

    container.scrollTo({
      left,
      behavior: "smooth",
    });
  };
  /* ▶ Auto scroll */
  const startAutoScroll = () => {
    clearInterval(autoScrollRef.current);

    autoScrollRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % testimonialsData.length;

        // ❌ skip first auto scroll (prevents page jump)
        if (hasInteracted.current) {
          scrollToIndex(next);
        }

        hasInteracted.current = true;

        return next;
      });
    }, 4000);
  };

  const stopAutoScroll = () => {
    clearInterval(autoScrollRef.current);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startAutoScroll();
    }, 1500); // 👈 delay prevents page jump

    return () => {
      clearTimeout(timer);
      clearInterval(autoScrollRef.current);
    };
  }, []);
  /* ⬅➡ Buttons */
  const handlePrev = () => {
    const next =
      (activeIndex - 1 + testimonialsData.length) % testimonialsData.length;
    setActiveIndex(next);
    scrollToIndex(next);
    startAutoScroll();
  };

  const handleNext = () => {
    hasInteracted.current = true;

    const next = (activeIndex + 1) % testimonialsData.length;
    setActiveIndex(next);
    scrollToIndex(next);
    startAutoScroll();
  };

  return (
    <section style={{ padding: "80px 24px", background: "#F9FAFB" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* HEADER */}
        <div style={{ maxWidth: 700 }}>
          <p
            style={{
              fontSize: 12,
              fontFamily: "JetBrains Mono",
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "var(--teal-600)",
            }}
          >
            TRUST
          </p>

          <h2
            style={{
              marginTop: 12,
              fontFamily: "Plus Jakarta Sans",
              fontWeight: 800,
              fontSize: "clamp(28px,4vw,44px)",
              color: "var(--navy-900)",
            }}
          >
            What 2,000+ doctors are saying.
          </h2>

          {/* NAV BUTTONS */}
          <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
            <button onClick={handlePrev} className="btn-ghost">
              ←
            </button>
            <button onClick={handleNext} className="btn-ghost">
              →
            </button>
          </div>
        </div>

        {/* SLIDER */}
        <div
          ref={carouselRef}
          //   onMouseEnter={stopAutoScroll}
          //   onMouseLeave={startAutoScroll}
          className="no-scrollbar"
          style={{
            marginTop: 48,
            display: "flex",
            gap: 20,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            paddingBottom: 10,
            overscrollBehavior: "contain",
          }}
        >
          {testimonialsData.map((t, i) => (
            <div
              key={i}
              style={{
                minWidth: 340,
                scrollSnapAlign: "center",
                background: "#fff",
                borderRadius: 20,
                padding: 24,
                border: "1px solid rgba(0,0,0,.05)",
              }}
            >
              {/* ⭐ Stars */}
              <div style={{ display: "flex", gap: 4, color: "#F4C04A" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              {/* 💬 Quote */}
              <p
                style={{
                  marginTop: 12,
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "#374151",
                }}
              >
                "{t.quote}"
              </p>

              {/* 👤 User */}
              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    height: 44,
                    width: 44,
                    borderRadius: "50%",
                    background: "#00C2A8",
                    color: "#06231E",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 700,
                  }}
                >
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                <div>
                  <div style={{ fontWeight: 600 }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: "#6B7280" }}>
                    {t.spec} · {t.city}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DOTS */}
        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {testimonialsData.map((_, i) => (
            <div
              key={i}
              onClick={() => {
                setActiveIndex(i);
                scrollToIndex(i);
              }}
              style={{
                height: 8,
                width: i === activeIndex ? 24 : 8,
                borderRadius: 999,
                background: i === activeIndex ? "var(--teal-500)" : "#D1D5DB",
                transition: "all 0.3s",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
