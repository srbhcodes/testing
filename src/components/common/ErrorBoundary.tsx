"use client";

import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

type Props = { 
  children: React.ReactNode; 
  fallback?: React.ReactNode;
  onReset?: () => void;
};
type State = { hasError: boolean; error: Error | null };

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("ErrorBoundary caught error", error, info);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center p-6 rounded-lg border border-red-500/30 bg-red-500/10 text-center min-h-[200px]">
            <AlertTriangle className="w-10 h-10 text-red-400 mb-3" />
            <h3 className="text-red-400 font-semibold text-sm mb-1">
              Something went wrong
            </h3>
            <p className="text-gray-400 text-xs mb-4 max-w-[200px]">
              {this.state.error?.message || "Failed to load this section"}
            </p>
            <button
              onClick={this.handleReset}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-md text-xs font-medium transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Retry
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

// Functional wrapper for easier use with hooks
interface ErrorFallbackProps {
  error?: Error | null;
  onRetry?: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, onRetry }) => (
  <div className="flex flex-col items-center justify-center p-6 rounded-lg border border-red-500/30 bg-red-500/10 text-center min-h-[200px]">
    <AlertTriangle className="w-10 h-10 text-red-400 mb-3" />
    <h3 className="text-red-400 font-semibold text-sm mb-1">
      Something went wrong
    </h3>
    <p className="text-gray-400 text-xs mb-4 max-w-[200px]">
      {error?.message || "Failed to load this section"}
    </p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-md text-xs font-medium transition-colors"
      >
        <RefreshCw className="w-3 h-3" />
        Retry
      </button>
    )}
  </div>
);
