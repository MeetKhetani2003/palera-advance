"use client";

import React, { useState } from "react";
import {
  Lock,
  Users,
  Phone,
  Mail,
  Calendar,
  LogOut,
  RefreshCw,
} from "lucide-react";

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/leads", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${password}`,
        },
      });

      if (!res.ok) {
        throw new Error("Incorrect Password");
      }

      const data = await res.json();
      setLeads(data.leads);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    setLeads([]);
  };

  const formatDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div className="max-w-sm w-full bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 text-center">
          <div className="w-16 h-16 bg-[#0A1628]/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={32} className="text-[#0A1628]" />
          </div>
          <h1 className="text-2xl font-bold text-[#0A1628] mb-2">
            Admin Portal
          </h1>
          <p className="text-sm text-slate-500 mb-6">
            Enter your static password to view leads.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-center text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#00C39A] focus:border-transparent outline-none transition-all"
            />
            {error && (
              <p className="text-rose-500 text-xs font-semibold">{error}</p>
            )}
            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full bg-[#0A1628] hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-50"
            >
              {isLoading ? "Verifying..." : "Access Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- DASHBOARD SCREEN ---
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Top Navigation */}
      <div className="bg-white sticky top-0 z-10 border-b border-slate-200 px-4 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-[#00C39A]/10 p-2 rounded-lg">
            <Users size={20} className="text-[#00C39A]" />
          </div>
          <h1 className="font-bold text-[#0A1628] text-lg">
            Leads ({leads.length})
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleLogin()}
            className="p-2 text-slate-400 hover:text-[#00C39A] transition-colors"
          >
            <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={handleLogout}
            className="p-2 text-rose-400 hover:text-rose-600 transition-colors"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Leads List (Mobile Friendly Cards) */}
      <div className="p-4 space-y-4 max-w-2xl mx-auto">
        {leads.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p>No leads found in the database yet.</p>
          </div>
        ) : (
          leads.map((lead) => (
            <div
              key={lead._id}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 relative overflow-hidden"
            >
              {/* Status Indicator Bar */}
              <div
                className={`absolute top-0 left-0 w-1 h-full ${
                  lead.status === "Paid" ? "bg-[#00C39A]" : "bg-amber-400"
                }`}
              />

              <div className="flex justify-between items-start mb-3 pl-2">
                <h2 className="font-bold text-[#0A1628] text-lg leading-tight">
                  {lead.name}
                </h2>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    lead.status === "Paid"
                      ? "bg-[#00C39A]/10 text-[#00C39A]"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {lead.status}
                </span>
              </div>

              <div className="space-y-2.5 pl-2">
                <a
                  href={`tel:${lead.phone}`}
                  className="flex items-center gap-3 text-sm text-slate-600 hover:text-[#00C39A]"
                >
                  <Phone size={14} className="text-slate-400" />
                  {lead.phone}
                </a>
                <a
                  href={`mailto:${lead.email}`}
                  className="flex items-center gap-3 text-sm text-slate-600 hover:text-[#00C39A]"
                >
                  <Mail size={14} className="text-slate-400" />
                  <span className="truncate">{lead.email}</span>
                </a>
                <div className="flex items-center gap-3 text-xs text-slate-400 pt-2 border-t border-slate-50 mt-2">
                  <Calendar size={12} />
                  {formatDate(lead.createdAt)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
