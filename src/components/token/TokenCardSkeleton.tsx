"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const TokenCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#0d0e12] border-b border-[#1a1c20] px-3 py-2.5">
      <div className="flex items-start gap-3">
        {/* LEFT: Logo + Address */}
        <div className="flex flex-col items-start flex-shrink-0">
          <Skeleton className="w-14 h-14 rounded-lg" />
          <Skeleton className="w-16 h-2.5 mt-2" />
        </div>
        
        {/* CENTER: Token info */}
        <div className="flex-1 min-w-0">
          {/* Row 1: Symbol + Name + Age + Icons */}
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-20 h-3" />
            <Skeleton className="w-8 h-3" />
            <Skeleton className="w-5 h-3" />
            <Skeleton className="w-5 h-3" />
            <Skeleton className="w-5 h-3" />
            <Skeleton className="w-10 h-3" />
            <Skeleton className="w-8 h-3" />
            <Skeleton className="w-8 h-3" />
          </div>
          
          {/* Row 2: 5 Percentage Pills */}
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-5 rounded" />
            <Skeleton className="w-12 h-5 rounded" />
            <Skeleton className="w-12 h-5 rounded" />
            <Skeleton className="w-12 h-5 rounded" />
            <Skeleton className="w-12 h-5 rounded" />
          </div>
        </div>
        
        {/* RIGHT: Market Data */}
        <div className="flex-shrink-0 text-right min-w-[100px] space-y-1.5">
          <Skeleton className="w-20 h-4 ml-auto" />
          <Skeleton className="w-16 h-3 ml-auto" />
          <Skeleton className="w-24 h-2.5 ml-auto mt-1" />
          <Skeleton className="w-full h-7 mt-2 rounded" />
        </div>
      </div>
    </div>
  );
};
