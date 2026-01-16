"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Filter, ChevronDown } from "lucide-react";

const data = [
  { name: "Mon", messages: 400, calls: 240, time: 100 },
  { name: "Tue", messages: 300, calls: 139, time: 200 },
  { name: "Wed", messages: 200, calls: 680, time: 150 }, // The "Highlighted" day
  { name: "Thu", messages: 278, calls: 390, time: 100 },
  { name: "Fri", messages: 189, calls: 480, time: 120 },
  { name: "Sat", messages: 239, calls: 380, time: 80 },
  { name: "Sun", messages: 349, calls: 430, time: 110 },
];



export function TotalOverview() {
  return (
    <div className="relative overflow-hidden rounded-[32px] border bg-white p-8 shadow-sm">
      {/* 1. MESH GRADIENT BACKGROUND EFFECT */}
      <div className="absolute -right-20 -top-20 size-80 rounded-full bg-indigo-500/10 blur-[100px]" />
      <div className="absolute -right-10 -top-10 size-60 rounded-full bg-purple-500/10 blur-[80px]" />

      {/* 2. HEADER SECTION */}
      <div className="relative z-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Total overview</h2>
          <p className="text-sm text-slate-500">
            Your average daily activity over the last 7 days is{" "}
            <span className="font-bold text-slate-900">67%</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-600">
            + 24%
          </div>
          <button className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Filter size={16} /> Filter
          </button>
          <button className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
            Weekly <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* 3. LEGEND / STATS (Left Side) */}
        <div className="z-10 flex flex-col justify-center space-y-6 lg:col-span-4">
          <StatRow color="bg-indigo-400" label="Messages" percent="29%" />
          <StatRow color="bg-amber-400" label="Calls" percent="24%" />
          <StatRow color="bg-cyan-400" label="Time on call" percent="8%" />
          <StatRow
            color="bg-emerald-400"
            label="Top conversations"
            percent="6%"
          />
        </div>

        {/* 4. THE CHART (Right Side) */}
        <div className="h-[300px] w-full lg:col-span-8">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={8}>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                dy={10}
              />
              <Tooltip
                cursor={{ fill: "#f8fafc" }}
                content={<CustomTooltip />}
              />
              {/* Stacked Bars */}
              <Bar
                dataKey="time"
                stackId="a"
                fill="#22d3ee"
                radius={[0, 0, 0, 0]}
                barSize={40}
              />
              <Bar
                dataKey="calls"
                stackId="a"
                fill="#fbbf24"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="messages"
                stackId="a"
                fill="#818cf8"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function StatRow({
  color,
  label,
  percent,
}: {
  color: string;
  label: string;
  percent: string;
}) {
  return (
    <div className="flex items-center justify-between group cursor-default">
      <div className="flex items-center gap-3">
        <div className={cn("size-3 rounded-sm", color)} />
        <span className="text-sm font-medium text-slate-500 group-hover:text-slate-900 transition-colors">
          {label}
        </span>
      </div>
      <span className="text-sm font-bold text-slate-900">{percent}</span>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-2xl border bg-white p-4 shadow-xl">
        <p className="mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
          {label}, 2026
        </p>
        <div className="space-y-2">
          {payload.map((entry: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between gap-8"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <div
                  className="size-2 rounded-full"
                  style={{ backgroundColor: entry.fill }}
                />
                {entry.name}
              </div>
              <span className="text-xs font-bold">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

// Utility to merge classes (standard shadcn)
function cn(...inputs: any) {
  return inputs.filter(Boolean).join(" ");
}
