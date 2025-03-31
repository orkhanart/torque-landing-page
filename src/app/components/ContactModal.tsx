import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ContactForm } from "./ContactForm";
import { SuccessMessage } from "./SuccessMessage";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-black/95 border border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium text-center">
            Request Access
          </DialogTitle>
        </DialogHeader>
        {isSuccess ? (
          <SuccessMessage onClose={handleClose} />
        ) : (
          <ContactForm onSuccess={handleSuccess} />
        )}
      </DialogContent>
    </Dialog>
  );
}
