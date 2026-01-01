/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef, memo, useCallback, useMemo } from 'react';
import { formatCompactNumber, cn } from '@/lib/utils';
import { Token } from '@/types';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TokenDetailModal } from './TokenDetailModal';
import { Search, Users, BarChart2, Eye, Zap, User, TrendingUp, PlusCircle, Lock, UsersRound, Undo2, CheckCircle2 } from 'lucide-react';

interface SingleTokenComponentProps {
  token: Token;
  isNewPairs?: boolean;
}

// Format number with commas
const formatWithCommas = (num: number): string => {
  return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
};

const SingleTokenComponent: React.FC<SingleTokenComponentProps> = ({ token }) => {
  const [pulse, setPulse] = useState<'up' | 'down' | null>(null);
  const prevPriceRef = useRef(token.price);
  const [modalOpen, setModalOpen] = useState(false);
  
  const logoRef = useRef<HTMLDivElement>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewCoords, setPreviewCoords] = useState({ x: 0, y: 0 });

  const timeAgo = useMemo(() => {
    const date = new Date(token.createdAt);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    return `${Math.floor(seconds / 86400)}d`;
  }, [token.createdAt]);

  const shortAddress = useMemo(() => 
    `${token.address.slice(0, 4)}...${token.address.slice(-4)}`,
    [token.address]
  );

  useEffect(() => {
    if (token.price !== prevPriceRef.current) {
      setPulse(token.price > prevPriceRef.current ? 'up' : 'down');
      prevPriceRef.current = token.price;
      const timer = setTimeout(() => setPulse(null), 600);
      return () => clearTimeout(timer);
    }
  }, [token.price]);

  useEffect(() => {
    const logoElement = logoRef.current;
    if (!logoElement) return;
    const handleMouseEnter = () => {
      const rect = logoElement.getBoundingClientRect();
      setPreviewCoords({
        x: rect.left + rect.width / 2,
        y: rect.bottom > window.innerHeight * 0.7 ? rect.top - 140 : rect.bottom + 10
      });
      setShowPreview(true);
    };
    const handleMouseLeave = () => setShowPreview(false);
    logoElement.addEventListener('mouseenter', handleMouseEnter);
    logoElement.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      logoElement.removeEventListener('mouseenter', handleMouseEnter);
      logoElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const copyAddress = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(token.address);
  }, [token.address]);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback((open: boolean) => setModalOpen(open), []);

  const handleBuyClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <TooltipProvider delayDuration={100}>
      <article 
        className={cn(
          "bg-[#0d0e12] text-white font-sans transition-all duration-200 cursor-pointer",
          "hover:bg-[#14151a] border-b border-[#1a1c20]",
          pulse === 'up' && "token-price-up",
          pulse === 'down' && "token-price-down"
        )}
        onClick={openModal}
        role="button"
        tabIndex={0}
        aria-label={`${token.symbol} - ${token.name}`}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openModal(); }}
      >
        <div className="px-3 py-2">
          <div className="flex items-start gap-2.5">
            
            {/* LEFT: Logo with green ring */}
            <div className="flex flex-col items-start flex-shrink-0" ref={logoRef}>
              <div className="w-11 h-11 rounded-lg ring-2 ring-green-500/70 bg-[#1a1c20] flex items-center justify-center overflow-hidden">
                {token.profilePic ? (
                  <img src={token.profilePic} alt="" className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <span className="text-lg font-bold text-gray-400">{token.symbol.slice(0, 2).toUpperCase()}</span>
                )}
              </div>
              {/* Green checkmark + Address - inline like OG */}
              <div className="flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3 h-3 text-green-500" fill="#22c55e" />
                <button className="text-[9px] text-cyan-400 font-mono hover:text-cyan-300" onClick={copyAddress}>
                  {shortAddress}
                </button>
              </div>
            </div>
            
            {/* CENTER: Token info - NO WRAP */}
            <div className="flex-1 min-w-0 overflow-hidden">
              
              {/* Row 1: SYMBOL Name 📋 | 11h 🔗🔗 ↩️ 🔍 👥35K 📊988 👁349 - NO WRAP */}
              <div className="flex items-center gap-1.5 text-[11px] mb-1 whitespace-nowrap overflow-hidden">
                <span className="font-bold text-white">{token.symbol}</span>
                <span className="text-gray-400 truncate max-w-[80px]">{token.name}</span>
                {token.verified && <span className="text-gray-500 text-[10px]">📋</span>}
                <span className="text-gray-600">|</span>
                <span className="text-green-400 font-medium">{timeAgo}</span>
                <span className="text-green-500 text-[9px]">🔗🔗</span>
                <Undo2 className="w-3 h-3 text-gray-500 flex-shrink-0" />
                <Search className="w-3 h-3 text-gray-500 flex-shrink-0" />
                <span className="flex items-center gap-0.5 text-cyan-400 flex-shrink-0">
                  <Users className="w-3 h-3" />
                  <span className="text-[10px]">{formatCompactNumber(token.holders, 0)}</span>
                </span>
                <span className="flex items-center gap-0.5 text-gray-400 flex-shrink-0">
                  <BarChart2 className="w-3 h-3" />
                  <span className="text-[10px]">{token.transactions24h || 0}</span>
                </span>
                <span className="flex items-center gap-0.5 text-gray-400 flex-shrink-0">
                  <Eye className="w-3 h-3" />
                  <span className="text-[10px]">{token.watchers || 0}</span>
                </span>
              </div>
              
              {/* Row 2: 👤9% ↗️3% ⊕2% 🔒61% 👥0% - with proper colors */}
              <div className="flex items-center gap-2 text-[10px]">
                <span className="flex items-center gap-0.5">
                  <User className="w-3 h-3 text-gray-500" />
                  <span className="text-gray-300">{token.topHolderPercent ?? 0}%</span>
                </span>
                <span className="flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3 text-pink-500" />
                  <span className="text-pink-400">{token.devPercent ?? 0}%</span>
                </span>
                <span className="flex items-center gap-0.5">
                  <PlusCircle className="w-3 h-3 text-gray-500" />
                  <span className="text-gray-300">{token.sniperPercent ?? 0}%</span>
                </span>
                <span className="flex items-center gap-0.5">
                  <Lock className="w-3 h-3 text-green-500" />
                  <span className="text-green-400">{token.lockedPercent ?? 0}%</span>
                </span>
                <span className="flex items-center gap-0.5">
                  <UsersRound className="w-3 h-3 text-gray-500" />
                  <span className="text-gray-300">{token.insiderPercent ?? 0}%</span>
                </span>
              </div>
            </div>
            
            {/* RIGHT: Market Data + Cyan button */}
            <div className="flex-shrink-0 text-right" onClick={(e) => e.stopPropagation()}>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="cursor-pointer hover:opacity-80">
                    <div className="text-[12px] text-white font-semibold">MC ${formatCompactNumber(token.marketCap)}</div>
                    <div className="text-[11px] text-gray-400">V ${formatCompactNumber(token.volume24h)}</div>
                    <div className="text-[9px] text-gray-500 flex items-center justify-end gap-1">
                      <span>F = {formatWithCommas(token.fees || 0)}</span>
                      <span>TX {formatWithCommas(token.transactions24h || 0)}</span>
                      <span className="text-gray-600">▬</span>
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-60 p-3 bg-[#1a1c20] border-[#2a2c30]">
                  <div className="space-y-2 text-xs">
                    <h4 className="font-semibold text-sm border-b border-gray-700 pb-2">Market Stats</h4>
                    <div className="space-y-1.5">
                      <div className="flex justify-between"><span className="text-gray-400">Market Cap</span><span>${formatCompactNumber(token.marketCap)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Volume 24h</span><span>${formatCompactNumber(token.volume24h)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Liquidity</span><span>${formatCompactNumber(token.liquidity)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Price</span><span>${token.price.toFixed(6)}</span></div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">24h Change</span>
                        <span className={token.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                          {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              {/* Cyan button with lightning */}
              <button 
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1 rounded text-[10px] font-semibold mt-1.5 flex items-center gap-1 ml-auto"
                onClick={handleBuyClick}
              >
                <Zap className="w-3 h-3" fill="currentColor" />
                0 SOL
              </button>
            </div>
          </div>
        </div>
        
        {/* Logo Preview */}
        {showPreview && (
          <div className="fixed pointer-events-none z-[9999] transform -translate-x-1/2 hidden md:block"
            style={{ left: `${previewCoords.x}px`, top: `${previewCoords.y}px` }}>
            <div className="bg-[#1a1c20] rounded-lg p-1.5 shadow-xl border border-gray-700">
              <div className="w-28 h-28 rounded-lg overflow-hidden">
                {token.profilePic ? (
                  <img src={token.profilePic} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center text-3xl">{token.symbol.charAt(0)}</div>
                )}
              </div>
            </div>
          </div>
        )}
      </article>
      <TokenDetailModal token={token} open={modalOpen} onOpenChange={closeModal} />
    </TooltipProvider>
  );
};

export const TokenCard = memo(SingleTokenComponent, (prev, next) => {
  return prev.token.id === next.token.id && prev.token.price === next.token.price &&
    prev.token.priceChange24h === next.token.priceChange24h && prev.token.volume24h === next.token.volume24h &&
    prev.token.marketCap === next.token.marketCap;
});
