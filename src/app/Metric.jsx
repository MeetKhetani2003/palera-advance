import React from "react";
import CountUp from "react-countup";

export default function MetricsSection() {
  // We structure the data to separate the raw number, the suffix, and formatting rules
  const metrics = [
    { end: 2000, suffix: "+", label: "Happy doctors" },
    {
      end: 500000,
      suffix: "+",
      label: "Creatives delivered",
      isIndianFormat: true,
    },
    { end: 25, suffix: "+", label: "Specialties served" },
    { end: 4.9, suffix: "★", label: "Average rating", decimals: 1 },
  ];

  return (
    <div
      className="metrics-grid"
      style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px" }}
    >
      {metrics.map(({ end, suffix, label, decimals, isIndianFormat }) => (
        <div key={label} className="reveal">
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              color: "var(--teal-400)",
              fontSize: "clamp(32px, 4vw, 44px)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            <CountUp
              end={end}
              duration={5}
              decimals={decimals || 0}
              suffix={suffix}
              formattingFn={(value) => {
                // If it has decimals, keep the decimal formatting
                if (decimals) return value.toFixed(decimals);

                // Use en-IN for "5,00,000" and en-US for standard "2,000"
                if (isIndianFormat) {
                  return new Intl.NumberFormat("en-IN").format(value);
                }
                return new Intl.NumberFormat("en-US").format(value);
              }}
            />
          </div>

          {/* Make sure to actually render the label text below the numbers! */}
          <div
            style={{
              marginTop: "8px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#64748B", // Adjust color to fit your dark/light mode theme
            }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
