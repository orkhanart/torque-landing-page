import React from "react";
import { CustomButton } from "@/components/ui/customButton";

interface SuccessMessageProps {
  onClose: () => void;
}

export function SuccessMessage({ onClose }: SuccessMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-4">
      <h2 className="text-2xl font-medium text-center">
        Thanks for your message!
      </h2>
      <p className="text-gray-300 text-center">We&apos;ll be in touch soon.</p>
      <CustomButton onClick={onClose}>Close</CustomButton>
    </div>
  );
}
