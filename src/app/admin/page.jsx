"use client";

import React, { useState, useMemo } from "react";
import {
  Lock,
  Users,
  Phone,
  Mail,
  Calendar,
  LogOut,
  RefreshCw,
  Search,
  Filter,
  ArrowUpDown,
  CreditCard,
  Package,
} from "lucide-react";

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

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

  // Memoized Search and Filter Logic
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.includes(searchQuery);

      const matchesFilter =
        filterStatus === "All" || lead.status === filterStatus;

      return matchesSearch && matchesFilter;
    });
  }, [leads, searchQuery, filterStatus]);

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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div className="max-w-sm w-full bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 text-center">
          <div className="w-16 h-16 bg-[#00C39A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={32} className="text-[#00C39A]" />
          </div>
          <h1 className="text-2xl font-bold text-[#0A1628] mb-2">
            Admin Portal
          </h1>
          <p className="text-sm text-slate-500 mb-6">Enter secure password.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="••••••••"
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

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Top Header */}
      <div className="bg-[#0A1628] text-white px-6 py-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <div className="bg-[#00C39A] p-2 rounded-lg text-white">
                <Users size={22} />
              </div>
              Dashboard
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Manage leads and transactions
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
          >
            <LogOut size={20} className="text-slate-300" />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto -mt-6 px-4">
        {/* Search and Filters Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-4 mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#00C39A]/20 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <Filter size={16} className="text-slate-400 mr-1 flex-shrink-0" />
            {["All", "Paid", "Pending Payment", "Failed"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  filterStatus === status
                    ? "bg-[#00C39A] text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {status === "Pending Payment" ? "Pending" : status}
              </button>
            ))}
            <button
              onClick={() => handleLogin()}
              className="ml-auto p-2 text-slate-400 hover:text-[#00C39A]"
            >
              <RefreshCw
                size={18}
                className={isLoading ? "animate-spin" : ""}
              />
            </button>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-4 px-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
          <span>Showing {filteredLeads.length} Records</span>
          <span className="flex items-center gap-1">
            <ArrowUpDown size={12} /> Newest First
          </span>
        </div>

        {/* Leads List */}
        <div className="space-y-4">
          {filteredLeads.length === 0 ? (
            <div className="bg-white rounded-2xl py-16 text-center border border-slate-200">
              <Package size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 font-medium">
                No results found matching your criteria.
              </p>
            </div>
          ) : (
            filteredLeads.map((lead) => (
              <div
                key={lead._id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 group hover:border-[#00C39A] transition-colors"
              >
                {/* --- CARD HEADER: Name, Plan, Amount & Status --- */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-[#0A1628] text-sm uppercase">
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="font-bold text-[#0A1628] leading-none text-base">
                        {lead.name}
                      </h2>
                      <span className="text-[10px] text-[#00C39A] font-bold uppercase tracking-wider mt-1 block">
                        {lead.plan || "Trial Pack"}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                        ID: {lead._id.slice(-8)}
                      </span>
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end">
                    <div className="text-sm font-bold text-[#0A1628]">
                      ₹{lead.amount || 799}
                    </div>
                    <span
                      className={`text-[9px] font-extrabold uppercase tracking-widest px-2 py-1 rounded-md border mt-1.5 inline-block ${
                        lead.status === "Paid"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : lead.status === "Failed"
                            ? "bg-rose-50 text-rose-600 border-rose-100"
                            : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}
                    >
                      {lead.status === "Pending Payment"
                        ? "Pending"
                        : lead.status}
                    </span>
                  </div>
                </div>
                {/* ------------------------------------------------ */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <a
                    href={`tel:${lead.phone}`}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl text-sm font-medium text-slate-700 hover:bg-[#00C39A]/10 hover:text-[#00C39A] transition-colors"
                  >
                    <Phone size={14} className="text-slate-400" />
                    {lead.phone}
                  </a>
                  <a
                    href={`mailto:${lead.email}`}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl text-sm font-medium text-slate-700 hover:bg-[#00C39A]/10 hover:text-[#00C39A] transition-colors group"
                  >
                    <Mail size={14} className="text-slate-400" />
                    <span className="truncate">{lead.email}</span>
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-tight">
                    <Calendar size={13} className="text-slate-300" />
                    {formatDate(lead.createdAt)}
                  </div>
                  {lead.paymentId && (
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-tight ml-auto">
                      <CreditCard size={13} className="text-slate-300" />
                      <span className="font-mono">{lead.paymentId}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
