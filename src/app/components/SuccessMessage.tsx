import React from "react";
import { CustomButton } from "@/components/ui/customButton";

interface SuccessMessageProps {
  onClose: () => void;
}

export function SuccessMessage({ onClose }: SuccessMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-6">
      <div className="flex items-center justify-center gap-3 mb-2">
        <svg
          className="w-6 h-6 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h2 className="text-2xl font-semibold text-white">
          Access Request Submitted
        </h2>
      </div>
      <div className="text-center space-y-2 max-w-sm">
        <p className="text-gray-300 text-base">
          Thank you for your interest in Torque.
        </p>
        <p className="text-gray-400 text-sm">
          Our team will review your request and get back to you within 1-2 business days.
        </p>
      </div>
      <CustomButton onClick={onClose} customVariant="default">
        Continue
      </CustomButton>
    </div>
  );
}
