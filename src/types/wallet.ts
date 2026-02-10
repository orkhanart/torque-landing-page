/**
 * Solana Wallet Types
 * Shared type definitions for Solana wallet interactions
 */

export interface SolanaWallet {
  isPhantom?: boolean;
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  signMessage: (message: Uint8Array) => Promise<{ signature: Uint8Array }>;
}

declare global {
  interface Window {
    solana?: SolanaWallet;
    gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}

export {};
