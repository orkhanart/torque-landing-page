import React from "react";
import { useForm } from "@formspree/react";
import { CustomButton } from "@/components/ui/custom-button";
import { Select } from "@/components/ui/select";
import "@/types/wallet";

interface ContactFormProps {
  onSuccess?: () => void;
}

const entityTypeOptions = [
  { value: "memecoin", label: "Memecoin" },
  { value: "protocol-with-token", label: "Protocol/Product with token" },
  { value: "protocol-no-token", label: "Protocol/Product no token" },
];

export function ContactForm({ onSuccess }: ContactFormProps) {
  const [state, handleSubmit] = useForm("mqapdody");
  const [entityType, setEntityType] = React.useState("");

  React.useEffect(() => {
    if (state.succeeded) {
      // Fire Google Analytics event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'contact_form_submit', {
          event_category: 'engagement',
          event_label: 'contact_form',
          value: 1
        });
      }
      
      if (onSuccess) {
        onSuccess();
      }
    }
  }, [state.succeeded, onSuccess]);

  return (
    <form className="w-full space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <label
          className="block font-medium text-foreground"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="w-full h-10 px-3 bg-transparent border border-secondary-foreground rounded-md text-secondary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          id="name"
          name="name"
          required
        />
      </div>
      <div className="space-y-1">
        <label
          className="block font-medium text-foreground"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="w-full h-10 px-3 bg-transparent border border-secondary-foreground rounded-md text-secondary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          id="email"
          name="email"
          type="email"
          required
        />
      </div>
      <div className="space-y-1">
        <label
          className="block font-medium text-foreground"
          htmlFor="telegram"
        >
          Telegram Username
        </label>
        <input
          className="w-full h-10 px-3 bg-transparent border border-secondary-foreground rounded-md text-secondary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          id="telegram"
          name="telegram"
          placeholder="@username"
          required
        />
      </div>
      <div className="space-y-1">
        <label
          className="block font-medium text-foreground"
          htmlFor="entity-type"
        >
          What best describes your project?
        </label>
        <Select
          id="entity-type"
          name="entity-type"
          options={entityTypeOptions}
          value={entityType}
          onValueChange={setEntityType}
          placeholder="Select an option"
          required
        />
      </div>
      <div className="space-y-1">
        <label
          className="block font-medium text-foreground"
          htmlFor="message"
        >
          Message
        </label>
        <textarea
          className="w-full h-32 px-3 py-2 bg-transparent border border-secondary-foreground rounded-md text-secondary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          id="message"
          name="message"
          required
        />
      </div>
      <div className="flex justify-end">
        <CustomButton type="submit" disabled={state.submitting} showArrow={false}>
          {state.submitting ? "Sending..." : "Send"}
        </CustomButton>
      </div>
    </form>
  );
}
