"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const hotspotData = [
  { name: "Downtown", value: 450 },
  { name: "Westside", value: 380 },
  { name: "Oak Ridge", value: 310 },
  { name: "Sunset Valley", value: 240 },
  { name: "North Port", value: 180 },
];

export function HotspotsChart() {
  return (
    <div className="rounded-[32px] border bg-white p-8 shadow-sm col-span-1 lg:col-span-1">
      <h3 className="text-lg font-bold text-slate-900 mb-1">Area Hotspots</h3>
      <p className="text-sm text-slate-500 mb-6">Trending neighborhoods</p>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            layout="vertical" 
            data={hotspotData} 
            margin={{ left: -20, right: 20 }}
          >
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
              width={100}
            />
            <Tooltip cursor={{ fill: 'transparent' }} content={() => null} />
            <Bar 
              dataKey="value" 
              fill="#22d3ee" 
              radius={[0, 10, 10, 0]} 
              barSize={20} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 border-t pt-4">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-400 uppercase">Top Performer</span>
          <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Downtown</span>
        </div>
      </div>
    </div>
  );
}