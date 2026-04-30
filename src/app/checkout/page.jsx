"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const price = 799;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all details first.");
      return;
    }

    setIsProcessing(true);

    // 1. DECLARE THE VARIABLE HERE
    let currentLeadId = null;

    try {
      const dbResponse = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (dbResponse.ok) {
        const data = await dbResponse.json();
        // 2. ASSIGN THE VALUE FROM THE DATABASE RESPONSE
        currentLeadId = data.lead._id;
      }
    } catch (error) {
      console.error("Database submission error:", error);
    }

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      setIsProcessing(false);
      return;
    }

    const orderData = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: price }),
    }).then((t) => t.json());

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Palera Design",
      order_id: orderData.id,
      handler: function (response) {
        // 3. NOW IT WILL BE DEFINED HERE
        if (currentLeadId) {
          router.push(
            `/success?leadId=${currentLeadId}&paymentId=${response.razorpay_payment_id}`,
          );
        } else {
          router.push("/success");
        }
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      theme: { color: "#00C39A" },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.on("payment.failed", function (response) {
      setIsProcessing(false);
      // 4. ALSO WORKS HERE
      if (currentLeadId) {
        router.push(`/failed?leadId=${currentLeadId}`);
      } else {
        router.push("/failed");
      }
    });

    paymentObject.open();
  };

  return (
    <div className="min-h-screen bg-white pb-32 font-sans selection:bg-[#00C39A] selection:text-white">
      <div className="max-w-xl mx-auto p-6 pt-10">
        {/* Header */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>

        <h1 className="text-3xl md:text-4xl font-display font-bold text-[#0A1628] leading-tight mb-8 tracking-tight">
          Complete Your Purchase To Get Instant Access
        </h1>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="Example: Amit Sharma"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#00C39A] focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address *{" "}
              <span className="text-slate-400 font-normal text-xs">
                (Make sure it's accurate)
              </span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Example: amitsharma@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#00C39A] focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              WhatsApp Number *
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+91"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#00C39A] focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Product Summary */}
        <div className="mt-10 border-t border-b border-slate-100 py-6 bg-slate-50/50 px-4 rounded-2xl">
          <div className="flex justify-between text-xs font-bold text-slate-400 tracking-wider mb-4 uppercase">
            <span>Product Details</span>
            <span>Price</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-[#0A1628] text-lg">Premium Trial</p>
              <p className="font-mono text-[#00C39A] font-semibold tracking-wide text-xs mt-1">
                30 CREATIVES + 3 REELS
              </p>
            </div>
            <div className="text-2xl font-bold text-[#0A1628]">₹{price}/-</div>
          </div>
        </div>
      </div>

      {/* Styled Bottom Sticky CTA - Light Theme */}
      <div className="fixed inset-x-0 bottom-0 z-40 md:hidden transition-transform duration-500 ease-in-out">
        <div
          className="relative flex items-center justify-between gap-4"
          style={{
            padding: "16px 16px calc(12px + env(safe-area-inset-bottom)) 16px",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 -4px 24px rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex-1">
            <p className="text-[11px] text-slate-500 font-mono uppercase tracking-wider mb-0.5">
              Total Amount
            </p>
            <p className="text-xl font-display font-bold text-[#0A1628]">
              ₹{price}/-
            </p>
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="flex-shrink-0 flex items-center justify-center gap-2 shadow-lg shadow-[#00C39A]/20"
            style={{
              padding: "12px 24px",
              fontSize: "15px",
              backgroundColor: "#00C39A",
              color: "#ffffff",
              borderRadius: "8px",
              fontWeight: "bold",
              opacity: isProcessing ? 0.7 : 1,
            }}
          >
            {isProcessing ? "Processing..." : "Pay Now"}
            {!isProcessing && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
