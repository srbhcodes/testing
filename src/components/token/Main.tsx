"use client";

import React, { useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setTokens } from "@/store/tokenSlice";
import { useTokens } from "@/hooks/useTokens";
import { useWebSocket } from "@/hooks/useWebSocket";
import ColumnSection from "./ColumnSection";
import { ColumnSkeleton } from "./ColumnSkeleton";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { RefreshCw, AlertTriangle } from "lucide-react";

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filteredTokens, loading } = useAppSelector((state) => state.tokens);
  
  const { data: apiResponse, isLoading, isError, error, refetch } = useTokens();

  useEffect(() => {
    if (apiResponse?.data) {
      dispatch(setTokens(apiResponse.data));
    }
  }, [apiResponse, dispatch]);

  useWebSocket(filteredTokens);

  const categorizedTokens = useMemo(() => {
    return {
      new: filteredTokens.filter(token => token.category === 'new-pairs'),
      final: filteredTokens.filter(token => token.category === 'final-stretch'),
      migrated: filteredTokens.filter(token => token.category === 'migrated')
    };
  }, [filteredTokens]);

  // Loading State
  if (isLoading || loading === 'loading') {
    return (
      <main className="flex-1 flex flex-col bg-[#0a0b0d] overflow-hidden p-2">
        {/* Container like OG */}
        <div className="flex-1 flex bg-[#0d0e12] border border-[#1a1c20] rounded-lg overflow-hidden">
          <div className="flex-1 h-full border-r border-[#1a1c20]">
            <ColumnSkeleton title="New Pairs" cardCount={8} />
          </div>
          <div className="flex-1 h-full border-r border-[#1a1c20]">
            <ColumnSkeleton title="Final Stretch" cardCount={8} />
          </div>
          <div className="flex-1 h-full">
            <ColumnSkeleton title="Migrated" cardCount={8} />
          </div>
        </div>
      </main>
    );
  }

  // Error State
  if (isError) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center bg-[#0a0b0d]">
        <motion.div 
          className="flex flex-col items-center justify-center p-8 rounded-xl border border-red-500/30 bg-red-500/10 text-center max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
          <h2 className="text-red-400 font-bold text-lg mb-2">Failed to Load Tokens</h2>
          <p className="text-gray-400 text-sm mb-4">{error?.message || 'An unexpected error occurred.'}</p>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 px-5 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main 
      id="main-content"
      className="flex-1 flex flex-col bg-[#0a0b0d] overflow-hidden p-2 min-h-0"
      role="main"
    >
      {/* Container with subtle border like OG - columns scroll independently */}
      <div className="flex-1 flex bg-[#0d0e12] border border-[#1a1c20] rounded-lg overflow-hidden min-h-0">
        <AnimatePresence>
          {/* New Pairs Column */}
          <motion.div 
            className="flex-1 h-full min-h-0 border-r border-[#1a1c20] overflow-hidden flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
          >
            <ErrorBoundary>
              <ColumnSection 
                title="New Pairs" 
                tokens={categorizedTokens.new} 
                count={categorizedTokens.new.length}
                isNewPairs={true}
              />
            </ErrorBoundary>
          </motion.div>

          {/* Final Stretch Column */}
          <motion.div 
            className="flex-1 h-full min-h-0 border-r border-[#1a1c20] overflow-hidden flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <ErrorBoundary>
              <ColumnSection 
                title="Final Stretch" 
                tokens={categorizedTokens.final} 
                count={categorizedTokens.final.length}
              />
            </ErrorBoundary>
          </motion.div>

          {/* Migrated Column */}
          <motion.div 
            className="flex-1 h-full min-h-0 overflow-hidden flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <ErrorBoundary>
              <ColumnSection 
                title="Migrated" 
                tokens={categorizedTokens.migrated} 
                count={categorizedTokens.migrated.length}
              />
            </ErrorBoundary>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Main;
