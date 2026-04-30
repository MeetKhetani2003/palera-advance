"use client";

import React, { useState, useEffect } from "react";

export default function TrialOffer() {
  const [timeLeft, setTimeLeft] = useState("10:00");

  useEffect(() => {
    const KEY = "palera_offer_end";
    let end = parseInt(sessionStorage.getItem(KEY) || "0", 10);
    const now = Date.now();

    // Set 10-minute countdown if it doesn't exist or has passed
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

  return (
    <section
      id="trial"
      style={{
        padding: "64px 12px",
        background: "var(--mint)",
        position: "relative",
        overflow: "hidden",
        scrollMarginTop: 96,
      }}
    >
      {/* Background blurs */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -160,
          right: -160,
          height: 420,
          width: 420,
          borderRadius: "50%",
          background: "rgba(0,194,168,.1)", // teal-500/10
          filter: "blur(48px)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: -160,
          left: -160,
          height: 420,
          width: 420,
          borderRadius: "50%",
          background: "rgba(240,180,41,.1)", // gold-500/10
          filter: "blur(48px)",
        }}
      />

      <div
        style={{
          maxWidth: 1024,
          margin: "0 auto",
          padding: "0 8px",
          position: "relative",
        }}
      >
        <div
          className="reveal"
          style={{ textAlign: "left", maxWidth: 768, margin: "0 auto" }}
        >
          <p
            style={{
              fontSize: 12,
              fontFamily: "JetBrains Mono, monospace",
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "var(--teal-600)",
            }}
          >
            The trial offer
          </p>
          <h2
            className="font-display"
            style={{
              marginTop: 12,
              fontWeight: 800,
              fontSize: "clamp(32px, 4vw, 44px)",
              lineHeight: 1.08,
              color: "var(--navy-900)",
            }}
          >
            Try Palera Design risk-free — just{" "}
            <span style={{ color: "var(--teal-600)" }}>₹799</span>.
          </h2>
          <p
            style={{
              marginTop: 16,
              fontSize: "clamp(16px, 2vw, 17px)",
              color: "rgba(31, 42, 68, 0.75)",
            }}
          >
            Don't take our word for it. Experience the quality yourself with our
            30-day Trial Pack.
          </p>
        </div>

        <div className="reveal" style={{ marginTop: 24 }}>
          <div
            className="shadow-lift"
            style={{
              position: "relative",
              borderRadius: 24,
              background: "var(--navy-900)",
              color: "#fff",
              padding: 1,
            }}
          >
            {/* Subtle inner border container */}
            <div
              style={{
                borderRadius: 22,
                background: "var(--navy-900)",
                border: "1px solid rgba(255,255,255,.1)",
                overflow: "hidden",
              }}
            >
              {/* Using the global CSS .trial-box grid you defined */}
              <div className="trial-box">
                {/* Left Side */}
                <div style={{ padding: "48px 20px" }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        borderRadius: 999,
                        background: "rgba(240,180,41,.15)", // gold-500/15
                        color: "var(--gold-400)",
                        padding: "4px 10px",
                        fontSize: 11,
                        fontFamily: "JetBrains Mono, monospace",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                      }}
                    >
                      <span
                        className="pulse-dot"
                        style={{
                          height: 6,
                          width: 6,
                          borderRadius: "50%",
                          background: "var(--gold-400)",
                          display: "block",
                        }}
                      />{" "}
                      Launch offer · 60% OFF
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        fontFamily: "JetBrains Mono, monospace",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: "rgba(255,255,255,.5)",
                      }}
                    >
                      Trial pack
                    </span>
                  </div>

                  <h3
                    className="font-display"
                    style={{
                      marginTop: 20,
                      fontWeight: 800,
                      fontSize: "clamp(28px, 4vw, 34px)",
                      lineHeight: 1.2,
                    }}
                  >
                    Palera Design <br /> 30-day Trial Pack
                  </h3>

                  <div
                    style={{
                      marginTop: 24,
                      display: "flex",
                      alignItems: "flex-end",
                      gap: 12,
                    }}
                  >
                    <div
                      className="font-display"
                      style={{
                        fontWeight: 800,
                        fontSize: "clamp(64px, 6vw, 76px)",
                        lineHeight: 1,
                        letterSpacing: "-0.04em",
                        color: "var(--teal-400)",
                      }}
                    >
                      ₹799
                    </div>
                    <div style={{ paddingBottom: 12 }}>
                      <div
                        style={{ fontSize: 14, color: "rgba(255,255,255,.7)" }}
                      >
                        <span style={{ textDecoration: "line-through" }}>
                          ₹1,999
                        </span>{" "}
                        &nbsp;·&nbsp;{" "}
                        <span
                          style={{ color: "var(--gold-400)", fontWeight: 600 }}
                        >
                          60% OFF
                        </span>
                      </div>
                      <div
                        style={{
                          marginTop: 4,
                          fontSize: 12,
                          color: "rgba(255,255,255,.5)",
                          fontFamily: "JetBrains Mono, monospace",
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                        }}
                      >
                        / month
                      </div>
                    </div>
                  </div>

                  <ul
                    style={{
                      marginTop: 32,
                      display: "flex",
                      flexDirection: "column",
                      gap: 14,
                    }}
                  >
                    {[
                      <>
                        <strong style={{ color: "#fff" }}>
                          30 professional image creatives
                        </strong>{" "}
                        — custom-designed for your clinic
                      </>,
                      <>
                        <strong style={{ color: "#fff" }}>
                          3 high-performance reels
                        </strong>{" "}
                        — built for reach and engagement
                      </>,
                      <>
                        <strong style={{ color: "#fff" }}>
                          Full customization
                        </strong>{" "}
                        — your logo, branding, colors, contact details
                      </>,
                      "Festival & awareness posts included",
                      "Dedicated support team",
                      <>
                        <strong style={{ color: "#fff" }}>
                          7-day money-back guarantee
                        </strong>{" "}
                        — not happy? Full refund. No questions asked.
                      </>,
                    ].map((item, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 12,
                          color: "rgba(255,255,255,.8)",
                        }}
                      >
                        <span
                          style={{
                            marginTop: 2,
                            height: 24,
                            width: 24,
                            borderRadius: "50%",
                            background: "rgba(0,194,168,.2)", // teal-500/20
                            color: "var(--teal-400)",
                            display: "grid",
                            placeItems: "center",
                            flexShrink: 0,
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12l4 4L19 7" />
                          </svg>
                        </span>
                        <span style={{ fontSize: 15 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Side (CTA panel) */}
                <div
                  style={{
                    background: "linear-gradient(180deg,#00C2A8,#00A892)", // teal-500 to teal-600
                    color: "var(--navy-900)",
                    padding: "48px 32px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: "rgba(10, 22, 40, 0.6)", // navy-900/60
                      }}
                    >
                      Offer expires in
                    </div>
                    <div
                      className="font-display"
                      style={{
                        marginTop: 8,
                        fontWeight: 800,
                        fontSize: "clamp(44px, 4vw, 52px)",
                        lineHeight: 1,
                        fontVariantNumeric: "tabular-nums",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {timeLeft}
                    </div>
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 12,
                        color: "rgba(10, 22, 40, 0.7)",
                      }}
                    >
                      …then this offer increases to ₹1,999.
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: 32,
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    <button
                      onClick={() =>
                        (window.location.href =
                          "/checkout?plan=Trial Pack Yearly&price=799")
                      }
                      className="shadow-lift font-display"
                      style={{
                        width: "100%",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        background: "var(--navy-900)",
                        color: "#fff",
                        borderRadius: 16,
                        padding: "16px 20px",
                        fontWeight: 700,
                        fontSize: 16,
                        border: "none",
                        cursor: "pointer",
                        transition: "background .18s",
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                      Get my trial for ₹799
                    </button>
                    <ul
                      style={{
                        fontSize: 12.5,
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        color: "rgba(10, 22, 40, 0.85)", // navy-900/85
                      }}
                    >
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="11" width="18" height="11" rx="2" />
                          <path d="M7 11V7a5 5 0 0110 0v4" />
                        </svg>
                        Secure payment
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 16.92V21a1 1 0 01-1.1 1A19 19 0 012 4.1 1 1 0 013 3h4.09a1 1 0 011 .75l1 4a1 1 0 01-.27 1L7 10a16 16 0 007 7l1.25-1.82a1 1 0 011-.27l4 1a1 1 0 01.75 1z" />
                        </svg>
                        Our team contacts you within 2 hours
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v5l3 2" />
                        </svg>
                        7-day money-back guarantee
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
