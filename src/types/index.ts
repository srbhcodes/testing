/**
 * Token data interface representing a trading pair
 * Enhanced with micro-metrics for OG parity
 */
export interface Token {
  id: string;
  symbol: string;
  name: string;
  subtitle?: string; // Secondary label / descriptor
  address: string;
  price: number;
  priceChange24h: number;
  priceChange5m?: number;  // 5 min change
  priceChange1h?: number;  // 1 hour change
  volume24h: number;
  marketCap: number;
  liquidity: number;
  liquidityRatio?: number; // Liquidity / MC ratio
  holders: number;
  watchers?: number; // Number of users watching
  transactions24h?: number; // TX count
  fees?: number; // Fee generation (F metric)
  category: TokenCategory;
  createdAt: string;
  lastUpdated: string;
  chain: 'SOL' | 'ETH' | 'BASE';
  logo?: string;
  verified: boolean;
  migrationProgress?: number; // 0-100 for Final Stretch
  migrationDate?: string;
  profilePic?: string; // URL for the token's profile picture
  
  // Buy/Sell Pressure (CRITICAL for OG parity)
  buys?: number;      // Buy count
  sells?: number;     // Sell count
  buyPercent?: number;  // Buy pressure %
  sellPercent?: number; // Sell pressure %
  netPressure?: 'buy' | 'sell' | 'neutral'; // Net pressure indicator
  
  // Social/Risk indicators
  socialPresence?: boolean; // Has social links
  hasWebsite?: boolean;
  hasTelegram?: boolean;
  hasTwitter?: boolean;
  riskFlags?: string[]; // Risk/warning flags
  isPaid?: boolean; // Paid/boosted indicator
  
  // Holder distribution percentages
  topHolderPercent?: number;  // 👤 Top holder %
  devPercent?: number;        // 👻 Dev wallet %
  sniperPercent?: number;     // 🎯 Sniper %
  lockedPercent?: number;     // 🔒 Locked %
  insiderPercent?: number;    // ⚠️ Insider %
  devSold?: boolean;          // DS (Dev Sold) indicator
}

/**
 * Token category types
 */
export type TokenCategory = 'new-pairs' | 'final-stretch' | 'migrated';

/**
 * Price update from WebSocket
 */
export interface PriceUpdate {
  tokenId: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  timestamp: number;
}

/**
 * Sort configuration
 */
export interface SortConfig {
  field: SortableField;
  direction: 'asc' | 'desc';
}

export type SortableField =
  | 'price'
  | 'priceChange24h'
  | 'volume24h'
  | 'marketCap'
  | 'liquidity'
  | 'holders'
  | 'createdAt';

/**
 * Filter state
 */
export interface FilterState {
  category: TokenCategory | 'all';
  chain: 'SOL' | 'ETH' | 'BASE' | 'all';
  minMarketCap?: number;
  maxMarketCap?: number;
  minVolume?: number;
  verifiedOnly: boolean;
}

/**
 * Loading state types
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  error?: string;
  timestamp: number;
}

/**
 * Redux state interfaces
 */
export interface TokenState {
  tokens: Token[];
  filteredTokens: Token[];
  loading: LoadingState;
  error: string | null;
  sort: SortConfig;
  filter: FilterState;
  selectedToken: Token | null;
}

export interface Tab {
  key: string;
  label: string;
  alert: number | null;
  iconClass: string;
  closeable: boolean;
}

export interface PresetState {
  selectedPreset: string;
  presetList: string[];
}

/**
 * WebSocket connection state
 */
export interface WebSocketState {
  connected: boolean;
  reconnecting: boolean;
  error: string | null;
}

