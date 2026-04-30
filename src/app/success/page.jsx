"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const leadId = searchParams.get("leadId");
  const paymentId = searchParams.get("paymentId");

  // 1. EXTRACT DYNAMIC PLAN AND AMOUNT FROM URL
  const amount = searchParams.get("amount") || "799";
  const planName = searchParams.get("plan") || "Premium Trial";

  const [isUpdating, setIsUpdating] = useState(true);

  useEffect(() => {
    const updatePaymentStatus = async () => {
      if (leadId && paymentId) {
        try {
          await fetch("/api/update-lead", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: leadId,
              status: "Paid",
              paymentId: paymentId,
            }),
          });

          // 2. DYNAMIC META PIXEL TRACKING
          if (window.fbq) {
            window.fbq("track", "Purchase", {
              value: parseInt(amount), // Tracks actual amount paid
              currency: "INR",
              content_name: planName, // Tracks actual plan bought
              content_category: "Social Media Services",
            });
          }
        } catch (error) {
          console.error("Failed to update status:", error);
        }
      }
      // Wait a tiny bit so the user sees a smooth transition
      setTimeout(() => setIsUpdating(false), 800);
    };

    updatePaymentStatus();
  }, [leadId, paymentId, amount, planName]);

  return (
    <div className="max-w-md w-full bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-slate-200/50 text-center border border-slate-100 relative overflow-hidden">
      {/* Loading Overlay */}
      {isUpdating && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
          <Loader2 size={40} className="text-[#00C39A] animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Verifying payment...</p>
        </div>
      )}

      {/* Success Icon */}
      <div className="w-24 h-24 bg-[#00C39A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 size={48} className="text-[#00C39A]" />
      </div>

      {/* Text Content */}
      <h1 className="text-3xl md:text-4xl font-display font-bold text-[#0A1628] mb-4 tracking-tight">
        Payment Successful!
      </h1>
      <p className="text-slate-500 mb-8 text-sm md:text-base leading-relaxed">
        Welcome to Palera Design. Your {planName} is now active. We've sent your
        receipt and onboarding details to your email.
      </p>

      {/* Order Summary Box */}
      <div className="bg-slate-50 rounded-2xl p-5 mb-8 text-left border border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <span className="text-slate-500 text-sm font-medium">Plan</span>
          {/* 3. RENDER DYNAMIC PLAN */}
          <span className="font-bold text-[#0A1628]">{planName}</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-slate-500 text-sm font-medium">
            Amount Paid
          </span>
          {/* 4. RENDER DYNAMIC AMOUNT */}
          <span className="font-bold text-[#0A1628]">₹{amount}.00</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500 text-sm font-medium">Status</span>
          <span className="inline-flex items-center gap-1.5 text-[#00C39A] text-xs font-bold uppercase tracking-wider bg-[#00C39A]/10 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C39A] animate-pulse"></span>
            Active
          </span>
        </div>
        {paymentId && (
          <div className="mt-3 pt-3 border-t border-slate-200 flex justify-between items-center">
            <span className="text-slate-500 text-xs font-medium">Ref ID</span>
            <span className="font-mono text-slate-400 text-xs">
              {paymentId}
            </span>
          </div>
        )}
      </div>

      {/* Dashboard CTA */}
      <Link
        href="/"
        className="w-full flex items-center justify-center gap-2 bg-[#00C39A] hover:bg-[#00a885] text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#00C39A]/20"
      >
        Go to Dashboard
        <ArrowRight size={18} />
      </Link>
    </div>
  );
}

// Next.js requires useSearchParams to be wrapped in a Suspense boundary
export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans selection:bg-[#00C39A] selection:text-white">
      <Suspense fallback={<div>Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
