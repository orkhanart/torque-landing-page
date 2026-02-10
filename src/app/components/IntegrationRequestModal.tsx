"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CustomButton } from "@/components/ui/custom-button";
import { CheckCircle2 } from "lucide-react";

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
        <DialogContent className="sm:max-w-[500px] bg-card border-2 border-border/20">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="text-6xl mb-4">👁️</div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              We see you.
            </h3>
            <p className="text-muted-foreground max-w-md">
              Our founder will reach out shortly at{" "}
              <span className="text-primary">{formData.contactInfo}</span>.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-card border-2 border-border/20 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-sans font-normal text-foreground">
            {context?.type === "strategy_deploy" && context.title
              ? `Deploy ${context.title}`
              : "Ready to grow?"}
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Torque is currently invite-only. Tell us what you're building to skip the line.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Project Name */}
          <div className="space-y-2">
            <label
              htmlFor="protocolName"
              className="text-sm font-medium text-foreground"
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
              className="w-full bg-white/5 border border-border/20 rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Token CA */}
          <div className="space-y-2">
            <label
              htmlFor="tokenAddress"
              className="text-sm font-medium text-foreground"
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
              className="w-full bg-white/5 border border-border/20 rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm"
            />
          </div>

          {/* Link to IDL / Repo */}
          <div className="space-y-2">
            <label
              htmlFor="idlSource"
              className="text-sm font-medium text-foreground"
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
              className="w-full bg-white/5 border border-border/20 rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
          </div>

          {/* Your Telegram Handle */}
          <div className="space-y-2">
            <label
              htmlFor="contactInfo"
              className="text-sm font-medium text-foreground"
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
              className="w-full bg-white/5 border border-border/20 rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
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
            <CustomButton
              type="submit"
              buttonSize="big"
              buttonColor="primary"
              className="w-full shadow-cyan-glow"
              disabled={
                isSubmitting ||
                !formData.protocolName ||
                !formData.tokenAddress ||
                !formData.idlSource ||
                !formData.contactInfo
              }
            >
              {isSubmitting ? "Submitting..." : "Get Whitelisted 🚀"}
            </CustomButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
