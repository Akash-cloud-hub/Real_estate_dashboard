"use client";

import React from "react";
import { MessageSquare, Smile, Meh, Frown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const recentCalls = [
  {
    id: 1,
    customer: "Sarah Jenkins",
    intent: "Buying",
    summary:
      "Interested in 3-bed semi in Westside. Wants a viewing Thursday afternoon.",
    sentiment: "positive",
    time: "2 mins ago",
  },
  {
    id: 2,
    customer: "Marcus Holloway",
    intent: "Selling",
    summary:
      "Requesting valuation for a penthouse. Sounded urgent due to relocation.",
    sentiment: "positive",
    time: "15 mins ago",
  },
  {
    id: 3,
    customer: "Unknown Caller",
    intent: "Management",
    summary:
      "Complaint regarding broken boiler. AI provided emergency contact info.",
    sentiment: "negative",
    time: "1 hour ago",
  },
  // {
  //   id: 4,
  //   customer: "Leonard Hofstadter",
  //   intent: "Buying",
  //   summary: "Checking if the $450k listing is still available. Scheduled a callback.",
  //   sentiment: "neutral",
  //   time: "3 hours ago",
  // },
];

const sentimentConfig = {
  positive: {
    icon: Smile,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    label: "Positive",
  },
  neutral: {
    icon: Meh,
    color: "text-amber-600",
    bg: "bg-amber-50",
    label: "Neutral",
  },
  negative: {
    icon: Frown,
    color: "text-rose-600",
    bg: "bg-rose-50",
    label: "Frustrated",
  },
};

export function RecentSentiment() {
  return (
    <div className="rounded-[32px] border bg-white p-8 shadow-sm h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Recent Sentiment</h3>
          <p className="text-sm text-slate-500">
            Live feed from the last 5 calls
          </p>
        </div>
        <button className="text-xs font-bold text-violet-600 hover:underline flex items-center gap-1">
          View all logs <ArrowRight size={14} />
        </button>
      </div>

      <div className="space-y-6">
        {recentCalls.map((call) => {
          const config =
            sentimentConfig[call.sentiment as keyof typeof sentimentConfig];
          return (
            <div
              key={call.id}
              className="group relative flex items-start gap-4"
            >
              {/* Vertical line for the feed look */}
              <div className="absolute left-5 top-10 h-10 w-px bg-slate-100 last:hidden" />

              <div
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-full border shadow-sm",
                  config.bg
                )}
              >
                <config.icon className={config.color} size={20} />
              </div>

              <div className="flex-1 border-b border-slate-50 pb-6 group-last:border-none">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-bold text-slate-900">
                    {call.customer}
                  </h4>
                  <span className="text-[10px] font-medium text-slate-400">
                    {call.time}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {call.intent}
                  </span>
                  <span className={cn("text-[10px] font-bold", config.color)}>
                    • {config.label}
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-slate-600 bg-slate-50/50 p-3 rounded-xl border border-slate-100 group-hover:bg-white group-hover:border-violet-100 transition-colors">
                  "{call.summary}"
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
