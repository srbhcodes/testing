/**
 * Application constants
 */

export const WEBSOCKET_RECONNECT_DELAY = 3000;
export const WEBSOCKET_UPDATE_INTERVAL = 1000;
export const PRICE_UPDATE_DURATION = 300; // ms for color transitions

export const TABLE_COLUMNS = {
  TOKEN: 'token',
  PRICE: 'price',
  CHANGE_24H: 'priceChange24h',
  VOLUME_24H: 'volume24h',
  LIQUIDITY: 'liquidity',
  HOLDERS: 'holders',
  AGE: 'age',
} as const;

export const SORT_ORDERS = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export const TOKEN_CATEGORIES = {
  NEW_PAIRS: 'new-pairs',
  FINAL_STRETCH: 'final-stretch',
  MIGRATED: 'migrated',
} as const;

export const SKELETON_ROWS = 10;


