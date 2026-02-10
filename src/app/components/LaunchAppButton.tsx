"use client";

import React, { useState } from "react";
import { CustomButton } from "@/components/ui/custom-button";
import IntegrationRequestModal from "./IntegrationRequestModal";

interface StrategyContext {
  type: "strategy_deploy" | "general_interest";
  title?: string;
  slug?: string;
}

interface LaunchAppButtonProps {
  buttonSize?: "small" | "big";
  className?: string;
  strategyContext?: StrategyContext;
}

export default function LaunchAppButton({
  buttonSize = "small",
  className = "",
  strategyContext,
}: LaunchAppButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLaunchApp = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <CustomButton
        buttonSize={buttonSize}
        buttonColor="primary"
        onClick={handleLaunchApp}
        className={className}
      >
        Join Torque ↗
      </CustomButton>

      {/* Integration Request Modal */}
      <IntegrationRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        context={strategyContext}
      />
    </>
  );
}
