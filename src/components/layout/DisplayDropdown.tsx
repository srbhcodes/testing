"use client";

import React, { useState } from "react";
import { 
  ChevronDown, 
  Menu, 
  Zap, 
  Sun, 
  Search, 
  Hash, 
  Eye, 
  Square, 
  RefreshCw, 
  Grid 
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface DisplayDropdownProps {
  showDisplayDropdown: boolean;
  setShowDisplayDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const TABS = ["Layout", "Metrics", "Row", "Extras"];

const metrics = [
  { label: "Small", value: "MC 77K", active: false },
  { label: "Large", value: "MC 77K", active: true },
];

const quickBuy = [
  { label: "Small", active: true },
  { label: "Large", active: false },
  { label: "Mega", active: false },
  { label: "Ultra", active: false },
];

const layoutOptions = [
  { label: "Show Search Bar", icon: Search },
  { label: "No Decimals", icon: Hash },
  { label: "Show Hidden Tokens", icon: Eye },
  { label: "Unhide on Migrated", icon: Eye, indent: true },
  { label: "Circle Images", icon: Square },
  { label: "Progress Bar", icon: RefreshCw },
  { label: "Spaced Tables", icon: Grid },
];

const customizeRows = [
  "Image Reuse", "Market Cap", "Volume", "Fees",
  "TX", "Socials", "Holders", "Pro Traders", "KOLs",
  "Dev Migrations", "Dev Creations", "Recent Visitors",
  "Top 10 Holders", "Dev Holding", "Tracked Dev",
  "Funding Time", "Tax", "Snipers", "Insiders",
  "Bundlers", "Dex Paid"
];

const activeRows = ["Market Cap", "Volume", "Fees", "Recent Visitors", "Snipers", "Insiders"];

const DisplayDropdown: React.FC<DisplayDropdownProps> = ({
  showDisplayDropdown,
  setShowDisplayDropdown
}) => {
  const [activeTab, setActiveTab] = useState("Layout");

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1c20] hover:bg-[#2a2c30] text-white text-[13px] font-bold rounded-md border border-white/5 transition-colors"
        onClick={() => setShowDisplayDropdown(v => !v)}
      >
        <Menu className="w-4 h-4" />
        Display
        <ChevronDown className="w-3.5 h-3.5 opacity-50 ml-1" />
      </button>

      {showDisplayDropdown && (
        <div className="absolute right-0 top-full mt-2 w-[340px] bg-[#0d0e12] border border-[#1a1c20] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] flex flex-col overflow-hidden">
          
          <div className="p-4 space-y-5">
            {/* --- Metrics --- */}
            <div className="space-y-2">
              <div className="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Metrics</div>
              <div className="flex gap-2">
                {metrics.map((m) => (
                  <button
                    key={m.label}
                    className={cn(
                      "flex-1 py-2 px-3 rounded-lg border flex flex-col items-center justify-center transition-all",
                      m.active 
                        ? "bg-[#252830] border-white/10 text-white" 
                        : "bg-transparent border-white/5 text-gray-500 hover:border-white/10"
                    )}
                  >
                    <span className="text-[14px] font-bold">{m.value}</span>
                    <span className="text-[10px] uppercase tracking-wide opacity-60">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* --- Quick Buy --- */}
            <div className="space-y-2">
              <div className="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Quick Buy</div>
              <div className="grid grid-cols-4 gap-2">
                {quickBuy.map(({ label, active }) => (
                  <button
                    key={label}
                    className={cn(
                      "py-2 rounded-lg border flex flex-col items-center justify-center transition-all",
                      active 
                        ? "bg-blue-600/20 border-blue-500/50 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]" 
                        : "bg-[#1a1c20] border-white/5 text-gray-500 hover:border-white/10"
                    )}
                  >
                    <div className={cn(
                      "flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold mb-1",
                      active ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-500"
                    )}>
                      <Zap className="w-2.5 h-2.5 fill-current" />
                      7
                    </div>
                    <span className="text-[11px]">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* --- Theme --- */}
            <div className="flex items-center gap-2 text-[12px] font-bold text-gray-300">
              <Sun className="w-4 h-4 text-gray-500" />
              Grey
            </div>

            {/* --- Tabs --- */}
            <div className="flex gap-1 p-1 bg-[#1a1c20] rounded-lg">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "flex-1 py-1 text-[11px] font-bold rounded-md transition-all",
                    activeTab === tab 
                      ? "bg-[#2d3039] text-white shadow-sm" 
                      : "text-gray-500 hover:text-gray-300"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* --- Options List --- */}
            <div className="space-y-3 pt-1">
              {layoutOptions.map((o) => (
                <div 
                  key={o.label} 
                  className={cn(
                    "flex items-center justify-between group cursor-pointer",
                    o.indent && "pl-6"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <o.icon className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-[12px] font-medium text-gray-300 group-hover:text-white transition-colors">
                      {o.label}
                    </span>
                  </div>
                  <div className="w-4 h-4 rounded border border-white/10 bg-[#1a1c20] group-hover:border-white/20 transition-all"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/5 w-full"></div>

          {/* --- Customize Rows --- */}
          <div className="p-4 space-y-3">
            <div className="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Customize rows</div>
            <div className="flex flex-wrap gap-1.5">
              {customizeRows.map(row => {
                const isActive = activeRows.includes(row);
                return (
                  <button
                    key={row}
                    className={cn(
                      "px-2.5 py-1 text-[10px] font-bold rounded-md border transition-all",
                      isActive
                        ? "bg-[#1a1c20] border-white/10 text-gray-300"
                        : "bg-transparent border-white/5 text-gray-600 hover:border-white/10"
                    )}
                  >
                    {row}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayDropdown;
