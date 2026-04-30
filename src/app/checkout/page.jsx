"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown } from "lucide-react";
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

  // Get dynamic data from URL
  const planName = searchParams.get("plan") || "Premium Trial";
  const price = parseInt(searchParams.get("price")) || 799;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    speciality: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

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
      // Send plan and amount to the DB
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

    // Razorpay logic (Existing)
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

  return (
    <div className="min-h-screen bg-white pb-32 font-sans">
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

        {/* Premium Styled Form */}
        <div className="space-y-6">
          {/* Full Name Field */}
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

          {/* Email Address Field */}
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

          {/* WhatsApp Field */}
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
              {/* Custom Dropdown Arrow */}
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

      <div className="fixed inset-x-0 bottom-0 p-4 bg-white/90 backdrop-blur-md border-t flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500">Total Amount</p>
          <p className="text-xl font-bold text-[#0A1628]">₹{price}</p>
        </div>
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="bg-[#00C39A] text-white px-8 py-3 rounded-lg font-bold"
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
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
