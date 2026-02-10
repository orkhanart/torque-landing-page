"use client";

import React, { useState } from "react";
import "@/types/wallet";

export default function LoginButton() {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleLogin = async () => {
    setIsConnecting(true);

    try {
      // Check if Solana wallet is available
      if (typeof window === "undefined" || !window.solana) {
        alert("Please install Phantom or another Solana wallet to continue.");
        setIsConnecting(false);
        return;
      }

      // Connect wallet
      await window.solana.connect();

      // Redirect to app
      window.location.href = "https://app.torque.so";
    } catch (error) {
      console.error("Wallet connection error:", error);
      if (error instanceof Error && error.message.includes("User rejected")) {
        console.log("User cancelled wallet connection");
      } else {
        alert("Failed to connect wallet. Please try again.");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <button
      onClick={handleLogin}
      disabled={isConnecting}
      className="text-secondary-foreground hover:text-foreground transition-colors text-sm font-medium disabled:opacity-50"
    >
      {isConnecting ? "Connecting..." : "Login"}
    </button>
  );
}

