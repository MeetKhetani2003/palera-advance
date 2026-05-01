"use client";

/* ✅ LOGO ARRAYS (1 image per category for clean look) */
const logosRow1 = [
  "/logos/Asset 7.png",
  "/logos/Asset 8.png",
  "/logos/Asset 9.png",
  "/logos/Asset 10.png",
  "/logos/Asset 11.png",
  "/logos/Asset 12.png",
  "/logos/Asset 13.png",
  "/logos/Asset 14.png",
  "/logos/Asset 15.png",
];

const logosRow2 = [
  "/logos/Asset 16.png",
  "/logos/Asset 17.png",
  "/logos/Asset 18.png",
  "/logos/Asset 19.png",
  "/logos/Asset 20.png",
  "/logos/Asset 21.png",
  "/logos/Asset 22.png",
  "/logos/Asset 23.png",
  "/logos/Asset 24.png",
];

const logosRow3 = [
  "/logos/Asset 25.png",
  "/logos/Asset 26.png",
  "/logos/Asset 27.png",
  "/logos/Asset 28.png",
  "/logos/Asset 29.png",
  "/logos/Asset 30.png",
  "/logos/Asset 31.png",
  "/logos/Asset 32.png",
  "/logos/Asset 33.png",
];

/* 🔁 Marquee wrapper (Fixed for perfectly seamless looping) */
function Marquee({ children, reverse = false }) {
  return (
    <div
      style={{
        overflow: "hidden",
        display: "flex",
        gap: 24, // Gap between the two scrolling blocks
        position: "relative",
      }}
    >
      {/* First track */}
      <div
        style={{
          display: "flex",
          gap: 24, // Gap between logos
          flexShrink: 0,
          minWidth: "max-content",
          animation: `${reverse ? "marqueeReverse" : "marquee"} 40s linear infinite`,
        }}
      >
        {children}
      </div>
      {/* Second track (Duplicate for seamless loop) */}
      <div
        aria-hidden="true"
        style={{
          display: "flex",
          gap: 24, // Gap between logos
          flexShrink: 0,
          minWidth: "max-content",
          animation: `${reverse ? "marqueeReverse" : "marquee"} 40s linear infinite`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* 🧱 Logo Card */
function LogoCard({ src }) {
  return (
    <div
      style={{
        minWidth: 80,
        height: 60,
        borderRadius: 4,
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <img
        src={src}
        alt="clinic logo"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
}

/* 🎯 MAIN SECTION */
export default function TrustedClinicsMarquee() {
  return (
    <section style={{ padding: "48px 0" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* 🔹 Row 1 */}
        <Marquee>
          {logosRow1.map((src, i) => (
            <LogoCard key={i} src={src} />
          ))}
        </Marquee>

        {/* 🔹 Row 2 */}
        <Marquee reverse>
          {logosRow2.map((src, i) => (
            <LogoCard key={i} src={src} />
          ))}
        </Marquee>

        {/* 🔹 Row 3 */}
        <Marquee>
          {logosRow3.map((src, i) => (
            <LogoCard key={i} src={src} />
          ))}
        </Marquee>
      </div>

      {/* 🎬 MARQUEE ANIMATION (Fixed calculation) */}
      <style jsx global>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            /* -100% shifts it entirely left, and the -24px accounts for the gap */
            transform: translateX(calc(-100% - 24px));
          }
        }

        @keyframes marqueeReverse {
          from {
            transform: translateX(calc(-100% - 24px));
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
