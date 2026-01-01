import type { PriceUpdate, Token } from '@/types';

type WebSocketCallback = (updates: PriceUpdate[]) => void;

/**
 * Mock WebSocket service for real-time price updates.
 */
export class MockWebSocketService {
  private callbacks: Set<WebSocketCallback> = new Set();
  private intervalId: NodeJS.Timeout | null = null;
  private tokens: Token[] = [];
  private connected = false;
  private reconnectTimeout: NodeJS.Timeout | null = null;

  connect(tokens: Token[]): void {
    this.tokens = tokens;
    this.connected = true;
    this.startPriceUpdates();
  }

  disconnect(): void {
    this.connected = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }

  subscribe(callback: WebSocketCallback): () => void {
    this.callbacks.add(callback);
    return () => {
      this.callbacks.delete(callback);
    };
  }

  private startPriceUpdates(): void {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      if (!this.connected || this.tokens.length === 0) return;

      const updates: PriceUpdate[] = this.tokens.map((token) => ({
        tokenId: token.id,
        price: token.price * (1 + (Math.random() - 0.5) * 0.01),
        priceChange24h: token.priceChange24h + (Math.random() - 0.5) * 2,
        volume24h: token.volume24h * (1 + (Math.random() - 0.5) * 0.05),
        timestamp: Date.now(),
      }));

      this.callbacks.forEach((callback) => callback(updates));
    }, 2000);
  }

  simulateDisconnect(): void {
    this.connected = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.reconnectTimeout = setTimeout(() => {
      this.connected = true;
      this.startPriceUpdates();
    }, 3000);
  }

  isConnected(): boolean {
    return this.connected;
  }
}

// Singleton instance
let wsInstance: MockWebSocketService | null = null;

export function getWebSocketService(): MockWebSocketService {
  if (!wsInstance) {
    wsInstance = new MockWebSocketService();
  }
  return wsInstance;
}


