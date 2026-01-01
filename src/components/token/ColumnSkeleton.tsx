"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TokenCardSkeleton } from "./TokenCardSkeleton";

interface ColumnSkeletonProps {
  title?: string;
  cardCount?: number;
}

export const ColumnSkeleton: React.FC<ColumnSkeletonProps> = ({ 
  title,
  cardCount = 5 
}) => {
  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#0d0e12]">
      {/* Column Header Skeleton */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A2A2A] flex-shrink-0">
        <div className="flex items-center space-x-2">
          {title ? (
            <span className="text-white font-medium text-xs uppercase tracking-wider">{title}</span>
          ) : (
            <Skeleton className="w-20 h-4" />
          )}
        </div>
        <div className="flex items-center space-x-3">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="w-8 h-4" />
          <Skeleton className="w-4 h-4" />
          <div className="flex items-center space-x-1">
            <Skeleton className="w-6 h-5 rounded" />
            <Skeleton className="w-6 h-5 rounded" />
            <Skeleton className="w-6 h-5 rounded" />
          </div>
          <Skeleton className="w-4 h-4" />
        </div>
      </div>
      
      {/* Token List Skeleton */}
      <div className="flex-1 overflow-hidden">
        <div className="p-2 space-y-1">
          {Array.from({ length: cardCount }).map((_, index) => (
            <TokenCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

