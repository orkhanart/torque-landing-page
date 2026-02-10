"use client";

import React, { useState } from "react";
import { CustomButton } from "@/components/ui/custom-button";
import ProtocolIntegrationModal from "./ProtocolIntegrationModal";
import "@/types/wallet";

interface WalletAuthButtonProps {
  buttonSize?: "small" | "big";
  className?: string;
  variant?: "header" | "hero";
}

export default function WalletAuthButton({
  buttonSize = "small",
  className = "",
  variant = "header",
}: WalletAuthButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleLaunchApp = async () => {
    setIsConnecting(true);

    try {
      // Step 1: Check if Solana wallet is available
      if (typeof window === "undefined" || !window.solana) {
        alert("Please install Phantom or another Solana wallet to continue.");
        setIsConnecting(false);
        return;
      }

      // Step 2: Connect wallet (triggers wallet selection modal)
      const response = await window.solana.connect();
      const publicKey = response.publicKey.toString();
      setConnectedWallet(publicKey);

      // Step 3: Check if user exists in database
      const checkUserResponse = await fetch("/api/auth/check-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletAddress: publicKey }),
      });

      const { exists, user } = await checkUserResponse.json();

      // Step 4: Route based on user status
      if (exists && user?.whitelisted) {
        // EXISTING USER: Redirect to dashboard
        window.location.href = "https://app.torque.so";
      } else {
        // NEW USER: Open Protocol Integration Modal
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Wallet connection error:", error);
      if (error instanceof Error && error.message.includes("User rejected")) {
        // User cancelled wallet connection
        console.log("User cancelled wallet connection");
      } else {
        alert("Failed to connect wallet. Please try again.");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <>
      <CustomButton
        buttonSize={buttonSize}
        buttonColor="primary"
        onClick={handleLaunchApp}
        className={className}
        disabled={isConnecting}
      >
        {isConnecting ? "Connecting..." : "Launch App ↗"}
      </CustomButton>

      {/* Protocol Integration Modal for New Users */}
      {connectedWallet && (
        <ProtocolIntegrationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          walletAddress={connectedWallet}
        />
      )}
    </>
  );
}
