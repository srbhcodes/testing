import type { Token, TokenCategory } from '@/types';

// Simple seedable random number generator (LCG)
let seed = 12345;
function deterministicRandom() {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
}

const TOKEN_SYMBOLS = [
  'BONK', 'WIF', 'MYRO', 'SAMO', 'ORCA', 'RAY', 'MNGO', 'COPE',
  'TULIP', 'PORT', 'FIDA', 'MEDIA', 'SNY', 'SBR', 'SOLC', 'SLIM',
  'JET', 'STAR', 'BASIS', 'GRAPE', 'GST', 'GMT', 'DUST', 'POLIS',
];

const TOKEN_NAMES = [
  'Bonk Inu', 'Dogwifhat', 'Myro', 'Samoyedcoin', 'Orca Protocol',
  'Raydium', 'Mango Markets', 'Cope Protocol', 'Tulip Protocol',
  'Port Finance', 'Bonfida', 'Media Network', 'Synthetify', 'Saber',
  'Solcasino', 'Solanium', 'JetProtocol', 'Solster', 'Basis Markets',
  'Grape Protocol', 'Green Satoshi', 'STEPN', 'Dust Protocol', 'Star Atlas',
];

const PROFILE_PICS = [
  'https://ui-avatars.com/api/?name=B&background=FF0000&color=fff&size=40',
  'https://ui-avatars.com/api/?name=W&background=00FF00&color=fff&size=40',
  'https://ui-avatars.com/api/?name=M&background=0000FF&color=fff&size=40',
  'https://ui-avatars.com/api/?name=S&background=FFFF00&color=000&size=40',
  'https://ui-avatars.com/api/?name=O&background=FF00FF&color=fff&size=40',
  'https://ui-avatars.com/api/?name=R&background=00FFFF&color=000&size=40',
  'https://ui-avatars.com/api/?name=MN&background=8B00FF&color=fff&size=40',
  'https://ui-avatars.com/api/?name=C&background=FF8800&color=fff&size=40',
  'https://ui-avatars.com/api/?name=T&background=88FF00&color=000&size=40',
  'https://ui-avatars.com/api/?name=P&background=0088FF&color=fff&size=40',
  'https://ui-avatars.com/api/?name=TEST&background=000000&color=fff&size=40',
];

function randomPrice(min: number, max: number, isFrozen: boolean): number {
  const r = isFrozen ? deterministicRandom() : Math.random();
  return r * (max - min) + min;
}

function randomInt(min: number, max: number, isFrozen: boolean): number {
  const r = isFrozen ? deterministicRandom() : Math.random();
  return Math.floor(r * (max - min + 1)) + min;
}

function generateAddress(isFrozen: boolean): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let address = '';
  for (let i = 0; i < 44; i++) {
    const r = isFrozen ? deterministicRandom() : Math.random();
    address += chars.charAt(Math.floor(r * chars.length));
  }
  return address;
}

export function generateMockToken(index: number, category: TokenCategory, isFrozen: boolean = false): Token {
  if (isFrozen) seed = (index + 1) * 1000; // Reset seed for each token to be consistent

  const symbol = TOKEN_SYMBOLS[index % TOKEN_SYMBOLS.length];
  const name = TOKEN_NAMES[index % TOKEN_NAMES.length];
  const price = randomPrice(0.0001, 100, isFrozen);
  const volume24h = randomPrice(100_000, 50_000_000, isFrozen);
  const marketCap = price * randomInt(1_000_000, 1_000_000_000, isFrozen);
  const liquidity = marketCap * randomPrice(0.1, 0.3, isFrozen);
  const transactions24h = randomInt(50, 5000, isFrozen);
  
  // Buy/Sell pressure
  const buyPercent = randomInt(35, 75, isFrozen);
  const sellPercent = 100 - buyPercent;
  const buys = Math.floor(transactions24h * (buyPercent / 100));
  const sells = transactions24h - buys;
  const netPressure: 'buy' | 'sell' | 'neutral' = 
    buyPercent > 55 ? 'buy' : buyPercent < 45 ? 'sell' : 'neutral';

  let createdAt: Date;
  const now = isFrozen ? new Date('2026-01-01T12:00:00Z') : new Date();

  if (category === 'new-pairs') {
    createdAt = new Date(now.getTime() - randomInt(0, 24 * 60 * 60 * 1000, isFrozen));
  } else if (category === 'final-stretch') {
    createdAt = new Date(now.getTime() - randomInt(5, 7, isFrozen) * 24 * 60 * 60 * 1000);
  } else {
    createdAt = new Date(now.getTime() - randomInt(8, 30, isFrozen) * 24 * 60 * 60 * 1000);
  }

  const subtitles = [
    'Meme King', 'DeFi OG', 'Community', 'Stealth', 'Fair Launch',
    'Utility', 'Gaming', 'NFT', 'DAO', 'Ecosystem'
  ];

  const rChain = isFrozen ? deterministicRandom() : Math.random();
  const rVerified = isFrozen ? deterministicRandom() : Math.random();
  const rSocial = isFrozen ? deterministicRandom() : Math.random();
  const rWebsite = isFrozen ? deterministicRandom() : Math.random();
  const rTelegram = isFrozen ? deterministicRandom() : Math.random();
  const rTwitter = isFrozen ? deterministicRandom() : Math.random();
  const rRisk = isFrozen ? deterministicRandom() : Math.random();
  const rPaid = isFrozen ? deterministicRandom() : Math.random();
  const rDevSold = isFrozen ? deterministicRandom() : Math.random();

  return {
    id: `${category}-${index}`,
    symbol: `${symbol}${index}`,
    name: `${name} ${index}`,
    subtitle: subtitles[index % subtitles.length],
    address: generateAddress(isFrozen),
    price,
    priceChange24h: randomPrice(-50, 100, isFrozen),
    priceChange5m: randomPrice(-10, 15, isFrozen),
    priceChange1h: randomPrice(-20, 30, isFrozen),
    volume24h,
    marketCap,
    liquidity,
    liquidityRatio: liquidity / marketCap,
    holders: randomInt(100, 50_000, isFrozen),
    watchers: randomInt(10, 500, isFrozen),
    transactions24h,
    fees: randomPrice(10, 5000, isFrozen),
    category,
    createdAt: createdAt.toISOString(),
    lastUpdated: now.toISOString(),
    chain: ['SOL', 'ETH', 'BASE'][Math.floor(rChain * 3)] as 'SOL' | 'ETH' | 'BASE',
    verified: rVerified > 0.3,
    migrationProgress: category === 'final-stretch' ? randomInt(60, 95, isFrozen) : undefined,
    migrationDate:
      category === 'final-stretch'
        ? new Date(now.getTime() + randomInt(1, 3, isFrozen) * 24 * 60 * 60 * 1000).toISOString()
        : undefined,
    profilePic: PROFILE_PICS[index % PROFILE_PICS.length],
    buys,
    sells,
    buyPercent,
    sellPercent,
    netPressure,
    socialPresence: rSocial > 0.4,
    hasWebsite: rWebsite > 0.3,
    hasTelegram: rTelegram > 0.5,
    hasTwitter: rTwitter > 0.4,
    riskFlags: rRisk > 0.8 ? ['High concentration', 'New token'] : [],
    isPaid: rPaid > 0.85,
    topHolderPercent: randomInt(1, 15, isFrozen),
    devPercent: randomInt(0, 8, isFrozen),
    sniperPercent: randomInt(0, 10, isFrozen),
    lockedPercent: randomInt(0, 100, isFrozen),
    insiderPercent: randomInt(0, 12, isFrozen),
    devSold: rDevSold > 0.7,
  };
}

export function generateMockTokens(
  newPairsCount: number = 20,
  finalStretchCount: number = 15,
  migratedCount: number = 25,
  isFrozen: boolean = false
): Token[] {
  const tokens: Token[] = [];

  for (let i = 0; i < newPairsCount; i++) {
    tokens.push(generateMockToken(i, 'new-pairs', isFrozen));
  }
  for (let i = 0; i < finalStretchCount; i++) {
    tokens.push(generateMockToken(i, 'final-stretch', isFrozen));
  }
  for (let i = 0; i < migratedCount; i++) {
    tokens.push(generateMockToken(i, 'migrated', isFrozen));
  }

  return tokens;
}
