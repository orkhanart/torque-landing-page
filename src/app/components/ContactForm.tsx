import React from "react";
import { useForm } from "@formspree/react";
import { CustomButton } from "@/components/ui/customButton";
import { Select } from "@/components/ui/select";

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
          htmlFor="telegram"
        >
          Telegram Username
        </label>
        <input
          className="w-full h-10 px-3 rounded-md bg-transparent border border-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          id="telegram"
          name="telegram"
          placeholder="@username"
          required
        />
      </div>
      <div className="space-y-2">
        <label
          className="block text-sm font-medium text-gray-300"
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
      </div>
      <div className="flex justify-end">
        <CustomButton type="submit" disabled={state.submitting}>
          {state.submitting ? "Sending..." : "Send"}
        </CustomButton>
      </div>
    </form>
  );
}
