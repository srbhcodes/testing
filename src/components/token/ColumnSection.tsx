"use client";

import React, { useState, useMemo, useCallback, memo } from "react";
import { Zap, Menu, SlidersHorizontal } from "lucide-react";
import { TokenCard } from "./TokenCard";
import { Token, SortableField } from "@/types";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ColumnSectionProps {
  title: string;
  tokens: Token[];
  count: number;
  isNewPairs?: boolean;
}

type Priority = '1' | '2' | '3';
type SortDirection = 'asc' | 'desc';

interface SortOption {
  field: SortableField;
  label: string;
}

const SORT_OPTIONS: SortOption[] = [
  { field: 'marketCap', label: 'Market Cap' },
  { field: 'volume24h', label: 'Volume' },
  { field: 'priceChange24h', label: 'Price Change' },
  { field: 'holders', label: 'Holders' },
  { field: 'createdAt', label: 'Age' },
  { field: 'liquidity', label: 'Liquidity' },
];

const ColumnSectionComponent: React.FC<ColumnSectionProps> = ({
  title,
  tokens,
  count,
  isNewPairs = false,
}) => {
  const [selectedPriority, setSelectedPriority] = useState<Priority>('1');
  const [sortField, setSortField] = useState<SortableField>('volume24h');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const sortedTokens = useMemo(() => {
    return [...tokens].sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      if (sortField === 'createdAt') {
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
      } else {
        aValue = a[sortField] as number;
        bValue = b[sortField] as number;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });
  }, [tokens, sortField, sortDirection]);

  const handleSort = useCallback((field: SortableField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  }, [sortField]);

  const handlePriorityChange = useCallback((p: Priority) => {
    setSelectedPriority(p);
  }, []);
  
  return (
    <section 
      className="flex-1 h-full min-h-0 flex flex-col overflow-hidden bg-[#0d0e12]"
      aria-label={`${title} tokens column`}
    >
      {/* Column Header - OG Style */}
      <header className="flex items-center justify-between px-3 py-2 border-b border-[#1a1c20] flex-shrink-0">
        {/* Left: Title */}
        <h2 className="text-white font-medium text-xs">
          {title}
        </h2>
        
        {/* Right: Controls - Grouped in a pill container like OG */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#1a1c20]/40 border border-[#2a2c30]/50 rounded-full px-1 py-0.5">
            {/* Segment 1: Lightning + Count */}
            <div className="flex items-center gap-1 px-1.5 border-r border-[#2a2c30]/50">
              <Zap className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="text-gray-400 text-[11px] font-medium">{count}</span>
            </div>
            
            {/* Segment 2: Menu/Sort Icon */}
            <div className="px-1 border-r border-[#2a2c30]/50">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-500 hover:text-white transition-colors p-1">
                    <Menu className="w-3 h-3" />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-40 p-2 bg-[#1a1c20] border-[#2a2c30]">
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-500 px-2 pb-1 border-b border-gray-700">Sort by</p>
                    {SORT_OPTIONS.map((option) => (
                      <button
                        key={option.field}
                        onClick={() => handleSort(option.field)}
                        className={cn(
                          "w-full text-left px-2 py-1.5 rounded text-xs transition-colors",
                          sortField === option.field
                            ? "bg-blue-600/20 text-blue-400"
                            : "text-gray-300 hover:bg-gray-800"
                        )}
                      >
                        {option.label}
                        {sortField === option.field && (
                          <span className="float-right">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Segment 3: P1 P2 P3 Buttons */}
            <div className="flex items-center gap-0.5 px-1.5">
              {(['1', '2', '3'] as Priority[]).map((p) => (
                <button 
                  key={p}
                  onClick={() => handlePriorityChange(p)} 
                  className={cn(
                    "px-1.5 py-0.5 text-[10px] font-medium transition-all",
                    selectedPriority === p 
                      ? "text-blue-400" 
                      : "text-gray-500 hover:text-gray-300"
                  )}
                >
                  P{p}
                </button>
              ))}
            </div>
          </div>
          
          {/* Last Icon with Dot - Outside the main pill like OG */}
          <div className="flex items-center gap-1 ml-0.5">
            <button className="text-gray-500 hover:text-white transition-colors">
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
          </div>
        </div>
      </header>
      
      {/* Token List */}
      <div 
        className="flex-1 overflow-y-auto scrollbar-thin"
        role="list"
      >
        <div>
          {sortedTokens.map((token) => (
            <div key={token.id} role="listitem">
              <TokenCard token={token} isNewPairs={isNewPairs} />
            </div>
          ))}
          {sortedTokens.length === 0 && (
            <div className="text-center py-12 text-gray-500 text-xs">
              No tokens in this category
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const ColumnSection = memo(ColumnSectionComponent);

export default ColumnSection;
