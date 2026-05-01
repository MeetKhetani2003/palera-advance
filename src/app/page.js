"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import VideoSection from "./Video";
import ChecklistSection from "./PainPoints";
import FeaturesMarquee from "./Grid";
import TestimonialSection from "./Testimonial";
import TrustedClinicsMarquee from "./Marqueelogo";
import TrialOffer from "./TrialOffer";
import CountUp from "react-countup";
import MetricsSection from "./Metric";
import { CheckCircle } from "lucide-react";

/* ─────────────────────────────────────────
  GLOBAL STYLES  (injected once via <style>)
───────────────────────────────────────── */
const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --bar-h: 44px;
  --teal-50:#EAF7F4;--teal-100:#D5EFE9;--teal-400:#3FD4BF;--teal-500:#00C2A8;--teal-600:#00A892;--teal-700:#008674;
  --navy-700:#1A2A44;--navy-800:#0F1E36;--navy-900:#0A1628;--navy-950:#060F1E;
  --gold-400:#F4C04A;--gold-500:#F0B429;--gold-600:#D89A12;
  --ink:#1F2A44;--mute:#6B7A99;--mint:#EAF7F4;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'DM Sans',system-ui,sans-serif;color:var(--ink);background:#fff;-webkit-font-smoothing:antialiased;}
h1,h2,h3{font-family:'Plus Jakarta Sans',sans-serif;letter-spacing:-0.02em;}
h1{letter-spacing:-0.03em;}
.font-display{font-family:'Plus Jakarta Sans',sans-serif;letter-spacing:-0.015em;}

/* Patterns */
.stripe-mint{background-image:repeating-linear-gradient(135deg,#EAF7F4 0 14px,#DCEFEA 14px 28px);}
.stripe-navy{background-image:repeating-linear-gradient(135deg,#122443 0 14px,#0F1E36 14px 28px);}
.stripe-gold{background-image:repeating-linear-gradient(135deg,#F7D880 0 14px,#F0B429 14px 28px);}
.grid-faint{
  background-image:linear-gradient(to right,rgba(15,30,54,.05) 1px,transparent 1px),linear-gradient(to bottom,rgba(15,30,54,.05) 1px,transparent 1px);
  background-size:28px 28px;
}

/* Responsive Layouts */
.hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
.metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px 16px; }
.checklist-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.steps-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; position: relative; align-items: stretch; }
.features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.pricing-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; align-items: stretch; }
.comp-table-row { display: grid; grid-template-columns: 5fr 2fr 2fr 3fr; }
.footer-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 40px; }
.nav-links { display: flex; gap: 32px; font-size: 14px; font-weight: 500; }
.trial-box { display: grid; grid-template-columns: 3fr 2fr; }

/* Table Overflow Fix */
.table-overflow { overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom: 8px; }
.table-min-width { min-width: 700px; }

/* Mobile Adaptations */
@media (max-width: 1024px) {
  .features-grid, .pricing-grid { grid-template-columns: repeat(2, 1fr); }
  .metrics-grid { grid-template-columns: repeat(2, 1fr); }
  .trial-box { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .hero-grid { grid-template-columns: 1fr; gap: 40px; }
  .hero-text { text-align: left; display: flex; flex-direction: column; align-items: center; }
  .hero-text h1 { font-size: 40px; }
  .hero-text p { text-align: center; }
  .nav-links { display: none; }
  .checklist-grid { grid-template-columns: 1fr; }
  .checklist-grid > li { grid-column: span 1 !important; }
  .steps-grid { grid-template-columns: 1fr; gap: 16px; }
  .steps-grid .card { transform: none !important; }
  .step-line { display: none !important; }
  .features-grid, .pricing-grid { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr; gap: 32px; text-align: center; }
  .footer-grid > div { display: flex; flex-direction: column; align-items: center; }
  .btn-group { justify-content: center; }
}

/* Buttons */
.btn-primary{
  background:#00C2A8;color:#06231E;border-radius:14px;padding:16px 22px;font-weight:700;
  font-family:'Plus Jakarta Sans',sans-serif;letter-spacing:-0.01em;
  box-shadow:0 10px 24px -10px rgba(0,194,168,.55),inset 0 -2px 0 rgba(0,90,78,.25);
  transition:transform .18s ease,box-shadow .18s ease,background .18s ease;
  display:inline-flex;align-items:center;gap:10px;text-decoration:none;
}
.btn-primary:hover{background:#00D6BA;transform:translateY(-1px);box-shadow:0 14px 32px -12px rgba(0,194,168,.7),inset 0 -2px 0 rgba(0,90,78,.25);}
.btn-primary:active{transform:translateY(0);}
.btn-ghost{
  color:#0A1628;background:#fff;border:1px solid rgba(15,30,54,.12);
  border-radius:14px;padding:14px 20px;font-weight:600;
  transition:all .18s ease;display:inline-flex;align-items:center;gap:8px;text-decoration:none;
}
.btn-ghost:hover{background:#F6FAF9;border-color:rgba(0,194,168,.35);}

/* Shadows */
.shadow-card{box-shadow:0 1px 0 rgba(15,30,54,.04),0 8px 24px -12px rgba(15,30,54,.12);}
.shadow-lift{box-shadow:0 2px 0 rgba(15,30,54,.04),0 18px 36px -16px rgba(15,30,54,.18);}
.shadow-cta{box-shadow:0 10px 24px -10px rgba(0,194,168,.55),0 2px 0 rgba(0,134,116,.25);}

/* Reveal animations */
.reveal{opacity:0;transform:translateY(12px);transition:opacity .6s ease,transform .6s ease;}
.reveal.on{opacity:1;transform:none;}

/* Card hover */
.card{transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease;}
.card:hover{transform:translateY(-2px);box-shadow:0 2px 0 rgba(15,30,54,.04),0 22px 48px -20px rgba(15,30,54,.22);}

/* FAQ */
details>summary{list-style:none;cursor:pointer;}
details>summary::-webkit-details-marker{display:none;}
details[open] .faq-chev{transform:rotate(45deg);}
.faq-chev{transition:transform .25s ease;}

/* Scrollbar */
.no-scrollbar::-webkit-scrollbar{display:none;}
.no-scrollbar{scrollbar-width:none;}

/* Pulse */
@keyframes pulseDot{0%,100%{opacity:1}50%{opacity:.35}}
.pulse-dot{animation:pulseDot 1.4s ease-in-out infinite;}

/* Marquee */
@keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.marquee-track{animation:marquee 38s linear infinite;}
.marquee:hover .marquee-track{animation-play-state:paused;}

/* Check helpers */
.check{display:inline-grid;place-items:center;height:18px;width:18px;border-radius:999px;background:#00C2A8;color:#06231E;}
.check::before{content:"";height:8px;width:5px;border:2px solid currentColor;border-top:0;border-left:0;transform:rotate(40deg) translate(-1px,-2px);}
.check-mini{display:inline-grid;place-items:center;height:18px;width:18px;border-radius:6px;background:#EAF7F4;color:#00A892;flex-shrink:0;}
.check-mini::before{content:"";height:8px;width:5px;border:2px solid currentColor;border-top:0;border-left:0;transform:rotate(40deg) translate(-1px,-2px);}
.check-dark{display:inline-grid;place-items:center;height:18px;width:18px;border-radius:6px;background:rgba(0,194,168,.18);color:#3FD4BF;flex-shrink:0;}
.check-dark::before{content:"";height:8px;width:5px;border:2px solid currentColor;border-top:0;border-left:0;transform:rotate(40deg) translate(-1px,-2px);}

/* Spec tabs */
.spec-tab{background:rgba(255,255,255,.04);color:#fff;border-color:rgba(255,255,255,.1);}
.spec-tab:hover{background:rgba(255,255,255,.08);}
.spec-tab.active{background:#00C2A8;color:#06231E;border-color:transparent;}

/* Gallery rail */
#galleryRail{transition:opacity .25s ease;}
`;

/* ─── SVG helpers ─── */
const ArrowRight = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);
const Star = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.39 7.36H22l-6.18 4.49L18.21 21 12 16.51 5.79 21l2.39-7.15L2 9.36h7.61z" />
  </svg>
);
const Check = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12l4 4L19 7" />
  </svg>
);
const X = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
  >
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
const Minus = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
  >
    <path d="M5 12h14" />
  </svg>
);
const Play = ({ size = 26 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="#0A1628"
    style={{ transform: "translateX(2px)" }}
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);
const Logo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 4h7a5 5 0 010 10H8"
      stroke="#00C2A8"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path d="M8 4v16" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

/* ─── Countdown hook ─── */
function useCountdown() {
  const [display, setDisplay] = useState("10:00");
  useEffect(() => {
    const KEY = "palera_offer_end";
    let end = parseInt(sessionStorage.getItem(KEY) || "0", 10);
    const now = Date.now();
    if (!end || end < now) {
      end = now + 10 * 60 * 1000;
      sessionStorage.setItem(KEY, end + "");
    }
    const tick = () => {
      const ms = Math.max(0, end - Date.now());
      const m = Math.floor(ms / 60000);
      const s = Math.floor((ms % 60000) / 1000);
      setDisplay(String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0"));
      if (ms <= 0) clearInterval(t);
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return display;
}

/* ─── Reveal hook ─── */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("on");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── DATA ─── */
const specialties = [
  { id: "dent", label: "Dentistry", accent: "#00C2A8" },
  { id: "derm", label: "Dermatology", accent: "#F0B429" },
  { id: "gyn", label: "Gynecology", accent: "#3FD4BF" },
  { id: "ped", label: "Pediatrics", accent: "#F4C04A" },
  { id: "card", label: "Cardiology", accent: "#00C2A8" },
  { id: "orth", label: "Orthopedics", accent: "#3FD4BF" },
  { id: "ent", label: "ENT", accent: "#F0B429" },
];

const galleryTiles = [
  { kind: "image", label: "Hero post · 1:1", meta: "#01 · Educational" },
  { kind: "reel", label: "Reel · 9:16", meta: "#02 · Trend-based" },
  { kind: "image", label: "Festival post", meta: "#03 · Diwali" },
  { kind: "image", label: "Awareness day", meta: "#04 · World Heart Day" },
  { kind: "reel", label: "Reel · 9:16", meta: "#05 · Promotional" },
  { kind: "image", label: "Patient FAQ", meta: "#06 · Trust-builder" },
];

const testimonials = [
  {
    name: "Dr. Ananya Sharma",
    spec: "Dermatologist",
    city: "Bengaluru",
    quote:
      "Within 6 weeks our Instagram inquiries doubled. The festival posts feel personal — patients message us thanking us for them.",
    tone: "mint",
  },
  {
    name: "Dr. Ramesh Iyer",
    spec: "Cardiologist",
    city: "Chennai",
    quote:
      "I used to hire freelancers and chase them every Friday. Palera just shows up — daily, on-brand, on-time. That alone is worth it.",
    tone: "gold",
  },
  {
    name: "Dr. Pooja Mehta",
    spec: "Gynecologist",
    city: "Mumbai",
    quote:
      "The reels they make for us actually rank. We had a 14× spike on a World Menstrual Hygiene Day reel. Real impact.",
    tone: "navy",
  },
  {
    name: "Dr. Faisal Khan",
    spec: "Orthopedist",
    city: "Hyderabad",
    quote:
      "I almost cancelled before the trial ended. By week 3, the bookings spoke. Stayed on the yearly plan ever since.",
    tone: "mint",
  },
  {
    name: "Dr. Aarti Deshpande",
    spec: "Pediatrician",
    city: "Pune",
    quote:
      "Their team understands medical sensitivity. Nothing tone-deaf, nothing salesy. Patients trust the content.",
    tone: "gold",
  },
  {
    name: "Dr. Vivek Bansal",
    spec: "Dentist",
    city: "Delhi",
    quote:
      "Onboarding took five minutes. The consistency since has been the best marketing investment my clinic has made.",
    tone: "navy",
  },
  {
    name: "Dr. Reema Joshi",
    spec: "ENT Specialist",
    city: "Ahmedabad",
    quote:
      "The custom branding is seamless — every post looks like my clinic made it. Followers grew 5× in 3 months.",
    tone: "mint",
  },
];

const clinicNames = [
  "Aarogya Clinic",
  "Sunrise Dental",
  "Mediheal Hospitals",
  "Lotus Skin Care",
  "HeartCore Cardio",
  "BrightSmile Dental",
  "NewLife Gynecology",
  "Kavya Pediatrics",
  "Astha ENT",
  "OrthoFirst",
  "Vedam Hospitals",
  "Pranav Diagnostics",
];

const compRows = [
  ["Healthcare specialization", "no", "partial", "yes"],
  ["Daily posting schedule", "no", "partial", "yes"],
  ["Festival coverage", "no", "partial", "yes"],
  ["Custom clinic branding", "partial", "yes", "yes"],
  ["Dedicated team", "no", "partial", "yes"],
  ["7-day money-back guarantee", "no", "no", "yes"],
  ["Affordable pricing", "partial", "no", "yes"],
  ["2,000+ doctor network", "no", "no", "yes"],
];

const faqs = [
  [
    "What exactly do I get in the ₹799 trial pack?",
    "You get 30 professionally designed image creatives + 3 high-performance reels — all customized with your clinic branding, delivered over 30 days.",
  ],

  [
    "Do I need to create any content myself?",
    "No. Our team handles everything — design, branding, festival coverage, awareness days. You just post.",
  ],
  [
    "Will the content include my clinic's name and branding?",
    "Yes. Every creative is fully customized with your clinic name, logo, doctor photo, contact details, and brand colors.",
  ],
  [
    "Do I need to post the content myself?",
    "Yes. We deliver ready-to-post content via WhatsApp. Posting takes less than 2 minutes a day. (Posting service available as add-on if needed.)",
  ],
  [
    "What if I'm not happy with the designs?",
    "Two safety nets: (1) Revisions are included to match your vision. (2) If you're still not satisfied, we offer a 7-day money-back guarantee — no questions asked.",
  ],
  [
    "Will this help me get more patients?",
    "Our content is designed to improve your online visibility, build trust, and increase engagement — which leads to more patient inquiries over time. We've seen this work for 2,000+ doctors.",
  ],
  [
    "Do you work with my medical specialty?",
    "Yes. We serve all major specialties — dentistry, dermatology, gynecology, cardiology, pediatrics, orthopedics, ENT, and 20+ more. Demos available for every specialty.",
  ],
  [
    "How quickly can we start?",
    "Immediately. Once you complete payment, our team contacts you within 2 hours and onboarding takes just 5 minutes.",
  ],
  [
    "Is there any long-term contract or hidden charges?",
    "No long-term contract. No hidden fees. You pay for the plan you choose — that's it.",
  ],
  [
    "Can I upgrade my plan later?",
    "Yes. You can upgrade to any yearly plan anytime. Many doctors start with the trial and upgrade after seeing results.",
  ],
  [
    "How will I receive the content?",
    "We share your content daily on WhatsApp — ready to download and post directly. No logins, no portals, no complications. Just open WhatsApp every morning and your fresh creative is waiting for you.",
  ],
  [
    "Do reels include voice-over or just visuals?",
    "Yes — both. Every reel comes loaded with professional voice-overs, engaging visuals, and trending background music. Ready to post, ready to perform.",
  ],
  [
    "Is this suitable for a brand-new clinic?",
    "Absolutely. In fact, new clinics benefit the most because we help you build a professional online presence from day one.",
  ],
  [
    "Why should I choose Palera Design over other agencies?",
    "Because we only do healthcare. We've helped 2,000+ doctors. We understand medical audience psychology, compliance, and trust-building like no general agency can.",
  ],
];

const painPoints = [
  "Your Instagram & Facebook are inactive or inconsistent",
  "You don't have time to post daily content",
  "Your clinic looks unprofessional online compared to competitors",
  "Other doctors in your area are getting more visibility",
  "You're not attracting new patients from social media",
  "You have no proper reels or engaging content",
  "You miss important festivals & medical awareness days",
  "Your posts get low engagement and almost zero reach",
  "You've tried freelancers — but the quality and consistency just isn't there",
];

const features = [
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
    title: "365 professional creatives a year",
    desc: "Daily posts designed by experts who understand healthcare — festivals, awareness days, patient education, and consistent branding.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="16" rx="2.5" />
        <path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: "Reels that actually get reach",
    desc: "Trend-based, engaging reels built for the algorithm. Informative + promotional formats that turn viewers into inquiries.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v4M9 4h6M7 9a5 5 0 0010 0V6H7zM12 14v3M8 22h8l-1-3H9z" />
      </svg>
    ),
    title: "A team that speaks 'doctor'",
    desc: "Not restaurants and gyms. Healthcare-only — across cardiology, dentistry, dermatology, gynecology, pediatrics and 20+ more.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 3v4M16 3v4" />
      </svg>
    ),
    title: "Never miss an important day",
    desc: "Diwali, Doctors' Day, World Heart Day, Cancer Awareness Month — every festival and awareness day, ready before you remember.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12a8 8 0 01-11.5 7.2L3 21l1.8-6.5A8 8 0 1121 12z" />
      </svg>
    ),
    title: "Content that builds trust",
    desc: "Educational posts that answer real patient questions. Trust-building messaging that turns followers into bookings.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12l4 4 10-10" />
      </svg>
    ),
    title: "Zero effort from your side",
    desc: "No planning. No designing. No editing. No hiring. Share your details once — we handle everything from there.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 21V8l9-5 9 5v13" />
        <path d="M9 21v-7h6v7" />
      </svg>
    ),
    title: "Your clinic, your identity",
    desc: "Every creative carries your clinic name, logo, contact details, doctor photo and brand colors. Unmistakably yours.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2L3 14h7l-1 8 10-12h-7z" />
      </svg>
    ),
    title: "Quick turnaround, smooth revisions",
    desc: "Dedicated support team. Fast response. Revisions included so every post matches your vision.",
  },
];

/* ─── Comp icon ─── */
function CompIcon({ state }) {
  if (state === "yes")
    return (
      <span
        style={{
          display: "inline-flex",
          height: 28,
          width: 28,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "rgba(0,194,168,.15)",
          color: "#008674",
        }}
      >
        <Check />
      </span>
    );
  if (state === "partial")
    return (
      <span
        style={{
          display: "inline-flex",
          height: 28,
          width: 28,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "rgba(240,180,41,.2)",
          color: "#D89A12",
        }}
      >
        <Minus />
      </span>
    );
  return (
    <span
      style={{
        display: "inline-flex",
        height: 28,
        width: 28,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        background: "#FEF2F2",
        color: "#EF4444",
      }}
    >
      <X />
    </span>
  );
}
const testimonialsData = [
  {
    name: "Dr. Rita Master",
    spec: "Naturopathy Consultant",
    city: "Mumbai",
    quote:
      "I used to hire freelancers and chase them every Friday. Palera just shows up — daily, on-brand, on-time. That alone is worth it.",
    tone: "gold",
    avatarBg: "#0A1628",
    avatarFg: "#F0B429",
    bgClass: "stripe-gold",
  },
  {
    name: "Dr. Ankur Batra",
    spec: "Senior Interventional Cardiologist",
    city: "Sonepat",
    quote:
      "Their team understands medical sensitivity. Nothing tone-deaf, nothing salesy. Patients trust the content.",
    tone: "gold",
    avatarBg: "#0A1628",
    avatarFg: "#F0B429",
    bgClass: "stripe-gold",
  },
  {
    name: "Dr. C.P. Gupta",
    spec: "Sr. Pathologist",
    city: "Kota",
    quote:
      "Onboarding took five minutes. The consistency since has been the best marketing investment my clinic has made.",
    tone: "navy",
    avatarBg: "#00C2A8",
    avatarFg: "#06231E",
    bgClass: "stripe-navy",
  },
  {
    name: "Dr. Saurabh Kumar",
    spec: "Consultant Interventional Radiology",
    city: "Varanasi",
    quote:
      "Honestly, I was hesitant to trust at ₹799. But the 7-day money-back guarantee gave me confidence to try. Best decision of the year. Content, service, branding — all top class. Already referred 4 doctor friends.",
    tone: "mint",
    avatarBg: "#00C2A8",
    avatarFg: "#06231E",
    bgClass: "stripe-mint",
  },
  {
    name: "Dr. Rakesh Singh",
    spec: "Pediatrician",
    city: "Raipur",
    quote:
      "What I loved most — they actually understand healthcare. Parenting tips, vaccination reminders, awareness days — everything is relevant to my specialty. My clinic logo and branding look perfect on every post. Worth every rupee.",
    tone: "mint",
    avatarBg: "#00C2A8",
    avatarFg: "#06231E",
    bgClass: "stripe-mint",
  },
  {
    name: "Dr. Amit Patel",
    spec: "Dermatologist",
    city: "Surat",
    quote:
      "Took the trial just to test the quality. Within 7 days I was convinced — upgraded to yearly. Their team replies instantly on WhatsApp. Even my staff is impressed when I show them the posts.",
    tone: "navy",
    avatarBg: "#00C2A8",
    avatarFg: "#06231E",
    bgClass: "stripe-navy",
  },
  {
    name: "Dr. Prakash Paltye",
    spec: "Ayurvedic Doctor",
    city: "Tumkur",
    quote:
      "Finding good content for Ayurveda is hard — most agencies only know modern medicine. Palera understood my specialty deeply. Herbal remedies, panchakarma, lifestyle tips — all covered authentically. My patients actually relate to it. Thank you, team! 🙏",
    tone: "gold",
    avatarBg: "#0A1628",
    avatarFg: "#F0B429",
    bgClass: "stripe-gold",
  },
];
const marqueeItems = [
  "Aarogya Clinic",
  "Sunrise Dental",
  "Mediheal Hospitals",
  "Lotus Skin Care",
  "HeartCore Cardio",
  "BrightSmile Dental",
  "NewLife Gynecology",
  "Kavya Pediatrics",
  "Astha ENT",
  "OrthoFirst",
  "Vedam Hospitals",
  "Pranav Diagnostics",
];
/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export default function PaleraDesignPage() {
  const countdown = useCountdown();
  useReveal();

  // Gallery state
  const [activeSpec, setActiveSpec] = useState(0);
  const [galleryVisible, setGalleryVisible] = useState(true);
  const railRef = useRef(null);

  // Testimonial state
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const carouselRef = useRef(null);
  const autoScrollRef = useRef(null);

  // Mob CTA
  const heroRef = useRef(null);
  const mobCtaRef = useRef(null);

  // Play btn
  const [played, setPlayed] = useState(false);

  const marqueeNames = marqueeItems;
  // FAQ open
  const [openFaq, setOpenFaq] = useState(null);

  /* --- gallery specialty switch --- */
  function switchSpec(i) {
    setGalleryVisible(false);
    setTimeout(() => {
      setActiveSpec(i);
      setGalleryVisible(true);
      if (railRef.current)
        railRef.current.scrollTo({ left: 0, behavior: "auto" });
    }, 180);
  }

  const toneMap = {
    mint: { avatarBg: "#00C2A8", avatarFg: "#06231E", bg: "stripe-mint" },
    gold: { avatarBg: "#0A1628", avatarFg: "#F0B429", bg: "stripe-gold" },
    navy: { avatarBg: "#00C2A8", avatarFg: "#06231E", bg: "stripe-navy" },
  };

  return (
    <div className="relative min-h-screen bg-white">
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

      {/* ── TOP OFFER BAR ── */}
      <div
        id="topbar"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#F0B429",
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)",
          willChange: "transform",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            height: "var(--bar-h)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            fontSize: 11,
            fontWeight: 500,
            color: "var(--navy-900)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              minWidth: 0,
            }}
          >
            <span style={{ display: "none" }} className="sm-show">
              <span
                style={{
                  display: "inline-flex",
                  height: 20,
                  width: 20,
                  borderRadius: "50%",
                  background: "var(--navy-900)",
                  color: "var(--gold-500)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              </span>
            </span>
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <strong style={{ fontFamily: "Plus Jakarta Sans" }}>
                LIMITED OFFER
              </strong>
              {" . "} ₹799/Month - 30 Creatives + Reels
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontWeight: 700,
                background: "var(--navy-900)",
                color: "var(--gold-400)",
                borderRadius: 6,
                padding: "4px 8px",
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "0.04em",
                fontSize: 13,
              }}
            >
              {countdown}
            </span>
          </div>
        </div>
      </div>

      {/* ── NAV ── */}
      <header
        style={{
          borderBottom: "1px solid rgba(0,0,0,.05)",
          background: "rgba(255,255,255,.8)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          position: "sticky",
          top: "var(--bar-h)",
          zIndex: 40,
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)",
          willChange: "transform, backdrop-filter",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a
            href="#top"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            <span className="w-28">
              <Image
                src={"/Palera-logox.webp"}
                alt="Palera Design"
                width={500}
                height={200}
                className="invert"
              />
            </span>
          </a>
          <nav className="nav-links">
            {[
              ["#features", "What you get"],
              ["#demo", "Our work"],
              ["#pricing", "Pricing"],
              ["#faq", "FAQ"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            href="#trial"
            className="btn-primary"
            style={{ padding: "10px 16px", fontSize: 14 }}
          >
            Start ₹799 Trial <ArrowRight />
          </a>
        </div>
      </header>

      <main id="top">
        {/* ══ HERO ══ */}
        <section
          ref={heroRef}
          style={{ position: "relative", overflow: "hidden" }}
        >
          <div
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, zIndex: -1 }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom,var(--mint),#fff)",
              }}
            />
            <div
              className="grid-faint"
              style={{
                position: "absolute",
                inset: 0,
                top: 0,
                height: 520,
                opacity: 0.6,
              }}
            />
          </div>
          <div
            className="hero-grid"
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "40px 24px 56px",
            }}
          >
            {/* Left */}
            <div className="reveal hero-text">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "flex-start",
                  gap: 10,
                  borderRadius: 999,
                  background: "#fff",
                  border: "1px solid rgba(240,180,41,.3)",
                  padding: "6px 14px 6px 8px",
                }}
                className="shadow-card"
              >
                <span
                  style={{
                    display: "inline-flex",
                    height: 20,
                    width: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    background: "rgba(240,180,41,.15)",
                    color: "var(--gold-600)",
                  }}
                >
                  <Star size={11} />
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--navy-900)",
                  }}
                >
                  Trusted by 2,000+ doctors across India
                </span>
              </div>
              <h1
                style={{
                  marginTop: 24,
                  fontFamily: "Plus Jakarta Sans",
                  fontWeight: 800,
                  fontSize: "clamp(36px,5vw,64px)",
                  lineHeight: 1.02,
                  color: "var(--navy-900)",
                  letterSpacing: "-0.03em",
                }}
              >
                Your clinic deserves a strong online presence —{" "}
                <span style={{ color: "var(--teal-600)" }}>
                  without you lifting a finger.
                </span>
              </h1>
              <p
                style={{
                  textAlign: "left",
                  marginTop: 20,
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: "rgba(31,42,68,.75)",
                }}
              >
                Get{" "}
                <strong style={{ color: "var(--ink)" }}>
                  30 professional creatives + 3 high-performance reels
                </strong>{" "}
                designed exclusively for doctors, clinics & hospitals — for just
                ₹799/month.
              </p>
              <div
                className="btn-group"
                style={{
                  marginTop: 28,
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="#trial"
                  className="btn-primary"
                  style={{
                    fontSize: 16,
                    width: "100%",
                    textAlign: "center",
                    alignItems: "center",
                    display: "inline-flex",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  Start my ₹799 trial now <ArrowRight size={16} />
                </a>
                <a
                  href="#demo"
                  className="btn-ghost"
                  style={{
                    fontSize: 15,
                    width: "100%",
                    textAlign: "center",
                    display: "inline-flex",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="6 4 20 12 6 20 6 4" />
                  </svg>
                  See sample work
                </a>
              </div>
              <ul
                className="checklist-grid"
                style={{
                  marginTop: 24,
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  fontSize: 13.5,
                  color: "rgba(31,42,68,.8)",
                }}
              >
                {[
                  "7-Day Money-Back Guarantee",
                  "No Long-Term Commitment",
                  "Instant Onboarding",
                ].map((t) => (
                  <li
                    key={t}
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <span className="check" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            {/* Right – hero video */}
            <VideoSection />
          </div>
        </section>
        {/* ══ METRICS BAR ══ */}
        <section style={{ background: "var(--navy-900)", color: "#fff" }}>
          {/* 1. Put this array inside your component, before the return statement */}

          {/* 2. Replace your existing metrics-grid div with this: */}
          <div
            className="metrics-grid"
            style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px" }}
          >
            {[
              { end: 2000, suffix: "+", label: "Happy doctors" },
              {
                end: 500000,
                suffix: "+",
                label: "Creatives delivered",
                isIndianFormat: true,
              },
              { end: 25, suffix: "+", label: "Specialties served" },
              { end: 4.9, suffix: "★", label: "Average rating", decimals: 1 },
            ].map(({ end, suffix, label, decimals, isIndianFormat }) => (
              <div key={label} className="reveal">
                <div
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontWeight: 800,
                    color: "var(--teal-400)",
                    fontSize: "clamp(32px,4vw,44px)",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  <CountUp
                    end={end}
                    duration={3} // Adjusted to 3 seconds so it doesn't feel too slow while scrolling
                    enableScrollSpy={true} // 👈 Forces it to wait until visible on screen
                    scrollSpyOnce={true} // 👈 Ensures it only animates the first time you scroll to it
                    formattingFn={(value) => {
                      let formattedNumber;

                      // Format the number properly first
                      if (decimals) {
                        formattedNumber = value.toFixed(decimals);
                      } else if (isIndianFormat) {
                        formattedNumber = new Intl.NumberFormat("en-IN").format(
                          value,
                        );
                      } else {
                        formattedNumber = new Intl.NumberFormat("en-US").format(
                          value,
                        );
                      }

                      // 👈 Manually append the suffix at the end of the formatted number
                      return suffix
                        ? `${formattedNumber}${suffix}`
                        : formattedNumber;
                    }}
                  />
                </div>

                {/* Label Text */}
                <div
                  style={{
                    marginTop: "8px",
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#64748B",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* ══ PAIN POINTS ══ */}
        <ChecklistSection />
        {/* ══ SOLUTION INTRO ══ */}

        {/* ══ FEATURES ══ */}
        <section id="features" style={{ padding: "64px 24px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="reveal" style={{ maxWidth: 700 }}>
              <p
                style={{
                  fontSize: 12,
                  fontFamily: "JetBrains Mono",
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  color: "var(--teal-600)",
                }}
              >
                What you get
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
                Everything your clinic needs to dominate social media.
              </h2>
            </div>
            <div className="features-grid" style={{ marginTop: 48 }}>
              {features.map(({ icon, title, desc }) => (
                <article
                  key={title}
                  className="reveal card shadow-card"
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    border: "1px solid rgba(0,0,0,.05)",
                    padding: 28,
                  }}
                >
                  <div
                    style={{
                      height: 48,
                      width: 48,
                      borderRadius: 12,
                      background: "rgba(0,194,168,.1)",
                      color: "var(--teal-700)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    {icon}
                  </div>
                  <h3
                    style={{
                      marginTop: 20,
                      fontFamily: "Plus Jakarta Sans",
                      fontWeight: 700,
                      fontSize: 18,
                      color: "var(--navy-900)",
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      marginTop: 8,
                      fontSize: 14,
                      color: "rgba(31,42,68,.7)",
                      lineHeight: 1.6,
                    }}
                  >
                    {desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
        {/* ══ DEMO GALLERY ══ */}
        <section
          id="demo"
          style={{
            // padding: "64px 24px",
            // background: "var(--navy-900)",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
            scrollMarginTop: "100px",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              opacity: 0.06,
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
          />
          <div>
            <div
              className="reveal "
              style={{
                padding: "32px 16px 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              <div style={{ maxWidth: 600 }}>
                <p
                  style={{
                    fontSize: 12,
                    fontFamily: "JetBrains Mono",
                    textTransform: "uppercase",
                    letterSpacing: "0.22em",
                    color: "var(--teal-400)",
                  }}
                >
                  Sample work
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
                  A glimpse of what we make every day.
                </h2>
              </div>
            </div>
            {/* Tabs */}

            {/* Gallery rail */}
            <FeaturesMarquee />
          </div>
        </section>
        {/* ================= TESTIMONIALS ================= */}
        <TestimonialSection testimonialsData={testimonialsData} />
        <TrustedClinicsMarquee />
        <TrialOffer />
        {/* ══ PRICING ══ */}
        <section id="pricing" style={{ padding: "64px 24px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="reveal" style={{ maxWidth: 700 }}>
              <p
                style={{
                  fontSize: 12,
                  fontFamily: "JetBrains Mono",
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  color: "var(--teal-600)",
                }}
              >
                Or go big
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
                Choose your yearly plan.
              </h2>
            </div>
            <div className="pricing-grid" style={{ marginTop: 48 }}>
              {/* Trial */}
              {[
                // {
                //   tag: "Trial pack",
                //   title: "Most popular starter",
                //   price: "₹799",
                //   unit: "/ month",
                //   sub: "30 days, then upgrade to yearly",
                //   features: [
                //     "30 image creatives",
                //     "3 reels",
                //     "7-day money-back guarantee",
                //     "Full customization",
                //     "Dedicated support",
                //   ],
                //   cta: "Start trial",
                //   highlight: false,
                // },
                {
                  tag: "Image pack · yearly",
                  title: "365 creatives a year",
                  price: "₹4,999",
                  rawPrice: 4999,
                  unit: "/ year",
                  sub: "Just ₹416 / month · 365 creatives",
                  features: [
                    "365 image creatives (1 per day)",
                    "All festivals & awareness days",
                    "Full clinic customization",
                    "Dedicated support team",
                  ],
                  cta: "Choose Image Pack",
                  highlight: false,
                },
                {
                  tag: "Reel pack 6 · yearly",
                  title: "72 reels a year",
                  price: "₹15,000",
                  rawPrice: 15000,
                  unit: "/ year",
                  sub: "6 reels per month · 72 reels per year",
                  features: [
                    "6 high-performance reels per month",
                    "Trend-based formats",
                    "Custom branded reels",
                    "Dedicated support team",
                  ],
                  cta: "Choose Reel Pack 6",
                  highlight: false,
                },
              ].map(
                ({
                  tag,
                  title,
                  price,
                  rawPrice,
                  unit,
                  sub,
                  features: f,
                  cta,
                  highlight,
                }) => (
                  <article
                    key={tag}
                    className={
                      highlight ? "reveal card" : "reveal card shadow-card"
                    }
                    style={{
                      position: "relative",
                      borderRadius: 16,
                      border: highlight ? "none" : "1px solid rgba(0,0,0,.05)",
                      background: highlight
                        ? "linear-gradient(180deg,#0F1E36,#0A1628)"
                        : "#fff",
                      color: highlight ? "#fff" : "var(--ink)",
                      padding: 28,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {highlight && (
                      <div
                        style={{
                          position: "absolute",
                          top: -12,
                          left: 28,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          borderRadius: 999,
                          background: "var(--gold-500)",
                          color: "var(--navy-900)",
                          padding: "4px 12px",
                          fontSize: 11,
                          fontFamily: "Plus Jakarta Sans",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                        }}
                      >
                        <Star size={11} /> Best value
                      </div>
                    )}
                    <div
                      style={{
                        fontSize: 11,
                        fontFamily: "JetBrains Mono",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: highlight ? "var(--teal-400)" : "var(--mute)",
                      }}
                    >
                      {tag}
                    </div>
                    <h3
                      style={{
                        marginTop: 4,
                        fontFamily: "Plus Jakarta Sans",
                        fontWeight: 700,
                        fontSize: 20,
                        color: highlight ? "#fff" : "var(--navy-900)",
                      }}
                    >
                      {title}
                    </h3>
                    <div
                      style={{
                        marginTop: 20,
                        display: "flex",
                        alignItems: "flex-end",
                        gap: 6,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontWeight: 800,
                          fontSize: 40,
                          lineHeight: 1,
                          color: highlight ? "#fff" : "var(--navy-900)",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        {price}
                      </div>
                      <div
                        style={{
                          paddingBottom: 6,
                          fontSize: 13,
                          color: highlight
                            ? "rgba(255,255,255,.6)"
                            : "var(--mute)",
                        }}
                      >
                        {unit}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: highlight
                          ? "rgba(255,255,255,.6)"
                          : "var(--mute)",
                        marginTop: 4,
                      }}
                    >
                      {sub}
                    </div>
                    <ul
                      style={{
                        marginTop: 24,
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        fontSize: 14,
                        flex: 1,
                        color: highlight
                          ? "rgba(255,255,255,.9)"
                          : "rgba(31,42,68,.85)",
                      }}
                    >
                      {f.map((item) => (
                        <li key={item} style={{ display: "flex", gap: 8 }}>
                          <span
                            className={highlight ? "check-dark" : "check-mini"}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={`/checkout?plan=${encodeURIComponent(title)}&price=${rawPrice}`}
                      className={highlight ? "btn-primary" : "btn-ghost"}
                      style={{
                        marginTop: 28,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        borderRadius: 16,
                        padding: "14px 20px",
                        fontFamily: "Plus Jakarta Sans",
                        fontWeight: 700,
                        fontSize: 14,
                        textDecoration: "none",
                        background: highlight
                          ? "var(--teal-500)"
                          : "var(--navy-900)",
                        color: highlight
                          ? "var(--navy-900)"
                          : "var(--teal-500)",
                        border: highlight
                          ? "none"
                          : "1px solid rgba(0,0,0,.12)",
                        transition: "all .18s",
                      }}
                    >
                      <CheckCircle size={16} /> {cta} <ArrowRight />
                    </a>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>
        {/* ══ COMPARISON TABLE ══ */}
        <section
          style={{
            padding: "64px 24px",
            background: "#F8FFFD", // Light mint background from image
            borderTop: "1px solid rgba(0,194,168,.1)",
            borderBottom: "1px solid rgba(0,194,168,.1)",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="reveal" style={{ maxWidth: 700, marginBottom: 40 }}>
              <p
                style={{
                  fontSize: 12,
                  fontFamily: "JetBrains Mono",
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  color: "var(--teal-600)",
                  fontWeight: 700,
                }}
              >
                Why us
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
                Why doctors choose Palera over freelancers & agencies.
              </h2>
            </div>

            <div
              className="reveal"
              style={{
                borderRadius: 24,
                background: "#fff",
                border: "1px solid rgba(0,0,0,.05)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                overflow: "hidden",
              }}
            >
              {compRows.map(([feature, free, agency, palera], i) => (
                <div
                  key={feature}
                  style={{
                    padding: "32px 24px",
                    borderBottom:
                      i < compRows.length - 1 ? "1px solid #F0F0F0" : "none",
                  }}
                >
                  {/* Feature Title */}
                  <h3
                    style={{
                      fontSize: 18,
                      fontFamily: "Plus Jakarta Sans",
                      fontWeight: 700,
                      color: "var(--navy-900)",
                      marginBottom: 24,
                    }}
                  >
                    {feature}
                  </h3>

                  {/* Comparison Grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 12,
                      alignItems: "center",
                    }}
                  >
                    {/* Freelancers Column */}
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          marginBottom: 8,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <CompIcon state={free} />
                      </div>
                      <p
                        style={{ fontSize: 13, color: "#888", fontWeight: 500 }}
                      >
                        Freelancers
                      </p>
                    </div>

                    {/* Other Agencies Column */}
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          marginBottom: 8,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <CompIcon state={agency} />
                      </div>
                      <p
                        style={{ fontSize: 13, color: "#888", fontWeight: 500 }}
                      >
                        Other
                      </p>
                    </div>

                    {/* Palera Column (Highlighted) */}
                    <div
                      style={{
                        textAlign: "center",
                        background: "#E6F7F4", // Light teal highlight
                        padding: "16px 8px",
                        borderRadius: 12,
                      }}
                    >
                      <div
                        style={{
                          marginBottom: 8,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <CompIcon state={palera} />
                      </div>
                      <p
                        style={{
                          fontSize: 13,
                          color: "var(--teal-700)",
                          fontWeight: 700,
                        }}
                      >
                        Palera
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* ══ HOW IT WORKS ══ */}
        <section style={{ padding: "64px 24px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="reveal" style={{ maxWidth: 700 }}>
              <p
                style={{
                  fontSize: 12,
                  fontFamily: "JetBrains Mono",
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  color: "var(--teal-600)",
                }}
              >
                How it works
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
                Get started in 3 simple steps.
              </h2>
            </div>
            <div className="steps-grid" style={{ marginTop: 48 }}>
              <div
                className="step-line"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "16%",
                  right: "16%",
                  top: 44,
                  height: 1,
                  borderTop: "1px dashed rgba(0,194,168,.4)",
                }}
              />
              {[
                {
                  n: "1",
                  title: "Choose your plan & pay",
                  desc: "Click the button, pick the trial or yearly plan, and complete secure payment.",
                },
                {
                  n: "2",
                  title: "Quick onboarding (5 min)",
                  desc: "Our team contacts you within 10 mins. Share your clinic details, logo, and preferences.",
                },
                {
                  n: "3",
                  title: "Sit back & grow",
                  desc: "Your professionally designed content arrives on schedule. You post. You grow.",
                },
              ].map(({ n, title, desc }) => (
                <div key={n} className="reveal">
                  <div
                    className="shadow-cta"
                    style={{
                      position: "relative",
                      height: 88,
                      width: 88,
                      borderRadius: "50%",
                      background: "var(--teal-500)",
                      color: "var(--navy-900)",
                      display: "grid",
                      placeItems: "center",
                      fontFamily: "Plus Jakarta Sans",
                      fontWeight: 800,
                      fontSize: 40,
                    }}
                  >
                    {n}
                    <span
                      style={{
                        position: "absolute",
                        inset: -4,
                        borderRadius: "50%",
                        border: "2px solid rgba(0,194,168,.3)",
                      }}
                    />
                  </div>
                  <h3
                    style={{
                      marginTop: 24,
                      fontFamily: "Plus Jakarta Sans",
                      fontWeight: 700,
                      fontSize: 22,
                      color: "var(--navy-900)",
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      marginTop: 8,
                      fontSize: 15,
                      color: "rgba(31,42,68,.7)",
                      lineHeight: 1.6,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* ══ TRIAL OFFER ══ */}

        {/* ══ FAQ ══ */}
        <section
          id="faq"
          style={{
            padding: "64px 24px",
            background: "rgba(234,247,244,.6)",
            borderTop: "1px solid rgba(0,194,168,.1)",
            borderBottom: "1px solid rgba(0,194,168,.1)",
          }}
        >
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <div className="reveal" style={{ textAlign: "center" }}>
              <p
                style={{
                  fontSize: 12,
                  fontFamily: "JetBrains Mono",
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  color: "var(--teal-600)",
                }}
              >
                FAQ
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
                Frequently asked questions.
              </h2>
            </div>
            <div
              className="reveal"
              style={{
                marginTop: 40,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {faqs.map(([q, a], i) => (
                <details
                  key={i}
                  className="shadow-card"
                  style={{
                    borderRadius: 16,
                    background: "#fff",
                    border: "1px solid rgba(0,0,0,.05)",
                    overflow: "hidden",
                  }}
                  open={openFaq === i}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenFaq(openFaq === i ? null : i);
                  }}
                >
                  <summary
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 16,
                      padding: "20px 24px",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "JetBrains Mono",
                        fontSize: 11.5,
                        color: "var(--mute)",
                        paddingTop: 4,
                        width: 28,
                        flexShrink: 0,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontFamily: "Plus Jakarta Sans",
                        fontWeight: 600,
                        fontSize: 16,
                        color: "var(--navy-900)",
                        flex: 1,
                        lineHeight: 1.35,
                      }}
                    >
                      {q}
                    </span>
                    <span
                      className="faq-chev"
                      style={{
                        display: "grid",
                        height: 28,
                        width: 28,
                        placeItems: "center",
                        borderRadius: "50%",
                        background: "rgba(0,194,168,.1)",
                        color: "var(--teal-700)",
                        flexShrink: 0,
                        transform: openFaq === i ? "rotate(45deg)" : undefined,
                        transition: "transform .25s ease",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  {openFaq === i && (
                    <div
                      style={{
                        padding: "0 24px 20px",
                        paddingLeft: 68,
                        fontSize: 14.5,
                        lineHeight: 1.6,
                        color: "rgba(31,42,68,.75)",
                      }}
                    >
                      {a}
                    </div>
                  )}
                </details>
              ))}
            </div>
          </div>
        </section>
        {/* ══ FINAL CTA ══ */}
        <section
          style={{
            padding: "80px 24px",
            background: "var(--navy-900)",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              opacity: 0.07,
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #00C2A8 1px, transparent 0)",
              backgroundSize: "26px 26px",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: -128,
              left: "50%",
              transform: "translateX(-50%)",
              height: 460,
              width: 460,
              borderRadius: "50%",
              background: "rgba(0,194,168,.15)",
              filter: "blur(48px)",
            }}
          />
          <div
            style={{
              maxWidth: 900,
              margin: "0 auto",
              textAlign: "center",
              position: "relative",
            }}
          >
            <div className="reveal">
              <p
                style={{
                  fontSize: 12,
                  fontFamily: "JetBrains Mono",
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  color: "var(--teal-400)",
                }}
              >
                Last call
              </p>
              <h2
                style={{
                  marginTop: 12,
                  fontFamily: "Plus Jakarta Sans",
                  fontWeight: 800,
                  fontSize: "clamp(32px,5vw,56px)",
                  lineHeight: 1.04,
                }}
              >
                Your competitors are posting today.{" "}
                <span style={{ color: "var(--teal-400)" }}>
                  You could be too.
                </span>
              </h2>
              <p
                style={{
                  marginTop: 20,
                  fontSize: 17,
                  color: "rgba(255,255,255,.75)",
                  maxWidth: 600,
                  margin: "20px auto 0",
                }}
              >
                Stop losing patients to clinics with better online presence.
                Start your ₹799 trial and see the difference in 30 days — with
                zero risk.
              </p>
              <div
                style={{
                  marginTop: 32,
                  display: "flex",
                  gap: 12,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="/checkout?plan=Trial%20pack&price=799"
                  className="btn-primary"
                  style={{ fontSize: 16 }}
                >
                  Start my ₹799 trial now <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* ══ FOOTER ══ */}
        <footer
          style={{
            marginBottom: 64,
            background: "var(--navy-950)",
            color: "rgba(255,255,255,.7)",
            padding: "48px 24px",
          }}
        >
          <div
            className="footer-grid"
            style={{ maxWidth: 1280, margin: "0 auto" }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span>
                  <Image
                    src="/Palera-logox.png"
                    alt="Palera Design Logo"
                    width={90}
                    height={100}
                  />
                </span>
              </div>
              <p
                style={{
                  marginTop: 16,
                  fontSize: 14,
                  lineHeight: 1.6,
                  maxWidth: 300,
                }}
              >
                Doctors' first choice for premium social media content. Built in
                India, for healthcare.
              </p>
            </div>
          </div>
          <div
            style={{
              maxWidth: 1280,
              margin: "40px auto 0",
              paddingTop: 24,
              borderTop: "1px solid rgba(255,255,255,.1)",
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              alignItems: "center",
              fontSize: 12,
              color: "rgba(255,255,255,.5)",
              flexWrap: "wrap",
            }}
          >
            <div className="flex items-center justify-center w-full">
              © 2026 Palera Design. All rights reserved.
            </div>
            <div
              className="flex items-center justify-center w-full"
              style={{ fontFamily: "JetBrains Mono" }}
            >
              Made in India · for Indian doctors
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
