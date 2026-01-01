/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAppSelector } from "@/hooks/useRedux";
import {
  ChevronDown,
  Bell,
  Settings,
  FileText,
  Layout,
  Palette,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const regionList = [
  "US-W",
  "US-C",
  "US-E",
  "EU-W",
  "EU-C",
  "EU-E",
  "ASIA",
  "AUS",
  "GLOBAL"
];

const SolIcon = ({ className }: { className?: string }) => (
  <svg width="10" height="10" viewBox="0 0 397 311" fill="currentColor" className={className}>
    <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7zM64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8zM333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"/>
  </svg>
);

const FOOTER_TABS = [
  { key: "wallet", label: "Wallet Tracker", alert: true },
  { key: "twitter", label: "Twitter Tracker", alert: true },
  { key: "discover", label: "Discover", alert: true },
  { key: "pulse", label: "Pulse Tracker", alert: true },
  { key: "pnl", label: "PnL Tracker", alert: false },
];

const PresetIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
    <circle cx="8" cy="6" r="2" fill="currentColor" />
    <circle cx="16" cy="12" r="2" fill="currentColor" />
    <circle cx="10" cy="18" r="2" fill="currentColor" />
  </svg>
);

export default function Footer() {
  const [showPresetDropdown, setShowPresetDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("pulse");
  const selectedPreset = useAppSelector((state) => state.preset?.selectedPreset || "PRESET 1");
  const [selectedRegion, setSelectedRegion] = useState(regionList[8]); // Default to GLOBAL
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);
  const presetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (showPresetDropdown && presetRef.current && !presetRef.current.contains(e.target as Node)) {
        setShowPresetDropdown(false);
      }
      if (showRegionDropdown && regionRef.current && !regionRef.current.contains(e.target as Node)) {
        setShowRegionDropdown(false);
      }
    }
    window.addEventListener('mousedown', handle);
    return () => window.removeEventListener('mousedown', handle);
  }, [showPresetDropdown, showRegionDropdown]);

  const switchTab = (key: string) => setActiveTab(key);

  return (
    <footer
      className="fixed z-50 bottom-0 left-0 right-0 w-full bg-[#0d0e12] border-t border-[#1a1c20] text-xs h-[36px] flex items-center"
    >
      <div className="flex items-center w-full px-2 gap-2 h-full">
        
        {/* 1. LEFT: PRESET */}
        <div className="flex items-center gap-1.5 flex-shrink-0" ref={presetRef}>
          <button
            className="flex items-center bg-[#2b39b9] hover:bg-[#202b8d] text-white font-bold text-[10px] h-[22px] px-2 rounded gap-1.5 transition-colors"
            onClick={() => setShowPresetDropdown((v) => !v)}
          >
            <PresetIcon />
            <span className="tracking-wide">{selectedPreset}</span>
            <ChevronDown className="w-2.5 h-2.5 opacity-60" />
          </button>
          
          {/* Wallet/Folder count */}
          <div className="flex items-center bg-[#16181c] border border-[#2a2c30] rounded px-2 h-[22px] gap-1.5 cursor-pointer hover:bg-[#1a1c22] transition-colors">
            <span className="text-white font-semibold text-[10px]">1</span>
            <Menu className="w-3 h-3 text-gray-500" />
            <span className="text-white font-semibold text-[10px]">0</span>
            <ChevronDown className="w-2.5 h-2.5 text-gray-600" />
          </div>
          
          <button className="p-1 hover:bg-white/5 rounded transition-colors">
            <Settings className="w-3.5 h-3.5 text-gray-500" />
          </button>
        </div>

        <div className="w-px h-4 bg-gray-700/50"></div>

        {/* 2. TABS - NO ICONS, just text */}
        <nav className="flex items-center gap-0.5 flex-shrink-0 h-full">
          {FOOTER_TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                className={cn(
                  "flex items-center gap-1 h-full px-2 transition-all relative",
                  isActive ? "text-white" : "text-gray-500 hover:text-gray-300"
                )}
                onClick={() => switchTab(tab.key)}
              >
                <span className="text-[11px] font-medium">{tab.label}</span>
                {tab.alert && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f14463]"></span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="w-px h-4 bg-gray-700/50"></div>

        {/* 3. MARKET TICKER - simple symbols */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Colored dots */}
            <div className="flex items-center gap-0.5">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            </div>
            
            {/* BTC */}
            <span className="flex items-center gap-1">
              <span className="text-[#F7931A] text-[10px]">₿</span>
              <span className="text-[#F7931A] text-[11px] font-bold">$87.8K</span>
            </span>
            
            {/* ETH */}
            <span className="flex items-center gap-1">
              <span className="text-[#627EEA] text-[10px]">◇</span>
              <span className="text-[#627EEA] text-[11px] font-bold">$2980</span>
            </span>
            
            {/* SOL */}
            <span className="flex items-center gap-1">
              <SolIcon className="text-[#14F195]" />
              <span className="text-[#14F195] text-[11px] font-bold">$125.11</span>
            </span>
          </div>
        </div>

        {/* 4. FAR RIGHT */}
        <div className="flex items-center ml-auto gap-3 flex-shrink-0">
          {/* Metrics */}
          <div className="hidden md:flex items-center gap-3 text-[10px] text-gray-500">
            <span>$51.4K</span>
            <span>⏱ 0.0:26</span>
            <span>◎ 0.003</span>
          </div>

          {/* Connection status */}
          <div className="flex items-center bg-[#14f195]/10 text-[#14f195] px-2 h-[20px] rounded gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#14f195] animate-pulse"></div>
            <span className="text-[9px] font-bold whitespace-nowrap uppercase tracking-wider">Connection is stable</span>
          </div>

          {/* Region */}
          <div className="relative" ref={regionRef}>
            <button
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest"
              onClick={() => setShowRegionDropdown(!showRegionDropdown)}
            >
              <span>{selectedRegion}</span>
              <ChevronDown className="w-2.5 h-2.5 opacity-50" />
            </button>
          </div>

          <div className="w-px h-4 bg-gray-700/50"></div>

          {/* Icons */}
          <div className="flex items-center gap-2 text-gray-500">
            <Layout className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" />
            <Bell className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" />
            <Palette className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" />
            <div className="w-px h-4 bg-gray-700/50"></div>
            {/* Discord */}
            <svg className="w-3.5 h-3.5 fill-current opacity-60 hover:opacity-100 cursor-pointer transition-all" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            {/* X/Twitter */}
            <X className="w-3.5 h-3.5 opacity-60 hover:opacity-100 cursor-pointer transition-all" />
            {/* Docs */}
            <div className="flex items-center gap-1 hover:text-white cursor-pointer group transition-colors">
              <FileText className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-300" />
              <span className="text-[10px] font-medium">Docs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Region Dropdown */}
      {showRegionDropdown && (
        <div className="absolute right-[100px] bottom-[40px] w-28 bg-[#16181c] border border-[#2a2c30] rounded shadow-2xl py-1 z-[60]">
          {regionList.map(region => (
            <button
              key={region}
              className={cn(
                "w-full text-left px-3 py-1.5 text-[10px] transition-colors font-bold tracking-wider",
                region === selectedRegion ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
              onClick={() => { setSelectedRegion(region); setShowRegionDropdown(false); }}
            >
              {region}
            </button>
          ))}
        </div>
      )}
    </footer>
  );
}
