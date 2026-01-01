"use client";

import React from "react";
import DisplayDropdown from "./DisplayDropdown";
import { RefreshCw, Star, ExternalLink, Info, Bookmark, Save, Volume2, VolumeX, ChevronDown, Menu } from "lucide-react";

export interface ControlBarProps {
  showDisplayDropdown: boolean;
  setShowDisplayDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const ControlBar: React.FC<ControlBarProps> = ({ showDisplayDropdown, setShowDisplayDropdown }) => (
  <div className="w-full bg-[#0a0b0d]">
    
    {/* ROW 1: Icons (⊕ ★ ↗) - FIRST like OG */}
    <div className="flex items-center px-3 py-1.5 border-b border-[#1a1c20]">
      <div className="flex items-center gap-1">
        <button className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded transition-colors" aria-label="Refresh">
          <RefreshCw className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-gray-500 hover:text-yellow-400 hover:bg-white/5 rounded transition-colors" aria-label="Favorite">
          <Star className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded transition-colors" aria-label="Export">
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>

    {/* GAP - empty space like OG */}
    <div className="h-6 bg-[#0a0b0d]"></div>

    {/* ROW 2: Pulse label + Display controls - AFTER gap like OG */}
    <div className="flex items-center justify-between px-3 py-2">
      {/* LEFT: Pulse label + icons */}
      <div className="flex items-center gap-2">
        <span className="text-white font-medium text-sm">Pulse</span>
        <button className="p-1 text-blue-500 hover:text-blue-400 transition-colors" aria-label="Menu">
          <Menu className="w-4 h-4" />
        </button>
        <span className="w-4 h-4 rounded-full bg-orange-500"></span>
      </div>

      {/* RIGHT: Display controls */}
      <div className="flex items-center gap-1.5">
        <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
          <Info className="w-4 h-4" />
        </button>
        <DisplayDropdown showDisplayDropdown={showDisplayDropdown} setShowDisplayDropdown={setShowDisplayDropdown} />
        <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
          <Bookmark className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
          <Save className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
          <Volume2 className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
          <VolumeX className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1 bg-[#1a1c20] rounded px-2 py-1 text-gray-400 text-xs cursor-pointer hover:bg-[#2a2c30] transition-colors ml-1">
          <span>1</span>
          <span>=</span>
          <span>0</span>
          <ChevronDown className="w-3 h-3 ml-0.5" />
        </div>
      </div>
    </div>
  </div>
);

export default ControlBar;
