"use client";

import React from "react";
import { 
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid 
} from "recharts";

const priceData = [
  { range: "$200k-300k", count: 45 },
  { range: "$300k-400k", count: 82 },
  { range: "$400k-500k", count: 140 }, // The peak
  { range: "$500k-600k", count: 95 },
  { range: "$600k-700k", count: 60 },
  { range: "$700k+", count: 30 },
];

export function PriceRangeChart() {
  return (
    <div className="rounded-[32px] border bg-white p-8 shadow-sm col-span-1 lg:col-span-2">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Price Demand</h3>
          <p className="text-sm text-slate-500">Most requested property price brackets</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-violet-600">$450k</span>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Median Request</p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={priceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="range" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
              dy={10}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-xl border bg-white p-3 shadow-xl">
                      <p className="text-xs font-bold text-slate-400 mb-1">{payload[0].payload.range}</p>
                      <p className="text-sm font-bold text-violet-600">{payload[0].value} Inquiries</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="count" 
              fill="#818cf8" 
              radius={[6, 6, 6, 6]} 
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}