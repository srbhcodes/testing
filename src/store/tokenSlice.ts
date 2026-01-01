import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  TokenState,
  Token,
  SortConfig,
  FilterState,
  LoadingState,
  PriceUpdate,
} from '@/types';

const initialFilterState: FilterState = {
  category: 'all',
  chain: 'all',
  verifiedOnly: false,
};

const initialState: TokenState = {
  tokens: [],
  filteredTokens: [],
  loading: 'idle',
  error: null,
  sort: {
    field: 'volume24h',
    direction: 'desc',
  },
  filter: initialFilterState,
  selectedToken: null,
};

/**
 * Apply filters to token list
 */
function applyFilters(tokens: Token[], filter: FilterState): Token[] {
  return tokens.filter((token) => {
    if (filter.category !== 'all' && token.category !== filter.category) {
      return false;
    }
    if (filter.chain !== 'all' && token.chain !== filter.chain) {
      return false;
    }
    if (filter.verifiedOnly && !token.verified) {
      return false;
    }
    if (filter.minMarketCap && token.marketCap < filter.minMarketCap) {
      return false;
    }
    if (filter.maxMarketCap && token.marketCap > filter.maxMarketCap) {
      return false;
    }
    if (filter.minVolume && token.volume24h < filter.minVolume) {
      return false;
    }
    return true;
  });
}

/**
 * Apply sorting to token list
 */
function applySort(tokens: Token[], sort: SortConfig): Token[] {
  return [...tokens].sort((a, b) => {
    const aValue = a[sort.field] as number | string;
    const bValue = b[sort.field] as number | string;

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sort.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sort.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });
}

const tokenSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<Token[]>) {
      state.tokens = action.payload;
      state.filteredTokens = applySort(
        applyFilters(action.payload, state.filter),
        state.sort,
      );
      state.loading = 'success';
    },

    updatePrices(state, action: PayloadAction<PriceUpdate[]>) {
      const updates = new Map(action.payload.map((u) => [u.tokenId, u]));

      state.tokens = state.tokens.map((token) => {
        const update = updates.get(token.id);
        if (update) {
          return {
            ...token,
            price: update.price,
            priceChange24h: update.priceChange24h,
            volume24h: update.volume24h,
            lastUpdated: new Date(update.timestamp).toISOString(),
          };
        }
        return token;
      });

      state.filteredTokens = applySort(
        applyFilters(state.tokens, state.filter),
        state.sort,
      );
    },

    setSort(state, action: PayloadAction<SortConfig>) {
      state.sort = action.payload;
      state.filteredTokens = applySort(state.filteredTokens, action.payload);
    },

    setFilter(state, action: PayloadAction<Partial<FilterState>>) {
      state.filter = { ...state.filter, ...action.payload };
      state.filteredTokens = applySort(
        applyFilters(state.tokens, state.filter),
        state.sort,
      );
    },

    resetFilter(state) {
      state.filter = initialFilterState;
      state.filteredTokens = applySort(
        applyFilters(state.tokens, initialFilterState),
        state.sort,
      );
    },

    setSelectedToken(state, action: PayloadAction<Token | null>) {
      state.selectedToken = action.payload;
    },

    setLoading(state, action: PayloadAction<LoadingState>) {
      state.loading = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      if (action.payload) {
        state.loading = 'error';
      }
    },
  },
});

export const {
  setTokens,
  updatePrices,
  setSort,
  setFilter,
  resetFilter,
  setSelectedToken,
  setLoading,
  setError,
} = tokenSlice.actions;

export default tokenSlice.reducer;


