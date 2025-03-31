import React from "react";
import { useForm } from "@formspree/react";
import { CustomButton } from "@/components/ui/customButton";

interface ContactFormProps {
  onSuccess?: () => void;
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const [state, handleSubmit] = useForm("mqapdody");

  React.useEffect(() => {
    if (state.succeeded && onSuccess) {
      onSuccess();
    }
  }, [state.succeeded, onSuccess]);

  return (
    <form className="w-full space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label
          className="block text-sm font-medium text-gray-300"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="w-full h-10 px-3 rounded-md bg-transparent border border-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          id="name"
          name="name"
          required
        />
      </div>
      <div className="space-y-2">
        <label
          className="block text-sm font-medium text-gray-300"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="w-full h-10 px-3 rounded-md bg-transparent border border-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          id="email"
          name="email"
          type="email"
          required
        />
      </div>
      <div className="space-y-2">
        <label
          className="block text-sm font-medium text-gray-300"
          htmlFor="message"
        >
          Message
        </label>
        <textarea
          className="w-full h-32 px-3 py-2 rounded-md bg-transparent border border-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          id="message"
          name="message"
          required
        />
        <p className="text-sm text-gray-400">
          We usually respond within 1-2 business days.
        </p>
      </div>
      <div className="flex justify-end">
        <CustomButton type="submit" disabled={state.submitting}>
          {state.submitting ? "Sending..." : "Send"}
        </CustomButton>
      </div>
    </form>
  );
}
