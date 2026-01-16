"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { Zap, TrendingUp, MapPin, DollarSign, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const data = [
  {
    hour: "8am",
    calls: 40,
    buyers: 20,
    sellers: 15,
    city: "Downtown",
    avgPrice: "$450k",
  },
  {
    hour: "10am",
    calls: 85,
    buyers: 50,
    sellers: 25,
    city: "Westside",
    avgPrice: "$620k",
  },
  {
    hour: "12pm",
    calls: 60,
    buyers: 30,
    sellers: 20,
    city: "East End",
    avgPrice: "$380k",
  },
  {
    hour: "2pm",
    calls: 95,
    buyers: 60,
    sellers: 30,
    city: "Downtown",
    avgPrice: "$470k",
  },
  {
    hour: "4pm",
    calls: 120,
    buyers: 80,
    sellers: 35,
    city: "North Port",
    avgPrice: "$850k",
  }, // PEAK
  {
    hour: "6pm",
    calls: 70,
    buyers: 40,
    sellers: 20,
    city: "Westside",
    avgPrice: "$590k",
  },
  {
    hour: "8pm",
    calls: 50,
    buyers: 25,
    sellers: 20,
    city: "Suburbs",
    avgPrice: "$410k",
  },
];

export function MarketPulse() {
  return (
    <div className="relative overflow-hidden rounded-[32px] border bg-white p-8 shadow-sm transition-all hover:shadow-md">
      {/* BACKGROUND ACCENT */}
      <div className="absolute -left-10 -bottom-10 size-64 rounded-full bg-cyan-500/5 blur-[80px]" />

      {/* TOP SECTION: TITLE & STATS REVERSED */}
      <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-start mb-10">
        {/* TOP LEFT: DATA LABELS (The "Personal Touch" Info Card) */}
        <div className="flex flex-wrap gap-4 lg:max-w-md">
          <header className="w-full mb-2">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Zap className="text-amber-400 fill-amber-400" size={20} />
              Market Pulse
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Real-time demand density & local hotspots
            </p>
          </header>

          <div className="grid grid-cols-2 gap-3 w-full">
            <PulseBadge
              icon={MapPin}
              label="Hot Location"
              value="North Port"
              color="text-violet-600"
            />
            <PulseBadge
              icon={DollarSign}
              label="Avg. Price"
              value="$512k"
              color="text-cyan-600"
            />
            <PulseBadge
              icon={Users}
              label="Top Intent"
              value="64% Buyers"
              color="text-blue-600"
            />
            <PulseBadge
              icon={TrendingUp}
              label="Peak Velocity"
              value="4pm - 5pm"
              color="text-emerald-600"
            />
          </div>
        </div>

        {/* TOP RIGHT: FILTER & GROWTH */}
        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-emerald-100">
            <TrendingUp size={14} />+ 18.4% Activity
          </div>
          <select className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-violet-200">
            <option>All Locations</option>
            <option>Downtown</option>
            <option>Westside</option>
          </select>
        </div>
      </div>

      {/* CHART SECTION */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20 }}>
            <XAxis
              dataKey="hour"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
            />
            <Tooltip
              cursor={{ fill: "#f1f5f9", radius: 12 }}
              content={<CustomPulseTooltip />}
            />
            <Bar dataKey="calls" radius={[12, 12, 12, 12]} barSize={45}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.calls > 90 ? "url(#colorPeak)" : "url(#colorNormal)"
                  }
                  className="transition-all duration-500 hover:brightness-110"
                />
              ))}
            </Bar>
            {/* GRADIENT DEFINITIONS */}
            <defs>
              <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#818cf8" stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="colorPeak" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c084fc" stopOpacity={1} />
                <stop offset="95%" stopColor="#818cf8" stopOpacity={1} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function PulseBadge({ icon: Icon, label, value, color }: any) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 border border-transparent hover:border-slate-200 transition-colors">
      <div className={cn("rounded-lg bg-white p-2 shadow-sm", color)}>
        <Icon size={16} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
          {label}
        </p>
        <p className="text-xs font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function CustomPulseTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="rounded-[24px] border bg-white/80 backdrop-blur-xl p-5 shadow-2xl ring-1 ring-black/5 min-w-[200px]">
        <div className="mb-3 flex items-center justify-between border-b pb-2">
          <span className="text-sm font-black text-slate-900">
            {d.hour} Pulse
          </span>
          <span className="rounded-full bg-violet-600 px-2 py-0.5 text-[10px] font-bold text-white">
            LIVE
          </span>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-slate-500 italic">
              Target Area:
            </span>
            <span className="text-xs font-bold text-slate-900">{d.city}</span>
          </div>
          <div className="flex justify-between items-center text-violet-600">
            <span className="text-xs font-medium">Activity:</span>
            <span className="text-sm font-black underline underline-offset-4">
              {d.calls} Calls
            </span>
          </div>
          <div className="rounded-xl bg-violet-50 p-2 text-[10px] text-violet-700 font-bold leading-tight">
            💡 AI Advice: High "{d.avgPrice}" price inquiries. Push listings in{" "}
            {d.city} now.
          </div>
        </div>
      </div>
    );
  }
  return null;
}
