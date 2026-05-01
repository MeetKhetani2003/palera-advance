"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown, Banknote } from "lucide-react";

const SPECIALTIES = [
  "Dentists",
  "Dermatologists",
  "Gynecologists",
  "Physicians",
  "Pediatricians",
  "Orthopedics",
  "Cardiologists",
  "Ophthalmologists",
  "Ayurvedic Doctors",
  "ENT Specialists",
  "Neurologists",
  "Physiotherapists",
  "Nutritionists",
  "Homeopaths",
  "Oncologists",
  "Nephrologists",
  "Radiologists",
  "Pathologists",
  "Spine Surgeons",
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const planName = searchParams.get("plan") || "Premium Trial";
  const price = parseInt(searchParams.get("price")) || 799;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    speciality: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // Timer State (5 minutes = 300 seconds)
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.speciality
    ) {
      alert("Please fill in all details first.");
      return;
    }

    setIsProcessing(true);
    let currentLeadId = null;

    try {
      const dbResponse = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          plan: planName,
          amount: price,
        }),
      });

      if (dbResponse.ok) {
        const data = await dbResponse.json();
        currentLeadId = data.lead._id;
      }
    } catch (error) {
      console.error(error);
    }

    const orderData = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: price }),
    }).then((t) => t.json());

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: "INR",
      name: "Palera Design",
      description: planName,
      order_id: orderData.id,
      handler: function (response) {
        router.push(
          `/success?leadId=${currentLeadId}&paymentId=${response.razorpay_payment_id}&amount=${price}&plan=${planName}`,
        );
      },
      prefill: { ...formData },
      theme: { color: "#00C39A" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setIsProcessing(false);
  };

  // --- DYNAMIC TEXT LOGIC ---
  let offerText =
    "Buy before timer ends to unlock 14-day refund, lifetime access and free upgrades."; // Default Fallback

  if (price === 799) {
    offerText =
      "Limited offer — secure your 7-day risk-free trial before timer ends.";
  } else if (price === 4999) {
    offerText =
      "Limited offer — 14 months for the price of 12 + 7-day money-back guarantee.";
  } else if (price === 14999) {
    offerText =
      "Buy before timer ends to unlock FREE Image Pack (worth ₹4,999) + 7-day refund guarantee.";
  }

  return (
    <div className="min-h-screen bg-white pb-40 font-sans">
      <div className="max-w-xl mx-auto p-6 pt-10">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 mb-8 text-slate-500"
        >
          <ArrowLeft size={18} /> Go Back
        </button>

        <h1 className="text-3xl font-bold text-[#0A1628] mb-8">
          Checkout: {planName}
        </h1>

        <div className="space-y-6">
          <div className="group">
            <label className="block text-[13px] font-bold text-[#0A1628] mb-2 uppercase tracking-wider opacity-90 transition-colors group-focus-within:text-[#00C39A]">
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Example: Amit Sharma"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#00C39A] focus:ring-4 focus:ring-[#00C39A]/5 outline-none transition-all duration-200"
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-[13px] font-bold text-[#0A1628] mb-2 uppercase tracking-wider opacity-90 transition-colors group-focus-within:text-[#00C39A]">
              Email Address *{" "}
              <span className="text-slate-400 font-medium normal-case tracking-normal">
                (For receipt delivery)
              </span>
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Example: amitsharma@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#00C39A] focus:ring-4 focus:ring-[#00C39A]/5 outline-none transition-all duration-200"
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-[13px] font-bold text-[#0A1628] mb-2 uppercase tracking-wider opacity-90 transition-colors group-focus-within:text-[#00C39A]">
              WhatsApp Number *
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                placeholder="+91"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#00C39A] focus:ring-4 focus:ring-[#00C39A]/5 outline-none transition-all duration-200"
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-[13px] font-bold text-[#0A1628] mb-2 uppercase tracking-wider opacity-90 transition-colors group-focus-within:text-[#00C39A]">
              Speciality *
            </label>
            <div className="relative">
              <select
                name="speciality"
                value={formData.speciality}
                onChange={handleInputChange}
                className={`w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-4 focus:bg-white focus:border-[#00C39A] focus:ring-4 focus:ring-[#00C39A]/5 outline-none transition-all duration-200 appearance-none cursor-pointer ${
                  formData.speciality ? "text-slate-900" : "text-slate-400"
                }`}
              >
                <option value="" disabled>
                  Select your speciality
                </option>
                {SPECIALTIES.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                <ChevronDown size={20} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 p-6 bg-slate-50 rounded-2xl flex justify-between items-center">
          <div>
            <p className="font-bold text-lg text-[#0A1628]">{planName}</p>
            <p className="text-[#00C39A] font-mono text-xs">SELECTED PLAN</p>
          </div>
          <div className="text-2xl font-bold text-[#0A1628]">₹{price}</div>
        </div>
      </div>

      {/* Floating Bottom Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md bg-gradient-to-b from-[#1a2b44] to-[#0A1628] p-4 rounded-2xl shadow-[0_10px_40px_rgba(10,22,40,0.6)] border border-[#D4AF37]/20 z-50">
        {/* Top Timer Pill */}
        <div className="bg-[#0A1628]/80 border border-[#D4AF37]/10 rounded-full px-4 py-2.5 flex items-center gap-3 mb-4 shadow-inner">
          <div className="text-[#D4AF37] text-xl font-light tracking-wider font-mono shrink-0">
            {formatTime(timeLeft)}
          </div>
          <div className="text-[10px] leading-tight font-bold text-white/80">
            {offerText}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex justify-between items-center px-1">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white tracking-tight">
              ₹{price}/-
            </span>
            <span className="text-[11px] text-[#D4AF37] font-medium uppercase tracking-wider">
              Total Amount
            </span>
          </div>

          {/* Pay Now Button */}
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="group relative inline-flex overflow-hidden rounded-full bg-slate-800 p-[1.5px] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:pointer-events-none"
          >
            <span className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0_at_50%_50%,rgba(212,175,55,1)_0deg,transparent_60deg,transparent_300deg,rgba(212,175,55,1)_360deg)] opacity-50 transition-opacity duration-300 group-hover:opacity-100" />

            <span className="relative flex h-full w-full items-center justify-center gap-2 rounded-full bg-[#0A1628] px-7 py-3 text-[15px] font-bold tracking-wide">
              <span className="absolute bottom-0 left-1/2 h-1/3 w-4/5 -translate-x-1/2 rounded-full bg-[#D4AF37]/30 opacity-50 blur-md transition-all duration-500 group-hover:h-2/3 group-hover:opacity-100" />
              <span className="relative z-10 flex items-center gap-2">
                <Banknote size={18} className="text-[#D4AF37]" />
                <span className="bg-gradient-to-b from-[#e8cf7a] to-[#D4AF37] bg-clip-text text-transparent">
                  {isProcessing ? "Processing..." : "Pay Now"}
                </span>
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
