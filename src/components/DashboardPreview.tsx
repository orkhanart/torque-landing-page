"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  Gift,
  BarChart3,
  Users,
  MessageSquare,
  Settings,
  Search,
  ChevronDown,
  Plus,
  Sparkles,
} from "lucide-react";

// =============================================================================
// DashboardPreview - Realistic Torque Dashboard Mockup
// =============================================================================

// Mini sparkline chart component
const SparklineChart = ({ data, color = "#22c55e", height = 32 }: { data: number[]; color?: string; height?: number }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 100 ${height}`} className="w-16 h-8" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Stat card component
const StatCard = ({
  label,
  value,
  change,
  comparison,
  sparklineData
}: {
  label: string;
  value: string;
  change: string;
  comparison: string;
  sparklineData: number[];
}) => {
  const isPositive = change.startsWith('+') || !change.startsWith('-');

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 relative">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">{label}</span>
        <button className="text-gray-300 hover:text-gray-400">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-gray-900">{value}</span>
            <span className={cn(
              "text-sm font-medium",
              isPositive ? "text-green-500" : "text-red-500"
            )}>
              {isPositive ? "↗" : "↘"}{change}
            </span>
          </div>
          <div className="text-xs text-gray-400 mt-1">{comparison}</div>
        </div>
        <SparklineChart
          data={sparklineData}
          color={isPositive ? "#22c55e" : "#ef4444"}
        />
      </div>
    </div>
  );
};

// Segment item component
const SegmentItem = ({ color, name }: { color: string; name: string }) => (
  <div className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-50 cursor-pointer text-sm text-gray-600">
    <span className={cn("w-2 h-2 rounded-full", color)} />
    <span>{name}</span>
  </div>
);

// Navigation item component
const NavItem = ({
  icon: Icon,
  label,
  active = false
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}) => (
  <div className={cn(
    "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors text-sm",
    active
      ? "bg-[#7C3AED]/10 text-[#7C3AED] font-medium"
      : "text-gray-600 hover:bg-gray-50"
  )}>
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </div>
);

// Recent chat item
const RecentChatItem = ({ text, time }: { text: string; time: string }) => (
  <div className="py-2 cursor-pointer hover:bg-gray-50 rounded px-2 -mx-2">
    <div className="text-sm text-gray-700 truncate">{text}</div>
    <div className="text-xs text-gray-400 mt-0.5">{time}</div>
  </div>
);

const DashboardPreview = () => {
  const [activeTimePeriod, setActiveTimePeriod] = useState("7d");
  const [animatedValues, setAnimatedValues] = useState({
    volume: "$74.07M",
    trades: "909K",
    sessions: "72K"
  });

  // Animate values periodically to show "live" feel
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedValues({
        volume: `$${(74 + Math.random() * 0.1).toFixed(2)}M`,
        trades: `${Math.floor(909 + Math.random() * 2)}K`,
        sessions: `${Math.floor(72 + Math.random() * 1)}K`
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#FAFAFA] rounded-xl border border-gray-200 shadow-2xl overflow-hidden">
      <div className="flex min-h-[480px]">
        {/* Sidebar */}
        <div className="w-52 bg-white border-r border-gray-100 flex flex-col p-4">
          {/* Logo */}
          <div className="flex items-center gap-2 px-2 mb-6">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-semibold text-gray-900">TORQUE</span>
          </div>

          {/* Protocol Selector */}
          <div className="mb-4 px-1">
            <button className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors">
              <span>Raydium</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* New Incentive Button */}
          <button className="mx-1 mb-6 flex items-center justify-center gap-2 px-3 py-2.5 bg-[#7C3AED] text-white rounded-lg text-sm font-medium hover:bg-[#6D28D9] transition-colors">
            <Plus className="w-4 h-4" />
            <span>New Incentive</span>
          </button>

          {/* Navigation */}
          <nav className="space-y-1 flex-1">
            <NavItem icon={Home} label="Home" active />
            <NavItem icon={Gift} label="Incentives" />
            <NavItem icon={BarChart3} label="Trading Analytics" />
            <NavItem icon={Users} label="Users" />
            <NavItem icon={MessageSquare} label="Queries" />
          </nav>

          {/* Recent Chats */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs text-gray-500 uppercase font-medium">Recent Chats</span>
              <span className="text-xs text-[#7C3AED] cursor-pointer hover:underline">View All</span>
            </div>
            <div className="space-y-0.5">
              <RecentChatItem text="For users that received reward..." time="about 7 hours" />
              <RecentChatItem text="can you plot out our performan..." time="about 7 hours" />
            </div>
          </div>

          {/* Segments */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-xs text-gray-500 uppercase font-medium mb-2 px-1">Segments</div>
            <div className="space-y-0.5">
              <SegmentItem color="bg-green-400" name="Accumulators" />
              <SegmentItem color="bg-blue-500" name="Active Small Traders" />
              <SegmentItem color="bg-amber-400" name="Consistent Traders" />
              <SegmentItem color="bg-emerald-400" name="Streak Mastery" />
              <SegmentItem color="bg-blue-600" name="Whales" />
            </div>
          </div>

          {/* Settings */}
          <div className="mt-auto pt-4 border-t border-gray-100">
            <NavItem icon={Settings} label="Settings" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="h-14 border-b border-gray-100 bg-white flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 text-gray-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </div>
              <span className="font-semibold text-gray-900">Home</span>
              <span className="text-gray-300">⓿</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search wallet..."
                  className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
                />
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 bg-gray-200 rounded-md"></div>
                <span className="text-sm text-gray-600">torrS...i8XZz</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-auto">
            {/* Protocol Overview Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ChevronDown className="w-4 h-4 text-[#7C3AED]" />
                <span className="text-[#7C3AED] font-medium">Protocol Overview</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex bg-gray-100 rounded-lg p-0.5">
                  {["7d", "30d", "90d"].map((period) => (
                    <button
                      key={period}
                      onClick={() => setActiveTimePeriod(period)}
                      className={cn(
                        "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                        activeTimePeriod === period
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      )}
                    >
                      {period}
                    </button>
                  ))}
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  Artifacts
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <StatCard
                label="VOLUME"
                value={animatedValues.volume}
                change="+43.5%"
                comparison="of $51.62M last period"
                sparklineData={[20, 25, 22, 30, 35, 32, 45, 50, 48, 60]}
              />
              <StatCard
                label="TRADES"
                value={animatedValues.trades}
                change="+47.7%"
                comparison="of 615K last period"
                sparklineData={[30, 35, 40, 38, 45, 50, 55, 60, 65, 70]}
              />
              <StatCard
                label="SESSIONS"
                value={animatedValues.sessions}
                change="+14%"
                comparison="of 63K last period"
                sparklineData={[40, 42, 45, 43, 48, 50, 52, 55, 53, 58]}
              />
            </div>

            {/* AI Chat Section */}
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-sm text-gray-400 mb-2">Good evening</div>
              <div className="flex items-center gap-2 text-xl font-semibold text-gray-900 mb-6">
                <Sparkles className="w-5 h-5 text-[#7C3AED]" />
                <span>Let&apos;s grow your protocol</span>
              </div>
              <div className="w-full max-w-lg">
                <div className="relative bg-white border border-gray-200 rounded-xl shadow-sm">
                  <input
                    type="text"
                    placeholder="How can we drive growth today?"
                    className="w-full px-4 py-3.5 pr-24 text-sm text-gray-600 placeholder:text-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-500 font-mono">Enter</kbd>
                      <span className="ml-1">to send</span>
                    </span>
                    <span className="text-xs font-medium text-gray-400">Torque AI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
