"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { XCircle, RefreshCw, MessageSquare } from "lucide-react";
import { Suspense } from "react";

function FailureContent() {
  const searchParams = useSearchParams();
  const leadId = searchParams.get("leadId");

  useEffect(() => {
    const updateToFailed = async () => {
      if (leadId) {
        try {
          await fetch("/api/update-lead", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: leadId,
              status: "Failed",
            }),
          });
        } catch (error) {
          console.error("Failed to update status:", error);
        }
      }
    };

    updateToFailed();
  }, [leadId]);

  return (
    <div className="max-w-md w-full bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-slate-200/50 text-center border border-slate-100">
      {/* Error Icon */}
      <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <XCircle size={48} className="text-rose-500" />
      </div>

      {/* Text Content */}
      <h1 className="text-3xl md:text-4xl font-display font-bold text-[#0A1628] mb-4 tracking-tight">
        Payment Failed
      </h1>
      <p className="text-slate-500 mb-8 text-sm md:text-base leading-relaxed">
        We couldn't process your payment. Don't worry,{" "}
        <strong>no money was deducted</strong> from your account. Please check
        your details or try a different payment method.
      </p>

      {/* Order Summary Box (Failed State) */}
      <div className="bg-slate-50 rounded-2xl p-5 mb-8 text-left border border-slate-100 opacity-80">
        <div className="flex justify-between items-center mb-3">
          <span className="text-slate-500 text-sm font-medium">Plan</span>
          <span className="font-bold text-[#0A1628]">Premium Trial</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-slate-500 text-sm font-medium">Attempted</span>
          <span className="font-bold text-[#0A1628]">₹799.00</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500 text-sm font-medium">Status</span>
          <span className="inline-flex items-center gap-1.5 text-rose-600 text-xs font-bold uppercase tracking-wider bg-rose-100 px-3 py-1.5 rounded-full">
            Declined
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Link
          href="/checkout"
          className="w-full flex items-center justify-center gap-2 bg-[#0A1628] hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-slate-200"
        >
          <RefreshCw size={18} />
          Try Payment Again
        </Link>

        <a
          href="mailto:hello@paleradesign.in"
          className="w-full flex items-center justify-center gap-2 bg-white border-2 border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-600 font-bold py-4 px-8 rounded-xl transition-all"
        >
          <MessageSquare size={18} />
          Contact Support
        </a>
      </div>
    </div>
  );
}

export default function FailurePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans selection:bg-rose-500 selection:text-white">
      <Suspense fallback={<div>Loading...</div>}>
        <FailureContent />
      </Suspense>
    </div>
  );
}
