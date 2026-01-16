import { TotalOverview } from "@/components/charts/TotalOverview";
import { MetricCard } from "@/components/charts/MetricCard";
import { PriceRangeChart } from "@/components/charts/PriceRangeChart";
import { HotspotsChart } from "@/components/charts/HotspotsChart";
import { RecentSentiment } from "@/components/charts/RecentSentiment";
import { MarketPulse } from "@/components/charts/MarketPulse";

const successData = [
  { name: "M", val: 40 },
  { name: "T", val: 30 },
  { name: "W", val: 65 },
  { name: "T", val: 45 },
  { name: "F", val: 50 },
  { name: "S", val: 20 },
  { name: "S", val: 35 },
];

const intentData = [
  { name: "M", val: 120 },
  { name: "T", val: 150 },
  { name: "W", val: 140 },
  { name: "T", val: 180 },
  { name: "F", val: 170 },
  { name: "S", val: 110 },
  { name: "S", val: 130 },
];

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome to your Dashboard
        </h1>
        <p className="text-slate-500 text-sm">
          Monitor your AI agent's performance and conversion metrics.
        </p>
      </div>

      {/* Main Charts Area */}
      <section className="w-full">
        <TotalOverview />
      </section>

      {/* This is where the 3-column grid for smaller cards will go next */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {/* CARD 1: Success Rate */}
        <MetricCard
          title="Total Wins (Visits/Valuations)"
          value="128"
          change="+12%"
          isPositive={true}
          chartType="bar"
          color="#818cf8" // Indigo
          data={successData}
          subStats={[
            { label: "Booked", value: "82", color: "bg-indigo-400" },
            { label: "Valuations", value: "46", color: "bg-indigo-200" },
          ]}
        />

        {/* CARD 2: Intent Breakdown */}
        <MetricCard
          title="Call Intent"
          value="842"
          change="-3%"
          isPositive={false}
          chartType="line"
          color="#fbbf24" // Amber
          data={intentData}
          subStats={[
            { label: "Buyers", value: "512", color: "bg-amber-400" },
            { label: "Sellers", value: "330", color: "bg-amber-200" },
          ]}
        />

        {/* CARD 3: Sentiment Score */}
        <MetricCard
          title="Customer Satisfaction"
          value="98%"
          change="+2%"
          isPositive={true}
          chartType="bar"
          color="#10b981" // Emerald
          data={successData} // Placeholder data
          subStats={[
            { label: "Positive", value: "92%", color: "bg-emerald-400" },
            { label: "Neutral", value: "6%", color: "bg-slate-200" },
          ]}
        />
      </div>

      {/* Market intelligence section with price demands and hot spots(areas that callers are mostly interested in) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <PriceRangeChart />
        <HotspotsChart />
      </div>

      {/* Inside overview/page.tsx */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
        {/* Live Feed (1/3 of the layout) */}
        <div className="lg:col-span-4">
          <RecentSentiment />
        </div>

        {/* Market Pulse (Occupies 8 out of 12 columns) */}
        <div className="lg:col-span-8">
          <MarketPulse />
        </div>
      </div>
    </div>
  );
}
