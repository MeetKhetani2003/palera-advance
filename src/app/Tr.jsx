import React from "react";

const Tr = () => {
  return (
    <section
      id="trial"
      style={{
        padding: "64px 24px",
        background: "var(--mint)",
        position: "relative",
        overflow: "hidden",
        scrollMarginTop: 96,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -160,
          right: -160,
          height: 420,
          width: 420,
          borderRadius: "50%",
          background: "rgba(0,194,168,.1)",
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
          background: "rgba(240,180,41,.1)",
          filter: "blur(48px)",
        }}
      />
      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
        <div
          className="reveal"
          style={{ textAlign: "center", maxWidth: 700, margin: "0 auto" }}
        >
          <p
            style={{
              fontSize: 12,
              fontFamily: "JetBrains Mono",
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "var(--teal-600)",
            }}
          >
            The trial offer
          </p>
          <h2
            style={{
              marginTop: 12,
              fontFamily: "Plus Jakarta Sans",
              fontWeight: 800,
              fontSize: "clamp(28px,4vw,44px)",
              lineHeight: 1.08,
              color: "var(--navy-900)",
            }}
          >
            Try Palera Design risk-free — just{" "}
            <span style={{ color: "var(--teal-600)" }}>₹799</span>.
          </h2>
        </div>
        <div className="reveal" style={{ marginTop: 48 }}>
          <div
            className="shadow-lift"
            style={{
              borderRadius: 24,
              background: "var(--navy-900)",
              padding: 4,
            }}
          >
            <div
              className="trial-box"
              style={{
                borderRadius: 20,
                background: "var(--navy-900)",
                border: "1px solid rgba(255,255,255,.1)",
                overflow: "hidden",
              }}
            >
              {/* Left */}
              <div style={{ padding: "48px 40px", color: "#fff" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      borderRadius: 999,
                      background: "rgba(240,180,41,.15)",
                      color: "var(--gold-400)",
                      padding: "4px 10px",
                      fontSize: 11,
                      fontFamily: "JetBrains Mono",
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
                </div>
                <h3
                  style={{
                    marginTop: 20,
                    fontFamily: "Plus Jakarta Sans",
                    fontWeight: 800,
                    fontSize: "clamp(24px,3vw,34px)",
                    lineHeight: 1.2,
                  }}
                >
                  Palera Design — 30-day Trial Pack
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
                    style={{
                      fontFamily: "Plus Jakarta Sans",
                      fontWeight: 800,
                      fontSize: "clamp(56px,6vw,76px)",
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                      color: "var(--teal-400)",
                    }}
                  >
                    ₹799
                  </div>
                  <div style={{ paddingBottom: 12 }}>
                    <div
                      style={{
                        fontSize: 14,
                        color: "rgba(255,255,255,.7)",
                      }}
                    >
                      <s>₹1,999</s> ·{" "}
                      <span
                        style={{
                          color: "var(--gold-400)",
                          fontWeight: 600,
                        }}
                      >
                        60% OFF
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "rgba(255,255,255,.5)",
                        fontFamily: "JetBrains Mono",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        marginTop: 4,
                      }}
                    >
                      / month · one-time trial
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
                          background: "rgba(0,194,168,.2)",
                          color: "var(--teal-400)",
                          display: "grid",
                          placeItems: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Check />
                      </span>
                      <span style={{ fontSize: 15 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Right */}
              <div
                style={{
                  background: "linear-gradient(180deg,#00C2A8,#00A892)",
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
                      fontFamily: "JetBrains Mono",
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      opacity: 0.6,
                    }}
                  >
                    Offer expires in
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      fontFamily: "Plus Jakarta Sans",
                      fontWeight: 800,
                      fontSize: "clamp(40px,4vw,52px)",
                      lineHeight: 1,
                      fontVariantNumeric: "tabular-nums",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {countdown}
                  </div>
                  <div style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>
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
                    className="shadow-lift"
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
                      fontFamily: "Plus Jakarta Sans",
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
                      opacity: 0.85,
                    }}
                  >
                    {[
                      [
                        <svg
                          key="0"
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
                        </svg>,
                        "Secure payment",
                      ],
                      [
                        <svg
                          key="1"
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
                        </svg>,
                        "Our team contacts you within 10 mins",
                      ],
                      [
                        <svg
                          key="2"
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
                        </svg>,
                        "7-day money-back guarantee",
                      ],
                    ].map(([icon, text], i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        {icon}
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tr;
