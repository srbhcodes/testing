"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Token } from "@/types";
import { formatCompactNumber, cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Users, DollarSign, BarChart3, Clock, ExternalLink, AlertTriangle, Globe, Send } from "lucide-react";

interface TokenDetailModalProps {
  token: Token | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TokenDetailModal: React.FC<TokenDetailModalProps> = ({
  token,
  open,
  onOpenChange,
}) => {
  if (!token) return null;

  const priceChangeColor = token.priceChange24h >= 0 ? "text-green-400" : "text-red-400";
  const PriceIcon = token.priceChange24h >= 0 ? TrendingUp : TrendingDown;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {token.profilePic ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={token.profilePic}
                alt={token.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center text-2xl">
                🪙
              </div>
            )}
            <div>
              <DialogTitle className="flex items-center gap-2">
                {token.symbol}
                {token.verified && (
                  <span className="text-blue-400 text-xs">✓</span>
                )}
                {token.isPaid && (
                  <span className="text-[10px] bg-yellow-500/90 text-black px-1 rounded font-bold">AD</span>
                )}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                {token.name}
                {token.subtitle && <span className="text-gray-500">• {token.subtitle}</span>}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Price Section with Multi-timeframe */}
        <div className="mt-4 p-4 bg-[#1a1a1a] rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-gray-400 text-xs">Price</p>
              <p className="text-white text-xl font-bold">${token.price.toFixed(6)}</p>
            </div>
            <div className={`flex items-center gap-1 ${priceChangeColor}`}>
              <PriceIcon className="w-4 h-4" />
              <span className="font-semibold">
                {token.priceChange24h >= 0 ? "+" : ""}
                {token.priceChange24h.toFixed(2)}%
              </span>
            </div>
          </div>
          
          {/* Multi-timeframe changes */}
          <div className="flex items-center gap-3 text-xs">
            <div>
              <span className="text-gray-500">5m: </span>
              <span className={token.priceChange5m && token.priceChange5m >= 0 ? 'text-green-400' : 'text-red-400'}>
                {token.priceChange5m?.toFixed(1) || '0'}%
              </span>
            </div>
            <div>
              <span className="text-gray-500">1h: </span>
              <span className={token.priceChange1h && token.priceChange1h >= 0 ? 'text-green-400' : 'text-red-400'}>
                {token.priceChange1h?.toFixed(1) || '0'}%
              </span>
            </div>
            <div>
              <span className="text-gray-500">24h: </span>
              <span className={token.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                {token.priceChange24h.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Buy/Sell Pressure */}
        <div className="mt-3 p-3 bg-[#1a1a1a] rounded-lg">
          <p className="text-gray-400 text-xs mb-2">Buy/Sell Pressure</p>
          <div className="flex items-center gap-2">
            {/* Pressure bar */}
            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-l-full"
                style={{ width: `${token.buyPercent || 50}%` }}
              />
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-green-400">{token.buyPercent || 50}% Buy</span>
              <span className="text-gray-500">|</span>
              <span className="text-red-400">{token.sellPercent || 50}% Sell</span>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2 text-xs">
            <span className="text-green-400">🟢 {token.buys || 0} Buys</span>
            <span className="text-red-400">🔴 {token.sells || 0} Sells</span>
            <span className={cn(
              "font-bold",
              token.netPressure === 'buy' && "text-green-400",
              token.netPressure === 'sell' && "text-red-400",
              token.netPressure === 'neutral' && "text-gray-400"
            )}>
              Net: {token.netPressure === 'buy' ? '↑ Bullish' : token.netPressure === 'sell' ? '↓ Bearish' : '→ Neutral'}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="p-2 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-1 text-gray-400 text-[10px] mb-0.5">
              <DollarSign className="w-3 h-3" />
              Market Cap
            </div>
            <p className="text-white font-semibold text-sm">${formatCompactNumber(token.marketCap)}</p>
          </div>
          <div className="p-2 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-1 text-gray-400 text-[10px] mb-0.5">
              <BarChart3 className="w-3 h-3" />
              Volume 24h
            </div>
            <p className="text-white font-semibold text-sm">${formatCompactNumber(token.volume24h)}</p>
          </div>
          <div className="p-2 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-1 text-gray-400 text-[10px] mb-0.5">
              <DollarSign className="w-3 h-3" />
              Liquidity
            </div>
            <p className="text-white font-semibold text-sm">${formatCompactNumber(token.liquidity)}</p>
            <p className="text-gray-500 text-[10px]">Ratio: {((token.liquidityRatio || 0) * 100).toFixed(1)}%</p>
          </div>
          <div className="p-2 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-1 text-gray-400 text-[10px] mb-0.5">
              <Users className="w-3 h-3" />
              Holders
            </div>
            <p className="text-white font-semibold text-sm">{formatCompactNumber(token.holders, 0)}</p>
            <p className="text-gray-500 text-[10px]">Watchers: {token.watchers || 0}</p>
          </div>
          <div className="p-2 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-1 text-gray-400 text-[10px] mb-0.5">
              Fees Generated
            </div>
            <p className="text-white font-semibold text-sm">${token.fees?.toFixed(0) || '0'}</p>
          </div>
          <div className="p-2 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-1 text-gray-400 text-[10px] mb-0.5">
              Transactions
            </div>
            <p className="text-white font-semibold text-sm">{token.transactions24h || 0}</p>
          </div>
        </div>

        {/* Holder Distribution */}
        <div className="mt-3 p-3 bg-[#1a1a1a] rounded-lg">
          <p className="text-gray-400 text-xs mb-2">Holder Distribution</p>
          <div className="grid grid-cols-5 gap-2 text-center text-[10px]">
            <div>
              <span className="text-lg">👤</span>
              <p className={token.topHolderPercent && token.topHolderPercent > 10 ? 'text-red-400' : 'text-green-400'}>
                {token.topHolderPercent ?? 0}%
              </p>
              <p className="text-gray-500">Top</p>
            </div>
            <div>
              <span className="text-lg">👻</span>
              <p className={token.devPercent && token.devPercent > 5 ? 'text-red-400' : 'text-green-400'}>
                {token.devPercent ?? 0}%
              </p>
              <p className="text-gray-500">Dev</p>
            </div>
            <div>
              <span className="text-lg">🎯</span>
              <p className={token.sniperPercent && token.sniperPercent > 5 ? 'text-red-400' : 'text-green-400'}>
                {token.sniperPercent ?? 0}%
              </p>
              <p className="text-gray-500">Sniper</p>
            </div>
            <div>
              <span className="text-lg">🔒</span>
              <p className={token.lockedPercent && token.lockedPercent > 50 ? 'text-green-400' : 'text-yellow-400'}>
                {token.lockedPercent ?? 0}%
              </p>
              <p className="text-gray-500">Locked</p>
            </div>
            <div>
              <span className="text-lg">⚠️</span>
              <p className={token.insiderPercent && token.insiderPercent > 5 ? 'text-red-400' : 'text-green-400'}>
                {token.insiderPercent ?? 0}%
              </p>
              <p className="text-gray-500">Insider</p>
            </div>
          </div>
        </div>

        {/* Risk Flags */}
        {token.riskFlags && token.riskFlags.length > 0 && (
          <div className="mt-3 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-red-400 text-xs mb-1">
              <AlertTriangle className="w-3 h-3" />
              Risk Flags
            </div>
            <ul className="text-xs text-red-300 space-y-1">
              {token.riskFlags.map((flag, i) => (
                <li key={i}>• {flag}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Social Links */}
        <div className="mt-3 flex items-center gap-3">
          {token.hasWebsite && (
            <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors">
              <Globe className="w-3 h-3" /> Website
            </button>
          )}
          {token.hasTelegram && (
            <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors">
              <Send className="w-3 h-3" /> Telegram
            </button>
          )}
          {token.hasTwitter && (
            <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors">
              𝕏 Twitter
            </button>
          )}
        </div>

        {/* Address */}
        <div className="mt-3 p-2 bg-[#1a1a1a] rounded-lg">
          <p className="text-gray-400 text-[10px] mb-0.5">Contract Address</p>
          <div className="flex items-center justify-between">
            <code className="text-[10px] text-gray-300 font-mono">
              {token.address.slice(0, 8)}...{token.address.slice(-8)}
            </code>
            <button 
              className="text-blue-400 hover:text-blue-300 transition-colors"
              onClick={() => window.open(`https://solscan.io/token/${token.address}`, '_blank')}
            >
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Created At */}
        <div className="flex items-center gap-2 mt-2 text-gray-400 text-[10px]">
          <Clock className="w-3 h-3" />
          Created {new Date(token.createdAt).toLocaleDateString()} • {token.chain}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-3">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium text-sm transition-colors">
            Buy
          </button>
          <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium text-sm transition-colors">
            Chart
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
