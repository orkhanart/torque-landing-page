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
import { CheckCircle2, Upload } from "lucide-react";

interface ProtocolIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
}

export default function ProtocolIntegrationModal({
  isOpen,
  onClose,
  walletAddress,
}: ProtocolIntegrationModalProps) {
  const [formData, setFormData] = useState({
    protocolName: "",
    tokenContractAddress: "",
    idlInput: "",
    idlFile: null as File | null,
    contactInfo: "",
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        idlFile: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare form data for submission
      const submissionData = new FormData();
      submissionData.append("walletAddress", walletAddress);
      submissionData.append("protocolName", formData.protocolName);
      submissionData.append("tokenContractAddress", formData.tokenContractAddress);
      submissionData.append("idlInput", formData.idlInput);
      submissionData.append("contactInfo", formData.contactInfo);

      if (formData.idlFile) {
        submissionData.append("idlFile", formData.idlFile);
      }

      // Submit to API
      const response = await fetch("/api/protocol/submit", {
        method: "POST",
        body: submissionData,
      });

      if (response.ok) {
        setIsSuccess(true);
        // Auto-close after 3 seconds
        setTimeout(() => {
          onClose();
          setIsSuccess(false);
          setFormData({
            protocolName: "",
            tokenContractAddress: "",
            idlInput: "",
            idlFile: null,
            contactInfo: "",
          });
        }, 3000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting protocol integration:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Shorten wallet address for display
  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px] bg-white border-2 border-primary/30">
          <div
            className="animate-scale-in flex flex-col items-center justify-center py-8 text-center"
          >
            <CheckCircle2 className="w-16 h-16 text-primary mb-4" />
            <h3 className="text-2xl font-semibold text-black mb-2">
              Request Received!
            </h3>
            <p className="text-black/70 max-w-md">
              We will verify your IDL and whitelist your wallet within 24 hours.
              You'll receive a confirmation at {formData.contactInfo}.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white border-2 border-black/10 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium text-black">
            Initialize Protocol
          </DialogTitle>
          <DialogDescription className="text-sm text-black/70">
            Wallet Connected:{" "}
            <span className="font-mono text-primary">{shortenAddress(walletAddress)}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Protocol Name */}
          <div className="space-y-2">
            <label
              htmlFor="protocolName"
              className="text-sm font-medium text-black"
            >
              Protocol Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="protocolName"
              name="protocolName"
              value={formData.protocolName}
              onChange={handleInputChange}
              required
              placeholder="e.g., Jupiter, Raydium, Marinade"
              className="w-full bg-white border-2 border-black/10 rounded-lg px-4 py-2.5 text-black placeholder:text-black/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Token Contract Address */}
          <div className="space-y-2">
            <label
              htmlFor="tokenContractAddress"
              className="text-sm font-medium text-black"
            >
              Token Contract Address (CA) <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="tokenContractAddress"
              name="tokenContractAddress"
              value={formData.tokenContractAddress}
              onChange={handleInputChange}
              required
              placeholder="e.g., 7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs"
              className="w-full bg-white border-2 border-black/10 rounded-lg px-4 py-2.5 text-black placeholder:text-black/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all font-mono text-sm"
            />
          </div>

          {/* IDL Upload or Link */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-black">
              Program IDL (JSON or URL) <span className="text-primary">*</span>
            </label>

            {/* File Upload */}
            <div
              className="border-2 border-dashed border-black/20 rounded-lg p-6 transition-colors cursor-pointer hover:border-primary/50"
            >
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-8 h-8 text-black/50" />
                <label
                  htmlFor="idlFile"
                  className="text-sm text-black/70 cursor-pointer hover:text-primary transition-colors"
                >
                  {formData.idlFile
                    ? `Selected: ${formData.idlFile.name}`
                    : "Click to upload IDL JSON file"}
                </label>
                <input
                  type="file"
                  id="idlFile"
                  accept=".json"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* OR URL Input */}
            <div className="text-center text-sm text-black/50 py-2">OR</div>
            <input
              type="url"
              id="idlInput"
              name="idlInput"
              value={formData.idlInput}
              onChange={handleInputChange}
              placeholder="https://example.com/idl.json"
              className="w-full bg-white border-2 border-black/10 rounded-lg px-4 py-2.5 text-black placeholder:text-black/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-sm"
            />
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <label
              htmlFor="contactInfo"
              className="text-sm font-medium text-black"
            >
              Contact Info (Telegram or Email) <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="contactInfo"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleInputChange}
              required
              placeholder="@username or email@example.com"
              className="w-full bg-white border-2 border-black/10 rounded-lg px-4 py-2.5 text-black placeholder:text-black/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

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
                !formData.tokenContractAddress ||
                (!formData.idlFile && !formData.idlInput) ||
                !formData.contactInfo
              }
            >
              {isSubmitting ? "Submitting..." : "Submit for Review"}
            </CustomButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
