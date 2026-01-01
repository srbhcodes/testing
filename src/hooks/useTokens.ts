import { useQuery, UseQueryResult } from '@tanstack/react-query';
import type { Token, ApiResponse } from '@/types';
import { generateMockTokens } from '@/lib/services/mockData';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchTokens(isFrozen: boolean): Promise<ApiResponse<Token[]>> {
  await delay(isFrozen ? 0 : 800);

  // Simulate occasional errors only if not frozen
  if (!isFrozen && Math.random() < 0.1) {
    throw new Error('Failed to fetch tokens');
  }

  const tokens = generateMockTokens(20, 15, 25, isFrozen);

  return {
    data: tokens,
    timestamp: isFrozen ? 1735732800000 : Date.now(), // Fixed timestamp for frozen mode
  };
}

export function useTokens(): UseQueryResult<ApiResponse<Token[]>, Error> {
  // Check for freeze parameter in client-side environments
  const isFrozen = typeof window !== 'undefined' && 
    new URLSearchParams(window.location.search).get('freeze') === '1';

  return useQuery({
    queryKey: ['tokens', isFrozen],
    queryFn: () => fetchTokens(isFrozen),
    staleTime: isFrozen ? Infinity : 30_000,
    gcTime: 300_000,
    retry: isFrozen ? 0 : 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000),
  });
}

export function useTokenDetails(tokenId: string | null): UseQueryResult<Token | null, Error> {
  const isFrozen = typeof window !== 'undefined' && 
    new URLSearchParams(window.location.search).get('freeze') === '1';

  return useQuery({
    queryKey: ['token', tokenId, isFrozen],
    queryFn: async () => {
      if (!tokenId) return null;

      await delay(isFrozen ? 0 : 300);
      const response = await fetchTokens(isFrozen);
      return response.data.find((t) => t.id === tokenId) || null;
    },
    enabled: !!tokenId,
    staleTime: isFrozen ? Infinity : 10_000,
  });
}
