"use client";

import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  YAxis,
} from "recharts";
import { ChevronDown, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

// --- NEW: Compact Tooltip for Small Cards ---
function CardTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-white p-2 shadow-lg ring-1 ring-black/5">
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
          {payload[0].payload.name}
        </p>
        <div className="flex items-center gap-2">
          <div
            className="size-1.5 rounded-full"
            style={{ backgroundColor: payload[0].fill || payload[0].stroke }}
          />
          <span className="text-xs font-bold text-slate-900">
            {payload[0].value.toLocaleString()}
          </span>
        </div>
      </div>
    );
  }
  return null;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  data: any[];
  chartType: "bar" | "line";
  color: string;
  subStats?: { label: string; value: string; color: string }[];
}

export function MetricCard({
  title,
  value,
  change,
  isPositive,
  data,
  chartType,
  color,
  subStats,
}: MetricCardProps) {
  return (
    <div className="group rounded-[32px] border bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-500 group-hover:text-slate-900 transition-colors">
          {title}
        </span>
        <button className="flex items-center gap-1 rounded-lg border px-2 py-1 text-[10px] font-bold text-slate-500 hover:bg-slate-50">
          Weekly <ChevronDown size={12} />
        </button>
      </div>

      {/* Value & Trend */}
      <div className="flex items-baseline gap-2 mb-4">
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        <div
          className={cn(
            "flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full",
            isPositive
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-600"
          )}
        >
          {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {change}
        </div>
      </div>

      {/* Sub-labels */}
      {subStats && (
        <div className="flex gap-4 mb-6">
          {subStats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <div className={cn("size-2 rounded-full", stat.color)} />
              <span className="text-[10px] font-medium text-slate-400">
                <span className="text-slate-900 font-bold">{stat.value}</span>{" "}
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Mini Chart Area */}
      <div className="h-32 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart data={data}>
              <Tooltip
                content={<CardTooltip />}
                cursor={{ fill: "#f8fafc", radius: 4 }}
              />
              <Bar
                dataKey="val"
                fill={color}
                radius={[4, 4, 0, 0]}
                barSize={20}
                className="transition-opacity duration-300 hover:opacity-80"
              />
              <XAxis dataKey="name" hide />
            </BarChart>
          ) : (
            <LineChart data={data}>
              <Tooltip
                content={<CardTooltip />}
                cursor={{ fill: color, radius: 4 }}
              />
              <Line
                type="monotone"
                dataKey="val"
                stroke={color}
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0, fill: color }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Footer Axis Labels */}
      <div className="flex justify-between mt-2 px-1 text-[10px] font-bold text-slate-300">
        <span>Mon</span>
        <span>Wed</span>
        <span>Sun</span>
      </div>
    </div>
  );
}
