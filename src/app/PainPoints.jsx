"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const painPoints = [
  "You’re posting regularly but getting no patient leads",
  "Your clinic looks outdated compared to competitors",
  "You rely only on word-of-mouth referrals",
  "You don’t have time to manage social media",
  "Your branding doesn’t reflect your expertise",
  "You’ve tried marketing agencies but saw no results",
];

export default function ChecklistSection() {
  const [checkedItems, setCheckedItems] = useState([]);

  const toggleCheck = (index) => {
    setCheckedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <section style={{ padding: "64px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 12,
              fontFamily: "JetBrains Mono",
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "var(--teal-600)",
            }}
          >
            The honest checklist
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
            Does this sound like you, doctor?
          </h2>
        </div>

        {/* Checklist */}
        <ul
          style={{
            marginTop: 48,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: 16,
          }}
        >
          {painPoints.map((p, i) => {
            const isChecked = checkedItems.includes(i);

            return (
              <li
                key={i}
                onClick={() => toggleCheck(i)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  borderRadius: 16,
                  background: isChecked ? "#ECFDF5" : "#fff",
                  border: isChecked
                    ? "1px solid #10B981"
                    : "1px solid rgba(0,0,0,.05)",
                  padding: "16px 20px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {/* Checkbox */}
                <span
                  style={{
                    marginTop: 2,
                    display: "grid",
                    height: 26,
                    width: 26,
                    placeItems: "center",
                    borderRadius: "50%",
                    background: isChecked ? "#10B981" : "#F3F4F6",
                    color: isChecked ? "#fff" : "#9CA3AF",
                    flexShrink: 0,
                    transition: "all 0.2s ease",
                  }}
                >
                  {isChecked && <Check size={16} />}
                </span>

                {/* Text */}
                <span
                  style={{
                    fontSize: 15,
                    lineHeight: 1.4,
                    textDecoration: isChecked ? "line-through" : "none",
                    color: isChecked ? "#6B7280" : "inherit",
                  }}
                >
                  {p}
                </span>
              </li>
            );
          })}
        </ul>

        {/* CTA Box */}
        <div
          style={{
            marginTop: 48,
            borderRadius: 16,
            background: "var(--mint)",
            border: "1px solid rgba(0,194,168,.15)",
            padding: "28px 32px",
            display: "flex",
            alignItems: "center",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              flex: 1,
              fontSize: 16.5,
              lineHeight: 1.6,
              color: "var(--navy-900)",
            }}
          >
            If you checked even <strong>one</strong> — you're not alone. Over{" "}
            <strong>2,000+ doctors</strong> faced the same problem before
            joining Palera Design.
          </p>

          <a
            href="#solution"
            className="btn-primary"
            style={{ padding: "12px 20px", fontSize: 14 }}
          >
            See how we fix this in 30 days <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
