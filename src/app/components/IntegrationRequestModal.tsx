"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

interface StrategyContext {
  type: "strategy_deploy" | "general_interest";
  title?: string;
  slug?: string;
}

interface IntegrationRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  context?: StrategyContext;
}

export default function IntegrationRequestModal({
  isOpen,
  onClose,
  context,
}: IntegrationRequestModalProps) {
  const [formData, setFormData] = useState({
    protocolName: "",
    tokenAddress: "",
    idlSource: "",
    contactInfo: "",
    interestedStrategy: context?.slug || "general_interest",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to API
      const response = await fetch("/api/integration/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        // Auto-close after 3 seconds
        setTimeout(() => {
          onClose();
          setIsSuccess(false);
          setFormData({
            protocolName: "",
            tokenAddress: "",
            idlSource: "",
            contactInfo: "",
            interestedStrategy: context?.slug || "general_interest",
          });
        }, 3000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting integration request:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px] bg-white border border-black/10">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-blue/10 flex items-center justify-center mb-4">
              <span className="text-2xl">👁️</span>
            </div>
            <h3 className="text-2xl font-display font-medium text-black mb-2">
              We see you.
            </h3>
            <p className="text-black/60 max-w-md">
              Our founder will reach out shortly at{" "}
              <span className="text-blue font-medium">{formData.contactInfo}</span>.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white border border-black/10 max-h-[90vh] overflow-y-auto">
        {/* Terminal Header */}
        <div className="flex items-center gap-1.5 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
          <span className="font-mono text-[9px] text-black/30">integration.request</span>
        </div>

        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-medium text-black">
            {context?.type === "strategy_deploy" && context.title
              ? `Deploy ${context.title}`
              : "Ready to grow?"}
          </DialogTitle>
          <DialogDescription className="text-base text-black/60">
            Torque is currently invite-only. Tell us what you're building to skip the line.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          {/* Project Name */}
          <div className="space-y-2">
            <label
              htmlFor="protocolName"
              className="text-xs font-mono uppercase tracking-wider text-black/60"
            >
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="protocolName"
              name="protocolName"
              value={formData.protocolName}
              onChange={handleInputChange}
              required
              placeholder="e.g., Jupiter, Raydium, Marinade"
              className="w-full bg-white border border-black/10 rounded-[3px] px-4 py-2.5 text-black placeholder:text-black/30 focus:outline-none focus:border-blue transition-colors"
            />
          </div>

          {/* Token CA */}
          <div className="space-y-2">
            <label
              htmlFor="tokenAddress"
              className="text-xs font-mono uppercase tracking-wider text-black/60"
            >
              Token CA <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="tokenAddress"
              name="tokenAddress"
              value={formData.tokenAddress}
              onChange={handleInputChange}
              required
              placeholder="So11111111111111111111111111111111111111112"
              className="w-full bg-white border border-black/10 rounded-[3px] px-4 py-2.5 text-black placeholder:text-black/30 focus:outline-none focus:border-blue transition-colors font-mono text-sm"
            />
          </div>

          {/* Link to IDL / Repo */}
          <div className="space-y-2">
            <label
              htmlFor="idlSource"
              className="text-xs font-mono uppercase tracking-wider text-black/60"
            >
              Link to IDL / Repo <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="idlSource"
              name="idlSource"
              value={formData.idlSource}
              onChange={handleInputChange}
              required
              placeholder="GitHub link or Solana Explorer"
              className="w-full bg-white border border-black/10 rounded-[3px] px-4 py-2.5 text-black placeholder:text-black/30 focus:outline-none focus:border-blue transition-colors text-sm"
            />
          </div>

          {/* Your Telegram Handle */}
          <div className="space-y-2">
            <label
              htmlFor="contactInfo"
              className="text-xs font-mono uppercase tracking-wider text-black/60"
            >
              Your Telegram Handle <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="contactInfo"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleInputChange}
              required
              placeholder="@yourhandle"
              className="w-full bg-white border border-black/10 rounded-[3px] px-4 py-2.5 text-black placeholder:text-black/30 focus:outline-none focus:border-blue transition-colors"
            />
          </div>

          {/* Hidden Field: Strategy Slug */}
          <input
            type="hidden"
            name="interestedStrategy"
            value={formData.interestedStrategy}
          />

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              variant="accent"
              className="w-full group"
              disabled={
                isSubmitting ||
                !formData.protocolName ||
                !formData.tokenAddress ||
                !formData.idlSource ||
                !formData.contactInfo
              }
            >
              {isSubmitting ? "Submitting..." : "Get Whitelisted"}
              <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
