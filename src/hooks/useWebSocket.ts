import { useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updatePrices } from '@/store/tokenSlice';
import { getWebSocketService } from '@/lib/services/webSocket';
import type { Token, PriceUpdate } from '@/types';

/**
 * Hook to manage WebSocket connection and price updates.
 */
export function useWebSocket(tokens: Token[], enabled: boolean = true) {
  const dispatch = useDispatch();
  const wsRef = useRef(getWebSocketService());

  // Check for freeze parameter
  const isFrozen = typeof window !== 'undefined' && 
    new URLSearchParams(window.location.search).get('freeze') === '1';

  // Handle price updates
  const handlePriceUpdate = useCallback(
    (updates: PriceUpdate[]) => {
      if (isFrozen) return; // Don't process updates if frozen
      dispatch(updatePrices(updates));
    },
    [dispatch, isFrozen],
  );

  // Connect/disconnect WebSocket
  useEffect(() => {
    // Completely disable WebSocket if frozen
    if (isFrozen || !enabled || tokens.length === 0) return;

    const ws = wsRef.current;
    ws.connect(tokens);

    const unsubscribe = ws.subscribe(handlePriceUpdate);

    return () => {
      unsubscribe();
      ws.disconnect();
    };
  }, [tokens, enabled, handlePriceUpdate, isFrozen]);

  return {
    isConnected: isFrozen ? false : wsRef.current.isConnected(),
  };
}
